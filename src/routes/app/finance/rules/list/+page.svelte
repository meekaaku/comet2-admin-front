<script lang="ts">
import { onMount, afterUpdate } from 'svelte';
import { afterNavigate, goto } from '$app/navigation';
import { page as svpage } from '$app/stores';
import { comet, logger } from '$lib';
import { loading } from '$lib/stores';
import { Title, Toolbar, Button, Loading, Paginator, Dialog, DialogBody, DialogFooter } from '$lib/ui';
import type { RPaginated, RRule, Editable } from '$lib/types';


let list: RPaginated<RRule & Record<string, any>> | undefined = undefined;
let editorOpen = false;
let currentRule: Editable<RRule> | undefined = undefined;

//let page = 1;
//let page_size = 50;
//let sort: string|undefined = undefined;
//let filters: any = undefined;


async function onSave()
{
  console.log('onSave', currentRule?.edited);
  editorOpen = false;
}

function onEditClick(rule: RRule)
{
  currentRule = { original: rule, edited: {...rule}}
  editorOpen = true;
  return;
  console.log('onEditClick');
  /* @ts-ignore */
  const modal = new bootstrap.Modal(editorDialog);
  modal.show();
}
  
function onPageChange({detail}: {detail: {page: number}})
{
    const _page = detail.page;
    console.log(detail);
    $svpage.url.searchParams.set('page', _page.toString());
    goto(`?${$svpage.url.searchParams.toString()}`);
}



async function loadList()
{
    let query = $svpage.url.searchParams;
    const page = parseInt(query.get('page') || '1');
    const page_size = parseInt(query.get('page_size') || '10');
    const sort = query.get('sort') || '';
    const filters = query.get('filters') || ''
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
  console.log('afterNavigate');
  await loadList();
});

onMount(async () => {
  console.log('onMount');
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

{#if !list}
  <Loading></Loading>
{:else}


<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editor">Launch static backdrop modal</button>

<Dialog title="Edit Rule" bind:open={editorOpen}>
  {#if currentRule}
  <DialogBody>
    <form>
      <div class="form-floating mb-3">
        <input type="text" bind:value={currentRule.edited.name} class="form-control" id="name" placeholder="A name for hte rule">
        <label for="floatingInput">Name</label>
      </div>
      <div class="form-floating mb-3">
        <textarea class="form-control" id="sql" placeholder="Postgres compatible SQL" style="height: 10em;">
          {currentRule.edited.sql}
        </textarea>
        <label for="floatingInput">SQL</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" bind:value={currentRule.edited.sort} class="form-control" id="sort" placeholder="Sort order">
        <label for="floatingInput">Name</label>
      </div>
    </form>
  </DialogBody>
  <DialogFooter>
    <Button color="primary" on:click={onSave}>Save</Button>
    <Button color="danger" on:click={()=> editorOpen = false}>Cancel</Button>
  </DialogFooter>
  {/if}
</Dialog>

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
                <Button size="sm" icon="bi-pencil" color="primary" on:click={() => onEditClick(rule)} />
                <Button size="sm" icon="bi-trash" color="danger"/>
            </td>
            
        </tr>
        {/each}
        {/if}
      <!-- Add more rows as needed -->
    </tbody>
  </table>
  <!--
  <div class="d-flex justify-content-center mt-2">
    <nav aria-label="Paginator">
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
  -->

  <div class="d-flex justify-content-center mt-2">
    <Paginator page={list.page} page_count={list.page_count} on:pagechange={onPageChange} />
  </div>
{/if}


