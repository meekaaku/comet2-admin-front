<script lang="ts"> 
import { onMount } from "svelte";

export let title = 'Title';
export let open = false;
export let size: 'lg'|'sm'|'xl'| '' = '';

let dialog: HTMLDivElement;
let modal: any;

onMount(() => {
    /* @ts-ignore */
    modal = new bootstrap.Modal(dialog);
})


const handleEscape = (e: KeyboardEvent) => {
    console.log('inside handleEscape');
    if (e.key === 'Escape') {
        open = false;
        //window.removeEventListener('keypress', handleEscape);
    }
}

$: if (open) {
    window.addEventListener('keydown', handleEscape);
    modal?.show();
}
else {
    window.removeEventListener('keydown', handleEscape);
    modal?.hide();
}

</script>
<div 
  bind:this={dialog} 
  id="dialog" 
  class:modal-lg={size === 'lg'} 
  class:modal-sm={size === 'sm'} 
  class:modal-xl={size === 'xl'} 
  class="modal fade" tabindex="-1" data-bs-backdrop="static" >
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="dialog">{title}</h1>
        <button type="button" class="btn-close" aria-label="Close" on:click={()=> open = false}></button>
      </div>
        <slot></slot>
    </div>
  </div>
</div>

