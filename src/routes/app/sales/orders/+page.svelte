<script lang="ts">
import { onMount } from 'svelte';
import * as UI from '$lib/ui';
import { comet, logger } from '$lib';
import { formatNumber, formatAddress, formatDate } from '$lib/utils';
import type { ROrderListRow, RPaginated } from '$lib/types';

let filters: any = null;
let orders: RPaginated<ROrderListRow>;


async function loadOrders()
{
    console.log('loadOrders()');
    orders = await comet.orders.list(filters);
    console.log('orders', orders);
    logger.info('Orders received ', orders)
}

onMount(async () => {
    await loadOrders();
});

</script>

<style>
/* Normal table styles */
.responsive-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.responsive-table th,
.responsive-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

/* Stacked table for small screens */
@media (max-width: 720px) {
  .responsive-table thead {
    display: none;
  }

  .responsive-table tbody,
  .responsive-table tr,
  .responsive-table td {
    display: block;
    width: 100%;
  }

  .responsive-table tr {
    margin-bottom: 15px;
    border: solid 1px grey
  }
  .responsive-table td {
    text-align: right; /* Adjust alignment for stacked layout */
    /* Add more styles as needed */
  }

  .responsive-table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
  }

  .responsive-table tbody td[data-label]:before {
    display: block;
    font-weight: bold;
  }
}

</style>

<UI.Title>Sales Orders</UI.Title>



<div class="table-wrapper">
  <table class="responsive-table">
    <thead>
      <tr>
        <th style="width: 5%" class="text-center">Order #</th>
        <th style="width: 10%" class="text-center">Date</th>
        <th style="width: 10%" class="text-center">Channel</th>
        <th  class="text-center">Ship To</th>
        <th style="width: 10%" class="text-center">Payment</th>
        <th style="width: 10%" class="text-center">Shipping</th>
        <th style="width: 10%" class="text-center">Total</th>
      </tr>
    </thead>
    <tbody>
        {#if orders}
        {#each orders.items as order}
        <tr>
            <td data-label="Order #" class="text-center">{order.order_no}</td>
            <td data-label="Date" class="text-center">{formatDate(order.date_created)}</td>
            <td data-label="Channel" class="text-center">{order.channel_name}</td>
            <td data-label="Ship To" class="text-center">{order.shipto_address}</td>
            <td data-label="Payment" class="text-center">{order.payment_method_code} - {order.payment_status_name}</td>
            <td data-label="Shipping" class="text-center">{order.shipping_method_code} - {order.shipping_status_name}</td>
            <td data-label="Total" class="text-end">{order.currency_code} {formatNumber(order.total_wtax)}</td>
        </tr>
        {/each}
        {/if}
      <!-- Add more rows as needed -->
    </tbody>
  </table>
</div>
