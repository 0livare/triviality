<script>
  import '~/app.css'
  import '~/reset.css'
</script>

<div class="dark:bg-gray-800 dark:text-white min-h-full flex flex-col justify-center">
  <div class="mx-auto min-h-full flex flex-col justify-center items-center max-w-md">
    <slot />
  </div>
</div>
