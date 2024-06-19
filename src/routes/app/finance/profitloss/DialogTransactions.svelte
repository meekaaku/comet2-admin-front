<script lang="ts">
import type { RTransactionLineList } from '$lib/types';
import {Dialog, DialogBody, DialogFooter, Button} from '$lib/ui';

export let open = false;
export let data: RTransactionLineList|undefined ;
</script>
<Dialog title="Profit & Loss Transactions" {open}>
    <DialogBody>

        <table class="ct-table table table-sm table-striped table-hover">
        <thead>
            <tr>
                <th class="text-center">Date</th>
                <th class="text-center">Description</th>
                <th class="text-center">Amount</th>
    
                <th class="text-center">Action</th>
            </tr>
        </thead>
        <tbody>
            {#if data}
            {#each data.items as item}
            <tr>
                <td data-label="Date" class="text-right">{item.date_created}</td>
                <td data-label="Description" class="text-right">{item.description || ''}</td>
                <td data-label="Amount" class="text-right">{item.currency_code} {item.amount}</td>
                <td data-label="Descriptoin" class="text-right">action</td>
            </tr>
            {/each}
            {/if}
  
        </tbody>
        </table>

     

    </DialogBody>
    <DialogFooter>
      
      <Button color="danger" on:click={()=> open = false}>Close</Button>
    </DialogFooter>
  </Dialog>