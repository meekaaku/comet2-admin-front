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

.accordion-button:after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23aaaaaa'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}
.accordion-button:not(.collapsed)::after{
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23aaaaaa'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
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