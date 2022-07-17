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
    'p-4 border border-purple-500 mt-4 hover:bg-purple-200 hover:dark:bg-purple-900 text-center',
    'min-w-[250px] max-w-full',
    className,
  )}
>
  <slot />
</svelte:element>
