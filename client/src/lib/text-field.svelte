<script lang="ts">
  import type { AutoCompleteValues } from './types'

  export let value: string | null | undefined
  export let name: string | undefined
  export let label: string
  export let required: boolean | undefined = false
  export let autocomplete: AutoCompleteValues | undefined = undefined

  let className = ''
  export { className as class }
</script>

<label class="flex flex-col gap-2 py-2">
  <span class="text-white">
    {label}
  </span>
  <input
    type="text"
    class="
      p-4
      opacity-50 hover:opacity-60 focus:opacity-80
      {className}
    "
    on:change
    on:blur
    {name}
    {required}
    {autocomplete}
    bind:value
  />
</label>
