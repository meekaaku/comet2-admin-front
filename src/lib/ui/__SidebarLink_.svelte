<script lang="ts">
	import { Icon } from '$lib/ui';
	import { activeMenu } from '$lib/stores';

	interface Props {
		name?: string;
		url?: string;
		icon?: string;
	}

	let { name = '', url = '', icon = '' }: Props = $props();

	const id = name + url + icon;

	function onClick() {
		activeMenu.set(id);
	}
</script>

<li class="sidebar-item" class:active={$activeMenu === id} class:active2={$activeMenu === id}>
	<a class="sidebar-link d-none" href={url}> <i data-feather="feather"></i> {name}</a>
	<a class="sidebar-link" onclick={onClick} href={url}><Icon {icon} />{name}</a>
</li>

<style>
	.active2 {
		font-size: 5rem;
	}
	.sidebar-item {
		font-size: 90%;
	}
</style>
