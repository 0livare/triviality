<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Modal from './modal.svelte'

  const dispatch = createEventDispatcher()

  export let correctAnswer: string | null | undefined
  export let theirAnswer: string | null | undefined

  let isOpen = true

  $: {
    if (correctAnswer) isOpen = true
    setTimeout(() => {
      isOpen = false
    }, 3000)
  }

  function handleClose() {
    isOpen = false
    dispatch('close')
  }
</script>

{#if correctAnswer && theirAnswer}
  <Modal {isOpen} on:close={handleClose}>
    Correct answer was: "{correctAnswer}"
    <br />
    <br />
    Your answer was: "{theirAnswer}"
    <br />
    <br />
    You got it: {correctAnswer === theirAnswer ? 'Right' : 'Wrong'}
  </Modal>
{/if}
