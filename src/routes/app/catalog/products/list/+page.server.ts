
import { browser } from '$app/environment';
import type { PageServerLoad } from './$types';
import { comet } from '$lib';

export async function load()
{
    const list = await comet.catalog._products().list();
    return { list };
};
