<script lang="ts">
import { SidebarDrop, SidebarLink } from '$lib/ui';
let sidebarElement: HTMLElement;

function toggle()
{
    console.log("toggle");
    sidebarElement.style.marginLeft = (sidebarElement.style.marginLeft == "0px") ? "-240px" : "0px";
}
</script>
<style>

.closed {
    margin-left: -240px;
}

.open {
    margin-left: 0;
}

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


.accordion-item {
    color: #ccc;
    border: none;
    background-color: #222;
}
.accordion-button {
    color: #ccc;
    background-color: #111;
}

</style>





<div class="c-container">
    <div bind:this={sidebarElement} class="c-sidebar">
    
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="logo" style="height: 3rem;">
                Logo
            </div>

            <SidebarDrop name="Catalog" icon="bi-book">
                <SidebarLink name="Products" icon="bi-person" url="/" />
                <SidebarLink name="Collections" icon="bi-activity" url="/" />
            </SidebarDrop>


            <SidebarDrop name="Sales" icon="bi-activity">
                <SidebarLink name="Orders" icon="bi-person" url="/" />
                <SidebarLink name="Customers" icon="bi-person" url="/" />
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
