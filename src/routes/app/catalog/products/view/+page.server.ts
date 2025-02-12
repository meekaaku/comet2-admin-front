
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { comet } from '$lib';

export const load: PageServerLoad = async ({url}) => {
    const id = url.searchParams.get('id');

    if(!id) error(400, {message: 'Missing product id'});
    const list = await comet.catalog._products().list({page, page_size, order_by, order_dir, search});
    return { product };
};
