<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	import { classnames } from '.';
	import Icon from './Icon.svelte';

	let className = '';
	export { className as class };
	export let active = false;
	export let block = false;
	export let close = false;
	export let color = 'primary';
	export let outline = false;
	export let size: 'lg'|'sm' = 'sm';
	export let busy = false;
	export let busytext = '';
	export let icon: string | undefined = undefined;
	export let width: string | undefined = undefined;
	export let tooltip: string | undefined = undefined;

	$: ariaLabel = $$props['aria-label'];
	$: defaultAriaLabel = close ? 'Close' : null;

	$: classes = classnames(
		className,
		close ? 'btn-close' : 'btn',
		close || `btn${outline ? '-outline' : ''}-${color}`,
		size ? `btn-${size}` : false,
		block ? 'd-block w-100' : false,
		{
			active
		}
	);
</script>

<button
	{...$$restProps}
	on:click
	class={classes}
	type="button"
	style:width
	aria-label={ariaLabel || defaultAriaLabel}
	data-bs-toggle="tooltip" data-bs-placement="top" title={tooltip}
>
	{#if busy}
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;

		{#if busytext}
			{busytext}
		{:else}
			<slot></slot>
		{/if}
	{:else}
		{#if icon}
			<Icon {icon} />
		{/if}
		<slot></slot>
	{/if}
</button>
