<script lang="ts">
    interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>
<div class="tab-content" id="id-tab-content">
	{@render children?.()}
</div>
