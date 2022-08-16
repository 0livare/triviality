<script lang="ts" type="module">
  import { goto } from '$app/navigation'
  import { GenericEvents, GameTypes } from 'triviality-shared'
  import { userId } from '~/lib/stores'

  import Button from '~/lib/button.svelte'
  import { connect } from '~/helpers'

  const { socket } = connect()

  socket.on(GenericEvents.HostRoom, (gameCode) => {
    console.log('received event back')
    if (gameCode) {
      goto(`/trivia/${gameCode}/start`)
    }
  })

  function handleStartNewGame() {
    console.log('userId', $userId)
    socket.emit(GenericEvents.HostRoom, {
      gameType: GameTypes.Trivia,
      userId: $userId,
    })
  }
</script>

<svelte:head>
  <title>Triviality</title>
</svelte:head>

<div class="flex flex-col relative items-center">
  <div
    class="
      logoWrapper 
      flex justify-center items-center overflow-hidden rounded-full 
      bg-purp-400
      w-56 h-56
      mb-24
    "
  >
    <img src="/logo.png" alt="Triviality" class="logo object-contain object-center" />
  </div>

  <Button class="mt-4" href="/trivia/join">Join game</Button>
  <Button class="mt-4" on:click={handleStartNewGame}>Start a new game</Button>
</div>

<style>
  .logo {
    width: 60%;
    height: 60%;
  }
</style>
