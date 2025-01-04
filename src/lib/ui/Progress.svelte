<script lang="ts">
	import { navigating } from '$app/stores';
	import { progress, loading } from '$lib/stores';

	function check() {
		if ($navigating || $loading) {
            if($progress < 50){
                $progress += 2;
            }
            else if($progress < 75){
                $progress += 1;
            }
            else if($progress < 95){
                $progress += 0.5;
            }
            else {
                $progress += 0;
            }

            //$progress += $progress < 50 ? 5 : 2;
            if($progress >= 100){
                $progress = 0;
            }
            else {
                setTimeout(() => check(), 100);
            }

		} else {
			$progress = 0;
		}
	}

	check();
</script>

{#if $progress != 0}
	Progress: <progress value={50} max="100"></progress>
{/if}

<style>
	progress {
		position: fixed;
		top: 0px;
		height: 3px;
		padding: 0;
		margin: 0;
		width: 100%;
		z-index: 3000;
	}
</style>
