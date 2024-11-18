<script lang="ts">
	import { setContext } from 'svelte';
    interface Props {
		children?: import('svelte').Snippet;
		defaultTab: number|string;
	}

	let { children, defaultTab = 0 }: Props = $props();

	let currentTab: {tab: number|string} = $state({tab: defaultTab});

	setContext('currentTab', currentTab);



</script>

{@render children?.()}

