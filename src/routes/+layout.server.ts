export const load = async (event: any) => {
	try {
		return {
			session: await event.locals.auth()
		};
	} catch (error) {
		console.log('Auth session error (DB connection issue):', error);
		return {
			session: null
		};
	}
};
