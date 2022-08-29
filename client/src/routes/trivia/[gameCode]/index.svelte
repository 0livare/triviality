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
  import Button from '$lib/button.svelte'
  import { onMount } from 'svelte'

  const gameCode = $page.params.gameCode

  // Not having teamName set indicates that the user came
  // directly to this page without first going through the
  // join page to create a team name.
  onMount(() => {
    if ($teamName) return
    goto(`/trivia/join?gameCode=${gameCode}`)
  })

  const socket = connectToTriviaGame()
  let participants: User[] = []
  $: isHost = determineHost(participants)
  // $: hostName = participants[0].teamName

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

<div class="-translate-y-8 text-center">
  <h1 class="text-center">
    <span class="smallText">Game Code</span>
    <br />
    <span class="bigText">{gameCode}</span>
  </h1>

  <h2 class="text-center mt-4 mb-8">
    <span class="smallText">Team</span>
    <br />
    <span class="bigText">{$teamName}</span>
  </h2>

  {#if participants.length}
    <div class="bg-white/50 p-4 rounded w-full min-w-[250px] text-left">
      <p>Current participants:</p>
      <hr class="-mx-4 border-white/40 my-4" />
      <ul>
        {#each participants as participant}
          <li>{participant.teamName}</li>
        {/each}
      </ul>
    </div>
  {/if}

  <!-- {#if isHost && participants.length > 1} -->
  {#if isHost}
    <Button
      on:click={handleStartGame}
      class="mt-16 rounded-full w-32 h-32 min-w-0"
    >
      Begin!
    </Button>
  {:else}{/if}
</div>

<style>
  .smallText {
    color: white;
    opacity: 60%;
    font-size: 0.875rem;
  }

  .bigText {
    color: white;
    font-size: 1.4rem;
    font-weight: 700;
  }
</style>
