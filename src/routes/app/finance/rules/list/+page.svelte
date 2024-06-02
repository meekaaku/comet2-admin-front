<script lang="ts">
import { onMount, afterUpdate } from 'svelte';
import { afterNavigate, goto } from '$app/navigation';
import { page as svpage } from '$app/stores';
import { comet, logger } from '$lib';
import { loading } from '$lib/stores';
import { Title, Toolbar, Button } from '$lib/ui';
import type { RPaginated, RRule } from '$lib/types';


let list: RPaginated<RRule & Record<string, any>> | undefined = undefined;
let page = 1;
let page_size = 50;
let sort: string|undefined = undefined;
let filters: any = undefined;

  

function onPageChange(_page: number)
{
    $svpage.url.searchParams.set('page', _page.toString());
    goto(`?${$svpage.url.searchParams.toString()}`);
}

async function loadList()
{
    let query = new URLSearchParams($svpage.url.searchParams.toString());
    page = parseInt(query.get('page') || '1');
    $loading = true;
    try {
      const _list = await comet.finance.rules.list({page, page_size, sort, filters});    
      list = processList(_list);
      $loading = false
    }
    catch(error) {
        logger.error(`Error loading orders: `, error)
        $loading = false
    }
    return list;
}

function processList(list: RPaginated<RRule>)
{
    list.items = list.items.sort((a, b) => a.sort < b.sort ? -1 : 1);
    return list;
}

afterNavigate(async () => {
  await loadList();
});

onMount(async () => {
  await loadList();

});

</script>

<style>


</style>

<Title>Finance Rules</Title>

<Toolbar>
  <Button icon="bi-plus" size="sm" color="primary" on:click={()=> goto(`/app/finance/rules/edit`)}>Add Rule</Button>
  <Button data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" icon="bi-plus" size="sm" color="primary" on:click={()=> goto(`/app/finance/rules/edit`)}>Add Rule</Button>

</Toolbar>

{#if $loading|| !list}
    Loading Rules 
{:else}

  <table class="ct-table table table-sm table-striped table-hover">
    <thead>
      <tr>
        <th style="width: 1%" class="text-center">Sort</th>
        <th style="width: 20%" class="text-center">Name</th>
        <th class="text-left">SQL</th>
        <th style="width: 10%" class="text-center">Action</th>
      </tr>
    </thead>
    <tbody>
        {#if list}
        {#each list.items as rule}
        <tr>
            <td data-label="Sort" class="text-right">{rule.sort}</td>
            <td data-label="Name" class="text-right">{rule.name}</td>
            <td data-label="SQL" class="text-center">
              {rule.sql.substring(0, 100)}...
            </td>
            <td data-label="Action" class="text-center">
                <Button size="sm" icon="bi-pencil" color="primary" on:click={()=> goto(`/app/finance/rules/edit/${rule.id}`)} />
                <Button size="sm" icon="bi-trash" color="danger"/>
            </td>
            
        </tr>
        {/each}
        {/if}
      <!-- Add more rows as needed -->
    </tbody>
  </table>
<div class="d-flex justify-content-center mt-2">
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" class:disabled={page === 1} on:click={()=> onPageChange(page-1)}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {#each Array(list.page_count) as _, page0}
    <li class="page-item" class:active = {page0 + 1 === list.page}>
        <a class="page-link" href="#" on:click={()=> onPageChange(page0+1)}>{page0+1}</a>
    </li>
    {/each}
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" class:disabled={page === list.page_count} on:click={()=> onPageChange(page+1)}>
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</div>

{/if}


