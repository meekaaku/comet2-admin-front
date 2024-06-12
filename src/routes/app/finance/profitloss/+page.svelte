<script lang="ts">
import { goto } from '$app/navigation';
import { Title, Toolbar, Button } from '$lib/ui';




</script>


<Title>Profit & Loss</Title>
<Toolbar>
  
    <!-- 
    <Button width="5em" icon="bi-plus-lg" size="sm" color="primary" on:click={()=> goto(`/app/finance/rules/edt`)} disabled>Add</Button>
    -->
    <div class="input-group input-group-sm" style="width: 15em;">
        <span class="input-group-text" id="basic-addon1">From</span>
        <input type="date" class="form-control" placeholder="From" aria-label="From date" aria-describedby="From date">
    </div>
    <div class="input-group input-group-sm" style="width: 15em;">
        <span class="input-group-text" id="basic-addon1">To</span>
        <input type="date" class="form-control" placeholder="To" aria-label="To date" aria-describedby="From date">
    </div>



</Toolbar>