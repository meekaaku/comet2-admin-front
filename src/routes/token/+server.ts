import type { RequestHandler } from '@sveltejs/kit';

import { comet } from '$lib';


export const POST: RequestHandler = async ({ request}) => {
	const { access } = await request.json();
	comet.auth.setHeader('Authorization', `Bearer ${access}`);

	return new Response('Access token set');
};