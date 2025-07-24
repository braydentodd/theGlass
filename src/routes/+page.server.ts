// src/routes/+page.server.ts

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	try {
		const session = await event.locals.auth();
		return {
			session
		};
	} catch (error) {
		console.log('Auth session error (DB connection issue):', error);
		return {
			session: null
		};
	}
};