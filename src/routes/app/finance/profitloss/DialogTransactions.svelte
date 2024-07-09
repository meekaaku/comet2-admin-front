<script lang="ts">
import type { RTransactionLineList, RCashbookLine, RFinanceClass } from '$lib/types';
import {Dialog, DialogBody, DialogFooter, Button} from '$lib/ui';
import { formatDate, formatNumber, notify } from '$lib/utils';
import { loading } from '$lib/stores';
import { comet } from '$lib';

export let open = false;
export let data: RTransactionLineList|undefined ;

let cashbookLine: RCashbookLine;
let classes: RFinanceClass[] = [];
let step: 'transactionline'|'cashbookline' = 'transactionline';
let title = "Profit & Loss Transactions";
let size = "lg";
let selected_class_id: string|null = null;




async function onViewSourceClick(id: string|null)
{
    if(!id) return;
    try {
        $loading = true;
        cashbookLine = await comet.finance.cashbooks.line(id);
        selected_class_id = cashbookLine.class_id;
        classes = await comet.finance.classes.all();
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

async function saveCashbookLine()
{
    if(!selected_class_id) return;
    try {
        $loading = true;
        const updated = await comet.finance.cashbooks.updateLine(cashbookLine.id, {class_id: selected_class_id});
        notify({type: 'info', heading: 'Success', message: 'Changes saved successfully'});
        $loading = false;
        step = 'transactionline';
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
                <th class="text-center">Name</th>
                <th class="text-center">Amount</th>
                <th class="text-center">Source</th>
            </tr>
        </thead>
        <tbody>
            {#each data.items as item}
            <tr>
                <td data-label="Date" class="text-start">{formatDate(item.date_created)}</td>
                <td data-label="Description" class="text-start">{item.transaction_description || ''}</td>
                <td data-label="Name" class="text-start">{item.name || ''}</td>
                <td data-label="Amount" class="text-end">
                    <a href="#"  class="link-dark" on:click={()=> onViewSourceClick(item.source_line_id)}>{item.currency_code} {formatNumber(item.amount)}</a>
                </td>
                <td data-label="Source" class="text-start">
                   {item.source_name}
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
            <input type="text" value={`${cashbookLine.currency_code}  ${formatNumber(cashbookLine.amount)}`} class="form-control" id="name" placeholder={`${cashbookLine.currency_code} ${cashbookLine.amount}`} disabled>
            <label for="floatingInput">Amount</label>
        </div>
        
        {#if classes}
        <div class="form-floating">
            <select bind:value={selected_class_id} class="form-select" id="floatingSelect" aria-label="Finance class select">
                {#each classes as cls}
                <option value={cls.id}>{cls.name}</option>
                {/each}
            </select>
            <label for="floatingSelect">Works with selects</label>
        </div>
        {/if}






        </form>

    </DialogBody>
    <DialogFooter>
      <Button color="danger" on:click={() => {step = 'transactionline'; size = "lg"}}>Back</Button>
      <Button color="success" on:click={saveCashbookLine}>Save</Button>
    </DialogFooter>

    {/if}
  </Dialog>