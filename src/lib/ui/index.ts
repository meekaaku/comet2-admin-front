export { default as About } from './About.svelte';
export { default as AuthGuard } from './AuthGuard.svelte';
export { default as Button } from './Button.svelte';
export { default as Dialog } from './Dialog.svelte';
export { default as DialogBody } from './DialogBody.svelte';
export { default as DialogFooter } from './DialogFooter.svelte';
export { default as FileUpload } from './FileUpload.svelte';
export { default as Icon } from './Icon.svelte';
export { default as Loading } from './Loading.svelte';
export { default as Progress } from './Progress.svelte';
export { default as Progress2 } from './Progress2.svelte';
export { default as Paginator } from './Paginator.svelte';
export { default as SidebarDrop } from './SidebarDrop.svelte';
export { default as SidebarItem } from './__SidebarItem_.svelte';
export { default as SidebarLink } from './SidebarLink.svelte';
export { default as Title } from './Title.svelte';
export { default as Tab } from './Tab.svelte';
export { default as TabBody} from './TabBody.svelte';
export { default as TabPane } from './TabPane.svelte';
export { default as TabHead } from './TabHead.svelte';
export { default as TabHeader } from './TabHeader.svelte';
export { default as Unauthorized } from './Unauthorized.svelte';
export { default as Toaster } from './Toaster.svelte';
export { default as Toolbar } from './Toolbar.svelte';

function toClassName(value: any) {
	let result = '';

	if (typeof value === 'string' || typeof value === 'number') {
		result += value;
	} else if (typeof value === 'object') {
		if (Array.isArray(value)) {
			result = value.map(toClassName).filter(Boolean).join(' ');
		} else {
			for (let key in value) {
				if (value[key]) {
					result && (result += ' ');
					result += key;
				}
			}
		}
	}

	return result;
}

export function classnames(...args: any) {
	return args.map(toClassName).filter(Boolean).join(' ');
}
