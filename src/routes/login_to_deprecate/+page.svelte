<script lang="ts">
	import { base } from '$app/paths';
	import { login } from '$lib/auth';
	import { Button, Toaster } from '$lib/ui';
	import { $loading } from '$lib/stores';
	import { notify } from '$lib/utils';

	let tenant = $state('');
	let username = $state('');
	let password = $state('');
	let error_data: any | null = null;
	let busy = false;

	async function onLoginClick() {
		try {
			$loading = true;
			await login(tenant, username, password, `${base}/app`);
			$loading = false;
		} catch (e: any) {
			const message = e.response?.data?.message || 'An error occurred. Pls check connection';
			$loading = false;
			busy = false;
			notify({ type: 'error', heading: 'Error', message });
		}
	}
</script>

<Toaster></Toaster>
<main class="d-flex w-100">
	<div class="container d-flex flex-column">
		<div class="row vh-100">
			<div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
				<div class="d-table-cell align-middle">
					<div class="text-center mt-4">
						<h1 class="h2">Login</h1>
						<p class="lead">Sign in to your account</p>
					</div>

					<div class="card">
						<div class="card-body">
							<div class="m-sm-3">
								<form onsubmit={preventDefault(onLoginClick)}>
									<div class="mb-3 form-floating">
										<input
											class="form-control"
											bind:value={tenant}
											type="text"
											name="tenant_username"
											placeholder=" You Organisation"
										/>
										<label class="form-label">Organisation</label>
									</div>

									<div class="mb-3 form-floating">
										<input
											class="form-control"
											bind:value={username}
											type="text"
											name="username"
											placeholder="Enter your username"
										/>
										<label class="form-label">Username</label>
									</div>
									<div class="mb-3 form-floating">
										<input
											class="form-control"
											bind:value={password}
											type="password"
											name="password"
											placeholder="Enter your password"
										/>
										<label class="form-label">Password</label>
									</div>
									<div>
										<div class="form-check align-items-center d-none">
											<input
												id="customControlInline"
												type="checkbox"
												class="form-check-input"
												value="remember-me"
												name="remember-me"
												checked
											/>
											<label class="form-check-label text-small" for="customControlInline"
												>Remember me</label
											>
										</div>
									</div>
									<div class="d-grid gap-2 mt-3">
										<Button
											busytext="Logging in"
											color="primary"
											on:click={onLoginClick}
											icon="bi-box-arrow-in-right"
											busy={$loading}
											disabled={$loading}
										>
											&nbsp;Login</Button
										>
										<input type="submit" class="d-none" />
									</div>
								</form>

								<div class="text-center mb-3">
									<span class="text-danger"
										>{error_data?.message ? error_data.message : ''} &nbsp</span
									>
								</div>
							</div>
						</div>
					</div>

					<div class="text-center mb-3 d-none">
						Don't have an account? <a href="pages-sign-up.html">Sign up</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
