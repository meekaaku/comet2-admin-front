<script lang="ts">
	import { AuthGuard, Title, Toolbar, Button } from '$lib/ui';
	import type { PageData } from './$types';
	import type { RAccessControl } from '$lib/types';
	import { loader } from '$lib/stores.svelte';
	import { comet } from '$lib';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();
	let selectedAcl = $state<RAccessControl[]>([]);
	let roles: {id: string, name: string}[] = [];

	const uniqueRoleIds = Array.from(new Set(data.list.map((item: any) => item.role_id)));
	uniqueRoleIds.forEach((id: any) => {
		roles.push({id: id, name: data.list.find((item: any) => item.role_id === id)?.role_name || ''});
	});

	let selectedRole = $state<{id: string, name: string}>(roles[0] as {id: string, name: string});


	type TPageState = {
		isDirty: boolean;
		isSaving: boolean;
	}

	let pageState: TPageState = $state<TPageState>({
		isDirty: false,
		isSaving: false
	});



	$effect(() => {
		selectedAcl = data.list.filter((item: any) => item.role_id === selectedRole.id);
	});


	function onAccessClick(acl: RAccessControl, opt: string|boolean) {
		console.log({acl, opt});
		if(acl.resource_data.type === 'boolean') {
			acl.access = opt;
		} 
		else if(acl.resource_data.type === 'select' && Array.isArray(acl.resource_data.options)) {
			if(Array.isArray(acl.access)) {
				if(acl.access.includes(opt)) {
					acl.access = acl.access.filter((a: any) => a !== opt);
				} else {
					acl.access.push(opt);
				}
			} else {
				acl.access = [opt];
			}
		}
	}


	async function onSaveClick() {
		loader.start();
		try { 
			pageState.isSaving = true;
			const payload =  selectedAcl.map((acl: RAccessControl) => {
				return {id: acl.acl_id, role_id: acl.role_id, resource_name: acl.resource_name, access: JSON.stringify(acl.access)};
			});
			const response = await comet.admin.accessControl().upsert(payload);
			goto(``, { invalidateAll: true });
		} catch (error: any) {
			console.error(error);
		}

		loader.stop();
		pageState.isSaving = false;
		pageState.isDirty = false;
	}

</script>



{#snippet aclSnippet(acl: RAccessControl)}
	<span>{acl.resource_name}</span>

	<span>
		{#if acl.resource_data?.type === 'boolean'}		
			<span class="badge" class:bg-success={acl.access} class:bg-secondary={!acl.access} onclick={() => onAccessClick(acl, true)}>true</span>
			<span class="badge" class:bg-success={!acl.access} class:bg-secondary={acl.access} onclick={() => onAccessClick(acl, false)}>false</span>
		{:else if acl.resource_data.type === 'select' && Array.isArray(acl.resource_data.options)}
			{#if Array.isArray(acl.access)}
			{#each acl.resource_data.options as opt}
				<span class="badge mx-1" class:bg-success={acl.access?.includes(opt)} class:bg-secondary={!acl.access?.includes(opt)} onclick={() => onAccessClick(acl, opt)}>{opt}</span>
			{/each}
			{:else}
			{#each acl.resource_data.options as opt}
				<span class="badge mx-1 bg-secondary" onclick={() => onAccessClick(acl, opt)}>{opt}</span>
			{/each}
			{/if}
		{:else}
			<span class="badge bg-danger">Missing data</span>
		{/if}		
	</span>
{/snippet}


	<Title>Roles</Title>
	<Toolbar>
		<form method="POST" action="?/save">
			<input type="hidden" name="role_id" value={selectedRole?.id} />
			<input type="hidden" name="acl" value={JSON.stringify(selectedAcl)} />
			<Button width="8em" icon="bi-floppy"  color="primary" busytext="Saving..." busy={pageState.isSaving} onclick={onSaveClick} disabled={pageState.isSaving}>Save</Button>
		</form>
	</Toolbar>

	

	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4">
				<ul class="list-group">
					<li class="list-group-item fw-bold">Role</li>
					{#each roles as role}
						<li class="list-group-item" class:active={selectedRole.id === role.id} aria-current="true" onclick={() => selectedRole = role}>{role.name}</li>
					{/each}
				</ul>
			</div>
			<div class="col-md-6">
				<ul class="list-group">
					<li class="list-group-item fw-bold d-flex justify-content-between"><span>Resource</span><span>Access</span></li>
					{#each selectedAcl as acl}
						<li class="list-group-item d-flex justify-content-between">{@render aclSnippet(acl)}</li>
					{/each}
				</ul>
			</div>
			<div class="col-md-4">
				<!-- Column 3 content -->
			</div>
		</div>
	</div>

	<!-- 
	<table class="ct-table table table-sm table-striped">
		<thead>
			<tr>
				<th style="width: 8%" class="text-center">Name</th>
				<th style="width: 3%" class="text-center">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each list.items as role}
				<tr>
					<td data-label="Name" class="text-left align-middle">{role.name}</td>
					<td data-label="Action" class="text-center align-middle">
						<a href={`view?id=${role.id}`}>View</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
-->



<style>

	.list-group-item {
		cursor: pointer;
	}
</style>