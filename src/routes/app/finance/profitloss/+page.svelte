<script lang="ts">
import { goto, afterNavigate} from '$app/navigation';
import { onMount } from 'svelte';
import { page as svpage } from '$app/stores';
import { loading } from '$lib/stores';
import { comet } from '$lib';
import {logger} from '$lib';
import { Title, Toolbar, Button } from '$lib/ui';

let justMounted = false;
let report: any = undefined;

async function load()
{
    let query = $svpage.url.searchParams;
    const date_from = query.get('date_from') || new Date().getFullYear() + '-01-01';
    const date_to = query.get('date_to') || new Date().getFullYear() + '-12-31'; 
    const group_by = query.get('group_by') || 'month';
    const spec = { date_from, date_to, group_by };
    $loading = true;
    try {
      const _report = await comet.finance.reports.profitloss(spec);    
      report = processReport(_report);
      $loading = false;
    }
    catch(error) {
        logger.error(`Error loading orders: `, error)
        $loading = false;
    }
    return report;
}

function processReport(rep: any)
{
    return rep;
}

afterNavigate(() => {
    if(justMounted) return;
    load();
});

onMount(() => {
    justMounted = true;
    load();
});
</script>


<Title>Profit & Loss</Title>
<Toolbar>
  
    <div class="input-group input-group-sm" style="width: 15em;">
        <span class="input-group-text" id="basic-addon1">From</span>
        <input type="date" class="form-control" placeholder="From" aria-label="From date" aria-describedby="From date">
    </div>
    <div class="input-group input-group-sm" style="width: 15em;">
        <span class="input-group-text" id="basic-addon1">To</span>
        <input type="date" class="form-control" placeholder="To" aria-label="To date" aria-describedby="From date">
    </div>
    <Button width="10em" icon="bi-arrow-clockwise" size="sm" color="primary" on:click={()=> goto(`/app/finance/rules/edt`)}>Update</Button>



</Toolbar>