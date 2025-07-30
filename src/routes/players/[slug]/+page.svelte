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


<style>
    
    .digital-display {
        background: #000;
        border: 1px solid #333;
        border-radius: 4px;
        padding: 0px 4px;
        font-family: monospace;
        color: #ff3131;
        letter-spacing: 1px;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
    }

    .ambient-particles {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 2;
        overflow: hidden;
    }
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: radial-gradient(circle, rgba(255, 49, 49, 0.6) 0%, rgba(255, 49, 49, 0.4) 50%, transparent 100%);
        border-radius: 50%;
        animation: float 8s infinite ease-in-out;
    }
    .particle:nth-child(1) { left: 15%; top: 20%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(2) { left: 80%; top: 30%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(3) { left: 25%; top: 70%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(4) { left: 70%; top: 80%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(5) { left: 45%; top: 15%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(6) { left: 85%; top: 60%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(7) { left: 35%; top: 45%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(8) { left: 65%; top: 25%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(9) { left: 10%; top: 55%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(10) { left: 90%; top: 40%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(11) { left: 55%; top: 85%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(12) { left: 20%; top: 35%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(13) { left: 75%; top: 65%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(14) { left: 40%; top: 75%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(15) { left: 60%; top: 10%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(16) { left: 30%; top: 90%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(17) { left: 95%; top: 75%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(18) { left: 50%; top: 50%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(19) { left: 5%; top: 25%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(20) { left: 82%; top: 95%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(21) { left: 12%; top: 85%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(22) { left: 72%; top: 15%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(23) { left: 38%; top: 62%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(24) { left: 88%; top: 52%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(25) { left: 22%; top: 18%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(26) { left: 68%; top: 88%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(27) { left: 42%; top: 32%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(28) { left: 78%; top: 68%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(29) { left: 18%; top: 48%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(30) { left: 92%; top: 28%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(31) { left: 7%; top: 12%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(32) { left: 58%; top: 78%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(33) { left: 33%; top: 8%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(34) { left: 87%; top: 33%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(35) { left: 13%; top: 67%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(36) { left: 77%; top: 43%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(37) { left: 47%; top: 23%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(38) { left: 93%; top: 58%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(39) { left: 27%; top: 93%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(40) { left: 63%; top: 37%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(41) { left: 17%; top: 73%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(42) { left: 83%; top: 17%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(43) { left: 37%; top: 87%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(44) { left: 73%; top: 7%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(45) { left: 3%; top: 47%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(46) { left: 97%; top: 83%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(47) { left: 53%; top: 27%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(48) { left: 23%; top: 63%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(49) { left: 67%; top: 97%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(50) { left: 43%; top: 53%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(51) { left: 8%; top: 35%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(52) { left: 92%; top: 65%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(53) { left: 28%; top: 22%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(54) { left: 74%; top: 84%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(55) { left: 16%; top: 76%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(56) { left: 86%; top: 14%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(57) { left: 51%; top: 41%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(58) { left: 34%; top: 67%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(59) { left: 79%; top: 19%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(60) { left: 11%; top: 89%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(61) { left: 64%; top: 56%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(62) { left: 39%; top: 31%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(63) { left: 84%; top: 72%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(64) { left: 21%; top: 44%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(65) { left: 76%; top: 81%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(66) { left: 46%; top: 16%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(67) { left: 91%; top: 38%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(68) { left: 14%; top: 61%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(69) { left: 69%; top: 24%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(70) { left: 31%; top: 79%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(71) { left: 87%; top: 46%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(72) { left: 24%; top: 13%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(73) { left: 59%; top: 69%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(74) { left: 41%; top: 86%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(75) { left: 94%; top: 21%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(76) { left: 17%; top: 54%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(77) { left: 72%; top: 91%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(78) { left: 56%; top: 28%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(79) { left: 9%; top: 71%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(80) { left: 81%; top: 34%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(81) { left: 36%; top: 58%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(82) { left: 89%; top: 77%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(83) { left: 26%; top: 39%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(84) { left: 71%; top: 11%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(85) { left: 54%; top: 64%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(86) { left: 19%; top: 82%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(87) { left: 96%; top: 49%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(88) { left: 44%; top: 26%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(89) { left: 77%; top: 73%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(90) { left: 32%; top: 95%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(91) { left: 84%; top: 17%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(92) { left: 47%; top: 51%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(93) { left: 12%; top: 74%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(94) { left: 67%; top: 33%; animation-delay: 0s; animation-duration: 15s; }
    .particle:nth-child(95) { left: 29%; top: 87%; animation-delay: 0s; animation-duration: 11s; }
    .particle:nth-child(96) { left: 82%; top: 52%; animation-delay: 0s; animation-duration: 16s; }
    .particle:nth-child(97) { left: 49%; top: 18%; animation-delay: 0s; animation-duration: 12s; }
    .particle:nth-child(98) { left: 15%; top: 66%; animation-delay: 0s; animation-duration: 14s; }
    .particle:nth-child(99) { left: 74%; top: 92%; animation-delay: 0s; animation-duration: 13s; }
    .particle:nth-child(100) { left: 37%; top: 29%; animation-delay: 0s; animation-duration: 15s; }
    @keyframes float {
        0% {
            transform: translateY(0px) translateX(0px) scale(0.9);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-15px) translateX(8px) scale(1.1);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-8px) translateX(-12px) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translateY(-20px) translateX(4px) scale(1.0);
            opacity: 0.6;
        }
        100% {
            transform: translateY(0px) translateX(0px) scale(0.9);
            opacity: 0.3;
        }
    }
</style>

<div class="min-h-screen bg-black">
    <!-- Floating particles (100 total - optimized for performance) -->
    <div class="ambient-particles">
        {#each Array(100) as _, i}
            <div class="particle"></div>
        {/each}
    </div>

    {#if player}
        <div class="relative bg-black text-white overflow-hidden" style="height: {visualizationHeight}px; min-height: {visualizationHeight}px; max-height: {visualizationHeight}px;">
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
                    </div>
                    
                    <!-- Player sketch container with weight scale at bottom -->
                    <div class="relative flex items-end h-full" style="height: {visualizationHeight}px;">
                        <!-- Weight scale platform at the bottom -->
                        <div class="absolute bottom-0 left-9 z-20">
                            <!-- Main scale platform -->
                            <div class="bg-gray-400 h-2 w-32 rounded-sm shadow-lg"></div>
                            <!-- Center display section -->
                            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                                <div class="bg-gray-400 w-19 h-7 rounded-t flex items-center justify-center">
                                    <div class="digital-display w-17 h-5 flex items-center justify-center">
                                        <span class="text-xs font-bold">{`${player.weight} lbs` || '---'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Player sketch -->
                        <PlayerSketch 
                            {player} 
                            containerHeight={visualizationHeight}
                        />
                    </div>
                    
                    <!-- Height indicator line - moved here to appear on top -->
                    {#if playerHeightPosition !== null}
                        <div class="absolute left-0 w-70 h-1 bg-[#ff3131] z-30" style="top: {playerHeightPosition - visualizationHeight/384}px;"></div>
                        <span class="absolute left-72 text-s text-[#ff3131] font-bold z-30" style="top: {playerHeightPosition - visualizationHeight/384}px; transform: translateY(-50%);">{player.height}</span>
                    {/if}
                </div>
                
                <!-- Player name and team info -->
                <div class="flex-1 flex flex-col justify-end h-full pb-8 pl-12">
                    <h1 class="text-7xl font-extrabold mb-2 text-[#ff3131]">{player.name}</h1>
                    <div class="text-3xl text-white mb-4 italic"> {player.team.name}</div>
                </div>
            </div>
        </div>

        <!-- Posts section -->
        <div class="relative bg-white">
        </div>
    {:else}
        <div class="text-center py-12 text-gray-500">
            <p class="text-lg">Player not found</p>
        </div>
    {/if}
</div>