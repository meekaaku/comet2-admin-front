<script lang="ts">
import { base } from '$app/paths'
import { goto } from '$app/navigation';
import { SidebarDrop, SidebarLink, Icon, Progress } from '$lib/ui';
import { user } from '$lib/stores';
import { comet } from '$lib';
import { onMount } from 'svelte';



let sidebarElement: HTMLElement;
let loggedin = false;

function toggle()
{
    sidebarElement.style.marginLeft = (sidebarElement.style.marginLeft == "0px") ? "-240px" : "0px";
}


async function init()
{
    //const token = localStorage.getItem('token');
    const token = 'safd' ;
    
    if(!token){
        goto(`${base}/login`);
        return;
    }

    try
    {
        //const data = await comet.auth.validateToken(token);
        loggedin = true;
    }
    catch(e)
    {
        //goto(`${base}/login`);

    }
}

onMount(init);

console.log('App Layout loaded');
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




    

{#if loggedin}


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
                    {$user.username}
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