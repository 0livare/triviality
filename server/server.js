const express = require('express')
const http = require('http')
const { GenericEvents, GameTypes } = require('triviality-shared')
const generateGameCode = require('./generate-game-code')
const { TriviaGame, BuzzGame } = require('./games')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })

const PORT = 3001

let games = {}

io.on('connection', (socket) => {
  // console.log('connected', socket)

  io.on(GenericEvents.HostRoom, (gameType) => {
    let game

    switch (gameType) {
      case GameTypes.Trivia:
        game = TriviaGame(io)
        break
      case GameTypes.Buzz:
        game = BuzzGame(io)
        break
    }

    game.addParticipant(socket)
    let gameCode = generateGameCode(Object.keys(games))
    games[gameCode] = game

    // TODO: Use socket.io to add this socket to a room
    // with room id of gameCode
    socket.emit(GenericEvents.HostRoom, gameCode)
  })

  io.on(GenericEvents.JoinRoom, (gameCode) => {
    let game = games[gameCode]
    if (!game) return

    game.addParticipant(socket)
    socket.emit(GenericEvents.JoinedRoom, gameCode)
  })
})

server.listen(PORT, () => {
  console.info(`Listening on http://localhost:${PORT}`)
})
