<script>
  import cs from 'classnames'

  let className = ''
  export { className as class }

  export let href = ''
  export let disabled = false
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {...$$props}
  on:click
  class={cs(
    'p-4 bg-cyan-400',
    !disabled && 'hover:bg-cyan-500 active:hover:bg-cyan-600',
    disabled && 'bg-gray-300 text-gray-600',
    'text-center rounded-full text-black',
    'min-w-[250px] max-w-full',
    className,
  )}
  {disabled}
>
  <slot />
</svelte:element>
