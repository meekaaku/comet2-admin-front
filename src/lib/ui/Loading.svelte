<script lang="ts">
	interface Props {
		message?: string;
	}

	let { message = '$loading...' }: Props = $props();
</script>

<main class="d-flex w-100">
	<div class="container d-flex flex-column">
		<div class="row" style="height: 80vh">
			<div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
				<div class="d-table-cell align-middle">
					<div class="text-center mt-4">
						<p>
							<span class="spinner-border" role="status" aria-hidden="true"></span>&nbsp;
						</p>
						<p class="lead">
							{message}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
