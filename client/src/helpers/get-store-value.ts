import type { Readable } from 'svelte/store'

export function get<T, U>(store: Readable<T>, mapFn: (t: T) => U = (t) => t as unknown as U) {
  let myVar: U | null = null
  store.subscribe((myValue) => (myVar = mapFn(myValue)))

  // TS thinks that this will always be null, but the
  // subscribe() function will always call the callback
  // before it exits, which should prevent myVar from
  // being null unless the mapFn returns null
  return myVar as unknown as U
}
