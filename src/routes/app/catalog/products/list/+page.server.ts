
import { browser } from '$app/environment';
import type { PageServerLoad } from './$types';
import { comet } from '$lib';

export async function load({url})
{
    const page = url.searchParams.get('page') || 1;
    const page_size = url.searchParams.get('page_size') || 100;
    const list = await comet.catalog._products().list({page, page_size});
    return { list };
};
