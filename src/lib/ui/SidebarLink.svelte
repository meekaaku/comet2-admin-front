<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { Icon } from '$lib/ui';

    interface Props {
        id?: any;
        icon?: string;
        url?: string;
        name?: string;
        toggle?: any;
    }

    let {
        id = Math.random().toString(36).substring(7),
        icon = '',
        url = '',
        name = '',
        toggle = () => {}
    }: Props = $props();

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
    <a class="nav-link active" aria-current="page" onclick={pretoggle} href="{url}">
        <Icon {icon}></Icon>&nbsp; {name}
    </a>
</li>
