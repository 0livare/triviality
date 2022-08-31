<script lang="ts" type="module">
  import { goto } from '$app/navigation'
  import { GenericEvents, GameTypes } from 'triviality-shared'
  import { userId } from '~/lib/stores'

  import Button from '~/lib/button.svelte'
  import { connect } from '~/helpers'
  import Logo from '$lib/logo.svelte'

  const { socket } = connect()

  socket.on(GenericEvents.HostRoom, (gameCode) => {
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

<div class="flex flex-col relative items-center -translate-y-8">
  <Logo size="large" class="mb-24" />

  <Button class="mt-4" href="/trivia/join">Join game</Button>
  <Button class="mt-4" on:click={handleStartNewGame}>Start a new game</Button>
</div>
