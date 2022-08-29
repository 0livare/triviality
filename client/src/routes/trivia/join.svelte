<script lang="ts" type="module">
  import { GenericEvents, TriviaEvents } from 'triviality-shared'
  import { goto } from '$app/navigation'
  import { teamName, userId } from '~/lib/stores'
  import { connectToTriviaGame } from '~/helpers'
  import Button from '$lib/button.svelte'
  import TextField from '$lib/text-field.svelte'
  import Logo from '$lib/logo.svelte'

  const socket = connectToTriviaGame()
  let questionNumber: number | null = null

  // TODO: Set game code to the "gameCode" query param if it is set
  let gameCode: string | null = null

  socket.on(TriviaEvents.GetCurrentQuestionNumber, (q) => {
    questionNumber = q
  })

  function handleSubmit() {
    if (!gameCode) return
    socket.emit(GenericEvents.JoinRoom, {
      teamName: $teamName,
      gameCode,
      userId: $userId,
    })

    if (questionNumber) {
      goto(`/trivia/${gameCode}/question}`)
    } else {
      goto(`/trivia/${gameCode}`)
    }
  }
</script>

<svelte:head>
  <title>Join a game</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit} class="-translate-y-8">
  <Logo size="small" class="mx-auto mb-8" />

  <TextField
    label="Game Code"
    name="gameCode"
    bind:value={gameCode}
    required
    autocomplete="off"
  />

  <TextField
    label="Your team name"
    name="teamName"
    bind:value={$teamName}
    required
  />

  <Button type="submit" class="mt-6 w-full">Continue</Button>
</form>
