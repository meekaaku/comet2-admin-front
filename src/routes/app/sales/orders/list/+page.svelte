<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { afterNavigate, goto } from '$app/navigation';
	import { page as svpage } from '$app/stores';
	import { Title, Toolbar, Button, Paginator, Loading } from '$lib/ui';
	import { comet, logger } from '$lib';
	import { formatNumber, formatAddress, formatDate, formatTime } from '$lib/utils';
	import type { ROrderListRow, RPaginated } from '$lib/types';
	import { loader } from '$lib/stores.svelte';

	let list: RPaginated<ROrderListRow> | undefined = $state(undefined);
	let justMounted = false;

	export async function load() {
		console.log('load');
	}

	function onPageChange({ detail }: { detail: { page: number; page_size?: number } }) {
		justMounted = false;
		const _page = detail.page;
		const _page_size = detail.page_size || 100;
		console.log(detail);
		$svpage.url.searchParams.set('page', _page.toString());
		$svpage.url.searchParams.set('page_size', _page_size.toString());
		goto(`?${$svpage.url.searchParams.toString()}`);
	}

	async function loadList() {
		let query = $svpage.url.searchParams;
		const page = parseInt(query.get('page') || '1');
		const page_size = parseInt(query.get('page_size') || '2');
		const sort = query.get('sort') || '';
		const filters = query.get('filters') || '';
		//startLoading();
		loader.start();
		try {
			const _list = await comet.sales.orders.list({ page, page_size, sort, filters });
			list = processList(_list);
			loader.stop();
		} catch (error) {
			logger.error(`Error $loading orders: `, error);
			loader.stop();
		}
		return list;
	}

	function processList(_list: RPaginated<ROrderListRow>) {
		_list.items.forEach((order) => {
			const lines = order.shipto_address.split('\n');
			if (!order.data) {
				order.data = {};
			}
			order.data.shipto_lines = lines;
		});
		return _list;
	}

	afterNavigate(() => {
		if (justMounted) return;
		loadList();
	});

	onMount(() => {
		justMounted = true;
		loadList();
	});
</script>

<Title>Sales Orders</Title>
<Toolbar>
	<Button
		width="5em"
		icon="bi-plus-lg"
		size="sm"
		color="primary"
		on:click={() => goto(`/app/finance/rules/edt`)}
		disabled>Add</Button
	>
</Toolbar>

{#if !list}
	<Loading></Loading>
{:else}
	<table class="ct-table table table-sm table-striped">
		<thead>
			<tr>
				<th style="width: 5%" class="text-center">Order #</th>
				<th style="width: 10%" class="text-center">Date</th>
				<th style="width: 10%" class="text-center">Channel</th>
				<th style="width: 10%" class="text-center">Customer</th>
				<th class="text-center">Ship To</th>
				<th style="width: 15%" class="text-center">Payment</th>
				<th style="width: 15%" class="text-center">Shipping</th>
				<th style="width: 10%" class="text-center">Total</th>
				<th style="width: 10%" class="text-center">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each list.items as order}
				<tr>
					<td data-label="Order #" class="text-center">{order.order_no}</td>
					<td data-label="Date" class="text-center"
						>{formatDate(order.date_created)} {formatTime(order.date_created)}</td
					>
					<td data-label="Channel" class="text-center">{order.channel_name}</td>
					<td data-label="Customer" class="text-center">{order.customer_name}</td>
					<td data-label="Ship To" class="text-center">
						{order.data.shipto_lines[0]},
						{order.data.shipto_lines[4]}
					</td>
					<td data-label="Payment" class="text-end"
						>{order.payment_method_name} -
						<span
							class:bg-warning={order.payment_status_name === 'pending'}
							class:text-white={order.payment_status_name === 'complete'}
							class:bg-success={order.payment_status_name === 'complete'}
							class="px-3"
						>
							{order.payment_status_name}
						</span>
					</td>
					<td data-label="Shipping" class="text-end"
						>{order.shipping_method_name} - {order.shipping_status_name}</td
					>
					<td data-label="Total" class="text-end"
						>{order.currency_code} {formatNumber(order.total_wtax)}</td
					>
					<td data-label="Action" class="text-center">
						<a
							href="{base}/app/sales/orders/view?order_id={order.order_id}"
							aria-details="get order button">View</a
						>
					</td></tr
				>
			{/each}
			<!-- Add more rows as needed -->
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
{/if}

<style>
</style>
