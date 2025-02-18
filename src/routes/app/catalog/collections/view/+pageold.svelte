<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { loading } from '$lib/stores';
	import { Title, Toolbar, Button, AuthGuard, Paginator, Icon, Dialog, DialogBody, DialogFooter, FileUpload, Image } from '$lib/ui';
	import { comet } from '$lib';
	import { notify, formatDate, formatTime, formatNumber } from '$lib/utils';
	import type { PageData } from './$types';


	let { data }: { data: PageData } = $props();
	let collection = $state<any>(data.collection);
	let search = $state('');

	$effect(() => {
		//list = data.list as RPaginated<RCollectionListRowExtends>;
	});


	async function onDeleteClick()
	{
		alert('Not implemented yet')
	}


	async function onSearch(e: Event)
	{
		e.preventDefault();
		goto(`?search=${search}`, { invalidateAll: true, replaceState: false });
	}

</script>


	<Title>Collections / {collection.name}</Title>

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
	
		<Button width="8em" size="sm" color="danger" icon="bi-trash" disabled={$loading} onclick={onDeleteClick} >Delete</Button>
	</Toolbar>



<style>
	.pointer {
		cursor: pointer;
	}
</style>