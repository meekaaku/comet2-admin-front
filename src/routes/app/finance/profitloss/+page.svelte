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
let date_from: string;
let date_to: string;
let group_by: string;



async function load()
{
    let query = $svpage.url.searchParams;
    date_from = query.get('date_from') || new Date().getFullYear() + '-01-01';
    date_to = query.get('date_to') || new Date().getFullYear() + '-12-31'; 
    group_by = query.get('group_by') || 'month';
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

function onUpdateClick()
{
    justMounted = false;
    $svpage.url.searchParams.set('date_from', date_from);
    $svpage.url.searchParams.set('date_to', date_to);
    $svpage.url.searchParams.set('group_by', group_by);
    goto(`?${$svpage.url.searchParams.toString()}`);
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
  
    <div class="input-group input-group-sm" style="width: 11em;">
        <span class="input-group-text" id="basic-addon1">From</span>
        <input type="date" class="form-control" bind:value={date_from} placeholder="From" aria-label="From date" aria-describedby="From date">
    </div>
    <div class="input-group input-group-sm" style="width: 11em;">
        <span class="input-group-text" id="basic-addon1">To</span>
        <input type="date" class="form-control" bind:value={date_to} placeholder="To" aria-label="To date" aria-describedby="From date">
    </div>
    <div class="input-group input-group-sm" style="width: 11em;">
        <span class="input-group-text" id="basic-addon1">Group by</span>
        <select bind:value={group_by} class="form-select" aria-label="Group by select">
            <option value="none" selected>None</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
            <option value="compare">Compare</option>
        </select>
    </div>
    <Button width="8em" icon="bi-arrow-clockwise" busy={$loading} busytext="Updating" size="sm" color="primary" on:click={onUpdateClick} disabled={$loading}>Update</Button>



</Toolbar>