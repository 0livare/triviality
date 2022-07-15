<script lang="ts" type="module">
  import { TriviaEvents, GenericEvents } from 'triviality-shared'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { teamName } from '~/lib/stores'
  import { connect } from '~/helpers'
  import Button from '$lib/button.svelte'

  const gameCode = $page.params.gameCode

  const socket = connect()
  let questionNumber: number | null = null

  socket.on(TriviaEvents.GetCurrentQuestionNumber, (q) => {
    questionNumber = q
  })

  function handleSubmit() {
    socket.emit(GenericEvents.JoinRoom, { teamName: $teamName, gameCode })

    if (questionNumber) {
      goto(`/trivia/${gameCode}/question/${questionNumber}`)
    } else {
      goto(`/trivia/${gameCode}`)
    }
  }
</script>

<svelte:head>
  <title>Start a game</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
  <label class="flex flex-col">
    Your team name
    <input
      type="text"
      name="teamName"
      bind:value={$teamName}
      class="border border-gray-200 text-black"
      required
    />
  </label>

  <Button type="submit" class="mt-4 w-full">Continue</Button>
</form>
