
import { browser } from '$app/environment';
import type { PageServerLoad } from './$types';
import { comet } from '$lib';

export async function load({url})
{
    const page = url.searchParams.get('page') || 1;
    const page_size = url.searchParams.get('page_size') || 100;
    const order_by = url.searchParams.get('order_by') || 'name';
    const order_dir = url.searchParams.get('order_dir') || 'asc';
    const search = url.searchParams.get('search') || '';
    const list = await comet.catalog.collections().list({page, page_size, order_by, order_dir, search});
    return { list };
};
