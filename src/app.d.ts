// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { DefaultSession } from '@auth/sveltekit';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '@auth/sveltekit' {
	interface Session {
		user?: {
			id: string;
		} & DefaultSession['user'];
	}
}

export {};
