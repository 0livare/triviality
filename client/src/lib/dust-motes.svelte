<script lang="ts">
  import DustMote from './dust-mote.svelte'

  export let count = 3

  const arr = Array.from({ length: count }).fill(null)
</script>

<div class="isolate">
  {#each arr as item, index}
    <DustMote {count} {index} />
  {/each}
</div>
