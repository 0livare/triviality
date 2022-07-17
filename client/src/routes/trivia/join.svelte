<script lang="ts" type="module">
  import { GenericEvents, TriviaEvents } from 'triviality-shared'
  import { goto } from '$app/navigation'
  import { teamName, userId } from '~/lib/stores'
  import { connectToTriviaGame } from '~/helpers'
  import Button from '$lib/button.svelte'

  const socket = connectToTriviaGame()
  let questionNumber: number | null = null
  let gameCode: string | null = null

  socket.on(TriviaEvents.GetCurrentQuestionNumber, (q) => {
    questionNumber = q
  })

  function handleSubmit() {
    if (!gameCode) return
    socket.emit(GenericEvents.JoinRoom, { teamName: $teamName, gameCode, userId: $userId })

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

<form on:submit|preventDefault={handleSubmit}>
  <label class="flex flex-col">
    Game Code
    <input
      type="text"
      name="teamName"
      bind:value={gameCode}
      class="border border-gray-200 text-black"
      required
      autocomplete="off"
    />
  </label>

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
