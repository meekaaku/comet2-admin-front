<script lang="ts">
	import type {
		RTransactionLineList,
		RPaginated,
		RSourceLine,
		RFinanceClass,
		RAccountTransaction
	} from '$lib/types';
	import { Dialog, DialogBody, DialogFooter, Button } from '$lib/ui';
	import { formatDate, formatNumber, notify } from '$lib/utils';
	import { loading } from '$lib/stores';
	import { comet } from '$lib';

	interface Props {
		open?: boolean;
		data: RPaginated<RAccountTransaction> | undefined;
	}

	let { open = $bindable(false), data }: Props = $props();

	let cashbookLine: RSourceLine | undefined = $state(undefined);
	let classes: RFinanceClass[] = $state([]);
	let step: 'transactionline' | 'cashbookline' = $state('transactionline');
	let title = 'Profit & Loss Transactions';
	let size: 'lg' | 'sm' | 'xl' | '' = $state('lg');
	let selected_class_id: string | null = $state(null);

	async function onViewSourceClick(id: string | null) {
		if (!id) return;
		try {
			$loading = true;
			cashbookLine = await comet.finance.sources.line(id);
			selected_class_id = cashbookLine.class_id;
			classes = await comet.finance.classes.all();
			$loading = false;
			step = 'cashbookline';
			size = '';
		} catch (error: any) {
			const message = error.response?.data?.message || 'An error occurred. Pls check connection';
			notify({ type: 'error', heading: 'Error', message });
			$loading = false;
		}
	}

	async function saveSourceLine() {
		if (!selected_class_id) return;
		try {
			$loading = true;
			const updated = await comet.finance.sources.updateLine(cashbookLine.id, {
				class_id: selected_class_id
			});
			notify({ type: 'info', heading: 'Success', message: 'Changes saved successfully' });
			$loading = false;
			step = 'transactionline';
		} catch (error: any) {
			const message = error.response?.data?.message || 'An error occurred. Pls check connection';
			notify({ type: 'error', heading: 'Error', message });
			$loading = false;
		}
	}
</script>

<Dialog {size} title={`${title} ${step === 'cashbookline' ? '- Source' : ''}`} bind:open>
	{#if step === 'transactionline' && data}
		<DialogBody>
			<table class="ct-table table table-sm table-striped table-hover">
				<thead>
					<tr>
						<th class="text-center">Date</th>
						<th class="text-center">Description</th>
						<th class="text-center">Name</th>
						<th class="text-center">Amount</th>
						<th class="text-center">Source</th>
					</tr>
				</thead>
				<tbody>
					{#each data.items as item}
						<tr>
							<td data-label="Date" class="text-start">{formatDate(item.date_created)}</td>
							<td data-label="Description" class="text-start">
								{item.description || ''}
								{#if item.line_description}
									({item.line_description}){/if}
							</td>
							<td data-label="Name" class="text-start">{item.name || ''}</td>
							<td data-label="Amount" class="text-end">
								<a href="#" class="link-dark" onclick={() => onViewSourceClick(item.source_line_id)}
									>{item.currency_code} {formatNumber(item.amount)}</a
								>
							</td>
							<td data-label="Source" class="text-start">
								{item.source_name}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</DialogBody>
		<DialogFooter>
			<Button color="danger" icon="bi-x-lg" on:click={() => (open = false)}>Close</Button>
		</DialogFooter>
	{:else if step === 'cashbookline' && cashbookLine}
		<DialogBody>
			<form>
				<div class="form-floating form-control-sm mb-3">
					<input
						type="text"
						value={cashbookLine.id}
						class="form-control"
						id="name"
						placeholder={cashbookLine.id}
						disabled
					/>
					<label for="floatingInput">Id</label>
				</div>

				<div class="form-floating form-control-sm mb-3">
					<input
						type="text"
						value={cashbookLine.source_name}
						class="form-control"
						id="name"
						placeholder={cashbookLine.source_name}
						disabled
					/>
					<label for="floatingInput">Source</label>
				</div>
				<div class="form-floating form-control-sm mb-3">
					<input
						type="text"
						value={`${formatDate(cashbookLine.date_created)}`}
						class="form-control"
						id="name"
						placeholder="date created"
						disabled
					/>
					<label for="floatingInput">Date</label>
				</div>
				<div class="form-floating form-control-sm mb-3">
					<input
						type="text"
						value={cashbookLine.reference}
						class="form-control"
						id="name"
						placeholder="date settled"
						disabled
					/>
					<label for="floatingInput">Reference</label>
				</div>
				<div class="form-floating form-control-sm mb-3">
					<input
						type="text"
						value={cashbookLine.name}
						class="form-control"
						id="name"
						placeholder="date settled"
						disabled
					/>
					<label for="floatingInput">Name</label>
				</div>
				<div class="form-floating form-control-sm mb-3">
					<input
						type="text"
						value={`${cashbookLine.currency_code}  ${formatNumber(cashbookLine.amount)}`}
						class="form-control"
						id="name"
						placeholder={`${cashbookLine.currency_code} ${cashbookLine.amount}`}
						disabled
					/>
					<label for="floatingInput">Amount</label>
				</div>

				{#if classes}
					<div class="form-floating">
						<select
							bind:value={selected_class_id}
							class="form-select"
							id="floatingSelect"
							aria-label="Finance class select"
						>
							{#each classes as cls}
								<option value={cls.id}>{cls.name}</option>
							{/each}
						</select>
						<label for="floatingSelect">Class</label>
					</div>
				{/if}
			</form>
		</DialogBody>
		<DialogFooter>
			<Button
				icon="bi-arrow-left"
				color="danger"
				on:click={() => {
					step = 'transactionline';
					size = 'lg';
				}}>Back</Button
			>

			<Button
				icon="bi-floppy"
				busy={$loading}
				busytext="Saving"
				color="success"
				on:click={saveSourceLine}
				disabled={$loading}>Save</Button
			>
		</DialogFooter>
	{/if}
</Dialog>
