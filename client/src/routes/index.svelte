<script lang="ts" type="module">
  import { goto } from '$app/navigation'
  import { getFormData } from '~/utils'
  import { teamName } from '~/lib/stores'
  import { connect } from '~/helpers'

  import { io } from 'socket.io-client'

  // const socket = io('ws://localhost:3001')
  // console.log('connecting')

  // // receive a message from the server
  // socket.on('hello from server', (...args) => {
  //   console.log('message from server is:', args)
  // })

  // function sendMessage() {
  //   console.log('message sent!')

  //   // send a message to the server
  //   socket.emit('hello from client', 5, '6', { 7: Uint8Array.from([8]) })
  // }

  function handleSubmit(e: SubmitEvent) {
    // const formData = getFormData<FormShape>(e)
    // console.log(formData)
    const socket = connect()
    socket.emit('add user', $teamName)
    goto('/waiting-room')
  }
</script>

<svelte:head>
  <title>Join the game</title>
</svelte:head>

<form
  on:submit|preventDefault={handleSubmit}
  class="h-full flex flex-col justify-center items-center"
>
  <label class="flex flex-col">
    Please enter your team name
    <input type="text" name="teamName" bind:value={$teamName} class="border border-gray-200" />
  </label>

  <button type="submit" class="mt-4">Continue</button>
</form>
