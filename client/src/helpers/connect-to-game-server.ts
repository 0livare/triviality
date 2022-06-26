import { io } from 'socket.io-client'

export function connect() {
  // return io('ws://localhost:3001')

  // return io('http://147.182.246.145')
  return io('https://olivare.net')

  // See: https://socket.io/docs/v3/troubleshooting-connection-issues/
  // return io('http://147.182.246.145', {
  //   rejectUnauthorized: false, // WARN: please do not do this in production
  // })
}
