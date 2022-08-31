<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Modal from './modal.svelte'

  const dispatch = createEventDispatcher()

  export let correctAnswer: string | null | undefined
  export let theirAnswer: string | null | undefined

  $: isCorrect = correctAnswer === theirAnswer

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
    {#if isCorrect}
      Way to go! "{correctAnswer}" was the correct answer.
    {:else}
      Nope! It was "{correctAnswer}".
    {/if}
  </Modal>
{/if}
