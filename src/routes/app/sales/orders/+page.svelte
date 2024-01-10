<script lang="ts">
import { onMount } from 'svelte';
import * as UI from '$lib/ui';
import { comet, logger } from '$lib';
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
        <th>Order #</th>
        <th>Customer</th>
        <th>Ship To</th>
        <th>Order Total</th>
      </tr>
    </thead>
    <tbody>
        {#if orders}
        {#each orders.items as order}
        <tr>
            <td data-label="Order #">{order.order_no}</td>
            <td data-label="Customer">{order.order_no}</td>
            <td data-label="Order #">{order.order_no}</td>
            <td data-label="Order Total">{order.total_wtax}</td>
        </tr>
        {/each}
        {/if}
      <!-- Add more rows as needed -->
    </tbody>
  </table>
</div>
