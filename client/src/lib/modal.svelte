<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
  } from '@rgossiaux/svelte-headlessui'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let isOpen = false
  export let title: string | null = null

  function close() {
    dispatch('close')
  }
</script>

<Dialog
  open={isOpen}
  on:close={close}
  class="fixed inset-0 z-10 overflow-y-auto"
>
  <div
    class="min-h-screen px-4 text-center flex flex-col justify-center items-center"
  >
    <DialogOverlay
      class="fixed top-0 left-0 w-screen h-screen bg-black opacity-70"
      on:click={close}
    />
    <div
      class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left relative transition-all transform bg-white shadow-xl rounded-2xl"
    >
      <button
        class="w-6 h-6 rounded-full hover:bg-gray-100 absolute top-4 right-4 flex items-center justify-center text-center outline-none text-sm"
        on:click={close}
      >
        x
      </button>
      {#if title}
        <DialogTitle class="text-lg font-medium leading-6 text-gray-900 mb-4">
          {title}
        </DialogTitle>
      {/if}
      <slot />
    </div>
  </div>
</Dialog>
