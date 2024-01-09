<script lang="ts">
import { base } from '$app/paths'
import { SidebarDrop, SidebarLink, Icon } from '$lib/ui';
let sidebarElement: HTMLElement;

function toggle()
{
    console.log("toggle");
    sidebarElement.style.marginLeft = (sidebarElement.style.marginLeft == "0px") ? "-240px" : "0px";
}
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
}
.c-navbar 
{
    display: flex;
    flex-direction: row;
    background-color: white;
    min-height: 3em;
    width: 100%;

    box-shadow: 0px 15px 5px -15px rgba(0,0,0,0.65);    
    border-bottom: solid 1px #eee;

   /* box-shadow: 0px -4px 24px 0px rgba(0,0,0,0.65); */
}

.c-content{
    padding-top: 1rem;
    overflow-y: scroll;
    background-color: #eee;
}




</style>





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
             <button type="button" class="btn btn-link" on:click={toggle}><Icon icon="bi-layout-text-sidebar-reverse" /></button>

             nav links here
        </div>
        <div class="c-content">
            <div class="container-containr">

            <slot />
            </div>
        </div>



    </div>
</div>
