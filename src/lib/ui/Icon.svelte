<script lang="ts">

export let icon = 'bi-arrow-right';

const prefix = icon.slice(0,2)  // bi - bootstrap icons, fi - feather icons, sh - streamlinehq 
const rest = icon.slice(3);

</script>

{#if prefix === 'bi'}
    <i class="bi bi-{rest}" style="margin-right: 12px"></i>

{:else if prefix === 'fi'}
    <i data-feather="{rest}"></i>

{:else}
    <i data-feather="arrow-right"></i>

{/if}

