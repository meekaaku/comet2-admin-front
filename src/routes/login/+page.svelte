<script lang="ts">
import { comet } from '$lib'

let tenant_username = '';
let user_username = '';
let user_password = '';
async function login()
{
	const token = await comet.auth.login({tenant_username, user_username, user_password})
	console.log({token});
}
</script>
<main class="d-flex w-100">
		<div class="container d-flex flex-column">
			<div class="row vh-100">
				<div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
					<div class="d-table-cell align-middle">

						<div class="text-center mt-4">
							<h1 class="h2">Admin</h1>
							<p class="lead">
								Sign in to your account to continue
							</p>
						</div>

						<div class="card">
							<div class="card-body">
								<div class="m-sm-3">
									<form>
										<div class="mb-3">
											<label class="form-label">Organisation</label>
											<input class="form-control form-control-lg" bind:value={tenant_username} type="text" name="tenant_username" placeholder="Organisation" />
										</div>									


										<div class="mb-3">
											<label class="form-label">Username</label>
											<input class="form-control form-control-lg" bind:value={user_username} type="text" name="username" placeholder="Enter your username" />
										</div>
										<div class="mb-3">
											<label class="form-label">Password</label>
											<input class="form-control form-control-lg" bind:value={user_password} type="password" name="password" placeholder="Enter your password" />
										</div>
										<div>
											<div class="form-check align-items-center d-none">
												<input id="customControlInline" type="checkbox" class="form-check-input" value="remember-me" name="remember-me" checked>
												<label class="form-check-label text-small" for="customControlInline">Remember me</label>
											</div>
										</div>
										<div class="d-grid gap-2 mt-3">
											<a href="#" class="btn btn-lg btn-primary" on:click={login}>Login</a>
										</div>
									</form>
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