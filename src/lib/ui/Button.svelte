<script lang="ts">
import { classnames } from '.'

    let className = '';
export { className as class };
export let active = false;
export let block = false;
export let close = false;
export let color = 'primary';
export let outline = false;
export let size = null;
export let busy = false;
export let busytext = '';



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

class={classes} type="button"
aria-label={ariaLabel || defaultAriaLabel}
>
{#if busy}
<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp; 
    {#if busytext}
        {busytext}
    {:else}
        <slot></slot>
    {/if}
{:else}
<slot></slot>
{/if}
</button>