<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.session?.user}
	<div class="min-h-screen flex items-center justify-center bg-gray-50">
		<div class="max-w-md w-full space-y-6 text-center">
			<h1 class="text-3xl font-bold text-gray-900">Welcome to The Glass</h1>
			<p class="text-gray-600">Logged in as: {data.session.user.email}</p>
			<button 
				onclick={() => signOut()}
				class="w-full py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
			>
				Sign Out
			</button>
		</div>
	</div>
{:else}
	<div class="min-h-screen flex items-center justify-center bg-gray-50">
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-900 mb-4">Welcome to The Glass</h1>
			<a href="/login" class="text-blue-600 hover:text-blue-800">Sign In</a>
		</div>
	</div>
{/if}