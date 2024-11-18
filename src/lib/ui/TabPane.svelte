
<script lang="ts">
	import { getContext } from 'svelte';
    interface Props {
		children?: import('svelte').Snippet;
		id: number|string;
	}

	let currentTab = getContext('currentTab') as {tab: number|string};

	let { children, id }: Props = $props();
</script>

<div class:show={currentTab.tab == id} 
	 class:active={currentTab.tab == id} 
	 class="tab-pane fade" id="{id}-tab-pane" role="tabpanel" aria-labelledby="{id}-tab" tabindex="0">
	{@render children?.()}
</div>