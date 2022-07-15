import { GenericEvents } from 'triviality-shared'
import { teamName as teamNameStore, userId as userIdStore } from '~/lib/stores'
import { page } from '$app/stores'

import { connect } from './connect-to-game-server'
import { get } from './get-store-value'

export function connectToTriviaGame() {
  const gameCode = get(page, (page) => page.params.gameCode)
  const teamName = get(teamNameStore)
  const userId = get(userIdStore)

  const { socket, wasReconnect } = connect()

  if (!wasReconnect) {
    socket.emit(GenericEvents.JoinRoom, { teamName, gameCode, userId })
  }

  return socket
}
