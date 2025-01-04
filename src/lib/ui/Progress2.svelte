<script lang="ts">
  import { onDestroy } from 'svelte';
  import { loading } from '$lib/stores.svelte';
  
  let progress = $state(0);
  let progressTimer = $state<any>(null);
  


  onDestroy(() => {
    if (progressTimer) clearInterval(progressTimer);
  });
</script>

{#if loading.loading}
 showing 
  <div class="progress-container" style="position: fixed; top: 0; left: 0; width: 100%; height: 4px; background: #f0f0f0; z-index: 1000;">
    <div 
      class="progress-bar" 
      style="height: 100%; background: #4CAF50; transition: width 0.3s ease-in-out; width: {progress}%"
    />
  </div>
{/if}

<style>
  .progress-container {
    overflow: hidden;
  }
  
  .progress-bar {
    transform-origin: left;
  }
</style>