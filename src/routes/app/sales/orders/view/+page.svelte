<script lang="ts">
	import { page as svpage } from '$app/stores';
	import { Title, Toolbar, Button, Paginator, Loading, AuthGuard, TabHead, Tab, TabBody, TabHeader, TabPane } from '$lib/ui';
	import { comet, logger } from '$lib';
	import { loading } from '$lib/stores';
	import { formatNumber, formatAddress, formatDate, formatTime, notify } from '$lib/utils';
	import type { ROrderListRow, RPaginated, ROrder } from '$lib/types';

	async function loadOrder(): Promise<any> {
		let query = $svpage.url.searchParams;
		const order_id = query.get('order_id');
		if (!order_id) {
			$loading = false;
			//notify({heading: 'Error', message: 'No order id', type: 'error'});
			return;
		}
		//$loading = true;
		try {
			const order = await comet.sales.orders.get(order_id);
			//$loading = false;
			return order;
		} catch (error: any) {
			$loading = false;
			notify({ heading: 'Error', message: error.message, type: 'error' });
		}
	}

	/*
afterNavigate(() => {
    if(justMounted) return;
    loadOrder();
});

onMount(() => {
    justMounted = true;
    loadOrder();
});
*/
</script>

<AuthGuard permissions="sales.order:create,update,read">
	{#await loadOrder()}
		{#if $loading}
			<Loading></Loading>
		{/if}
	{:then order: ROrder}
		<Title>Sales Order - {order.header.order_no}</Title>
		<Toolbar>
			<Button
				width="5em"
				icon="bi-plus-lg"
				size="sm"
				color="primary"
				disabled>Add</Button
			>

		</Toolbar>


		<Tab defaultTab="details">
			<TabHeader>
				<TabHead id="details" name="Details" icon="bi-card-list"></TabHead>
				<TabHead id="products" name="Products" icon="bi-cart"></TabHead>
	
			</TabHeader>

			<TabBody>
				<TabPane id="details">
					Detials tab
				</TabPane>
				<TabPane id="products">
					<table class="ct-table table table-sm table-striped">
						<thead>
						<tr>
							<th style="width: 5%" class="text-center">#</th>
							<th style="width: 10%" class="text-center">SKU</th>
							<th style="width: 60%" class="text-center">Name</th>
							<th style="width: 10%" class="text-center">Quantity</th>
							<th style="width: 10%" class="text-center">Base Price</th>
							<th style="width: 10%" class="text-center">Net Price</th>
						</tr>
						</thead>
						<tbody>
							{#each order.lines as line}
							<tr>
								<td data-label="#" class="text-center">{line.sort + 1}</td>
								<td data-label="SKU" class="text-left">{line.product_sku}</td>
								<td data-label="Name" class="text-left">{line.product_name}</td>
								<td data-label="Name" class="text-end">{formatNumber(line.quantity)} {line.unit}</td>

								<td data-label="Base Price" class="text-end">{formatNumber(line.base_price_notax)}</td>
								<td data-label="Net Price" class="text-end">{formatNumber(line.net_price_notax)}</td>
							</tr>
							{/each}
						</tbody>
					</table>

					<table class="ct-table table table-sm table-striped">
						<thead>
						<tr>
							<th style="width: 90%" class="text-center"></th>
							<th style="width: 10%" class="text-center"></th>
						</tr>
						</thead>
						<tbody>
							{#each order.summaries as line}
							<tr>
								<td data-label="Name" class="text-end">{line.name}</td>
								<td data-label="Amount" class="text-end">{line.value}</td>
							</tr>
							{/each}
						</tbody>
					</table>

				</TabPane>

			</TabBody>
		</Tab>



		



		<div class="d-flex justify-content-center mt-2">
			<!-- <Paginator page={list.page} page_count={list.page_count} page_size={list.page_size} on:pagechange={onPageChange} /> -->
		</div>
	{/await}
</AuthGuard>

<style>
</style>
