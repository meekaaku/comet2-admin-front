
export let loading = $state({loading: false, progress: 0});

export function startLoading() {
    loading.loading = true;
    loading.progress = 0;
}

export function stopLoading() {
    loading.loading = false;
    loading.progress = 0;
}