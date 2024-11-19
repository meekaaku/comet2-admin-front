<script lang="ts">
import type { AxiosError} from 'axios';
import { goto, afterNavigate} from '$app/navigation';
import { onMount } from 'svelte';
import { page as svpage } from '$app/stores';
import { loading } from '$lib/stores';
import { comet, logger } from '$lib';
import { notify, formatNumber } from '$lib/utils';
import { Title, Toolbar, Button, Loading, Dialog, DialogBody, DialogFooter } from '$lib/ui';

let justMounted = false;
let report: any = $state(undefined);
let date_at: any = $state();
let n = 0;

async function load()
{
    let query = $svpage.url.searchParams;
    const today = new Date();
    const default_date_at = today.toISOString().split('T')[0];
    date_at = query.get('date_at') || default_date_at;
    const spec = { date_at };
    $loading = true;
    try {
      const _report = await comet.finance.reports.balanceSheet(spec);    
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
    /*
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
        */
}


function onUpdateClick()
{
    justMounted = false;
    $svpage.url.searchParams.set('date_at', date_at);
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


<Title>Balance Sheet</Title>

<Toolbar>
  
    <div class="input-group input-group-sm" style="width: 11em;">
        <span class="input-group-text" id="basic-addon1">Date At</span>
        <input type="date" class="form-control" bind:value={date_at} placeholder="Date at" aria-label="Date at" aria-describedby="Date at">
    </div>
   
    <Button width="8em" icon="bi-arrow-clockwise" busy={$loading} busytext="Updating" size="sm" color="primary" on:click={onUpdateClick} disabled={$loading}>Update</Button>

</Toolbar>


{#if !report}
<Loading></Loading>
{:else if 0}
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

        {#if 0}
        {#each report.rows as row}
        <tr>
            <td data-label={row.account_name} class="text-right">{row.account_name}</td>
            <td data-label={row.job_name} class="text-right">{row.job_name || ''}</td>
                
            {#each report.headers as header}
            <td data-label={header} class="text-end">
                <a href="#" class="link-dark" onclick={() => onAmountClick(row, header)}>{formatNumber(row[header])}</a>
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
        {/if}
  </tbody>
</table>

{/if}