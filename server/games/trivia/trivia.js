const { TriviaEvents } = require('triviality-shared')
const questions = require('./questions')

module.exports = function TriviaGame(io, gameCode) {
  let users = []
  let questionNumber = null
  let answers = {}

  function addParticipant({ teamName, userId }) {
    const userAlreadyExists = !!users.find((user) => user.id === userId)
    if (userAlreadyExists) return

    users.push({
      id: userId,
      teamName,
    })

    io.in(gameCode).emit(TriviaEvents.GetUsers, users)
  }

  function registerEvents({ socket, gameCode, teamName, userId }) {
    // socket.on(TriviaEvents.AddUser, (userName) => {
    //   if (users.includes(teamName)) return

    //   users.push(teamName)
    //   io.in(gameCode).emit(TriviaEvents.GetUsers, users)
    // })

    socket.on(TriviaEvents.GetUsers, () => {
      socket.emit(TriviaEvents.GetUsers, users)
    })

    socket.on(TriviaEvents.GetCurrentQuestionNumber, () => {
      console.log('get question number')
      socket.emit(TriviaEvents.GetCurrentQuestionNumber, questionNumber)
    })

    socket.on(TriviaEvents.GetQuestionData, () => {
      console.log('get questions')
      socket.emit(TriviaEvents.GetQuestionData, questions)
    })

    socket.on(TriviaEvents.StartGame, () => {
      questionNumber = 1
      io.emit(TriviaEvents.GetCurrentQuestionNumber, questionNumber)
    })

    socket.on(TriviaEvents.NextQuestion, () => {
      console.log('next question')
      const areQuestionsRemaining = questions.length > questionNumber
      if (areQuestionsRemaining) {
        questionNumber++
      } else {
        questionNumber = null
      }
      io.in(gameCode).emit(TriviaEvents.GetCurrentQuestionNumber, questionNumber)

      const correctAnswer = questions[questionNumber]?.answer
      // If the game is over, there might not be a correct answer?
      if (correctAnswer) {
        io.in(gameCode).emit(TriviaEvents.CorrectAnswer, {
          questionNumber,
          correctAnswer,
        })
      }
    })

    socket.on(TriviaEvents.SubmitAnswer, ({ userId, questionNumber, answer }) => {
      if (!answers[userId]) answers[userId] = []

      const teamAnswers = answers[userId]
      teamAnswers[questionNumber - 1] = answer
    })

    socket.on(TriviaEvents.GetGameResult, () => {
      const resultsByQuestionByTeam = questions.map(({ answer }, questionIndex) => {
        return users.reduce((accum, user) => {
          const teamAnswerToThisQuestion = answers[user.id]?.[questionIndex]
          const expected = answer
          const received = teamAnswerToThisQuestion
          const isCorrect = expected == received
          accum[user.id] = { expected, received, isCorrect }
          return accum
        }, {})
      })

      socket.emit(TriviaEvents.GetGameResult, resultsByQuestionByTeam)
    })

    socket.on(TriviaEvents.ResetGame, () => {
      users = []
      questionNumber = null
      answers = {}
      io.emit(TriviaEvents.ResetGame)
    })

    socket.on(TriviaEvents.GetIsSubmitted, ({ userId }) => {
      const answer = answers[userId]?.[questionNumber - 1]

      socket.emit(TriviaEvents.GetIsSubmitted, {
        isSubmitted: !!answer,
        answer,
      })
    })
  }

  function removeParticipant(socket) {
    socket.removeAllListeners()
  }

  return { addParticipant, removeParticipant, registerEvents }
}
