import { writable, readable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

export const teamName = writable(sessionStorage.getItem('teamName') || null)
teamName.subscribe((teamName) => sessionStorage.setItem('teamName', teamName || ''))

if (!sessionStorage.getItem('userId')) {
  sessionStorage.setItem('userId', uuid())
}
export const userId = readable(sessionStorage.getItem('userId'))
