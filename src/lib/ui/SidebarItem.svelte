<script lang="ts">
import { Icon } from '$lib/ui';
export let id = Math.random().toString(36).substring(7);
export let icon = '';
export let name = '';

</script>

<style>

</style>

<li class="sidebar-item">
    <a data-bs-target={'#' + id} data-bs-toggle="collapse" class="sidebar-link collapsed">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders align-middle"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>  -->
        <Icon {icon}/>
        <span class="align-middle">{name}</span>
    </a>
    <ul id={id} class="sidebar-dropdown list-unstyled collapse " data-bs-parent="#sidebar" style="padding-left: 2rem;">
    <slot></slot>
    </ul>
</li>

