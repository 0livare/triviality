<script lang="ts" type="module">
  import { io } from 'socket.io-client'

  const socket = io('ws://localhost:3001')
  console.log('connecting')

  // receive a message from the server
  socket.on('hello from server', (...args) => {
    console.log('message from server is:', args)
  })

  function sendMessage() {
    console.log('message sent!')

    // send a message to the server
    socket.emit('hello from client', 5, '6', { 7: Uint8Array.from([8]) })
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<button on:click={sendMessage}>Send message</button>

<style>
  :global(body) {
    background: #2b2b2b;
    color: white;
  }
</style>
