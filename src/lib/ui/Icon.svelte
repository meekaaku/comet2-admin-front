<script lang="ts">

    interface Props {
        icon?: string;
    }

    let { icon = 'bi-arrow-right' }: Props = $props();

const prefix = icon.slice(0,2)  // bi - bootstrap icons, fi - feather icons, sh - streamlinehq 
const rest = icon.slice(3);

</script>

{#if prefix === 'bi'}
    <i class="bi bi-{rest}"></i>

{:else if prefix === 'fi'}
    <i data-feather="{rest}"></i>

{:else}
    <i data-feather="arrow-right"></i>

{/if}

