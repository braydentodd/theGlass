<script lang="ts">
	import PlayerSketch from '$lib/components/PlayerSketch.svelte';

	// Updated player data with jersey numbers and refined measurements
	const players = [
		{
			name: "Jalen Brunson",
			slug: "jalen-brunson",
			height: "6'2\"",
			weight: 190,
			wingspan: "6'3\"",
			skinColor: 'medium' as const,
			hairStyle: 'short' as const,
			hairColor: "#2B1810",
			jerseyNumber: 11,
			team: {
				name: "New York Knicks",
				primaryColor: "#006BB6",
				secondaryColor: "#F58426"
			}
		},
		{
			name: "Tyler Herro",
			slug: "tyler-herro",
			height: "6'5\"",
			weight: 195,
			wingspan: "6'3\"",
			skinColor: 'medium-light' as const,
			hairStyle: 'fade' as const,
			hairColor: "#8B4513",
			jerseyNumber: 14,
			team: {
				name: "Miami Heat",
				primaryColor: "#98002E",
				secondaryColor: "#F9A01B"
			}
		},
		{
			name: "LeBron James",
			slug: "lebron-james",
			height: "6'9\"",
			weight: 250,
			wingspan: "7'0\"",
			skinColor: 'medium-dark' as const,
			hairStyle: 'bald' as const,
			hairColor: "#2B1810",
			jerseyNumber: 23,
			team: {
				name: "Los Angeles Lakers",
				primaryColor: "#552583",
				secondaryColor: "#FDB927"
			}
		},
		{
			name: "Nikola Jokić",
			slug: "nikola-jokic",
			height: "6'11\"",
			weight: 284,
			wingspan: "7'3\"",
			skinColor: 'light' as const,
			hairStyle: 'long' as const,
			hairColor: "#8B4513",
			jerseyNumber: 15,
			team: {
				name: "Denver Nuggets",
				primaryColor: "#0E2240",
				secondaryColor: "#FEC524"
			}
		},
		{
			name: "Victor Wembanyama",
			slug: "victor-wembanyama",
			height: "7'4\"",
			weight: 230,
			wingspan: "7'9\"",
			skinColor: 'dark' as const,
			hairStyle: 'afro' as const,
			hairColor: "#2B1810",
			jerseyNumber: 1,
			team: {
				name: "San Antonio Spurs",
				primaryColor: "#C4CED4",
				secondaryColor: "#000000"
			}
		}
	];
</script>

<svelte:head>
	<title>Player Sketches - The Glass</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="max-w-7xl mx-auto px-4">
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold text-gray-900 mb-2">Player Sketches</h1>
		</div>

		<div class="flex justify-center items-end gap-8 mb-8 overflow-x-auto pb-4">
			{#each players as player}
				<div class="flex-shrink-0">
					<a href="/players/{player.slug}" class="block hover:scale-105 transition-transform">
						<PlayerSketch {player} />
					</a>
				</div>
			{/each}
		</div>

		<div class="text-center">
			<h2 class="text-2xl font-bold text-gray-900 mb-4">Click any player to view their full profile</h2>
			<p class="text-gray-600">Detailed stats, contract information, and recent posts</p>
		</div>
	</div>
</div>