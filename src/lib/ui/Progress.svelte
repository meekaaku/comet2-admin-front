<script lang="ts">
  import { loader } from '$lib/stores.svelte';


</script>

{#if loader.loading}
  <div class="progress-container">
    <div 
      class="progress-bar text-primary" 
      style="height: 100%;  transition: width 0.3s ease-in-out; width: {loader.progress}%"
    ></div>
  </div>
{/if}

<style>
    .progress-container {
        overflow: hidden;
        position: fixed;
        top: 0px;
        height: 3px;
        padding: 0;
        margin: 0;
        width: 100%;
        z-index: 10000;
    }
  
    .progress-bar {
        transform-origin: left;
        background-color: rgb(13,110,253);
    }
</style>