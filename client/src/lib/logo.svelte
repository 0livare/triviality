<script lang="ts">
  export let size: 'small' | 'large' | undefined = 'large'

  let className = ''
  export { className as class }
</script>

<div
  class="
    flex justify-center items-center overflow-hidden rounded-full 
    bg-purp-400/60
    {size === 'large' && 'w-64 h-64'}
    {size === 'small' && 'w-24 h-24'}
    {className}
  "
>
  <svg
    viewBox="0 0 404 404"
    fill="none"
    class="logo object-contain object-center opacity-60"
  >
    <g clip-path="url(#clip0_3_169)">
      <path d="M112.578 0H49V404.276H112.578V0Z" fill="white" />
      <path
        d="M49 -2.28882e-05L49 63.5205L354.524 63.5205V-2.28882e-05L49 -2.28882e-05Z"
        fill="white"
      />
      <path d="M49 340.755L49 404.276H354.524V340.755H49Z" fill="white" />
      <path
        d="M77.0401 353.894L129.393 389.937L354.53 63.5123L302.177 27.47L77.0401 353.894Z"
        fill="white"
      />
      <path
        d="M302.407 377.193L354.487 340.759L251.077 193.21L198.997 229.644L302.407 377.193Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_3_169">
        <rect width="404" height="404" fill="white" />
      </clipPath>
    </defs>
  </svg>
</div>

<style>
  .logo {
    width: 60%;
    height: 60%;
  }
</style>
