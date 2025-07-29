<script lang="ts">
    import PlayerSketch from '$lib/components/PlayerSketch.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    $: player = data.player;
    $: currentYear = new Date().getFullYear();

    // Safely handle undefined player
    // No birthDate property on player, use a default or remove age calculation
    $: birthDate = new Date('1996-08-31');
    $: today = new Date();
    $: ageInMs = today.getTime() - birthDate.getTime();
    $: exactAge = player ? ageInMs / (365.25 * 24 * 60 * 60 * 1000) : 0;

    let statsMode: 'totals' | 'per_game' | 'per_36' | 'per_100' = 'per_game';

    $: heightParts = player?.height?.split("'") || [];
    $: heightFeet = player ? parseInt(heightParts[0]) || 6 : 6;
    $: heightInches = player && heightParts[1] ? parseInt(heightParts[1].replace('"', '')) || 0 : 0;
    $: totalHeightInches = player ? heightFeet * 12 + heightInches : 72;

    $: wingspanParts = player?.wingspan?.split("'") || [];
    $: wingspanFeet = player ? parseInt(wingspanParts[0]) || heightFeet : heightFeet;
    $: wingspanInches = player && wingspanParts[1] ? parseInt(wingspanParts[1].replace('"', '')) || 0 : 0;
    $: totalWingspanInches = player ? wingspanFeet * 12 + wingspanInches : totalHeightInches;


    // Calculate the available height for the visualization area
    const visualizationHeight = 600; // Fixed height for consistency

    // Create height markers for every inch, only label feet (except 0' and 8'), 6" markers longer, and add a precise player height line
    $: heightMarkers = (() => {
        const markers = [];
        for (let i = 0; i <= 96; i++) {
            const heightFeet = Math.floor(i / 12);
            // Only mark feet if not 0' or 8'
            const isFootMark = i % 12 === 0 && i !== 0 && i !== 96;
            const isSixInchMark = i % 12 === 6;
            let label = '';
            if (isFootMark) {
                label = `${heightFeet}'`;
            }
            const positionFromBottom = (i / 96) * visualizationHeight;
            markers.push({
                heightInches: i,
                positionFromTop: visualizationHeight - positionFromBottom,
                label,
                isMajorMark: isFootMark,
                isSixInchMark,
                isTickMark: !isFootMark && !isSixInchMark
            });
        }
        return markers;
    })();

    // Calculate the exact position for the player's height line
    $: playerHeightPosition = player ? visualizationHeight - ((totalHeightInches / 96) * visualizationHeight) : null;

    // Color function for percentiles
    function getPercentileColor(percentile: number) {
        if (percentile >= 90) return '#22c55e';
        if (percentile >= 75) return '#84cc16';
        if (percentile >= 50) return '#eab308';
        if (percentile >= 25) return '#f97316';
        return '#ef4444';
    }
</script>

<svelte:head>
    <title>{player?.name || 'Player'} - Player Profile | The Glass</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <!-- Back Navigation -->
    <div class="bg-white border-b border-gray-200 relative z-10">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <a href="/players" class="inline-flex items-center text-red-500 hover:text-red-600 transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Back to All Players
            </a>
        </div>
    </div>

    {#if player}
        <div class="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden" style="height: {visualizationHeight}px; min-height: {visualizationHeight}px; max-height: {visualizationHeight}px;">
            <div class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-row items-end">
                <!-- Height markers and player sketch -->
                <div class="relative flex flex-row items-end h-full" style="height: {visualizationHeight}px;">
                    <!-- Height markers container -->
                    <div class="relative w-20 h-full">
                        {#each heightMarkers as marker}
                            <div 
                                class="absolute flex items-center" 
                                style="top: {marker.positionFromTop}px; transform: translateY(-50%);"
                            >
                                <div class="
                                    {marker.isMajorMark ? 'bg-gray-300 w-8 h-0.5' : 
                                     marker.isSixInchMark ? 'bg-gray-500 w-4 h-0.5' : 
                                     'bg-gray-600 w-3 h-px'}
                                "></div>
                                {#if marker.label}
                                    <span class="ml-2 text-xs text-gray-300 font-mono">{marker.label}</span>
                                {/if}
                            </div>
                        {/each}
                        {#if playerHeightPosition !== null}
                            <div class="absolute left-0 w-60 h-0.5 bg-red-400" style="top: {playerHeightPosition}px;"></div>
                            <span class="absolute left-full ml-42 text-xs text-red-400 font-bold" style="top: {playerHeightPosition}px; transform: translateY(-50%);">{player.height}</span>
                        {/if}
                    </div>
                    <!-- Player sketch, feet at bottom, head at height -->
                    <div class="flex items-end h-full" style="height: {visualizationHeight}px;">
                        <PlayerSketch 
                            {player} 
                            containerHeight={visualizationHeight}
                        />
                    </div>
                </div>
                <!-- Player name and team info -->
                <div class="flex-1 flex flex-col justify-end h-full pb-8 pl-12">
                    <h1 class="text-7xl font-extrabold mb-2 text-red-500">{player.name}</h1>
                    <div class="text-3xl text-gray-300 mb-4">#{player.jerseyNumber} • {player.team.name}</div>
                </div>
            </div>
        </div>

        <!-- Posts section -->
        <div class="relative bg-white">
            <div class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent opacity-20"></div>

            <div class="max-w-4xl mx-auto px-4 py-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Community Posts</h2>

                <div class="space-y-8">
                    {#each player.recentPosts || [] as post}
                        <article class="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                            <p class="text-gray-600 mb-4">{post.excerpt}</p>
                            <div class="flex items-center justify-between text-sm text-gray-500">
                                <span>{post.date}</span>
                                <div class="flex items-center space-x-4">
                                    <span class="flex items-center">
                                        <svg class="w-4 h-4 mr-1 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                                        </svg>
                                        {post.likes}
                                    </span>
                                    <span class="flex items-center">
                                        <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                        </svg>
                                        {post.comments}
                                    </span>
                                </div>
                            </div>
                        </article>
                    {:else}
                        <div class="text-center py-12 text-gray-500">
                            <p class="text-lg">No posts yet about {player.name}</p>
                            <p class="text-sm mt-2">Be the first to share your thoughts!</p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {:else}
        <div class="text-center py-12 text-gray-500">
            <p class="text-lg">Player not found</p>
        </div>
    {/if}
</div>