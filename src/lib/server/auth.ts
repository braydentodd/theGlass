// src/lib/server/auth.ts

import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import Microsoft from '@auth/sveltekit/providers/microsoft-entra-id';
import { db } from '$lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const AUTH_SECRET = process.env.AUTH_SECRET as string;
const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID as string;
const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET as string;

export const { handle, signIn, signOut } = SvelteKitAuth({
	// adapter: DrizzleAdapter(db), // Temporarily disabled due to DB connection issues
	providers: [
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					scope: 'openid email'
				}
			}
		}),
		...(MICROSOFT_CLIENT_ID && MICROSOFT_CLIENT_SECRET ? [
			Microsoft({
				clientId: MICROSOFT_CLIENT_ID,
				clientSecret: MICROSOFT_CLIENT_SECRET,
				allowDangerousEmailAccountLinking: true
			})
		] : [])
	],
	secret: AUTH_SECRET,
	trustHost: true,
	session: {
		strategy: 'jwt', // Use JWT sessions temporarily
		maxAge: 30 * 24 * 60 * 60, // 30 days (in seconds)
		updateAge: 24 * 60 * 60,   // Update session every 24 hours
	},
  callbacks: {
	async signIn(params) {
	  try {
		console.log('[Auth.js signIn callback]', params);
		return true;
	  } catch (error) {
		console.error('[Auth.js signIn callback error]', error, params);
		throw error;
	  }
	},
	session: async ({ session, user }) => {
	  try {
		console.log('[Auth.js session callback]', { session, user });
		if (session?.user && user?.id) {
		  session.user.id = user.id;
		}
		return session;
	  } catch (error) {
		console.error('[Auth.js session callback error]', error, { session, user });
		throw error;
	  }
	}
  },
  events: {
	async signIn(message) {
	  console.log('[Auth.js event signIn]', message);
	},
	async signOut(message) {
	  console.log('[Auth.js event signOut]', message);
	},
	async createUser(message) {
	  console.log('[Auth.js event createUser]', message);
	},
	async linkAccount(message) {
	  console.log('[Auth.js event linkAccount]', message);
	},
	async session(message) {
	  console.log('[Auth.js event session]', message);
	}
  },
	pages: {
		signIn: '/login'
	}
});
