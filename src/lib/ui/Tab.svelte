<script lang="ts">
	import { setContext, getContext } from 'svelte';
    interface Props {
		children?: import('svelte').Snippet;
		activeTab: string;
		onTabChange: Function;
	}

	let { children, activeTab, onTabChange }: Props = $props();

	let currentTab = $state({id: activeTab});

	setContext('currentTab', currentTab);
	setContext('onTabChange', onTabChange);


</script>
{@render children?.()}

