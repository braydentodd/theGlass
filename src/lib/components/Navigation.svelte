<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	export let user: any;

	let showUserMenu = false;

	function toggleUserMenu() {
		showUserMenu = !showUserMenu;
	}

	function closeUserMenu() {
		showUserMenu = false;
	}

	// Close menu when clicking outside
	function handleClick(event: MouseEvent) {
		if (!(event.target as Element).closest('.user-menu-container')) {
			closeUserMenu();
		}
	}
</script>

<svelte:window on:click={handleClick} />

<nav class="bg-white border-b border-gray-200  sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<!-- Left side - Logo and main nav -->
			<div class="flex items-center space-x-8">
				<!-- Logo -->
				<a href="/" class="flex items-center space-x-2">
					<img 
						src="/logo.png" 
						alt="The Glass" 
						class="h-8 w-8"
					/>
					<span class="text-xl font-bold text-gray-900 ">The Glass</span>
				</a>

				<!-- Main Navigation -->
				<div class="hidden md:flex space-x-6">
					<a 
						href="/" 
						class="text-gray-700  hover:text-orange-600  px-3 py-2 rounded-md text-sm font-medium transition-colors {$page.url.pathname === '/' ? 'text-orange-600' : ''}"
					>
						Home
					</a>
					<a 
						href="/feed" 
						class="text-gray-700  hover:text-orange-600  px-3 py-2 rounded-md text-sm font-medium transition-colors {$page.url.pathname === '/feed' ? 'text-orange-600' : ''}"
					>
						Feed
					</a>
					<a 
						href="/boards" 
						class="text-gray-700  hover:text-orange-600  px-3 py-2 rounded-md text-sm font-medium transition-colors {$page.url.pathname === '/boards' ? 'text-orange-600' : ''}"
					>
						Boards
					</a>
				</div>
			</div>

			<!-- Right side - User menu -->
			<div class="flex items-center">
				{#if user}
					<div class="relative user-menu-container">
						<button 
							on:click={toggleUserMenu}
							class="flex items-center space-x-2 text-gray-700  hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full p-2"
						>
							<!-- User avatar placeholder -->
							<div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
								<span class="text-white text-sm font-medium">
									{user.email?.charAt(0).toUpperCase() || 'U'}
								</span>
							</div>
							<span class="hidden sm:block text-sm font-medium">
								{user.email?.split('@')[0] || 'User'}
							</span>
							<!-- Dropdown arrow -->
							<svg class="w-4 h-4 transition-transform {showUserMenu ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>

						<!-- Dropdown menu -->
						{#if showUserMenu}
							<div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
								<div class="py-1">
									<a 
										href="/profile" 
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
										on:click={closeUserMenu}
									>
										Your Profile
									</a>
									<a 
										href="/settings" 
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
										on:click={closeUserMenu}
									>
										Settings
									</a>
									<hr class="my-1 border-gray-200" />
									<button 
										on:click={() => { signOut(); closeUserMenu(); }}
										class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
									>
										Sign out
									</button>
								</div>
							</div>
						{/if}
					</div>
				{:else}
					<a 
						href="/login"
						class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
					>
						Sign In
					</a>
				{/if}
			</div>
		</div>
	</div>

	<!-- Mobile menu toggle (you can expand this later) -->
	<div class="md:hidden border-t border-gray-200">
		<div class="px-2 pt-2 pb-3 space-y-1">
			<a href="/" class="block px-3 py-2 text-gray-700  hover:text-orange-600">Home</a>
			<a href="/feed" class="block px-3 py-2 text-gray-700  hover:text-orange-600">Feed</a>
			<a href="/boards" class="block px-3 py-2 text-gray-700  hover:text-orange-600">Boards</a>
		</div>
	</div>
</nav>
