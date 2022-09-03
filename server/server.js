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
  console.info('CONNECTED', socket.id)

  socket.on(GenericEvents.HostRoom, ({ gameType, userId }) => {
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

    console.info('host room', { gameCode, gameType, userId })

    games[gameCode] = game
    socket.join(gameCode)
    socket.emit(GenericEvents.HostRoom, gameCode)
  })

  socket.on(GenericEvents.JoinRoom, ({ teamName, gameCode, userId }) => {
    let game = games[gameCode]
    if (!game || !teamName) return

    console.info('join room', { teamName, gameCode, userId })

    if (teamName !== 'host') {
      game.addParticipant({ teamName, userId })
    }

    game.registerEvents({ socket, gameCode, teamName, userId })
    socket.join(gameCode)
    socket.emit(GenericEvents.JoinedRoom, gameCode)
  })

  socket.on('disconnect', () => {
    console.info('DISCONNECTED', socket.id)
  })
})

server.listen(PORT, () => {
  console.info(`Local server is listening on http://localhost:${PORT}`)
})
