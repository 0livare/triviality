const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = require('socket.io')(server, { cors: { origin: '*' } })

const PORT = 3001

io.on('connection', (socket) => {
  console.log('a user connected')

  // receive a message from the client
  socket.on('hello from client', (...args) => {
    console.log('received from client: ', args)
    socket.emit('hello from server', 'HI ZACH')
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
