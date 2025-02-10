<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { loading } from '$lib/stores';
	import { Title, Toolbar, Button, AuthGuard, Paginator, Icon, Dialog, DialogBody, DialogFooter, FileUpload } from '$lib/ui';
	import { comet } from '$lib';
	import { notify, formatDate, formatTime, formatNumber } from '$lib/utils';
	import type { PageData } from './$types';
	import type { RProductListRow, RPaginated } from '$lib/types';


	interface RProductListRowExtends extends RProductListRow
	{
		selected: boolean;
	}

	let { data }: { data: PageData } = $props();
	let somethingSelected: boolean = $state(false);
	let showDialogImportVariants = $state(false);
	let showDialogImportMedia = $state(false);
	let importDropdownOpen: boolean = $state(false);
	let file: File | null = null;
	let uploadReady: boolean = $state(false);
	let list = $state<RPaginated<RProductListRowExtends>>(data.list as RPaginated<RProductListRowExtends>);
	let search: string = $state('');

	$effect(() => {
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

	async function onUploadMediaClick() {
		if (!file) return;

		const formData = new FormData();

		formData.append('file', file);

		$loading = true;
		try {
			$loading = true;
			const response = await comet.catalog.products.uploadMedia(formData);
			$loading = false;
			showDialogImportMedia = false;

			notify({ type: 'info', heading: 'Success', message: response.message, data: response.data });
		} catch (error: any) {
			$loading = false;
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

	function orderBy(column: string) {
		const current_order_by = $page.url.searchParams.get('order_by') || 'name';
		const current_order_dir = $page.url.searchParams.get('order_dir') || 'asc';

		let order_dir = 'asc';
		if(current_order_by === column) {
			order_dir = current_order_dir === 'asc' ? 'desc' : 'asc';
		}

		$page.url.searchParams.set('order_by', column);
		$page.url.searchParams.set('order_dir', order_dir);
		goto(`${$page.url.toString()}`, { invalidateAll: true, replaceState: false });
	}

	async function onDeleteClick()
	{
		alert('Not implemented yet')
	}

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

	async function onSearch(e: Event)
	{
		e.preventDefault();
		goto(`?search=${search}`, { invalidateAll: true, replaceState: false });
	}

</script>



<AuthGuard permissions="sales.order:create,update,read">

	<Dialog bind:open={showDialogImportVariants} size="lg" title="Import Product Variants">
		<DialogBody>
			<p>Import product variants from CSV file. Download template <a href="/downloads/catalog-import-variant-1.0.csv">here</a></p>
			<div class="mb-3">
				<input
					class="form-control form-control-sm"
					type="file"
					id="fileUpload"
					onchange={onFileSelect}
					accept=".csv"
				/>
			</div>

			

		</DialogBody>
		<DialogFooter>
			<div class="d-flex">
				<Button	size="sm" width="8em" color="primary" onclick={onUploadClick} disabled={!uploadReady || $loading} busy={$loading} busytext="Uploading...">Upload</Button>
				&nbsp;&nbsp;
				<Button	size="sm" width="8em" color="danger" onclick={() => {showDialogImportVariants = false}}>Cancel</Button>
			</div>
		</DialogFooter>
	</Dialog>

	<Dialog bind:open={showDialogImportMedia} size="lg" title="Import Product Media">
		<DialogBody>
			<p>You can import a zip file containing images/video of producs. Name the files as sku-0.png, sku-1.png etc. </p>
			<div class="mb-3">
				<input
					class="form-control form-control-sm"
					type="file"
					id="fileUpload"
					onchange={onFileSelect}
					accept=".zip"
				/>
			</div>


		</DialogBody>
		<DialogFooter>
			<div class="d-flex">
				<Button	size="sm" width="10em" color="primary" icon="bi-upload" onclick={onUploadMediaClick} disabled={!uploadReady || $loading} busy={$loading} busytext="Uploading...">Upload</Button>
				&nbsp;&nbsp;
				<Button	size="sm" width="10em" color="danger" icon="bi-x-lg" onclick={() => {showDialogImportMedia = false}}>Close</Button>
			</div>
		</DialogFooter>
	</Dialog>




	<Title>Products</Title>

	<Toolbar>
		
			<form style="width: 20rem;" onsubmit={onSearch}>
			<div  class="d-flex input-group">
				<input type="text" class="form-control form-control-sm" placeholder="Search" bind:value={search}  />
				{#if search && 1}
					<button type="button" class="btn btn-sm btn-outline-primary" onclick={(e) => {e.preventDefault(); search = ''; onSearch(e)}}><Icon icon="bi-x"  /></button>
				{/if}
				<button type="submit" class="btn btn-sm btn-outline-primary" onclick={onSearch}><Icon icon="bi-search" /></button>
			</div>
			</form>


		<div class="dropdown d-inline-block ms-2">
			<button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 8em;">
				<Icon icon="bi-plus" /> Import  
			</button>
			<ul class="dropdown-menu">
				<li><a class="dropdown-item" href="#" onclick={() => showDialogImportVariants = true}>Product Variants</a></li>
				<li><a class="dropdown-item" href="#" onclick={() => showDialogImportMedia = true}>Product Media</a></li>
			</ul>
		</div>
	
		<Button width="8em" size="sm" color="danger" icon="bi-trash" disabled={$loading || !somethingSelected} onclick={onDeleteClick} >Delete</Button>
	</Toolbar>



	<table class="ct-table table table-sm table-striped">
		<thead>
			<tr>
				<th style="width: 8%" class="text-center">Image</th>
				<th style="width: 2%" class="text-center pointer" onclick={() => orderBy('sku')}>SKU</th>
				<th style="width: 5%" class="text-center pointer" onclick={() => orderBy('barcode')}>Barcode</th>
				<th class="text-center pointer" onclick={() => orderBy('name')}>Name</th>
				<th style="width: 3%" class="text-center pointer" onclick={() => orderBy('status')}>Status</th>
				<th style="width: 3%" class="text-center">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each list.items as product}
				<tr>
					<td data-label="Image" class="text-center align-middle">
						<input type="checkbox" bind:checked={product.selected}  onchange={onSelectChange}/>
						&nbsp;
						<img src={product.image_url} alt={product.name} style="width: 50px; height: 50px;"/>
					</td>
					<td data-label="SKU" class="text-center align-middle">{product.sku}</td>
					<td data-label="Barcode" class="text-center align-middle">{product.barcode}</td>
					<td data-label="Name" class="text-left align-middle">{product.name.slice(0, 40)}</td>
					<td data-label="Name" class="text-center align-middle">{product.status}</td>
					<td data-label="Action" class="text-center align-middle">
						<a href={`view?id=${product.id}`}>View</a>
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

<style>
	.pointer {
		cursor: pointer;
	}
</style>