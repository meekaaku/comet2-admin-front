<script lang="ts">
	import { AuthGuard, Title, Toolbar, Button } from '$lib/ui';
	import type { PageData } from './$types';
	import type { RPaginated } from '$lib/types';
	import { isBoolean } from '$lib/utils';


	let { data }: { data: PageData } = $props();

	let roles: Record<string,string>[] = [];

	let selectedAcl = $state<any>([]);

	const uniqueRoleIds = Array.from(new Set(data.list.map((item: any) => item.role_id)));
	uniqueRoleIds.forEach((id: any) => {
		roles.push({id: id, name: data.list.find((item: any) => item.role_id === id)?.role_name || ''});
	});

	let selectedRole = $state<{id: string, name: string}>(roles[0] as {id: string, name: string});

	$effect(() => {

		//const unique_resource_names = Array.from(new Set(data.list.map((item: any) => item.resource_name)));

		const _acl = data.list.filter((item: any) => item.role_id === selectedRole.id);
		selectedAcl = _acl;
		//acl = _acl.map((item: any) => ({resource_name: item.resource_name, access: item.access}));

			/*
		unique_role_ids.forEach((id: any) => {
			roles.push({id: id, name: data.list.find((item: any) => item.role_id === id)?.role_name || ''});
		});
		*/
		
	

	});

</script>

{#snippet renderAccess(access: any)}
	{#if isBoolean(access)}
		<span class="badge" class:bg-success={access} class:bg-danger={!access}>{access ? 'true' : 'false'}</span>
	{:else if Array.isArray(access)}
		{#each access as a}
		<span class="badge bg-success">{a}</span>&nbsp;
		{/each}
	{:else}
		none
	{/if}	
{/snippet}

{#snippet aclSnippet(acl: any)}
	<span>{acl.resource_name}</span>

	<span>
		{#if acl.resource_data?.type === 'boolean'}		
			<span class="badge bg-success">{acl.access ? 'true' : 'false'}</span>
		{:else if acl.resource_data.type === 'select'}
		 	{JSON.stringify(acl.resource_data.options)}
			{#each acl.resource_data.options as opt}
				<span class="badge">{opt}</span>
			{/each}
		{:else}
			<span class="badge bg-danger">none</span>
		{/if}		
	</span>
{/snippet}


<AuthGuard permissions="admin.role:list">
	<Title>Roles</Title>
	<Toolbar>
		<Button
			width="5em"
			icon="bi-plus-lg"
			size="sm"
			color="primary"
			disabled>Add</Button
		>

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
			<div class="col-md-4">
				<ul class="list-group">
					<li class="list-group-item fw-bold">Resource</li>
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


</AuthGuard>

<style>

	.list-group-item {
		cursor: pointer;
	}
</style>