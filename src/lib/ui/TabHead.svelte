<script lang="ts">
    import { page } from '$app/stores';
	import { goto } from '$app/navigation';
    import Icon from './Icon.svelte';
    import { getContext, setContext } from 'svelte';
    interface Props {
		children?: import('svelte').Snippet;
        id: number|string;
        name: string;
        icon?: string;
	}

	let { children, name, icon, id }: Props = $props();

    let currentTab = getContext('currentTab') as {tab: number|string};
    let tab = getContext('tab') as {id: string};


    function changeTab() {
        currentTab.tab = id;
        tab.id = 'id ' + id;
    }

</script>

<li class="nav-item">
    <a class:active={currentTab.tab == id} class="nav-link" aria-current="page" href="" onclick={changeTab}>
        {#if icon}
            <Icon icon={icon}></Icon>&nbsp;
        {/if}
        {name}

    </a>
</li>
