<script lang="ts">
	import { Image, Title, Toolbar, Button, Paginator, Loading, AuthGuard, TabHead, Tab, TabBody, TabHeader, TabPane, FileUpload } from '$lib/ui';
	import { comet, logger } from '$lib';
	import { formatBytes, formatNumber, formatAddress, formatDate, formatTime, notify } from '$lib/utils';
	import type { ROrderListRow, RPaginated, ROrder, QOrderHeaderUpdate, QBulk, ROrderHeader, ROrderFile } from '$lib/types';
	import { loader } from '$lib/stores.svelte';
	import type { PageData } from './$types';

	type TPageState = {
		editPaymentStatus: boolean,
		editShippingStatus: boolean,
		qPaymentStatus: string | null,
		qShippingStatus: string | null,
		savingField: string | null,
		editingField: string | null,
		editingValue: string | null
	}

	let pageState:TPageState = $state<TPageState>({
		editPaymentStatus: false,
		editShippingStatus: false,
		qPaymentStatus: null,
		qShippingStatus: null,
		savingField: null,
		editingField: null,
		editingValue: null
	});

	let { data }: { data: PageData } = $props();
	let collection = $state<any>(data.collection);
	let search = $state('');
	let products = $state<any[]|null>([]);
	let activeTab = $state<string>('detail');
	let somethingSelected = $state<boolean>(false);


	/*
	async function onSaveStatus() {
		if(!order) return;
		if(!pageState.editingField) return;
		if(!pageState.editingValue) return;
		pageState.savingField = pageState.editingField;


		const spec: QBulk<QOrderHeaderUpdate> = { payload: [{order_id: order.header.id, field: pageState.editingField, value: pageState.editingValue}] };
		try {	
			loader.start();
			const res = await comet.sales.orders.updateHeader(spec);
			pageState.savingField = null;
			const message = res.message;
			order.header[pageState.editingField as keyof ROrderHeader] = pageState.editingValue;

			notify({ heading: 'Success', message: message, type: 'info' });
			pageState.editingField = null;
			loader.stop();
		} catch (error: any) {
			pageState.savingField = null;
			notify({ heading: 'Error', message: error.message, type: 'error' });
			loader.stop();
		}
	}
		*/


	async function onTabChange(id: string) {
		console.log('onTabChange', id);
		if(!collection) return;
		activeTab = id;
		if(id === 'product') {
			try {
				loader.start();
				products = await comet.catalog.collections(collection.id).listProducts();
				loader.stop();
			} catch (error: any) {
				loader.stop();
				notify({ heading: 'Error', message: error.message, type: 'error' });
			}
		}
	}

	function onSelectChange(e: Event)
	{
		somethingSelected = false;
		if(!products) return;
		products.forEach(item => {
			if(item.selected)
			{
				somethingSelected = true;
				return;
			}
		});
	}



