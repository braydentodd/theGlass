<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	onMount(() => {
		if (typeof window !== 'undefined') {
			document.documentElement.classList.remove('dark');
		}
	});
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
   {#if $page.url.pathname !== '/login'}
	   <Navigation user={data?.session?.user} />
   {/if}
   <main>
	   {@render children()}
   </main>
</div>
