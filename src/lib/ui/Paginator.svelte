<script lang="ts">
import { createEventDispatcher } from "svelte";

export let page_count: number = 1;
export let page: number = 1;


const dispatch = createEventDispatcher();

</script>

<nav aria-label="Paginator">
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