<script lang="ts">
    import Icon from './Icon.svelte';
    interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();


</script>

<ul class="nav nav-tabs">
    {@render children?.()}
</ul>


<style>
    .nav {
        margin-bottom: 0.5em;
    }
</style>