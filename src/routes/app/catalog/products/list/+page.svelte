<script lang="ts">
	import { navigating } from '$app/stores';
	import { loading } from '$lib/stores';
	import { Unauthorized, Title, Toolbar, Button, Toaster, AuthGuard } from '$lib/ui';
	import { comet } from '$lib';
	import { notify } from '$lib/utils';
	import type { PageData } from './$types';

	let importDropdownOpen: boolean = $state(false);
	let file: File | null = null;
	let uploadReady: boolean = $state(false);
	let { data }: { data: PageData } = $props();

	$effect(() => {
		console.log('data', data);
	});

	async function onUploadClick() {
		if (!file) return;

		const formData = new FormData();

		formData.append('file', file);

		$loading = true;
		try {
			$loading = true;
			const upload_response = await comet.catalog.products.uploadCSV(formData);
			$loading = false;
			importDropdownOpen = false;

			notify({ type: 'info', heading: 'Success', message: 'File uploaded successfully' });
		} catch (error: any) {
			$loading = false;
			importDropdownOpen = false;
			notify({
				type: 'error',
				heading: 'Error',
				message: error.response?.data?.message || 'An error occurred. Please try again later',
                data: error.response?.data.data
			});
		}
	}

	function onFileSelect(e: Event) {

		const input = e.target as HTMLInputElement;
		if (input.files) {
			uploadReady = true;
			file = input.files[0];
		}
	}

</script>


<AuthGuard permissions="sales.order:create,update,read">
	<Title>Products</Title>

	<Toolbar>
		<div class="dropdown d-inline-block ms-2">
			<Button
				width="8em"
				icon="bi-caret-down"
				size="sm"
				color="primary"
				disabled={$loading}
				on:click={() => (importDropdownOpen = !importDropdownOpen)}
			>
				Import
			</Button>

			{#if importDropdownOpen}
				<div
					class="dropdown-menu dropdown-menu-end p-3 show"
					style="min-width: 300px; right: 1em; z-index: 1000;"
				>
					<div class="mb-3">
						<label for="fileUpload" class="form-label">Choose file to upload</label>
						<input
							class="form-control form-control-sm"
							type="file"
							id="fileUpload"
							onchange={onFileSelect}
							accept=".csv"
						/>
					</div>
					<div class="d-grid">
						<Button
							size="sm"
							color="primary"
							on:click={onUploadClick}
							disabled={!uploadReady || $loading}
							busy={$loading}
							busytext="Uploading...">Upload</Button
						>
					</div>
				</div>
			{/if}
		</div>
	</Toolbar>

	<div style="height: 500px;">Product list goes here</div>
</AuthGuard>