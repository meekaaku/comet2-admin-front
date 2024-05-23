<script lang="ts">
import { onNavigate, beforeNavigate } from '$app/navigation';
import { assertPermission, hasPermission, getPermission } from '$lib/auth';
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



try {
    assertPermission('catalog.product:list');
}
catch(e: any) {
    authError = e.message || 'Some unknown error';
}

</script>



{#if authError}
<UI.Unauthorized>
    {authError} 
</UI.Unauthorized>

{:else}

<UI.Title>Products</UI.Title>
Real content
{/if}