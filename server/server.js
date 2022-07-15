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
  // console.log('connected')

  socket.on(GenericEvents.HostRoom, (gameType) => {
    let gameCode = generateGameCode(Object.keys(games))
    let game

    switch (gameType) {
      case GameTypes.Trivia:
        game = TriviaGame(io, gameCode)
        break
      case GameTypes.Buzz:
        game = BuzzGame(io, gameCode)
        break
      default:
        return
    }

    game.addParticipant(socket)
    games[gameCode] = game

    socket.join(gameCode)
    socket.emit(GenericEvents.HostRoom, gameCode)
  })

  socket.on(GenericEvents.JoinRoom, ({ teamName, gameCode }) => {
    let game = games[gameCode]
    if (!game || !teamName) return

    console.log('join room', { teamName, gameCode })

    game.addParticipant(socket, teamName)
    socket.join(gameCode)
    socket.emit(GenericEvents.JoinedRoom, gameCode)
  })
})

server.listen(PORT, () => {
  console.info(`Listening on http://localhost:${PORT}`)
})
