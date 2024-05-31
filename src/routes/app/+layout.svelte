<script lang="ts">
import { onMount } from 'svelte';
import { base } from '$app/paths'
import { goto } from '$app/navigation';
import { SidebarDrop, SidebarLink, Icon, Progress, About } from '$lib/ui';
import { profile } from '$lib/stores';
import { logout, login, refresh, hasPermission } from '$lib/auth';
import { comet } from '$lib';



let sidebarElement: HTMLElement;
let loggedin = false;

function toggle()
{
    sidebarElement.style.marginLeft = (sidebarElement.style.marginLeft == "0px") ? "-240px" : "0px";
}


async function init()
{
    try {
        await refresh();
    }
    catch(e)
    {
        goto(`${base}/login`);
    }
    
}

onMount(init);

</script>
<style>

@media screen and (max-width: 768px) {
    .c-sidebar {
        margin-left: -240px
    }
}

.master
{
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
}

.c-sidebar
{
    display: flex;
    flex-direction: column;
    width: 240px;
    background-color: #111;
    height: 100%;
    color: white;
    opacity: 0.8;
    transition: 0.2s;
    overflow-y: scroll;
    scrollbar-width: thin;

}

.c-main 
{
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
}
.c-navbar 
{
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    min-height: 3em;
    width: 100%;


    -webkit-box-shadow: 0px 3px 5px 0px rgba(79,79,79,0.49);
    -moz-box-shadow: 0px 3px 5px 0px rgba(79,79,79,0.49);
    box-shadow: 0px 3px 5px 0px rgba(79,79,79,0.49);
}

.c-content{
    padding: 1rem;
    overflow-y: auto;
}




</style>




    

{#if $profile}


<Progress></Progress>
<div class="master">
    <div bind:this={sidebarElement} class="c-sidebar">
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="logo" style="height: 3rem;">
                Logo
            </div>

            <SidebarDrop name="Catalog" icon="bi-book">
                <SidebarLink name="Products" icon="bi-person" url="{base}/app/catalog/products" />
                <SidebarLink name="Collections" icon="bi-activity" url="{base}/app/catalog/collections" />
            </SidebarDrop>


            <SidebarDrop name="Sales" icon="bi-activity">
                <SidebarLink name="Orders" icon="bi-person" url="{base}/app/sales/orders/list" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Shipments" icon="bi-person" url="{base}/app/sales/customers" />
            </SidebarDrop>

            <SidebarDrop name="Finance" icon="bi-activity">
                <SidebarLink name="Rules" icon="bi-person" url="{base}/app/finance/rules/list" />
            </SidebarDrop>


            {#if hasPermission('menu.admin')}
                <SidebarDrop name="Admin" icon="bi-activity">
                    <SidebarLink name="Roles" icon="bi-person" url="{base}/app/sales/orders/list" />
                    <SidebarLink name="Users" icon="bi-person" url="{base}/app/sales/customers" />
                    <SidebarLink name="Access Control" icon="bi-person" url="{base}/app/sales/customers" />
                </SidebarDrop>


            {/if}

        </div>
    </div>

    <div class="c-main">

        <div class="c-navbar sticky-top">
            <div>
                <button type="button" class="btn" on:click={toggle}><Icon icon="bi-layout-text-sidebar-reverse" /></button>
            </div> 

            <div class="dropdown" style="margin-left: auto; margin-right: 1em;">
                {$profile?.name}
                <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Icon icon="bi-person" />
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"><Icon icon="bi-person-lines-fill"></Icon>Profile</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" on:click={logout}> <Icon icon="bi-box-arrow-right"></Icon>Logout</a></li>
                </ul>
            </div>
        </div>
        <div class="c-content">
            <slot />
        </div>



    </div>
</div>

{:else}

<About></About>

{/if}