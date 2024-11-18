<script lang="ts">
    import Icon from './Icon.svelte';
    import { getContext } from 'svelte';
    interface Props {
		children?: import('svelte').Snippet;
        id: number|string;
        name: string;
        icon?: string;
	}

	let { children, name, icon, id }: Props = $props();

    let currentTab = getContext('currentTab') as {tab: number|string};

</script>


<li class="nav-item">
    <a class:active={currentTab.tab == id} class="nav-link" aria-current="page" href="#" onclick={() => currentTab.tab = id}>
        {#if icon}
            <Icon icon={icon}></Icon>&nbsp;
        {/if}
        {name}

    </a>
</li>
