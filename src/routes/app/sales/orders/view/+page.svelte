<script lang="ts">
	import { page as svpage } from '$app/stores';
	import { Icon, Title, Toolbar, Button, Paginator, Loading, AuthGuard, TabHead, Tab, TabBody, TabHeader, TabPane, FileUpload } from '$lib/ui';
	import { comet, logger } from '$lib';
	import { loading } from '$lib/stores';
	import { formatNumber, formatAddress, formatDate, formatTime, notify } from '$lib/utils';
	import type { ROrderListRow, RPaginated, ROrder } from '$lib/types';


	type TState = {
		editPaymentStatus: boolean,
		editShippingStatus: boolean,
		qPaymentStatus: string | null,
		qShippingStatus: string | null
	}
	let state = $state<TState>({
		editPaymentStatus: false,
		editShippingStatus: false,
		qPaymentStatus: null,
		qShippingStatus: null
	});


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
			state.qPaymentStatus = order.header.payment_status_name;
			state.qShippingStatus = order.header.shipping_status_name;
			//$loading = false;
			return order;
		} catch (error: any) {
			$loading = false;
			notify({ heading: 'Error', message: error.message, type: 'error' });
		}
	}

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

		{#snippet orderProperty( label: string, value: string)}
			<tr>
				<td data-label="Property" class="text-left fw-bold">{label}</td>
				<td data-label="Value" class="text-left">{value}</td>
			</tr>
		{/snippet}

		<Tab defaultTab="details">
			<TabHeader>
				<TabHead id="details" name="Details" icon="bi-card-list"></TabHead>
				<TabHead id="products" name="Products" icon="bi-cart"></TabHead>
	
			</TabHeader>

			<TabBody>
				<TabPane id="details">
					<table class="ct-table table table-sm table-striped">
						<thead>
						<tr>
							<th style="width: 10%" class="text-center"></th>
							<th style="width: 30%" class="text-center"></th>
						</tr>
						</thead>
						<tbody>

							{@render orderProperty('Order No', order.header.order_no)}
							{@render orderProperty('Channel', order.header.channel_name)}
							{@render orderProperty('Amount', `${order.header.currency_code} ${formatNumber(order.header.total_wtax)}`)}
							{@render orderProperty('Customer Name', `${order.header.customer_name}`)}
							{@render orderProperty('Customer Email', `${order.header.customer_email}`)}
							{@render orderProperty('Customer Phone', `${order.header.customer_phone}`)}
							<tr>
								<td data-label="" class="text-left fw-bold">Bill To</td>
								<td data-label="" class="text-left">{@html formatAddress(order.header.billto_address)}</td>
							</tr>
							<tr>
								<td data-label="" class="text-left fw-bold">Ship To</td>
								<td data-label="" class="text-left">{@html formatAddress(order.header.shipto_address)}</td>
							</tr>						

							{@render orderProperty('Payment Method', `${order.header.payment_method_name}`)}
							{@render orderProperty('Shipping Method', `${order.header.shipping_method_name}`)}
							<tr>
								<td data-label="" class="text-left fw-bold">Payment Status</td>
								<td data-label="" class="text-left">
									
									{#if !state.editPaymentStatus}
										<span class="me-2"
										class:text-success={order.header.payment_status_name === 'complete'}
										class:text-danger={order.header.payment_status_name !== 'complete'}
										>
										{order.header.payment_status_name}
										<Button icon="bi-pencil-square" size="sm" color="primary" outline onclick={() => {state.editPaymentStatus = true}}>Update</Button>
									</span>
									{:else}
									 	<div class="input-group" style="width: 20rem;">

										<select class="form-select form-select-sm" bind:value={state.qPaymentStatus} disabled={!state.editPaymentStatus}>
											<option value="pending">Pending</option>
											<option value="complete">Complete</option>
										</select>
										&nbsp;
										<Button icon="bi-pencil-square" size="sm" color="primary" outline onclick={() => {state.editPaymentStatus = false}}>Save</Button>
										&nbsp;
										<Button icon="bi-pencil-square" size="sm" color="danger" outline onclick={() => {state.editPaymentStatus = false}}>Cancel</Button>
										</div>
									{/if}

								</td>
							</tr>						
							<tr>
								<td data-label="" class="text-left fw-bold">Shipping Status</td>
								<td data-label="" class="text-left">{order.header.shipping_status_name}</td>
							</tr>						





<!-- 
  id: string;
  order_no: string;
  currency_code: string;
  date_created: string;
  billto_address: string;
  shipto_address: string;
  shipping_method_name: string;
  payment_method_name: string;
  shipping_status_name: string;
  payment_status_name: string;

  customer_id: string;
  customer_name: string;
  customer_phone: string;
  channel_id: string;
  channel_name: string;
  comment: string;
  username: string;
  total_wtax: string;
-->

						</tbody>
					</table>


				</TabPane>
				<TabPane id="products">
					<table class="ct-table table table-sm table-striped">
						<thead>
						<tr>
							<th style="width: 5%" class="text-center">#</th>
							<th style="width: 10%" class="text-center">SKU</th>
							<th style="width: 55%" class="text-center">Name</th>
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
								<td data-label="Amount" class="text-end">{formatNumber(line.value)}</td>
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
