<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { SidebarDrop, SidebarLink, Icon, Progress, About, Toaster } from '$lib/ui';
	import { profile } from '$lib/stores';
	import { logout, login, refresh, hasPermission } from '$lib/auth';
	import { version } from '$lib/constants';
	import { comet } from '$lib';

	interface Props {
		children?: import('svelte').Snippet;
	}

	/* @ts-ignore */
	let { data, children }: Props = $props();

	let sidebarElement: HTMLElement;
	let mainElement: HTMLElement;
	let navElement: HTMLElement;

	function toggle() {
		const w = screen.width < 768 ? '-400px' : '-240px';
		if (sidebarElement && sidebarElement.style.marginLeft == '0px') {
			//sidebarElement.style.marginLeft = "-240px";
			sidebarElement.style.marginLeft = w;
		} else if (sidebarElement) {
			sidebarElement.style.marginLeft = '0px';
		}
	}

	async function init() {
		try {
			await refresh();
		} catch (e) {
			goto(`${base}/login`);
		}
	}


	function generateAvatarUrl(fullName: string, options: any = {}) {
    // Default options
		const {
			backgroundColor = '#6366F1', // Indigo
			textColor = '#FFFFFF',
			size = 100,
			fontSize = size / 2
		} = options;

		// Extract initials from name
		const names = fullName.trim().split(/\s+/);
		let initials = '';
		
		if (names.length === 1) {
			// If only one name, use first two letters
			initials = names[0].substring(0, 2).toUpperCase();
		} else {
			// Use first letter of first name and first letter of last name
			initials = (names[0][0] + names[names.length - 1][0]).toUpperCase();
		}

		// Create canvas
		const canvas = document.createElement('canvas');
		canvas.width = size;
		canvas.height = size;
		const context = canvas.getContext('2d');
		if(!context) return '';

		// Draw background
		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, size, size);

		// Draw text
		context.fillStyle = textColor;
		context.font = `${fontSize}px Arial`;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText(initials, size / 2, size / 2);

		// Convert to data URL
		return canvas.toDataURL('image/png');
	}

	onMount(init);
</script>

{#if $profile}
	<Progress></Progress>
	<Toaster></Toaster>
	<div class="master">
		<div bind:this={sidebarElement} class="c-sidebar">
			<div class="accordion accordion-flush" id="accordionFlushExample">
				<div class="logo" style="height: 3rem;">Logo</div>

				<SidebarDrop name="Catalog" icon="bi-book">
					<SidebarLink
						name="Products"
						icon="bi-person"
						{toggle}
						url="{base}/app/catalog/products"
					/>
					<SidebarLink
						name="Collections"
						icon="bi-activity"
						{toggle}
						url="{base}/app/catalog/collections"
					/>
				</SidebarDrop>

				<SidebarDrop name="Sales" icon="bi-bar-chart">
					<SidebarLink name="Orders" icon="bi-person" {toggle} url="{base}/app/sales/orders/list" />
					<SidebarLink
						name="Customers"
						icon="bi-person"
						{toggle}
						url="{base}/app/sales/customers"
					/>
					<SidebarLink
						name="Shipments"
						icon="bi-person"
						{toggle}
						url="{base}/app/sales/customers"
					/>
				</SidebarDrop>

				<SidebarDrop name="Finance" icon="bi-cash-coin">
					<SidebarLink name="Rules" icon="bi-person" {toggle} url="{base}/app/finance/rules/list" />
					<SidebarLink
						name="Profit & Loss"
						icon="bi-person"
						{toggle}
						url="{base}/app/finance/profitloss"
					/>
					<SidebarLink
						name="Balance Sheet"
						icon="bi-person"
						{toggle}
						url="{base}/app/finance/balancesheet"
					/>
				</SidebarDrop>

				{#if hasPermission('menu.admin')}
					<SidebarDrop name="Admin" icon="bi-gear">
						<SidebarLink
							name="Roles"
							icon="bi-person"
							{toggle}
							url="{base}/app/sales/orders/list"
						/>
						<SidebarLink name="Users" icon="bi-person" {toggle} url="{base}/app/sales/customers" />
						<SidebarLink
							name="Access Control"
							icon="bi-person"
							{toggle}
							url="{base}/app/sales/customers"
						/>
					</SidebarDrop>
				{/if}
				<div style="bottom: 0; left: 2em; position: absolute;" class="text-center">
					{version} ({data.build})
				</div>
			</div>
		</div>

		<div bind:this={mainElement} class="c-main">
			<div bind:this={navElement} class="c-navbar sticky-top shadow">
				<div>
					<button type="button" class="btn" onclick={toggle}
						><Icon icon="bi-layout-text-sidebar-reverse" /></button
					>
				</div>


				<div class="dropdown" style="margin-left: auto; margin-right: 1em;">




					<button
						class="btn"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>

					<Icon icon="bi-bell" /><span class="badge bg-danger" style="margin-left: -0.4rem; top: -0.6rem; font-size: 0.6rem;padding: 0.2rem">1</span>
					</button>
					<ul class="dropdown-menu" style="z-index: 100; width: 25em;">
						<li><a class="dropdown-item" href="#">Notification 1</a></li>
						<li><a class="dropdown-item" href="#">Notification 2</a></li>
						<li><a class="dropdown-item" href="#">Notification 3</a></li>
						<li><a class="dropdown-item" href="#">Notification 4</a></li>
						<li><a class="dropdown-item" href="#">Notification 5</a></li>
						<li><a class="dropdown-item" href="#">Notification 6</a></li>
						
					</ul>






					<button
						class="btn dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
					<img src={generateAvatarUrl($profile?.name)} alt="Avatar" style="width: 2em; height: 2em; border-radius: 50%;" />
					</button>
					<ul class="dropdown-menu" style="z-index: 100; width: 15em;">
						<li>
							<span class="dropdown-item-text">{$profile?.name}</span>
						</li>
						<li><hr class="dropdown-divider" /></li>
						<li>
							<a class="dropdown-item" href="#"
								><Icon icon="bi-person-lines-fill"></Icon>&nbsp; Profile</a
							>
						</li>
						<li><hr class="dropdown-divider" /></li>
						<li>
							<a class="dropdown-item" href="#" onclick={logout}>
								<Icon icon="bi-box-arrow-right"></Icon>&nbsp; Logout</a
							>
						</li>
					</ul>

				</div>

			</div>
			<div class="c-content">
				{@render children?.()}
			</div>
		</div>
	</div>
{:else}
	<About></About>
{/if}

<style>
	.master {
		display: flex;
		flex-direction: row;
		width: 100vw;
		height: 100vh;
	}

	.c-sidebar {
		display: flex;
		flex-direction: column;
		width: 240px;
		background-color: #111;
		height: 100%;
		color: white;
		opacity: 0.8;
		transition: 0.2s;
		overflow-y: scroll;
		scrollbar-width: thin;
	}

	.c-main {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: white;
	}
	.c-navbar {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
		min-height: 3em;
		width: 100%;

		/*
    -webkit-box-shadow: 0px 3px 5px 0px rgba(79,79,79,0.49);
    -moz-box-shadow: 0px 3px 5px 0px rgba(79,79,79,0.49);
    box-shadow: 0px 3px 5px 0px rgba(79,79,79,0.49);
    */
	}

	.c-content {
		padding: 1rem;
		overflow-y: auto;
	}

	@media screen and (max-width: 768px) {
		.c-sidebar {
			margin-left: -400px;
			width: 400px;
		}
	}

	/*
@media screen and (max-width: 768px) {
    .c-sidebar{
        width: 400px;
    }
}
*/
</style>
