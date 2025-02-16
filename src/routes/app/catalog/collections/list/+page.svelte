<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { loading } from '$lib/stores';
	import { Title, Toolbar, Button, AuthGuard, Paginator, Icon, Dialog, DialogBody, DialogFooter, FileUpload, Image } from '$lib/ui';
	import { comet } from '$lib';
	import { notify, formatDate, formatTime, formatNumber } from '$lib/utils';
	import type { PageData } from './$types';
	import type { RCollectionListRow, RPaginated } from '$lib/types';
	import { img_placeholder } from '$lib/constants';


	interface RCollectionListRowExtends extends RCollectionListRow
	{
		selected: boolean;
	}

	let { data }: { data: PageData } = $props();
	let somethingSelected: boolean = $state(false);
	let list = $state<RPaginated<RCollectionListRowExtends>>(data.list as RPaginated<RCollectionListRowExtends>);
	let search: string = $state('');

	$effect(() => {
		list = data.list as RPaginated<RCollectionListRowExtends>;
	});




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


	<Title>Collections</Title>

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
			<button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 8em;" disabled>
				<Icon icon="bi-plus" /> Import  
			</button>
			<ul class="dropdown-menu">
				<li><a class="dropdown-item" href="#">Product Variants</a></li>
				<li><a class="dropdown-item" href="#">Product Media</a></li>
			</ul>
		</div>
	
		<Button width="8em" size="sm" color="danger" icon="bi-trash" disabled={$loading || !somethingSelected} onclick={onDeleteClick} >Delete</Button>
	</Toolbar>



	<table class="ct-table table table-sm table-striped">
		<thead>
			<tr>
				<th style="width: 8%" class="text-center">Image</th>
				<th style="width: 20em;" class="text-center pointer" onclick={() => orderBy('name')}>Name</th>
				<th style="width: 20em;" class="text-center pointer" onclick={() => orderBy('slug')}>Slug</th>
				<th class="text-center pointer">Description</th>
				<th style="width: 3%" class="text-center">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each list.items as item }
				<tr>
					<td data-label="Image" class="text-center align-middle">
						<input type="checkbox" bind:checked={item.selected}  onchange={onSelectChange}/>
						&nbsp;
						<Image src={item.image_url} alt={item.name} style="width: 50px; height: 50px;" />
					</td>
					<td data-label="Name" class="text-left align-middle">{item.name.slice(0, 40)}</td>
					<td data-label="Slug" class="text-left align-middle">{item.slug}</td>
					<td data-label="Description" class="text-left align-middle">
						{item.description?.slice(0, 100)}
						{#if item.description?.length > 100}...{/if}
					</td>
					<td data-label="Action" class="text-center align-middle">
						<!-- <a href={`view?id=${product.id}`}>View</a> -->
						View
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


<style>
	.pointer {
		cursor: pointer;
	}
</style>