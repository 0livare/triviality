import { writable } from 'svelte/store'

export const teamName = writable(sessionStorage.getItem('teamName') || null)
teamName.subscribe((teamName) => sessionStorage.setItem('teamName', teamName || ''))
