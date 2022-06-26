<script lang="ts" type="module">
  import { goto } from '$app/navigation'
  import { teamName } from '~/lib/stores'
  import { connect } from '~/helpers'
  import Button from '$lib/button.svelte'

  const socket = connect()
  let questionNumber: number | null = null

  socket.on('get current question number', (q) => {
    questionNumber = q
  })

  function handleSubmit() {
    socket.emit('add user', $teamName)

    if (questionNumber) {
      goto('/question/${questionNumber}')
    } else {
      goto('/waiting-room')
    }
  }
</script>

<svelte:head>
  <title>Join the game</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
  <label class="flex flex-col">
    Please enter your team name
    <input
      type="text"
      name="teamName"
      bind:value={$teamName}
      class="border border-gray-200 text-black"
    />
  </label>

  <Button type="submit" class="mt-4 w-full">Continue</Button>
</form>
