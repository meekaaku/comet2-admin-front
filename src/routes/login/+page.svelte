<script lang="ts">
import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { comet, logger } from '$lib'

let tenant= '';
let username = '';
let password = '';
let error_data: any|null = null;
let busy = false;

async function login()
{
	try 
	{
		error_data = null;
		busy  = true;
		const data = await comet.auth.login({tenant, username, password})
		busy = false;
		goto(`${base}/app`);

	}
	catch (e: any)
	{
		console.log(e);
		busy = false;
		error_data = e.response.data;
	}
}
</script>
<main class="d-flex w-100">
		<div class="container d-flex flex-column">
			<div class="row vh-100">
				<div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
					<div class="d-table-cell align-middle">

						<div class="text-center mt-4">
							<h1 class="h2">Login</h1>
							<p class="lead">
								Sign in to your account
							</p>
						</div>

						<div class="card">
							<div class="card-body">
								<div class="m-sm-3">
									<form on:submit|preventDefault={login}>
										<div class="mb-3 form-floating">
											<input class="form-control form-control-lg" bind:value={tenant} type="text" name="tenant_username" placeholder=" You Organisation" />
											<label class="form-label">Organisation</label>
										</div>									


										<div class="mb-3 form-floating">
											<input class="form-control form-control-lg" bind:value={username} type="text" name="username" placeholder="Enter your username" />
											<label class="form-label">Username</label>
										</div>
										<div class="mb-3 form-floating">
											<input class="form-control form-control-lg" bind:value={password} type="password" name="password" placeholder="Enter your password" />
											<label class="form-label">Password</label>
										</div>
										<div>
											<div class="form-check align-items-center d-none">
												<input id="customControlInline" type="checkbox" class="form-check-input" value="remember-me" name="remember-me" checked>
												<label class="form-check-label text-small" for="customControlInline">Remember me</label>
											</div>
										</div>
										<div class="d-grid gap-2 mt-3">
											<button type="submit" class="btn btn-lg btn-primary">
											{#if busy}
												<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
												Loggin in 
											{:else}
												Login
											{/if}
											</button>
										</div>
									</form>
								

									<div class="text-center mb-3">
										<span class="text-danger">{error_data?.message ? error_data.message : ''} &nbsp</span>
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