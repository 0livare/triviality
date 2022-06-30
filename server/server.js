const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })

const TriviaGame = require('./trivia')

const PORT = 3001

let game = TriviaGame(io)

io.on('connection', (socket) => {
  // console.log('connected', socket)
  game.register(socket)
})

server.listen(PORT, () => {
  console.info(`Listening on http://localhost:${PORT}`)
})
