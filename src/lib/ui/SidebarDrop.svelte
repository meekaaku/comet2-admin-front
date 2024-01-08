<script lang="ts">
import { Icon } from '$lib/ui';

export let id = Math.random().toString(36).substring(7);
export let icon = '';
export let name = '';



</script>
<style>
.accordion-item {
    color: #aaa;
    border: none;
    background-color: #222;
}

.accordion-button:hover {
    color: white;
}

.accordion-button {
    color: #aaa;
    background-color: #111;
}

.accordion-body {
    padding-left: 1.5rem;
}


</style>


<div class="accordion-item">
    <h6 class="accordion-header" id="flush-headingOne">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#{id}" aria-expanded="false" aria-controls="flush-collapseOne">
        <Icon icon={icon}></Icon>{name}
    </button>
    </h6>
    <div id="{id}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <slot />
            </ul>
        </div>
    </div>
</div>