<script lang="ts">

export let icon = 'bi-arrow-right';

const prefix = icon.slice(0,2)
const rest = icon.slice(3);

</script>

{#if prefix === 'bi'}
    <i class="bi bi-{rest}" style="font-size: 140%; margin-right: 12px"></i>

{:else if prefix === 'fi'}
    <i data-feather="{rest}"></i>

{:else if prefix === 'fa'}
    fa-icon

{:else}
    <i class="bi bi-arrow-right"></i>

{/if}

