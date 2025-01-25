<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { loading } from '$lib/stores';
	import { Title, Toolbar, Button, AuthGuard, Paginator } from '$lib/ui';
	import { comet } from '$lib';
	import { notify, formatDate, formatTime, formatNumber } from '$lib/utils';
	import type { PageData } from './$types';
	import type { RProductListRow, RPaginated } from '$lib/types';


	interface RProductListRowExtends extends RProductListRow
	{
		selected: boolean;
	}

	let importDropdownOpen: boolean = $state(false);
	let file: File | null = null;
	let uploadReady: boolean = $state(false);
	let { data }: { data: PageData } = $props();
	//let list: any = { items: [], page: 1, page_count: 1, page_size: 100 };
	let list = $state<RPaginated<RProductListRowExtends>>(data.list as RPaginated<RProductListRowExtends>);

	$effect(() => {
		console.log(data.list.items[0].sku)
		list = data.list as RPaginated<RProductListRowExtends>;
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

	function onPageChange(detail: any) {
		const _page = detail.page;
		const _page_size = detail.page_size || 100;
		$page.url.searchParams.set('page', _page.toString());
		$page.url.searchParams.set('page_size', _page_size.toString());
		goto(`${$page.url.toString()}`, { invalidateAll: true, replaceState: false });
	}

	async function onDeleteClick()
	{
		console.log(list.items.filter(item => item.selected));
	}

	let somethingSelected: boolean = $state(false);
	function onSelectChange(e: Event)
	{
		somethingSelected = false;
		list.items.forEach(item => {
			if(item.selected)
			{
				somethingSelected = true;
				return;
			}
		});
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

			<Button width="8em" size="sm" color="danger" icon="bi-trash" disabled={$loading || !somethingSelected} onclick={onDeleteClick} >Delete</Button>
		</div>
	</Toolbar>

	<table class="ct-table table table-sm table-striped">
		<thead>
			<tr>
				<th style="width: 5%" class="text-center">Select</th>
				<th style="width: 5%" class="text-center">SKU</th>
				<th style="width: 10%" class="text-center">Barcode</th>
				<th style="width: 10%" class="text-center">Name</th>
				<th style="width: 10%" class="text-center">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each list.items as product}
				<tr>
					<td data-label="Select" class="text-center"><input type="checkbox" bind:checked={product.selected}  onchange={onSelectChange}/></td>
					<td data-label="SKU" class="text-center">{product.sku}</td>
					<td data-label="Barcode" class="text-center">{product.barcode}</td>
					<td data-label="Name" class="text-center">{product.name}</td>
					<td data-label="Action" class="text-center">
						something
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="d-flex justify-content-center mt-2">
		<Paginator
			page={list.page}
			page_count={list.page_count}
			page_size={list.page_size}
			{onPageChange}
		/>
	</div>

</AuthGuard>