<script lang="ts">
	import { setContext, getContext } from 'svelte';
    interface Props {
		children?: import('svelte').Snippet;
		defaultTab: number|string;
		onTabChange: (tab: number|string) => void;
	}

	let { children, defaultTab = 0, onTabChange }: Props = $props();

	let currentTab: {tab: number|string} = $state({tab: defaultTab});
	let tab = getContext('tab') as {id: string};

	setContext('currentTab', currentTab);
	setContext('onTabChange', onTabChange);


</script>
Tabs go here {tab.id}
{@render children?.()}

