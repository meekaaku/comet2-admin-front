
import { browser } from '$app/environment';
import type { PageServerLoad } from './$types';
import { comet } from '$lib';

export async function load({url, params})
{
    const id = url.searchParams.get('id') || 1;
    const collection = await comet.catalog.collections().retrieve({id});
    console.log(collection);
    return { collection };
};
