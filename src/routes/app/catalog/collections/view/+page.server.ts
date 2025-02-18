
import { browser } from '$app/environment';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { comet } from '$lib';

export async function load({url, params})
{
    const id = url.searchParams.get('id') || null;
    if(!id) {
        error(404, {status: 404, message: 'Collection not found'});
    }
    const collection = await comet.catalog.collections(id).read();
    return { collection };
};
