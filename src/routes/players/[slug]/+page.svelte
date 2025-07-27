<script lang="ts">
    import PlayerSketch from '$lib/components/PlayerSketch.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    $: player = data.player;
    $: currentYear = new Date().getFullYear();

    // Safely handle undefined player
    $: birthDate = player ? new Date(player.birthDate || '1996-08-31') : new Date('1996-08-31');
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

    // Create more detailed height markers
    $: heightMarkers = (() => {
        const markers = [];
        // Create markers every 3 inches from 0 to 96 inches (8 feet)
        for (let i = 0; i <= 96; i += 3) {
            const heightFeet = Math.floor(i / 12);
            const remainingInches = i % 12;
            const isFootMark = i % 12 === 0;
            const isSixInchMark = i % 6 === 0;
            // Calculate position from bottom (0' is at bottom)
            const positionFromBottom = (i / 96) * visualizationHeight;
            markers.push({
                heightInches: i,
                positionFromTop: visualizationHeight - positionFromBottom,
                label: isFootMark ? `${heightFeet}'` : (isSixInchMark ? `${heightFeet}'${remainingInches}"` : ''),
                isPlayerHeight: player ? Math.abs(i - totalHeightInches) < 1.5 : false,
                isMajorMark: isFootMark,
                isMinorMark: isSixInchMark && !isFootMark,
                isTickMark: !isSixInchMark
            });
        }
        return markers;
    })();

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
        <!-- Full Screen Player Header -->
        <div class="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
            <div class="relative z-10 max-w-7xl mx-auto px-4 py-12">
                <div class="grid grid-cols-12 gap-8" style="min-height: {visualizationHeight}px;">
                    <!-- Left side - Player Sketch with measurements -->
                    <div class="col-span-5 relative" style="height: {visualizationHeight}px;">
                        <!-- Height markers container -->
                        <div class="absolute left-0 top-0 w-20 h-full">
                            {#each heightMarkers as marker}
                                <div 
                                    class="absolute flex items-center" 
                                    style="top: {marker.positionFromTop}px; transform: translateY(-50%);"
                                >
                                    <div class="
                                        {marker.isMajorMark ? 'bg-gray-300 w-8 h-0.5' : 
                                         marker.isMinorMark ? 'bg-gray-400 w-6 h-0.5' : 
                                         'bg-gray-500 w-4 h-px'}
                                    "></div>
                                    {#if marker.label}
                                        <span class="ml-2 text-xs text-gray-300 font-mono">{marker.label}</span>
                                    {/if}
                                    {#if marker.isPlayerHeight}
                                        <div class="absolute left-0 w-full h-0.5 bg-red-400 animate-pulse"></div>
                                        <span class="ml-12 text-xs text-red-400 font-bold">{player.height}</span>
                                    {/if}
                                </div>
                            {/each}
                        </div>

                        <!-- Player visualization container - aligned with height scale -->
                        <div class="absolute bottom-0 left-20 flex items-end" style="height: {visualizationHeight}px;">
                            <PlayerSketch 
                                {player} 
                                showInfo={false} 
                                showCard={false} 
                                containerHeight={visualizationHeight}
                            />
                        </div>
                    </div>

                    <!-- Right side - Player info and stats -->
                    <div class="col-span-7 flex flex-col justify-between">
                        <!-- Player name and basic info -->
                        <div class="mb-8">
                            <h1 class="text-6xl font-bold mb-2 text-red-500">{player.name}</h1>
                            <div class="text-2xl text-gray-300 mb-4">#{player.jerseyNumber} • {player.team.name}</div>

                            <div class="flex gap-8 text-sm">
                                <div>
                                    <span class="text-gray-400">Age:</span>
                                    <span class="ml-1 font-semibold">{exactAge.toFixed(1)}</span>
                                </div>
                                <div>
                                    <span class="text-gray-400">Experience:</span>
                                    <span class="ml-1 font-semibold">{player.experience} years</span>
                                </div>
                                <div>
                                    <span class="text-gray-400">Position:</span>
                                    <span class="ml-1 font-semibold">{player.position}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Physical measurements -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold mb-4 text-red-400">Physical Profile</h3>
                            <div class="grid grid-cols-3 gap-6">
                                <div>
                                    <div class="text-sm text-gray-400">Height</div>
                                    <div class="text-2xl font-bold">{player.height}</div>
                                    <div class="text-xs text-gray-500">{totalHeightInches} inches</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-400">Weight</div>
                                    <div class="text-2xl font-bold">{player.weight}</div>
                                    <div class="text-xs text-gray-500">lbs</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-400">Wingspan</div>
                                    <div class="text-2xl font-bold">{player.wingspan}</div>
                                    <div class="text-xs text-gray-500">{totalWingspanInches} inches</div>
                                </div>
                            </div>
                        </div>

                        <!-- Stats section -->
                        <div class="mb-8">
                            <div class="flex items-center mb-4">
                                <div class="bg-gray-800 rounded-md p-0.5 flex">
                                    <button 
                                        class="px-2 py-1 text-xs rounded transition-colors {statsMode === 'totals' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}"
                                        on:click={() => statsMode = 'totals'}
                                    >
                                        Totals
                                    </button>
                                    <button 
                                        class="px-2 py-1 text-xs rounded transition-colors {statsMode === 'per_game' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}"
                                        on:click={() => statsMode = 'per_game'}
                                    >
                                        Per Game
                                    </button>
                                    <button 
                                        class="px-2 py-1 text-xs rounded transition-colors {statsMode === 'per_36' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}"
                                        on:click={() => statsMode = 'per_36'}
                                    >
                                        Per 36
                                    </button>
                                    <button 
                                        class="px-2 py-1 text-xs rounded transition-colors {statsMode === 'per_100' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}"
                                        on:click={() => statsMode = 'per_100'}
                                    >
                                        Per 100
                                    </button>
                                </div>
                            </div>

                            <div class="grid grid-cols-6 gap-3">
                                {#each player.detailedStats[statsMode] as stat}
                                    <div class="text-center">
                                        <div class="text-xs text-gray-400 mb-1">{stat.label}</div>
                                        <div class="text-base font-bold mb-1">{stat.value}</div>
                                        <div class="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                                class="h-full transition-all duration-300 rounded-full"
                                                style="width: {stat.percentile}%; background-color: {getPercentileColor(stat.percentile)}"
                                            ></div>
                                        </div>
                                        <div class="text-xs text-gray-500 mt-0.5">{stat.percentile}th</div>
                                    </div>
                                {/each}
                            </div>
                        </div>

                        <!-- Salary section -->
                        <div>
                            <h3 class="text-xl font-bold mb-4 text-red-400">Contract Details</h3>
                            <div class="grid grid-cols-4 gap-3">
                                {#each player.salaryBreakdown as salary}
                                    <div class="text-center">
                                        <div class="text-xs text-gray-400 mb-1">{salary.year}</div>
                                        <div class="text-sm font-bold mb-1">${salary.amount}</div>
                                        <div class="text-xs text-gray-500 mb-2">{salary.capPercent}% cap</div>
                                        <div class="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                                class="h-full transition-all duration-300 rounded-full"
                                                style="width: {salary.percentile}%; background-color: {getPercentileColor(salary.percentile)}"
                                            ></div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
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