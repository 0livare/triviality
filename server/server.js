const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })

const PORT = 3001

let users = []
let questionNumber = null

const questions = [{ question: 'Who is the cutest?', answers: ['Mom', 'Dad', 'Lola', 'Fitz'] }]

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

  socket.on('disconnect', () => {
    // console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
