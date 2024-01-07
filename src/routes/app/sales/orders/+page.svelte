<script lang="ts">
import { onMount } from 'svelte';
import * as UI from '$lib/ui';
import { comet, logger } from '$lib';

let filters: any = null;
let orders = [];


async function loadOrders()
{
    console.log('loadOrders()');
    const orders = await comet.orders.list(filters);
    logger.info('Orders received ', orders)
}

onMount(async () => {
    await loadOrders();
});

</script>

<UI.Title>Sales Orders</UI.Title>