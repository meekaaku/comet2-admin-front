<script lang="ts">
	import { setContext, getContext } from 'svelte';
	import { page as svpage } from '$app/stores';
	import { Icon, Title, Toolbar, Button, Paginator, Loading, AuthGuard, TabHead, Tab, TabBody, TabHeader, TabPane, FileUpload } from '$lib/ui';
	import { comet, logger } from '$lib';
	import { loading } from '$lib/stores';
	import { formatNumber, formatAddress, formatDate, formatTime, notify } from '$lib/utils';
	import type { ROrderListRow, RPaginated, ROrder, QOrderHeaderUpdate, QBulk, ROrderHeader } from '$lib/types';


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

	let order: ROrder;

	async function loadOrder(): Promise<any> {
		try {
			let query = $svpage.url.searchParams;
			const order_id = query.get('order_id');
			if (!order_id) {
				throw new Error('No order id');
			}
			order = await comet.sales.orders.get(order_id);
			pageState.qPaymentStatus = order.header.payment_status_name;
			pageState.qShippingStatus = order.header.shipping_status_name;
			//$loading = false;
			return order;
		} catch (error: any) {
			$loading = false;
			notify({ heading: 'Error', message: error.message, type: 'error' });
		}
	}



	async function onSaveStatus() {
		if(!pageState.editingField) return;
		if(!pageState.editingValue) return;
		pageState.savingField = pageState.editingField;


		const spec: QBulk<QOrderHeaderUpdate> = { payload: [{order_id: order.header.id, field: pageState.editingField, value: pageState.editingValue}] };
		try {	
			const res = await comet.sales.orders.updateHeader(spec);
			pageState.savingField = null;
			$loading = true;
			const message = res.message;
			order.header[pageState.editingField as keyof ROrderHeader] = pageState.editingValue;
			notify({ heading: 'Success', message: message, type: 'info' });
			pageState.editingField = null;
			$loading = false;
		} catch (error: any) {
			pageState.savingField = null;
			notify({ heading: 'Error', message: error.response.data.message, type: 'error' });
			$loading = false;
		}
	}

	let tab = $state({id: 'detail'});

	setContext<any>('tab', tab);


</script>
Page Tab: {tab.id}
<AuthGuard permissions="sales.order:create,update,read">
	{#await loadOrder()}
			<Loading message="Retrieving order details..."></Loading>
	{:then}
	 	{#if order}
		<Title>Sales Order - {order.header.order_no}</Title>
		<Toolbar>
			<Button width="5em" icon="bi-plus-lg" size="sm" color="primary" disabled>Add</Button>

		</Toolbar>

		{#snippet orderProperty( label: string, value: string)}
			<tr>
				<td data-label="Property" class="text-left fw-bold">{label}</td>
				<td data-label="Value" class="text-left">{value}</td>
			</tr>
		{/snippet}

		<Tab defaultTab={tab.id}>
			<TabHeader>
				<TabHead id="detail" name="Details" icon="bi-card-list"></TabHead>
				<TabHead id="product" name="Products" icon="bi-cart"></TabHead>
				<TabHead id="invoice" name="Invoices" icon="bi-receipt"></TabHead>
				<TabHead id="payment" name="Payments" icon="bi-cash"></TabHead>
				<TabHead id="shipment" name="Shipments" icon="bi-truck"></TabHead>
				<TabHead id="document" name="Documents" icon="bi-file-text"></TabHead>
	
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

							{@render orderProperty('Order No', order.header.order_no)}
							{@render orderProperty('Channel', order.header.channel_name)}
							{@render orderProperty('Amount', `${order.header.currency_code} ${formatNumber(order.header.total_wtax)}`)}
							{@render orderProperty('Customer Name', `${order.header.customer_name}`)}
							{@render orderProperty('Customer Email', `${order.header.customer_email || '(not provided)'}`)}
							{@render orderProperty('Customer Phone', `${order.header.customer_phone || '(not provided)'}`)}
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
									
									{#if pageState.editingField !== 'payment_status_name'}
										<span class="me-2"
										class:text-success={order.header.payment_status_name === 'complete'}
										class:text-danger={order.header.payment_status_name !== 'complete'}
										>
										{order.header.payment_status_name}
										<Button icon="bi-pencil-square" size="sm" color="primary" outline onclick={() => {pageState.editingField = 'payment_status_name'; pageState.editingValue = order.header.payment_status_name}}>Edit</Button>
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

						</tbody>
					</table>


				</TabPane>
				<TabPane id="product">
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

				<TabPane id="invoice">Invoices</TabPane>
				<TabPane id="payment">Payments</TabPane>
				<TabPane id="shipment">Shipments</TabPane>
			</TabBody>
		</Tab>


		


		<div class="d-flex justify-content-center mt-2">
			<!-- <Paginator page={list.page} page_count={list.page_count} page_size={list.page_size} on:pagechange={onPageChange} /> -->
		</div>
		{/if}
	{/await}
</AuthGuard>

<style>
</style>
