<script lang="ts">
import { onMount, } from 'svelte';
import { error } from '@sveltejs/kit';
import { afterNavigate, goto } from '$app/navigation';
import { page as svpage } from '$app/stores';
import { Title, Toolbar, Button, Paginator, Loading, AuthGuard, Toaster } from '$lib/ui';
import { comet, logger } from '$lib';
import { loading } from '$lib/stores';
import { formatNumber, formatAddress, formatDate, formatTime, notify } from '$lib/utils';
import type { ROrderListRow, RPaginated } from '$lib/types';


async function loadOrder()
{
    let query = $svpage.url.searchParams;
    const order_id = query.get('order_id');
    if(!order_id)  {
      alert('no order id');
      return;
    }
    $loading = true;
    try {
      const order = await comet.sales.orders.get(order_id);    
      console.log(order);
      $loading = false;
      return order
    }
    catch(error: any) {
        console.log('Notifying error')
        notify({
            heading: 'Error',
            message: error.message,
            type: 'error'
        });
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

<style>


</style>

<AuthGuard permissions="sales.order:create,update,read">

{#await loadOrder()}
  {#if $loading}
    <Loading></Loading>
  {/if}
{:then order}

<Title>Sales Orders</Title>
<Toolbar>
  
  <Button width="5em" icon="bi-plus-lg" size="sm" color="primary" on:click={()=> goto(`/app/finance/rules/edt`)} disabled>Add</Button>

  <Button onclick={() => {notify({
    heading: 'Info',
    message: 'This is a test toast',
    type: 'info'
  }); $loading = true;}}>
  Notify
</Button>

</Toolbar>

  

  <!--
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
        {#each list.items as order}
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
                <a onclick={() => comet.sales.orders.get(order.order_id)} href="#" aria-details="get order button">View</a>
                
                , Cancel

            </td>
        </tr>
        {/each}
    </tbody>
  </table>
  -->


<div class="d-flex justify-content-center mt-2">
  <!-- <Paginator page={list.page} page_count={list.page_count} page_size={list.page_size} on:pagechange={onPageChange} /> -->
</div>


{/await}



</AuthGuard>