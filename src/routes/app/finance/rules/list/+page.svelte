<script lang="ts">
import { onMount, afterUpdate } from 'svelte';
import { afterNavigate, goto } from '$app/navigation';
import { page as svpage } from '$app/stores';
import { comet, logger } from '$lib';
import { loading } from '$lib/stores';
import { Title, Toolbar, Button, Loading, Paginator, Dialog, DialogBody, DialogFooter } from '$lib/ui';
import { deepClone } from '$lib/utils';
import type { RPaginated, RRule, Editable } from '$lib/types';


let list: RPaginated<RRule & Record<string, any>> | undefined = undefined;
let editorOpen = false;
let editingItem: RRule|undefined = undefined;
let editingIndex: number|undefined = undefined;
let error: string | null = null;
let justMounted = false;



async function onSaveClick()
{
    if(editingIndex === undefined) return;
    if(!editingItem) return;
    if(!list) return;

    try 
    {
        $loading = true;
        error = null;
        const updatedItem = await comet.finance.rules.update(editingItem);
        list.items[editingIndex] = updatedItem;
        list = list;
        $loading = false;
        editorOpen = false;
    }
    catch(e: any)
    {
        logger.error('Error saving rule: ', e);
        error = e.response.data.message;
        $loading = false;
    }

}

function onEditClick(index: number)
{
    editingIndex = index;
    const item = list?.items[index];
    if(!item) return; 
    editingItem = deepClone(item) ;
    editorOpen = true;
}
  
function onPageChange({detail}: {detail: {page: number, page_size?: number}})
{
    justMounted = false;
    const _page = detail.page;
    const _page_size = detail.page_size || 100;
    console.log(detail);
    $svpage.url.searchParams.set('page', _page.toString());
    $svpage.url.searchParams.set('page_size', _page_size.toString());
    goto(`?${$svpage.url.searchParams.toString()}`);
}



async function loadList()
{
    let query = $svpage.url.searchParams;
    const page = parseInt(query.get('page') || '1');
    const page_size = parseInt(query.get('page_size') || '100');
    const sort = query.get('sort') || '';
    const filters = query.get('filters') || ''
    $loading = true;
    try {
      const _list = await comet.finance.rules.list({page, page_size, sort, filters});    
      list = processList(_list);
      $loading = false;
    }
    catch(error) {
        logger.error(`Error loading orders: `, error)
        $loading = false;
    }
    return list;
}

function processList(list: RPaginated<RRule>)
{
    list.items = list.items.sort((a, b) => a.sort < b.sort ? -1 : 1);
    return list;
}

afterNavigate(() => {
    if(justMounted) return;
    loadList();
});

onMount(() => {
    justMounted = true;
    loadList();
});

</script>

<style>


</style>

<Title>Finance Rules</Title>

<Toolbar>
  
  <Button width="5em" icon="bi-plus-lg" size="sm" color="primary" on:click={()=> goto(`/app/finance/rules/edt`)} disabled>Add</Button>

</Toolbar>

{#if !list}
  <Loading></Loading>
{:else}

<Dialog title="Edit Rule" bind:open={editorOpen}>
  {#if editingItem}
  <DialogBody>
    <form>
      <div class="form-floating mb-3">
        <input type="text" bind:value={editingItem.name} class="form-control" id="name" placeholder="A name for hte rule">
        <label for="floatingInput">Name</label>
      </div>
      <div class="form-floating mb-3">
        <textarea class="form-control" id="sql" placeholder="Postgres compatible SQL" style="height: 10em;">
          {editingItem.sql}
        </textarea>
        <label for="floatingInput">SQL</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" bind:value={editingItem.sort} class="form-control" id="sort" placeholder="Sort order">
        <label for="floatingInput">Sort</label>
      </div>
    </form>
  </DialogBody>
  <DialogFooter>
    {#if error}
      <span class="text-danger">{error}</span> &nbsp; &nbsp;
    {/if}
    <Button color="primary" busytext="Saving" busy={$loading} on:click={onSaveClick} disabled={$loading}>Save</Button>
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
        {#each list.items as rule, i}
        <tr>
            <td data-label="Sort" class="text-right">{rule.sort}</td>
            <td data-label="Name" class="text-right">{rule.name}</td>
            <td data-label="SQL" class="text-left">
              {rule.sql.substring(0, 100)}...
            </td>
            <td data-label="Action" class="text-center">
                <Button size="sm" icon="bi-pencil" color="primary" on:click={() => onEditClick(i)} />
                <Button size="sm" icon="bi-trash" color="danger"/>
            </td>
            
        </tr>
        {/each}
        {/if}
      <!-- Add more rows as needed -->
    </tbody>
  </table>


  <div class="d-flex justify-content-center mt-2">
    <Paginator page={list.page} page_count={list.page_count} page_size={list.page_size} on:pagechange={onPageChange} />
  </div>
{/if}


