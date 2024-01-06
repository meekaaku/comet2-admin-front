<script lang="ts">

export let name = '';
export let url = '';
export let icon = '';

</script>

<style>
.sidebar-item 
{
    font-size: 90%;
}
</style>

<li class="sidebar-item">
    <a class="sidebar-link" href={url}> <i data-feather="feather"></i> {name}</a>
</li>