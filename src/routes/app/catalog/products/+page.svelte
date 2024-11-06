<script lang="ts">
import { onNavigate, beforeNavigate } from '$app/navigation';
import { loading } from '$lib/stores';
import { assertPermission, hasPermission, getPermission } from '$lib/auth';
import { Unauthorized, Title, Toolbar, Button } from '$lib/ui';
import { comet } from '$lib';

let authError:string|null = $state(null);
let access: string = '';
let importDropdownOpen: boolean = $state(false);
let file: File|null = null;
let uploadReady: boolean = $state(false);
let message: string|null = $state(null);

onNavigate(() => {
    console.log('onNavigate at products');
      
});

beforeNavigate(() => {
    console.log('beforeNavigate at products');
});



try {
    assertPermission('catalog.product:list');
}
catch(e: any) {
    authError = e.message || 'Some unknown error';
}

async function onUploadClick() {
    console.log('onUploadClick, uploading file', file);
    if (!file) return;


    const formData = new FormData();

    formData.append('file', file);

    $loading = true;
    try {
        message = null;
        $loading = true;
        const upload_response = await comet.catalog.products.uploadCSV(formData);
        /*
        uploaded = true;
        setTimeout(() => {
            upload_button_text = 'Upload';
        }, 5000);
        */

        $loading = false;
    } catch (error: any) {
        $loading = false;
        if (error.response) {
            message = error.response.data.message;
        } else {
            message = 'An error occurred. Please try again later';
        }
    }


}

function onFileSelect(e: Event) {
    console.log('onFileSelect', e);

    const input = e.target as HTMLInputElement;
    if (input.files) {
      uploadReady = true;
      file = input.files[0];
    }
}



</script>



{#if authError}
<Unauthorized>
    {authError} 
</Unauthorized>

{:else}

<Title>Products</Title>

<Toolbar>


    <div class="dropdown d-inline-block ms-2">
        <Button
            width="8em" icon="bi-caret-down"
            size="sm" color="primary"  disabled={$loading}
            on:click={() => importDropdownOpen = !importDropdownOpen}
        >
            Import
        </Button>

        {#if importDropdownOpen}

        <div class="dropdown-menu dropdown-menu-end p-3 show" style="min-width: 300px; right: 1em; z-index: 1000;">
            <div class="mb-3">
                <label for="fileUpload" class="form-label">Choose file to upload</label>
                <input class="form-control form-control-sm" type="file" id="fileUpload" onchange={onFileSelect}  accept=".csv">
            </div>
            <div class="d-grid">
                <Button size="sm" color="primary" on:click={onUploadClick} disabled={!uploadReady || $loading} busy={$loading} busytext="Uploading...">Upload</Button>
            </div>

            {#if message}
            <div class="alert alert-danger mt-3" role="alert">
                {message}
            </div>
            {/if}
        </div>
        {/if}

    </div>
</Toolbar>



<div style="height: 500px;">Product list goes here</div>
{/if}