<script lang="ts">
import type { RTransactionLineList } from '$lib/types';
import {Dialog, DialogBody, DialogFooter, Button} from '$lib/ui';
import { formatDate, formatNumber, notify } from '$lib/utils';
import { loading } from '$lib/stores';
import { comet } from '$lib';

export let open = false;
export let data: RTransactionLineList|undefined ;

let cashbookLine: any;
let step: 'transactionline'|'cashbookline' = 'transactionline';
let title = "Profit & Loss Transactions";
let size = "lg";



async function onViewSourceClick(id: string|null)
{
    if(!id) return;
    try {
        $loading = true;
        cashbookLine = await comet.finance.cashbooks.line(id);
        $loading = false;
        step = 'cashbookline';
        size = ''; 
    }
    catch(error: any)
    {
        const message = error.response?.data?.message || 'An error occurred. Pls check connection';
        notify({type: 'error', heading: 'Error', message })
        $loading = false;
    }
    
}
</script>
<Dialog size={size} title = {`${title} ${step === 'cashbookline' ?  '- Source' : ''}`} bind:open={open}>
    {#if step === 'transactionline' && data}
    <DialogBody>

        <table class="ct-table table table-sm table-striped table-hover">
        <thead>
            <tr>
                <th class="text-center">Date</th>
                <th class="text-center">Description</th>
                <th class="text-center">Amount</th>
                <th class="text-center">Source</th>
                <th class="text-center">Action</th>
            </tr>
        </thead>
        <tbody>
            {#each data.items as item}
            <tr>
                <td data-label="Date" class="text-start">{formatDate(item.date_created)}</td>
                <td data-label="Description" class="text-start">{item.transaction_description || ''}</td>
                <td data-label="Amount" class="text-end">{item.currency_code} {formatNumber(item.amount)}</td>
                <td data-label="Source" class="text-start">
                    <a href="#"  class="link-dark" on:click={()=> onViewSourceClick(item.cashbook_line_id)}>{item.cashbook_name}</a>

                </td>
                <td data-label="Action" class="text-end">action
                </td>
            </tr>
            {/each}
  
        </tbody>
        </table>

     

    </DialogBody>
    <DialogFooter>
      
      <Button color="danger" on:click={()=> open = false}>Close</Button>
    </DialogFooter>
    {:else if step === 'cashbookline' && cashbookLine}
    <DialogBody>
        <form>
        <div class="form-floating form-control-sm mb-3">
            <input type="text" value={cashbookLine.cashbook_name} class="form-control" id="name" placeholder={cashbookLine.cashbook_name} disabled>
            <label for="floatingInput">Source</label>
        </div>
        <div class="form-floating form-control-sm mb-3">
            <input type="text" value={`${formatDate(cashbookLine.date_settle)}`} class="form-control" id="name" placeholder='date settled' disabled>
            <label for="floatingInput">Date</label>
        </div>
        <div class="form-floating form-control-sm mb-3">
            <input type="text" value={cashbookLine.ref1} class="form-control" id="name" placeholder='date settled' disabled>
            <label for="floatingInput">Reference</label>
        </div>
        <div class="form-floating form-control-sm mb-3">
            <input type="text" value={cashbookLine.name} class="form-control" id="name" placeholder='date settled' disabled>
            <label for="floatingInput">Name</label>
        </div>
        <div class="form-floating form-control-sm mb-3">
            <input type="text" value={`${cashbookLine.currency_code}  ${formatNumber(cashbookLine.amount)}`} class="form-control" id="name" placeholder={`${cashbookLine.currency_code} ${cashbookLine.amount}`}>
            <label for="floatingInput">Amount</label>
        </div>
        <div class="form-floating form-control-sm mb-3">
            <input type="number" class="form-control" id="sort" placeholder="Sort order">
            <label for="floatingInput">Sort</label>
        </div>
        </form>

    </DialogBody>
    <DialogFooter>
      
      <Button color="danger" on:click={()=> {step = 'transactionline'; size = "lg"}}>Back</Button>
    </DialogFooter>

    {/if}
  </Dialog>