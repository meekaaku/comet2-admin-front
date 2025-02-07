<script lang="ts">
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { run } from 'svelte/legacy';
	import { onMount } from 'svelte';

	interface Props {
		title?: string;
		open?: boolean;
		size?: 'lg' | 'sm' | 'xl' | '';
		children?: import('svelte').Snippet;
	}

	let { title = 'Title', open = $bindable(false), size = '', children }: Props = $props();

	let dialog: HTMLDivElement|undefined = $state();
	let modal: any = $state();

	onMount(() => {
		/* @ts-ignore */
		if(!window) return;
		if (open) modal.show();
	});

	const handleEscape = (e: KeyboardEvent) => {
		console.log('inside handleEscape');
		if (e.key === 'Escape') {
			open = false;
			//window.removeEventListener('keypress', handleEscape);
		}
	};

	run(() => {
		if(!browser) return;
		if (open) {
			window?.addEventListener('keydown', handleEscape);
			modal?.show();
		} else {
			window?.removeEventListener('keydown', handleEscape);
			modal?.hide();
		}
	});
</script>

<div
	bind:this={dialog}
	id="dialog"
	class:modal-lg={size === 'lg'}
	class:modal-sm={size === 'sm'}
	class:modal-xl={size === 'xl'}
	class="modal show"
	class:visible={open}
	tabindex="-1"
	transition:fade
	role="dialog"
	aria-modal="true"

>
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content shadow">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="dialog">{title}</h1>
				<button type="button" class="btn-close" aria-label="Close" onclick={() => (open = false)}
				></button>
			</div>
			{@render children?.()}
		</div>
	</div>
</div>


<style>
	.visible {
		display: block;
	}

	h1 {
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
		-webkit-text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
		-moz-text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
		-ms-text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
	}
</style>