<script lang="ts">
	let dragOver = $state(false);
	let files = $state<File[]>([]);
	let filePreviews = $state<string[]>([]);

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			processFiles(Array.from(input.files));
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		dragOver = true;
	}

	function handleDragLeave() {
		dragOver = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragOver = false;
		
		if (event.dataTransfer?.files) {
			processFiles(Array.from(event.dataTransfer.files));
		}
	}

	function handlePaste(event: ClipboardEvent) {
		const items = event.clipboardData?.items;
		if (items) {
			const pastedFiles: File[] = [];
			for (let i = 0; i < items.length; i++) {
				if (items[i].kind === 'file') {
					const pastedFile = items[i].getAsFile();
					if (pastedFile) {
						pastedFiles.push(pastedFile);
					}
				}
			}
			processFiles(pastedFiles);
		}
	}

	function processFiles(uploadedFiles: File[]) {
		// Limit to 10 files
		const newFiles = uploadedFiles.slice(0, 10 - files.length);
		
		newFiles.forEach(file => {
			files.push(file);
			
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = (e) => {
					filePreviews.push(e.target?.result as string);
				};
				reader.readAsDataURL(file);
			}
		});
	}

	function removeFile(index: number) {
		files.splice(index, 1);
		filePreviews.splice(index, 1);
	}

	$effect(() => {
		document.addEventListener('paste', handlePaste);
		return () => {
			document.removeEventListener('paste', handlePaste);
		};
	});
</script>

<div 
	class="file-upload-container"
	on:dragover={handleDragOver}
	on:dragleave={handleDragLeave}
	on:drop={handleDrop}
	class:drag-over={dragOver}
>
	{#if files.length > 0}
		<div class="file-previews">
			{#each files as file, index (file.name)}
				<div class="file-preview">
					{#if file.type.startsWith('image/')}
						<img 
							src={filePreviews[index]} 
							alt="File preview" 
							class="preview-image"
						/>
					{/if}
					<div class="file-info">
						<p>{file.name}</p>
						<p>{(file.size / 1024).toFixed(2)} KB</p>
						<button on:click={() => removeFile(index)}>Remove</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	{#if files.length < 10}
		<div class="upload-instructions">
			<input 
				type="file" 
				id="file-upload" 
				on:change={handleFileSelect}
				class="file-input"
				multiple
			/>
			<label for="file-upload" class="upload-label">
				Click to upload, drag & drop, or paste files
			</label>
			<p class="sub-text">
				{10 - files.length} file slots remaining
			</p>
		</div>
	{/if}
</div>

<style>
	.file-upload-container {
		border: 2px dashed #cccccc;
		border-radius: 8px;
		padding: 20px;
		text-align: center;
		transition: all 0.3s ease;
	}

	.file-upload-container.drag-over {
		background-color: rgba(0,0,0,0.05);
		border-color: #007bff;
	}

	.file-input {
		display: none;
	}

	.upload-label {
		cursor: pointer;
		display: block;
		color: #007bff;
		font-weight: bold;
	}

	.sub-text {
		color: #6c757d;
		font-size: 0.8em;
	}

	.file-previews {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		justify-content: center;
	}

	.file-preview {
		display: flex;
		align-items: center;
		gap: 15px;
		margin-bottom: 10px;
		width: 100%;
		max-width: 300px;
	}

	.preview-image {
		max-width: 100px;
		max-height: 100px;
		object-fit: contain;
	}

	.file-info {
		flex-grow: 1;
		text-align: left;
	}
</style>