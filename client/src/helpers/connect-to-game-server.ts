import { io } from 'socket.io-client'

export function connect() {
  const useLocalServer = false
  const isDev = process.env.NODE_ENV === 'development'

  const serverUrl = isDev && useLocalServer ? 'ws://localhost:3001' : 'wss://trivia.olivare.net'
  return io(serverUrl)
}
