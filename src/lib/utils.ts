import * as currency from 'currency.js';
import { toasts } from './stores';
import type { IToast } from './types';

// Formats a number to user's locale
export function formatNumber(n: number | string, decimals: number = 2) {
	const formatter = new Intl.NumberFormat('en-EN', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	n = Number(n);
	return formatter.format(n);
}

export function formatDate(str: string) {
	const dt = new Date(str);
	const year = dt.getFullYear();
	const month = dt.getMonth() + 1;
	const monthstr = month < 10 ? '0' + month : month;
	const day = dt.getDate();
	const daystr = day < 10 ? '0' + day : day;

	return `${year}-${monthstr}-${daystr}`;
}

export function formatTime(str: string) {
	const dt = new Date(str);
	return dt.toLocaleTimeString().substring(0, 5);
}

export function formatAddress(str: string) {
	return str.replaceAll('\n', '<br />');
}

export function splitAndTrim(str: string, delimiter = ','): string[] {
	return str.split(delimiter).map((s) => s.trim());
}

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

export function classnames(...args: any[]) {
	return args.map(toClassName).filter(Boolean).join(' ');
}

export function discountPercent(base: string | number, net: string | number): string {
	return String(Math.round((1 - Number(net) / Number(base)) * 100));
}

export function replaceURLQuery(values: Record<string, string>) {
	const url = new URL(window.location.toString());
	for (let [k, v] of Object.entries(values)) {
		if (!!v) {
			url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v));
		} else {
			url.searchParams.delete(k);
		}
	}
	history.replaceState({}, '', url);
}

export function deepClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

export function notify(toast: IToast) {
	toasts.update((t) => [toast, ...t]);
	setTimeout(() => toasts.update((t) => t.filter((x) => x !== toast)), 8000);
}

export function log(message: string, typ: 'info' | 'error' | 'warn' = 'info') {
	const fn = typ === 'info' ? console.log : typ === 'error' ? console.error : console.warn;
	fn(`[${typ}] ${message}`);
}

export function clickoutside(node: HTMLElement) {
	// the node has been mounted in the DOM

	window.addEventListener('click', handleClick);
	console.log('added click listener to ', node);

	function handleClick(e: MouseEvent) {
		console.log('outclick target is ', e.target);
		if (!node.contains(e.target as Node)) {
			console.log('not contained');
			node.dispatchEvent(new CustomEvent('outclick'));
		} else {
			console.log('contained');
		}
	}

	return {
		destroy() {
			// the node has been removed from the DOM
			window.removeEventListener('click', handleClick);
		}
	};
}
