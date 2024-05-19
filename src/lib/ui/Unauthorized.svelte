
<!-- <div class="alert alert-danger" role="alert"> -->
<div class="outer">
    <div class="alert alert-danger" role="alert">
    <slot></slot>
    </div>
</div>

<style>
.outer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 8em);
}
</style>