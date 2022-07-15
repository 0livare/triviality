import { io, type Socket } from 'socket.io-client'

let socket: Socket

export function connect() {
  if (socket) return { socket, wasReconnect: true }

  const useLocalServer = true
  const isDev = process.env.NODE_ENV === 'development'

  const serverUrl = isDev && useLocalServer ? 'ws://localhost:3001' : 'wss://trivia.olivare.net'
  console.info('Connecting to ', serverUrl)
  socket = io(serverUrl)

  return { socket, wasReconnect: false }
}
