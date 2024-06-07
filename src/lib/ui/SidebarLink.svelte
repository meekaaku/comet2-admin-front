<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { Icon } from '$lib/ui';

export let id = Math.random().toString(36).substring(7);
export let icon = '';
export let url = ''
export let name = '';
export let toggle = () => {};

const dispatch = createEventDispatcher();


function pretoggle() {
    if(window.screen.width < 768) toggle();
}

</script>

<style>
.nav-item:hover {
    color: white;
}

</style>

<li class="nav-item">
    <a class="nav-link active" aria-current="page" on:click={pretoggle} href="{url}">
        <Icon {icon}></Icon>&nbsp; {name}
    </a>
</li>
