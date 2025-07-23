<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Debug: Log the HTML class list on mount
	if (typeof window !== 'undefined') {
		setTimeout(() => {
			console.log('HTML classList:', document.documentElement.classList.value);
		}, 100);
	}

		// If already signed in, redirect to home (client-side fallback)
		// This is now handled server-side in +page.server.ts

   function handleSignIn(provider: string) {
	   signIn(provider);
	   // Do not optimistically goto('/') here, let the server redirect after auth
   }
</script>

<style>
	@keyframes float {
		0%, 100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}
	@keyframes meshMove {
		0%, 100% {
			transform: translate(0%, 0%) scale(1);
		}
		33% {
			transform: translate(10%, -5%) scale(1.02);
		}
		66% {
			transform: translate(-5%, 10%) scale(0.98);
		}
	}
	@keyframes meshRotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

<div class="min-h-screen flex items-center justify-center bg-white relative">

	<div class="max-w-md w-full space-y-10 p-8 relative z-10">
		<!-- Logo Section -->
		<div class="text-center">
			<div class="mx-auto mb-10 w-full max-w-sm">
				<!-- Light mode wordmark -->
			   <img 
				   src="/wordmark.png" 
				   alt="The Glass" 
				   class="w-full h-auto object-contain drop-shadow-lg"
				   style="aspect-ratio: auto; max-height: 200px;"
			   />
			</div>
		   <h2 class="text-2xl font-bold text-gray-900 mb-3">
				Welcome to The Glass
			</h2>
		   <p class="text-gray-600 text-lg">
				Choose your sign-in method
			</p>
		</div>

		<!-- Login Section -->
		<div class="space-y-4">
			<!-- Google -->
		   <button
			   on:click={() => handleSignIn('google')}
			   class="group w-full flex items-center justify-center py-4 px-6 border border-gray-200 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
		   >
				<!-- Google Logo SVG -->
				<svg class="w-6 h-6 mr-4" viewBox="0 0 24 24">
					<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
					<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
					<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
					<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
				</svg>
				<span class="font-medium text-base">Continue with Google</span>
			</button>

			<!-- Microsoft -->
		   <button
			   on:click={() => handleSignIn('microsoft-entra-id')}
			   class="group w-full flex items-center justify-center py-4 px-6 border border-gray-200 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
		   >
				<svg class="w-6 h-6 mr-4" viewBox="0 0 24 24">
					<path fill="#F25022" d="M1 1h10v10H1z"/>
					<path fill="#00A4EF" d="M13 1h10v10H13z"/>
					<path fill="#7FBA00" d="M1 13h10v10H1z"/>
					<path fill="#FFB900" d="M13 13h10v10H13z"/>
				</svg>
				<span class="font-medium text-base">Continue with Microsoft</span>
			</button>
		</div>
	</div>
</div>

