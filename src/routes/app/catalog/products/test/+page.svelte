
<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount, tick } from 'svelte';

  let modalElement: HTMLDivElement;
  let open = $state(false);

</script>
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick={() => open = true}>
  Launch static backdrop modal
</button>

<!-- Modal -->
{#if open}
<div bind:this={modalElement}   class="modal fade show d-block modal-backdrop" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick={() => open = false}>Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
{/if}


<style>
  .modal-dialog{
    opacity: 1!important;
  }
</style>