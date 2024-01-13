<script lang="ts">
import { base } from '$app/paths'
import { goto } from '$app/navigation';
import { SidebarDrop, SidebarLink, Icon, Progress as UIProgress } from '$lib/ui';
import { comet } from '$lib';
import { onMount } from 'svelte';



let sidebarElement: HTMLElement;
let loggedin = false;

function toggle()
{
    sidebarElement.style.marginLeft = (sidebarElement.style.marginLeft == "0px") ? "-240px" : "0px";
}
async function logout()
{
    await comet.auth.logout();
	goto(`${base}/login`);
}

async function init()
{
    const token = localStorage.getItem('token');
    
    if(!token){
        goto(`${base}/login`);
        return;
    }

    try
    {
        const data = await comet.auth.validateToken(token);
        loggedin = true;
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

    box-shadow: 0px 15px 5px -15px rgba(0,0,0,0.65);    
    border-bottom: solid 1px #eee;

   /* box-shadow: 0px -4px 24px 0px rgba(0,0,0,0.65); */
}

.c-content{
    padding: 1rem;
    overflow-y: auto;
}




</style>




    <UIProgress></UIProgress>

{#if loggedin}

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
                <SidebarLink name="Orders" icon="bi-person" url="{base}/app/sales/orders" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
                <SidebarLink name="Customers" icon="bi-person" url="{base}/app/sales/customers" />
            </SidebarDrop>

        </div>
    </div>

    <div class="c-main">

        <div class="c-navbar sticky-top">
            <div>
                <button type="button" class="btn btn-link" on:click={toggle}><Icon icon="bi-layout-text-sidebar-reverse" /></button>
            </div> 

            <div class="dropdown" style="margin-left: auto">
                <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Icon icon="bi-person" />
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"><Icon icon="bi-person-lines-fill"></Icon>Profile</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" on:click={logout}>Logout</a></li>
                </ul>
            </div>
        </div>
        <div class="c-content">
            <div class="container-containr">

            <slot />
            </div>
        </div>



    </div>
</div>

{:else}

Not logged in

{/if}