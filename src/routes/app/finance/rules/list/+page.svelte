<script lang="ts">
import { onMount, afterUpdate } from 'svelte';
import { afterNavigate, goto } from '$app/navigation';
import { page as svpage } from '$app/stores';
import * as UI from '$lib/ui';
import { comet, logger } from '$lib';
import { loading } from '$lib/stores';
import { formatNumber, formatAddress, formatDate, formatTime } from '$lib/utils';
import type { ROrderListRow, RPaginated } from '$lib/types';

let order_list: RPaginated<ROrderListRow>|undefined = undefined;
let page = 1;
let page_size = 5;
let sort: string|undefined = undefined;
let filters: any = undefined;

  

function onPageChange(_page: number)
{
    $svpage.url.searchParams.set('page', _page.toString());
    goto(`?${$svpage.url.searchParams.toString()}`);
}

async function loadRules()
{
    let query = new URLSearchParams($svpage.url.searchParams.toString());
    page = parseInt(query.get('page') || '1');
    $loading = true;
    try {
      const list = await comet.finance.rules.list({page, page_size, sort, filters});    
      order_list = processList(list);
      $loading = false
    }
    catch(error) {
        logger.error(`Error loading orders: `, error)
        $loading = false
    }
    return order_list;
}

function processList(list: RPaginated<ROrderListRow>)
{
    list.items.forEach(order => {
        const lines = order.shipto_address.split('\n');
        if(!order.data)  {
          order.data = {}
        }
        order.data.shipto_lines = lines;
    })
    return list;
}
/*
afterNavigate(async () => {
    console.log('running afternavigate')
    await loadOrders();
})
*/

onMount(async () => {
  await loadRules();
  afterNavigate(async () => {
    console.log('running afternavigate')
    await loadRules();
  })
});

</script>

<style>


</style>

<UI.Title>Sales Orders</UI.Title>

<div class="sticky-top">Toolar</div>

{#if $loading|| !order_list}
    Loading orders
{:else}

  <table class="ct-table table table-sm table-striped">
    <thead>
      <tr>
        <th style="width: 5%" class="text-center">Order #</th>
        <th style="width: 10%" class="text-center">Date</th>
        <th style="width: 10%" class="text-center">Channel</th>
        <th style="width: 10%" class="text-center">Customer</th>
        <th  class="text-center">Ship To</th>
        <th style="width: 15%" class="text-center">Payment</th>
        <th style="width: 15%" class="text-center">Shipping</th>
        <th style="width: 10%" class="text-center">Total</th>
        <th style="width: 10%" class="text-center">Action</th>
      </tr>
    </thead>
    <tbody>
        {#if order_list}
        {#each order_list.items as order}
        <tr>
            <td data-label="Order #" class="text-center">{order.order_no}</td>
            <td data-label="Date" class="text-center">{formatDate(order.date_created)} {formatTime(order.date_created)}</td>
            <td data-label="Channel" class="text-center">{order.channel_name}</td>
            <td data-label="Customer" class="text-center">{order.customer_name}</td>
            <td data-label="Ship To" class="text-center">
              {order.data.shipto_lines[0]},
              {order.data.shipto_lines[4]}
            </td>
            <td data-label="Payment" class="text-end">{order.payment_method_name} - 
              <span class:bg-warning={order.payment_status_name === 'pending'}
                    class:text-white={order.payment_status_name === 'complete'}
                    class:bg-success={order.payment_status_name === 'complete'}
                    class="px-3"
                    
              >    
              {order.payment_status_name}
              </span>
            
            </td>
            <td data-label="Shipping" class="text-end">{order.shipping_method_name} - {order.shipping_status_name}</td>
            <td data-label="Total" class="text-end">{order.currency_code} {formatNumber(order.total_wtax)}</td>
            <td data-label="Action" class="text-center">
                <a on:click={comet.orders.get(order.order_id)}>View</a>
                
                , Ccanel

            </td>
        </tr>
        {/each}
        {/if}
      <!-- Add more rows as needed -->
    </tbody>
  </table>
<div class="d-flex justify-content-center mt-2">
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" class:disabled={page === 1} on:click={()=> onPageChange(page-1)}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {#each Array(order_list.page_count) as _, page0}
    <li class="page-item" class:active = {page0 + 1 === order_list.page}>
        <a class="page-link" href="#" on:click={()=> onPageChange(page0+1)}>{page0+1}</a>
    </li>
    {/each}
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" class:disabled={page === order_list.page_count} on:click={()=> onPageChange(page+1)}>
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</div>

{/if}


