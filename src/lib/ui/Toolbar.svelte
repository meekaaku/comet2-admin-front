<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="sticky-top shadow" style="z-index: 90">
	{@render children?.()}
</div>

<style>
	.sticky-top {
		background-color: white;
		padding: 0.5em;
		margin-bottom: 1em;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		row-gap: 5px;
		column-gap: 5px;
		top: -0.8em;
	}
</style>
