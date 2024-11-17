<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';

	interface Props {
		title?: string;
		open?: boolean;
		size?: 'lg' | 'sm' | 'xl' | '';
		children?: import('svelte').Snippet;
	}

	let { title = 'Title', open = $bindable(false), size = '', children }: Props = $props();

	let dialog: HTMLDivElement = $state();
	let modal: any = $state();

	onMount(() => {
		/* @ts-ignore */
		modal = new bootstrap.Modal(dialog);
	});

	const handleEscape = (e: KeyboardEvent) => {
		console.log('inside handleEscape');
		if (e.key === 'Escape') {
			open = false;
			//window.removeEventListener('keypress', handleEscape);
		}
	};

	run(() => {
		if (open) {
			window.addEventListener('keydown', handleEscape);
			modal?.show();
		} else {
			window.removeEventListener('keydown', handleEscape);
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
	class="modal fade"
	tabindex="-1"
	data-bs-backdrop="static"
>
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="dialog">{title}</h1>
				<button type="button" class="btn-close" aria-label="Close" onclick={() => (open = false)}
				></button>
			</div>
			{@render children?.()}
		</div>
	</div>
</div>
