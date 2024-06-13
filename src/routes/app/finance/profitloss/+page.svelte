<script lang="ts">
import type { AxiosError} from 'axios';
import { goto, afterNavigate} from '$app/navigation';
import { onMount } from 'svelte';
import { page as svpage } from '$app/stores';
import { loading } from '$lib/stores';
import { comet, logger } from '$lib';
import { notify } from '$lib/utils';
import { Title, Toolbar, Button, Loading } from '$lib/ui';

let justMounted = false;
let report: any = undefined;
let date_from: string;
let date_to: string;
let group_by: string;


let n = 0;
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
    catch(error: any) {
        notify({type: 'error', heading: 'Error', message: error.response.data.message})
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


<Title>PL</Title>

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



{#if !report}
  <Loading></Loading>
{:else}
<table class="ct-table table table-sm table-striped table-hover">
    <thead>
        <tr>
        <th class="text-center">Account</th>
        <th class="text-center">Job</th>
        {#each report.periods as period}
        <th class="text-center">{period}</th>
        {/each}
        </tr>
    </thead>
    <tbody>

        {#each report.lines as line}
        <tr>
            <td data-label={line.account_name} class="text-right">{line.account_name}</td>
            <td data-label={line.job_name} class="text-right">{line.job_name}</td>
                
            {#each report.periods as period}
            <td data-label={period} class="text-left">
                {line[period]}
            </td>
            {/each}
            <td data-label="Action" class="text-center">
                <Button size="sm" icon="bi-pencil" color="primary" on:click={() => 1} />
                <Button size="sm" icon="bi-trash" color="danger"/>
            </td>
          
        </tr>
        {/each}
  </tbody>
</table>

{/if}