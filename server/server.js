const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })

const PORT = 3001

let users = []
let questionNumber = null
let answers = {}

const questions = [
  {
    prompt: 'Milwaukee has a famous statue of which character(s)?',
    choices: [
      'Steve Urkel (Family Matters)',
      'The Fonz (Happy Days)',
      'Laverne & Shirley (Laverne & Shirley)',
      "Red (That 70's show)",
    ],
    answer: 'The Fonz (Happy Days)',
  },
  {
    prompt: 'Wisconsin holds the US (lower-48) record for which of the following?',
    choices: [
      'Most lakes',
      'Highest dairy production',
      'Most cows per capita',
      'Oldest standing barn',
    ],
    answer: 'Most lakes',
  },
  {
    prompt: "Wisconsin is home to America's...",
    choices: [
      'Largest music festival',
      'Largest water park',
      'Oldest bowling alley',
      'Oldest soccer team',
      'All of the above',
    ],
    answer: 'All of the above',
  },
]

io.on('connection', (socket) => {
  // console.log('a user connected')

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

  socket.on('disconnect', () => {
    // console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.info(`Listening on http://localhost:${PORT}`)
})
