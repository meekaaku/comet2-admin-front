<script lang="ts">
import type { AxiosError} from 'axios';
import { goto, afterNavigate} from '$app/navigation';
import { onMount } from 'svelte';
import { page as svpage } from '$app/stores';
import { loading } from '$lib/stores';
import { comet, logger } from '$lib';
import { notify, formatNumber } from '$lib/utils';
import { Title, Toolbar, Button, Loading, Dialog, DialogBody, DialogFooter } from '$lib/ui';
import DialogTransactions from './DialogTransactions.svelte'
import type { RAccountTransaction, RPaginated } from '$lib/types';

let justMounted = false;
let report: any = undefined;
let date_from: string;
let date_to: string;
let group_by: string;
let date_from2: string;
let date_to2: string;
let dialogOpen = false;
let transactionsList: RPaginated<RAccountTransaction>;


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
      const _report = await comet.finance.reports.profitLoss(spec);    
      report = processReport(_report);
      $loading = false;
    }
    catch(error: any) {
        notify({type: 'error', heading: 'Error', message: error.response.data.message})
        $loading = false;
    }
    return report;
}

async function onAmountClick(row:any, period:string)
{
    try {

        $loading = true;
        transactionsList = await comet.finance.transactions.accountTransactions({account_id: row.account_id, job_id: row.job_id, period });
        dialogOpen = true;

        $loading = false;
    }
    catch(error: any)
    {
        const message = error.response?.data?.message || 'An error occurred. Pls check connection';
        notify({type: 'error', heading: 'Error', message })
        $loading = false;
    }
}

function onGroupByChange()
{
    if(group_by === 'compare')
    {
        date_from = new Date().getFullYear() + '-01-01';
        date_to = new Date().getFullYear() + '-12-31';
    }

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
        <select bind:value={group_by} on:change={onGroupByChange} class="form-select" aria-label="Group by select">
            <option value="none" selected>None</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
            <option value="compare">Compare</option>
        </select>
    </div>

    {#if group_by === 'compare'}
    <div class="input-group input-group-sm" style="width: 11em;">
        <span class="input-group-text" id="basic-addon1">From</span>
        <input type="date" class="form-control" bind:value={date_from2} placeholder="From" aria-label="From date" aria-describedby="From date">
    </div>
    <div class="input-group input-group-sm" style="width: 11em;">
        <span class="input-group-text" id="basic-addon1">To</span>
        <input type="date" class="form-control" bind:value={date_to2} placeholder="To" aria-label="To date" aria-describedby="From date">
    </div>
    {/if}


    <Button width="8em" icon="bi-arrow-clockwise" busy={$loading} busytext="Updating" size="sm" color="primary" on:click={onUpdateClick} disabled={$loading}>Update</Button>



</Toolbar>

<DialogTransactions bind:open={dialogOpen} data={transactionsList} />





{#if !report}
    {#if $loading}
        <Loading></Loading> loading
    {/if}
{:else}
    <h3 class="text-center">{report.title}</h3>
    <p class="text-center">
        {report.brief}
    </p>
<table class="ct-table table table-sm table-striped table-hover">
    <thead>
        <tr>
        <th class="text-center">Account</th>
        <th class="text-center">Job</th>
        {#each report.headers as header}
            <th class="text-center">{header}</th>
        {/each}
        <th class="text-center">Action</th>
        </tr>
    </thead>
    <tbody>

        {#each report.rows as row}
        <tr>
            <td data-label={row.account_name} class="text-right">{row.account_name}</td>
            <td data-label={row.job_name} class="text-right">{row.job_name || ''}</td>
                
            {#each report.headers as header}
            <td data-label={header} class="text-end">
                <a href="#" class="link-dark" on:click={() => onAmountClick(row, header)}>{formatNumber(row[header])}</a>
            </td>
            {/each}
            <td data-label="Action" class="text-center">
                <!-- 
                <Button size="sm" outline icon="bi-pencil" color="primary" on:click={() => 1} />
                <Button size="sm" icon="bi-trash" color="danger"/>
                -->
            </td>
          
        </tr>
        {/each}
  </tbody>
</table>

{/if}