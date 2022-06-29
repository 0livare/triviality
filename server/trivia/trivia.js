const questions = require('./questions')

module.exports = function TriviaGame(io) {
  let users = []
  let questionNumber = null
  let answers = {}

  function register(socket) {
    socket.on('add user', (userName) => {
      if (users.includes(userName)) return

      users.push(userName)
      io.emit('get users', users)
    })

    socket.on('get users', () => {
      socket.emit('get users', users)
    })

    socket.on('get current question number', () => {
      socket.emit('get current question number', questionNumber)
    })

    socket.on('get question data', () => {
      socket.emit('get question data', questions)
    })

    socket.on('start game', () => {
      questionNumber = 1
      io.emit('get current question number', questionNumber)
    })

    socket.on('next question', () => {
      const areQuestionsRemaining = questions.length > questionNumber
      if (areQuestionsRemaining) {
        questionNumber++
      } else {
        questionNumber = null
      }
      io.emit('get current question number', questionNumber)
    })

    socket.on('submit answer', (teamName, questionNumber, answer) => {
      if (!answers[teamName]) answers[teamName] = []

      const teamAnswers = answers[teamName]
      teamAnswers[questionNumber - 1] = answer
    })

    socket.on('get game result', () => {
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

      socket.emit('get game result', resultsByQuestionByTeam)
    })

    socket.on('reset game', () => {
      users = []
      questionNumber = null
      answers = {}
      io.emit('reset game')
    })
  }

  function destroy(socket) {
    socket.removeAllListeners()
  }

  return { register, destroy }
}
