<script lang="ts">
import { base } from '$app/paths'
import { SidebarDrop, SidebarLink } from '$lib/ui';
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

.c-container 
{
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    background-color: lightblue;
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
}

.c-main 
{
    display: flex;
    flex-direction: column;
    background-color: chartreuse;
    width: 100%;
}
.c-navbar 
{
    
    min-height: 3em;
    
    background-color: bisque;
    width: 100%;
}

.c-content{
    background-color: aqua;
    overflow: scroll;
}




</style>





<div class="c-container">
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
            </SidebarDrop>

        </div>
    </div>
    <div class="c-main">
        <div class="c-navbar sticky-top">
             <button on:click={toggle}><i class="bi bi-layout-text-sidebar-reverse"></i></button>
             nav links here
        </div>
        <div class="c-content">


            <slot />
        </div>



    </div>
</div>
