<script lang="ts">
	import { assertPermission } from '$lib/auth';
	interface Props {
		children?: import('svelte').Snippet;
		permissions?: string[] | string;
	}

	let { children, permissions }: Props = $props();
	let error: string | null = $state(null);

	try {
		if (permissions) {
			assertPermission(permissions);
		}
	} catch (e: any) {
		console.log({ e });
		error = e.message || 'You do not have access to this page';
	}
</script>

{#if error}
	<div class="outer">
		<div class="alert alert-danger" role="alert">
			{error}
		</div>
	</div>
{:else}
	{@render children?.()}
{/if}

<style>
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: calc(100vh - 8em);
	}
</style>
