const { BuzzEvents } = require('triviality-shared')

// This is just a copy-pate of TriviaGame for the moment
module.exports = function BuzzGame(io) {
  let users = []
  let questionNumber = null
  let answers = {}

  function addParticipant(socket) {
    socket.on(BuzzEvents.AddUser, (userName) => {
      if (users.includes(userName)) return

      users.push(userName)
      io.emit(BuzzEvents.GetUsers, users)
    })

    socket.on(BuzzEvents.GetUsers, () => {
      socket.emit(BuzzEvents.GetUsers, users)
    })

    socket.on(BuzzEvents.GetCurrentQuestionNumber, () => {
      socket.emit(BuzzEvents.GetCurrentQuestionNumber, questionNumber)
    })

    socket.on(BuzzEvents.GetQuestionData, () => {
      socket.emit(BuzzEvents.GetQuestionData, questions)
    })

    socket.on(BuzzEvents.StartGame, () => {
      questionNumber = 1
      io.emit(BuzzEvents.GetCurrentQuestionNumber, questionNumber)
    })

    socket.on(BuzzEvents.NextQuestion, () => {
      const areQuestionsRemaining = questions.length > questionNumber
      if (areQuestionsRemaining) {
        questionNumber++
      } else {
        questionNumber = null
      }
      io.emit(BuzzEvents.GetCurrentQuestionNumber, questionNumber)
    })

    socket.on(BuzzEvents.SubmitAnswer, (teamName, questionNumber, answer) => {
      if (!answers[teamName]) answers[teamName] = []

      const teamAnswers = answers[teamName]
      teamAnswers[questionNumber - 1] = answer
    })

    socket.on(BuzzEvents.GetGameResult, () => {
      const resultsByQuestionByTeam = questions.map(({ answer }, questionIndex) => {
        return users.reduce((accum, teamName) => {
          const teamAnswerToThisQuestion = answers[teamName]?.[questionIndex]
          const expected = answer
          const received = teamAnswerToThisQuestion
          const isCorrect = expected == received
          accum[teamName] = { expected, received, isCorrect }
          return accum
        }, {})
      })

      socket.emit(BuzzEvents.GetGameResult, resultsByQuestionByTeam)
    })

    socket.on(BuzzEvents.ResetGame, () => {
      users = []
      questionNumber = null
      answers = {}
      io.emit(BuzzEvents.ResetGame)
    })
  }

  function removeParticipant(socket) {
    socket.removeAllListeners()
  }

  return { addParticipant, removeParticipant }
}
