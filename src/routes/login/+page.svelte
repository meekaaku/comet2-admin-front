<script lang="ts">
import { goto } from '$app/navigation';
import { comet } from '$lib'

let tenant_username = '';
let user_username = '';
let user_password = '';
let error_data: any|null = null;

async function login()
{
	try 
	{
		error_data = null;
		const { token } = await comet.auth.login({tenant_username, user_username, user_password})
		comet.setHeader('Authorization', `Bearer ${token}`);
		goto('/app');

	}
	catch (e: any)
	{
		console.log(e);
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
								Sign in to your account to continue
							</p>
						</div>

						<div class="card">
							<div class="card-body">
								<div class="m-sm-3">
									<form on:submit|preventDefault={login}>
										<div class="mb-3 form-floating">
											<input class="form-control form-control-lg" bind:value={tenant_username} type="text" name="tenant_username" placeholder=" You Organisation" />
											<label class="form-label">Organisation</label>
										</div>									


										<div class="mb-3 form-floating">
											<input class="form-control form-control-lg" bind:value={user_username} type="text" name="username" placeholder="Enter your username" />
											<label class="form-label">Username</label>
										</div>
										<div class="mb-3 form-floating">
											<input class="form-control form-control-lg" bind:value={user_password} type="password" name="password" placeholder="Enter your password" />
											<label class="form-label">Password</label>
										</div>
										<div>
											<div class="form-check align-items-center d-none">
												<input id="customControlInline" type="checkbox" class="form-check-input" value="remember-me" name="remember-me" checked>
												<label class="form-check-label text-small" for="customControlInline">Remember me</label>
											</div>
										</div>
										<div class="d-grid gap-2 mt-3">
											<a href="#" class="btn btn-lg btn-primary d-none" on:click={login}>Login</a>
											<button type="submit" class="btn btn-lg btn-primary">Login</button>
										</div>
									</form>
								

									{#if error_data}
									<div class="text-center mb-3">
										<span class="text-danger">{error_data.message}</span>
									</div>
									{/if}

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