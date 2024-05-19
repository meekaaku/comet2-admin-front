<script lang="ts">
import { onNavigate, beforeNavigate } from '$app/navigation';
import { assertPermission, hasPermission, getPermission } from '$lib';
import * as UI from '$lib/ui';

let authError:string|null = null;
let access: string = '';

onNavigate(() => {
    console.log('onNavigate at products');
      
});

beforeNavigate(() => {
    console.log('beforeNavigate at products');
});

function checkAuthorization() 
{
    try 
    {
        assertPermission('catalog.products:listx');
        if(!hasPermission('catalog.products:view')) {
            access = 'You cannot view indivudal products, but you can list them'
        }

    }
    catch(error: any)
    {
        authError = error?.message || 'Some unknown error';
    }
}

checkAuthorization() ;

</script>

<UI.Title>Products</UI.Title>

<p>{access}</p>

{#if authError}

<div class="alert alert-danger" role="alert">
    {authError} </div>

{:else}

Real content
{/if}