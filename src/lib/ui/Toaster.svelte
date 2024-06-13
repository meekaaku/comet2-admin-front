<script lang="ts">
import { fade } from 'svelte/transition';
import { toasts } from '$lib/stores';



</script>


<div class="toast-container" style="bottom: 1em; right: 1em;">
    {#each $toasts as {heading, message}}
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" in:fade out:fade>
        <div class="toast-header">
          <!-- <img src="..." class="rounded me-2" alt="..."> -->
          <strong class="me-auto">{heading}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          {message}
        </div>
      </div>
  {/each}
</div>