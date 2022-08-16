<script>
  import cs from 'classnames'
  import '~/app.css'
  import '~/reset.css'
  import DustMotes from '~/lib/dust-motes.svelte'
</script>

<div
  class={cs(
    'relative min-h-full flex flex-col justify-center',
    'bg-gradient-to-bl from-purp-900 to-purp-700',
  )}
>
  <div class="mx-auto min-h-full flex flex-col justify-center items-center max-w-md">
    <DustMotes count={4} />
    <slot />
  </div>
</div>
