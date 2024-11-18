<script lang="ts">
	let dragOver = $state(false);
	let files = $state<File[]>([]);
	let filePreviews = $state<string[]>([]);
	let isDownloading = $state(false);

	async function fetchImageFromUrl(url: string) {
		try {
			isDownloading = true;
			const response = await fetch(url);
			
			// Check if the response is OK and is an image
			if (!response.ok) {
				throw new Error('Failed to fetch image');
			}

			const contentType = response.headers.get('content-type');
			if (!contentType?.startsWith('image/')) {
				throw new Error('Not an image URL');
			}

			const blob = await response.blob();
			
			// Create a File object from the blob
			const filename = url.split('/').pop() || 'downloaded-image';
			const file = new File([blob], filename, { type: contentType || 'image/jpeg' });
			
			processFiles([file]);
		} catch (error) {
			console.error('Error downloading image:', error);
			alert('Could not download image from URL');
		} finally {
			isDownloading = false;
		}
	}

	function handlePaste(event: ClipboardEvent) {
		const pastedText = event.clipboardData?.getData('text');
		
		// Check if pasted content looks like a URL
		if (pastedText && (pastedText.startsWith('http://') || pastedText.startsWith('https://'))) {
			try {
				const url = new URL(pastedText);
				
				// Check if it's likely an image URL based on common extensions
				const isImageUrl = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
					.some(ext => url.pathname.toLowerCase().endsWith(ext));
				
				if (isImageUrl) {
					event.preventDefault();
					fetchImageFromUrl(pastedText);
				}
			} catch (error) {
				// Invalid URL, ignore
			}
		} else {
			// Handle file paste as before
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
	}

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
	{#if isDownloading}
		<div class="loading">Downloading image...</div>
	{/if}

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
				Click to upload, drag & drop, or paste files/image URLs
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
		position: relative;
	}

	.loading {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255,255,255,0.8);
		z-index: 10;
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