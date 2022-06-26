<script>
  import cs from 'classnames'

  let className = ''
  export { className as class }
</script>

<button
  {...$$props}
  on:click
  class={cs(
    'p-4 border border-purple-500 mt-4 hover:bg-purple-200 hover:dark:bg-purple-900',
    className,
  )}
>
  <slot />
</button>
