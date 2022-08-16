<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  export let index = 1
  export let count = 1

  const transitionDurationMs = 15_000
  const maxPosMoveVw = 10

  let posPctStart = index * (100 / count)
  let posPctEnd = (index + 1) * (100 / count)

  let x = posPctStart
  let y = posPctStart
  let diameter = Math.random() * 50
  let iterations = 0

  function randomDir() {
    return Math.random() > 0.5 ? 1 : -1
  }

  function chooseDelta(args: { scale: number; start?: number; max?: number }) {
    const { scale, start = 0, max } = args
    let delta = Math.random() * scale + start
    /*if (iterations % 10 === 0)*/ delta *= randomDir()

    if (max) delta = bound(delta, { max })
    return delta
  }

  function bound(val: number, args: { max: number }) {
    return Math.max(Math.min(val, args.max), -1 * args.max)
  }

  function iterate(posMax = 100) {
    iterations++

    let xDelta = chooseDelta({ scale: 1.1, start: posPctStart, max: maxPosMoveVw })
    x = bound(x + xDelta, { max: posMax })

    let yDelta = chooseDelta({ scale: 1.1, start: posPctStart, max: maxPosMoveVw })
    y = bound(y + yDelta, { max: posMax })

    let diameterDelta = chooseDelta({ scale: 40 })
    diameter = bound(diameter + diameterDelta, { max: 100 })

    // console.log(`Moving ${index}`, { iterations, x, y, radius, xDelta, yDelta, posPctStart })
  }

  onMount(() => {
    setTimeout(() => iterate(posPctEnd), 500)
  })

  let interval = setInterval(iterate, transitionDurationMs)
  onDestroy(() => {
    clearInterval(interval)
  })
</script>

<div
  class="mote transition-transform"
  style="
    transform: 
      translateX(min({x}vw, 100vw - {diameter}%))
      translateY(min({y}vh, 100vh - {diameter}%)) 
      scale({diameter}%)
      ;
    transition-duration: {transitionDurationMs * 1.4}ms;
  "
/>

<style>
  .mote {
    background: white;
    opacity: 0.1;
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }
</style>
