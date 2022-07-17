<!-- 
  This is the waiting room page where users 
  will sit until the host starts the game 
-->
<script lang="ts">
  import { TriviaEvents } from 'triviality-shared'
  import { teamName } from '~/lib/stores'
  import { goto } from '$app/navigation'
  import { connectToTriviaGame, determineHost } from '~/helpers'
  import { page } from '$app/stores'
  import type { User } from '~/types'

  const gameCode = $page.params.gameCode

  const socket = connectToTriviaGame()
  let participants: User[] = []
  $: isHost = determineHost(participants)

  socket.emit(TriviaEvents.GetUsers)
  socket.on(TriviaEvents.GetUsers, (users: User[]) => {
    participants = users
  })

  socket.on(TriviaEvents.GetCurrentQuestionNumber, (questionNumber) => {
    if (questionNumber !== null) {
      goto(`/trivia/${gameCode}/question`)
    }
  })

  function handleStartGame() {
    socket.emit(TriviaEvents.StartGame)
  }
</script>

<h1 class="font-bold text-xl">Game Code: {gameCode}</h1>
<h2 class="font-bold text-lg">Team: {$teamName}</h2>
<p class="my-4">Waiting for everyone to join...</p>

{#if participants.length}
  <p>Current participants:</p>
  <ul class="list-disc">
    {#each participants as participant}
      <li>{participant.teamName}</li>
    {/each}
  </ul>
{/if}

<!-- {#if isHost && participants.length > 1} -->
{#if isHost}
  <button
    on:click={handleStartGame}
    class="mt-16 rounded-full w-52 h-52 bg-red-500 text-white font-fold text-5xl hover:animate-spin"
    >Begin game</button
  >
{/if}