<script lang="ts">
	import { AuthGuard, Title, Toolbar, Button } from '$lib/ui';
	import type { PageData } from './$types';
	import type { RPaginated } from '$lib/types';
	let { data }: { data: PageData } = $props();
	//let list = $state(data.list);
	//let roles = $state<{id: string, name: string}[]>([]);

	let roles: Record<string,string>[] = [];
	let currentRole = $state<{id: string, name: string}>({id: '', name: ''});

	let acl = $state<{resource_name: string, access: any}[]>([]);

	let resources = $state<string[]>([]);
	let access = $state<any>({})
	const uniqueRoleIds = Array.from(new Set(data.list.map((item: any) => item.role_id)));
	uniqueRoleIds.forEach((id: any) => {
		roles.push({id: id, name: data.list.find((item: any) => item.role_id === id)?.role_name || ''});
	});

	$effect(() => {

		//const unique_resource_names = Array.from(new Set(data.list.map((item: any) => item.resource_name)));

		const _acl = data.list.filter((item: any) => item.role_id === currentRole.id);
		acl = _acl.map((item: any) => ({resource_name: item.resource_name, access: item.access}));

			/*
		unique_role_ids.forEach((id: any) => {
			roles.push({id: id, name: data.list.find((item: any) => item.role_id === id)?.role_name || ''});
		});
		*/
		
	

	});

</script>

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
					<li class="list-group-item">Role</li>
					{#each roles as role}
						<li class="list-group-item" class:active={currentRole.id === role.id} aria-current="true" onclick={() => currentRole = role}>{role.name}</li>
					{/each}
				</ul>
			</div>
			<div class="col-md-4">
				<ul class="list-group">
					<li class="list-group-item">Resource</li>
					{#each acl as ac}
						<li class="list-group-item">{ac.resource_name} : {ac.access}</li>
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