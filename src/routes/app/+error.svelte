<script lang="ts">
	import { page } from '$app/stores';
</script>


	<div class="outer">
		<div class="alert alert-danger text-center" role="alert">
			<h1>{$page.error?.status}</h1>
			{$page.error?.message}
		</div>
	</div>

<style>
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: calc(100vh - 8em);
	}
</style>

