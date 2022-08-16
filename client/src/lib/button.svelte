<script>
  import cs from 'classnames'

  let className = ''
  export { className as class }

  export let href = ''
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {...$$props}
  on:click
  class={cs(
    'p-4 bg-cyan-400 hover:bg-cyan-500 active:hover:bg-cyan-600 text-center rounded-full',
    'min-w-[250px] max-w-full',
    className,
  )}
>
  <slot />
</svelte:element>
