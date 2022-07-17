import { userId as userIdStore } from '~/lib/stores'
import { get } from '~/helpers'
import type { User } from '~/types'

export function determineHost(users: User[] | undefined) {
  if (!users) return false
  const userId = get(userIdStore)
  const firstUser = users[0]
  return firstUser?.id === userId
}
