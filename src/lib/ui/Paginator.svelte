<script lang="ts">
import { createEventDispatcher } from "svelte";

    interface Props {
        page_count?: number;
        page?: number;
        page_size?: number;
    }

    let { page_count = 1, page = $bindable(1), page_size = $bindable(10) }: Props = $props();

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
            <a class="page-link" href="#" aria-label="Previous" class:disabled={page === 1} onclick={() => dispatch('pagechange', {page: page-1, page_size})}>
            <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        {#each Array(page_count) as _, page0}
        <li class="page-item" class:active = {page0 + 1 === page}>
            <a class="page-link" href="#" onclick={()=> dispatch('pagechange', {page: page0+1, page_size})}>{page0+1}</a>
        </li>
        {/each}
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" class:disabled={page === page_count} onclick={()=> dispatch('pagechange', {page: page+1, page_size})}>
            <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
        &nbsp;&nbsp;
    <select class="form-select form-select-sm" bind:value={page_size} onchange={()=> dispatch('pagechange', {page, page_size})}>
        <option value={10}>10 per page</option>
        <option value={50}>50 per page</option>
        <option value={100}>100 per page</option>
        <option value={500}>500 per page</option>
    </select>
    </ul>

</nav>
<nav class="d-block d-sm-none" aria-label="Paginator small screen">
    <div class="input-group">
    <button class="btn btn-outline-primary" aria-label="Previous" class:disabled={page === 1} onclick={() => dispatch('pagechange', {page: page-1, page_size})}>
        <span aria-hidden="true">&laquo;</span>
    </button>    
    <select class="form-select form-select-sm" bind:value={page} onchange={()=> dispatch('pagechange', {page, page_size})}>
        {#each Array(page_count) as _, page0}
            <option value={page0+1}>{page0 + 1}</option>
        {/each}
    </select>
    <button class="btn btn-outline-primary"  aria-label="Next" class:disabled={page === page_count} onclick={()=> dispatch('pagechange', {page: page+1, page_size})}>
        <span aria-hidden="true">&raquo;</span>
    </button> 
        &nbsp;&nbsp;
    <select class="form-select form-select-sm" bind:value={page_size} onchange={()=> dispatch('pagechange', {page, page_size})}>
        <option value={10}>10 per page</option>
        <option value={50}>50 per page</option>
        <option value={100}>100 per page</option>
        <option value={500}>500 per page</option>
    </select>

    </div>
</nav>