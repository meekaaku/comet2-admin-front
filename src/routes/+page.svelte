<script lang="ts">
import { goto } from "$app/navigation";
import { onMount } from "svelte";
import { base } from "$app/paths";
import { About } from "$lib/ui";



onMount(() => goto(`${base}/app`));

</script>


<About></About>