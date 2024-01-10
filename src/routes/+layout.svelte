<script lang="ts">
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import { base } from "$app/paths";
import { comet } from '$lib';

onMount(() => {
    const token = localStorage.getItem('token');
    
    if(!token){
        goto(`${base}/login`);
        return;
    }

    try
    {
        const data = comet.auth.validateToken(token);
        goto(`${base}/app`);
    }
    catch(e)
    {
        goto(`${base}/login`);

    }
});

</script>
outer most layout
<slot />