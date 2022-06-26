const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })

const PORT = 3001

let users = []
let questionNumber = null

const questions = [
  { prompt: 'Who is the cutest?', choices: ['Kiermo', 'Zach', 'Lola', 'Fitz'], answer: 'Kiermo' },
  { prompt: 'Who is the wittlest?', choices: ['Kiermo', 'Zach', 'Lola', 'Fitz'], answer: 'Lola' },
  { prompt: 'Who is the longest?', choices: ['Kiermo', 'Zach', 'Lola', 'Fitz'], answer: 'Fitz' },
]
const answers = {}

io.on('connection', (socket) => {
  // console.log('a user connected')

  socket.on('add user', (userName) => {
    if (users.includes(userName)) return

    users.push(userName)
    console.log('Adding user: ', userName)
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

        console.log(
          `question: ${questionIndex}, team: ${teamName}, expected: ${expected}, received: ${received}`,
        )
        return accum
      }, {})
    })

    socket.emit('get game result', resultsByQuestionByTeam)
  })

  socket.on('reset game', () => {
    users = []
    questionNumber = null
    io.emit('reset game')
    console.log('RESET GAME')
  })

  socket.on('disconnect', () => {
    // console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
