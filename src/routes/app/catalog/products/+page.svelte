<script lang="ts">
import { onNavigate, beforeNavigate } from '$app/navigation';
import { loading } from '$lib/stores';
import { assertPermission, hasPermission, getPermission } from '$lib/auth';
import { Unauthorized, Title, Toolbar, Button } from '$lib/ui';

let authError:string|null = null;

let access: string = '';

onNavigate(() => {
    console.log('onNavigate at products');
      
});

beforeNavigate(() => {
    console.log('beforeNavigate at products');
});



try {
    assertPermission('catalog.product:list');
}
catch(e: any) {
    authError = e.message || 'Some unknown error';
}

function onImportClick() {
    console.log('onImportClick');
}

</script>



{#if authError}
<Unauthorized>
    {authError} 
</Unauthorized>

{:else}

<Title>Products</Title>

<Toolbar>
  

    <Button width="8em" icon="bi-cloud-upload" busy={$loading} busytext="Updating" size="sm" color="primary" on:click={onImportClick} disabled={$loading}>Import</Button>



</Toolbar>

Real content
{/if}