const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })

const PORT = 3001

const gameState = {
  users: [],
  questionNumber: null
}

const questions = [{ question: 'Who is the cutest?', answers: ['Mom', 'Dad', 'Lola', 'Fitz'] }]

io.on('connection', (socket) => {
  console.log('a user connected', gameState.questionNumber)

  socket.on('add user', (userName) => {
    const { users } = gameState
    if (users.includes(userName)) return

    users.push(userName)
    console.log('Adding user: ', userName)
    io.emit('get users', users)
  })

  socket.on('get users', () => {
    socket.emit('get users', gameState.users)
  })

  socket.on('get current question number', () => {
    socket.emit('get current question number', gameState.questionNumber)
  })

  socket.on('get question data', () => {
    socket.emit('get question data', questions)
  })

  socket.on('start game', () => {
    gameState.questionNuber = 1
    console.log('gameState', gameState)
    io.emit('get current question number', gameState.questionNumber)
  })

  socket.on('disconnect', () => {
    // console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
