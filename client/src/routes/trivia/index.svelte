<script lang="ts" type="module">
  import { goto } from '$app/navigation'
  import { GenericEvents, GameTypes } from 'triviality-shared'
  import { userId } from '~/lib/stores'

  import Button from '~/lib/button.svelte'
  import { connect } from '~/helpers'

  const { socket } = connect()

  socket.on(GenericEvents.HostRoom, (gameCode) => {
    if (gameCode) {
      goto(`/trivia/${gameCode}/start`)
    }
  })

  function handleStartNewGame() {
    socket.emit(GenericEvents.HostRoom, {
      gameType: GameTypes.Trivia,
      userId: $userId,
    })
  }
</script>

<svelte:head>
  <title>Welcome to Triviality!</title>
</svelte:head>

<Button class="mt-4 w-full" href="/trivia/join">Join game</Button>
<Button class="mt-4 w-full" on:click={handleStartNewGame}>Start a new game</Button>
