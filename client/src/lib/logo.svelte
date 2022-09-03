<script lang="ts">
  export let size: 'small' | 'large' | undefined = 'large'

  let className = ''
  export { className as class }
</script>

<div
  class="
    flex justify-center items-center overflow-hidden rounded-full 
    bg-purp-400/60
    {size === 'large' && 'w-56 h-56'}
    {size === 'small' && 'w-24 h-24'}
    {className}
  "
>
  <img
    src="/logo.png"
    alt="Triviality"
    class="logo object-contain object-center opacity-60"
  />
</div>

<style>
  .logo {
    width: 60%;
    height: 60%;
  }
</style>
