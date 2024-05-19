<script lang="ts">
import { onNavigate, beforeNavigate } from '$app/navigation';
import { assertPermission, hasPermission, getPermission } from '$lib/acl';
import * as UI from '$lib/ui';
	import Unauthorized from '$lib/ui/Unauthorized.svelte';

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


<p>{access}</p>

{#if authError}
<UI.Unauthorized>
    {authError} 
</UI.Unauthorized>

{:else}

<UI.Title>Products</UI.Title>
Real content
{/if}