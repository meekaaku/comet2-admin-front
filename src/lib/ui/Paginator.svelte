<script lang="ts">
import { createEventDispatcher } from "svelte";

export let page_count: number = 1;
export let page: number = 1;
let selectpage = page;

const dispatch = createEventDispatcher();

</script>
<style>
.pagination{
    display: inline-flex;
}
</style>

<nav class="d-none d-sm-block" aria-label="Paginator big screen" >
    <ul class="pagination">
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" class:disabled={page === 1} on:click={() => dispatch('pagechange', {page: page-1})}>
            <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        {#each Array(page_count) as _, page0}
        <li class="page-item" class:active = {page0 + 1 === page}>
            <a class="page-link" href="#" on:click={()=> dispatch('pagechange', {page: page0+1})}>{page0+1}</a>
        </li>
        {/each}
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" class:disabled={page === page_count} on:click={()=> dispatch('pagechange', {page: page+1})}>
            <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
    
</nav>
<nav class="d-block d-sm-none" aria-label="Paginator small screen">
    <div class="input-group">
    <button class="btn btn-outline-primary" aria-label="Previous" class:disabled={page === 1} on:click={() => dispatch('pagechange', {page: page-1})}>
        <span aria-hidden="true">&laquo;</span>
    </button>    
    <select class="form-select form-select-sm" bind:value={page} on:change={()=> dispatch('pagechange', {page})}>
        {#each Array(page_count) as _, page0}
            <option value={page0+1}>{page0 + 1}</option>
        {/each}
        <option>2</option>
    </select>
    <button class="btn btn-outline-primary"  aria-label="Next" class:disabled={page === page_count} on:click={()=> dispatch('pagechange', {page: page+1})}>
        <span aria-hidden="true">&raquo;</span>
    </button> 
    </div>
</nav>