</script>

		<Title>Collection - {collection.name}</Title>
		<Toolbar>
			{#if activeTab === 'detail'}
				<Button width="6em" icon="bi-plus-lg" size="sm" color="primary" tooltip="Cancel Order">Cancel</Button>
				<Button width="6em" icon="bi-plus-lg" size="sm" color="primary">Edit</Button>
			{:else if activeTab === 'product'}
				Product related buttons
			{:else if activeTab === 'invoice'}	
				Invoice related buttons
			{:else if activeTab === 'payment'}	
				Payment related buttons
			{:else if activeTab === 'shipment'}	
				Shipment related buttons
			{:else if activeTab === 'document'}	
				<Button width="5em" icon="bi-plus-lg" size="sm" color="primary">Add</Button>
			{/if}

		</Toolbar>

		{#snippet orderProperty( label: string, value: string)}
			<tr>
				<td data-label="Property" class="text-left fw-bold">{label}</td>
				<td data-label="Value" class="text-left">{value}</td>
			</tr>
		{/snippet}

		<Tab {activeTab} {onTabChange}>
			<TabHeader>
				<TabHead id="detail" name="Details" icon="bi-card-list"></TabHead>
				<TabHead id="product" name="Products" icon="bi-cart"></TabHead>
	
			</TabHeader>

			<TabBody>
				<TabPane id="detail">
					<table class="ct-table table table-sm table-striped">
						<thead>
						<tr>
							<th style="width: 10%" class="text-center"></th>
							<th style="width: 30%" class="text-center"></th>
						</tr>
						</thead>
						<tbody>

							{@render orderProperty('Name', collection.name)}
							{@render orderProperty('slug', collection.slug)}
							{@render orderProperty('description', collection.description)}

							<!-- 
							<tr>
								<td data-label="" class="text-left fw-bold">Payment Status</td>
								<td data-label="" class="text-left">
									
									{#if pageState.editingField !== 'payment_status_name'}
										<span class="me-2"
										class:text-success={order.header.payment_status_name === 'complete'}
										class:text-danger={order.header.payment_status_name !== 'complete'}
										>
										{order.header.payment_status_name}
										<Button icon="bi-pencil-square" size="sm" color="primary" outline onclick={() => {pageState.editingField = 'payment_status_name'; pageState.editingValue = order?.header.payment_status_name}}>Edit</Button>
									</span>
									{:else}
									 	<div class="input-group" style="width: 20rem;">

										<select class="form-select form-select-sm" bind:value={pageState.editingValue}>
											<option value="pending">Pending</option>
											<option value="complete">Complete</option>
											<option value="invalid">Invalid</option>
										</select>
										&nbsp;
										<Button icon="bi-pencil-square" size="sm" color="primary" outline onclick={onSaveStatus} busy={pageState.savingField === 'payment_status_name'} busytext="Saving">Save</Button>
										&nbsp;
										<Button icon="bi-pencil-square" size="sm" color="danger" outline onclick={() => {pageState.editingField = null}}>Cancel</Button>
										</div>
									{/if}

								</td>
							</tr>						
							<tr>
								<td data-label="" class="text-left fw-bold">Shipping Status</td>
								<td data-label="" class="text-left">
									{#if pageState.editingField !== 'shipping_status_name'}
										<span class="me-2"
										class:text-success={order.header.shipping_status_name === 'complete'}
										class:text-danger={order.header.shipping_status_name !== 'complete'}
										>
										{order.header.shipping_status_name}
										<Button icon="bi-pencil-square" size="sm" color="primary" outline onclick={() => {pageState.editingField = 'shipping_status_name'; pageState.editingValue = order.header.shipping_status_name}}>Edit</Button>
									</span>
									{:else}
									 	<div class="input-group" style="width: 20rem;">

										<select class="form-select form-select-sm" bind:value={pageState.editingValue}>
											<option value="pending">Pending</option>
											<option value="ready">Ready</option>
											<option value="shipped">Shipped</option>
											<option value="cancelled">Cancelled</option>
											<option value="complete">Complete</option>
											<option value="invalid">Invalid</option>
										</select>
										&nbsp;
										<Button icon="bi-pencil-square" size="sm" color="primary" outline onclick={onSaveStatus} busy={pageState.savingField === 'shipping_status_name'} busytext="Saving">Save</Button>
										&nbsp;
										<Button icon="bi-pencil-square" size="sm" color="danger" outline onclick={() => {pageState.editingField = null}}>Cancel</Button>
										</div>
									{/if}


								</td>
							</tr>						
							-->
						</tbody>
					</table>


				</TabPane>
				

				<TabPane id="product">
					{#if products}
						<table class="ct-table table table-sm table-striped">
							<thead>
								<tr>
									<th style="width: 10%" class="text-center">Image</th>
									<th style="width: 10%" class="text-left">SKU</th>
									<th class="text-left">Name</th>
									<th style="width: 10%" class="text-center">Action</th>
								</tr>
							</thead>				 

							<tbody>
								{#each products as product, i}
								<tr>
									<td data-label="Image" class="text-center align-middle">
										<input type="checkbox" bind:checked={product.selected}  onchange={onSelectChange}/>
										&nbsp;
										<Image src={product.image_url} alt={product.name} style="width: 50px; height: 50px;" />
									</td>
									<td data-label="SKU" class="text-left">{product.sku}</td>
									<td data-label="Name" class="text-left"><a href={`/app/products/${product.slug}`} >{product.name}</a></td>
									<td data-label="Action" class="text-left">Remove</td>
								</tr>
								{/each}
							</tbody>
						</table>

					{:else}
						<Loading message="Retrieving documents..."></Loading>
					{/if}
				</TabPane>
			</TabBody>
		</Tab>


		


		<div class="d-flex justify-content-center mt-2">
			<!-- <Paginator page={list.page} page_count={list.page_count} page_size={list.page_size} on:pagechange={onPageChange} /> -->
		</div>

<style>
</style>
