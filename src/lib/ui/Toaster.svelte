<script lang="ts">
	import { fade } from 'svelte/transition';
	import { toasts } from '$lib/stores';
	import { Icon, Dialog, DialogBody } from '$lib/ui';

	//let list = $derived($toasts);
  let open = $state(false);
  let data = $state(null);
  let message = $state('');


  function onShowDetails(m: string, d: any) {
    data = d;
	message = m;
    open = true;
  }
</script>

<div class="toast-container" style="bottom: 1em; right: 1em;">
	{#each $toasts as { type, heading, message, data }}
		<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" in:fade out:fade>
			<div
				class="toast-header text-white"
				class:bg-danger={type === 'error'}
				class:bg-primary={type === 'info'}
			>
				{#if type === 'info'}
					<Icon icon="bi-check-circle" />
				{:else if type === 'error'}
					<Icon icon="bi-exclamation-triangle" />
				{/if}
				<!-- <img src="..." class="rounded me-2" alt="..."> -->
				&nbsp; &nbsp; <strong class="me-auto">{heading}</strong>
				<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>
			<div class="toast-body">
				{message}
				{#if data}
					<br />
					<a href="#" onclick={() => onShowDetails(message, data) }>See detail</a>
				{/if}
			</div>
		</div>

	{/each}
</div>

<Dialog size="lg" title={message} bind:open>
    <DialogBody>
      <pre>{JSON.stringify(data ? data : {}, null, 2)}</pre>
    </DialogBody>
</Dialog>



<style>
</style>
