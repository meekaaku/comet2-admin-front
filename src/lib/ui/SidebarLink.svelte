<script lang="ts">
import { Icon } from '$lib/ui';

export let id = Math.random().toString(36).substring(7);
export let icon = '';
export let url = ''
export let name = '';

</script>

<style>
.nav-item:hover {
    color: white;
}

</style>

<li class="nav-item">
    <a class="nav-link active" aria-current="page" href="{url}">
        <Icon {icon}></Icon>&nbsp; {name}
    </a>
</li>
