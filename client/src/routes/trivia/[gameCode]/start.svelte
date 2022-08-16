<script lang="ts" type="module">
  import { TriviaEvents, GenericEvents } from 'triviality-shared'

  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import Button from '~/lib/button.svelte'
  import TextField from '~/lib/text-field.svelte'
  import { connect } from '~/helpers'
  import { teamName, userId } from '~/lib/stores'
  import Logo from '$lib/logo.svelte'

  const gameCode = $page.params.gameCode

  const { socket } = connect()
  let questionNumber: number | null = null

  socket.on(TriviaEvents.GetCurrentQuestionNumber, (q) => {
    questionNumber = q
  })

  function handleSubmit() {
    socket.emit(GenericEvents.JoinRoom, {
      teamName: $teamName,
      gameCode,
      userId: $userId,
    })

    if (questionNumber) {
      goto(`/trivia/${gameCode}/question`)
    } else {
      goto(`/trivia/${gameCode}`)
    }
  }

  $: console.log('teamName: ', $teamName)
</script>

<svelte:head>
  <title>Start a game</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit} class="-translate-y-8">
  <Logo size="small" class="mx-auto mb-8" />

  <TextField
    label="Your team name"
    name="teamName"
    bind:value={$teamName}
    required
  />

  <Button type="submit" class="mt-4 w-full" disabled={!teamName}>
    Continue
  </Button>
</form>
