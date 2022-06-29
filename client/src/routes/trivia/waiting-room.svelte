<script lang="ts">
  import { teamName } from '~/lib/stores'
  import { goto } from '$app/navigation'
  import { connect } from '~/helpers'

  const socket = connect()
  let participants: string[] = []
  $: isHost = participants.indexOf($teamName || '') === 0

  socket.emit('get users')
  socket.on('get users', (users: string[]) => {
    participants = users
  })

  socket.on('get current question number', (questionNumber) => {
    if (questionNumber !== null) {
      goto(`/trivia/question/${questionNumber}`)
    }
  })

  function handleStartGame() {
    socket.emit('start game')
  }
</script>

<h1 class="font-bold text-xl">Team: {$teamName}</h1>
<p class="my-4">Waiting for everyone to join...</p>

{#if participants.length}
  <p>Current participants:</p>
  <ul class="list-disc">
    {#each participants as participant}
      <li>{participant}</li>
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
