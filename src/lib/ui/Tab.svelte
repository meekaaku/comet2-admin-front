<script lang="ts">
	import { setContext, getContext } from 'svelte';
    interface Props {
		children?: import('svelte').Snippet;
		defaultTab: number|string;
	}

	let { children, defaultTab = 0 }: Props = $props();

	let currentTab: {tab: number|string} = $state({tab: defaultTab});
	let tab = getContext('tab') as {id: string};

	setContext('currentTab', currentTab);


</script>
Tabs go here {tab.id}
{@render children?.()}

