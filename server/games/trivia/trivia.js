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
      socket.emit(TriviaEvents.GetCurrentQuestionNumber, questionNumber)
    })

    socket.on(TriviaEvents.GetQuestionData, () => {
      socket.emit(TriviaEvents.GetQuestionData, questions)
    })

    socket.on(TriviaEvents.StartGame, () => {
      questionNumber = 1
      io.in(gameCode).emit(TriviaEvents.GetCurrentQuestionNumber, questionNumber)
    })

    socket.on(TriviaEvents.NextQuestion, () => {
      const questionIndex = questionNumber - 1
      const correctAnswer = questions[questionIndex]?.answer
      // If the game is over, there might not be a correct answer?
      if (correctAnswer) {
        io.in(gameCode).emit(TriviaEvents.CorrectAnswer, {
          questionNumber,
          correctAnswer,
        })
      }

      const areQuestionsRemaining = questions.length > questionNumber
      if (areQuestionsRemaining) {
        questionNumber++
      } else {
        questionNumber = null
      }

      io.in(gameCode).emit(TriviaEvents.GetCurrentQuestionNumber, questionNumber)
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

      const pointsPerQuestion = 10
      const pointsByTeam = users.reduce((accum, user) => {
        accum[user.id] = 0
        return accum
      }, {})
      resultsByQuestionByTeam.forEach((questionResultsByTeam) => {
        users.forEach((user) => {
          const questionResultForTeam = questionResultsByTeam[user.id]
          if (!questionResultForTeam) return
          if (questionResultForTeam.isCorrect) pointsByTeam[user.id] += pointsPerQuestion
        })
      })

      console.log({
        resultsByQuestionByTeam: JSON.stringify(resultsByQuestionByTeam),
        pointsByTeam: JSON.stringify(pointsByTeam),
        resultsByQuestionByTeam: JSON.stringify(resultsByQuestionByTeam),
      })

      socket.emit(TriviaEvents.GetGameResult, pointsByTeam)
    })

    socket.on(TriviaEvents.ResetGame, () => {
      users = []
      questionNumber = null
      answers = {}
      io.emit(TriviaEvents.ResetGame)

      // Kick everyone out of the room
      io.socketsLeave(gameCode)

      // Just because their out of the room doesn't mean that the
      // events that were registered without regard to the room
      // aren't still attached.
      // This could be done at the top of the
      // registerEvents() function
      Object.values(TriviaEvents).forEach((triviaEvent) => {
        socket.removeAllListeners(triviaEvent)
      })
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
