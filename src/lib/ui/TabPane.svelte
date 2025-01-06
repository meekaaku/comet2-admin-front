
<script lang="ts">
	import { getContext } from 'svelte';
    interface Props {
		children?: import('svelte').Snippet;
		id: number|string;
	}

	let currentTab = getContext('currentTab') as {id: string};

	let { children, id }: Props = $props();
</script>

<div class:show={currentTab.id == id} 
	 class:active={currentTab.id== id} 
	 class="tab-pane fade" id="{id}-tab-pane" role="tabpanel" aria-labelledby="{id}-tab" tabindex="0">
	{@render children?.()}
</div>
