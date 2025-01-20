<script lang="ts">
	import { AuthGuard, Title, Toolbar, Button } from '$lib/ui';


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


</AuthGuard>