<script lang="ts">
    export let player: {
        name: string;
        height: string; // e.g., "6'9"
        weight: number; // lbs
        wingspan: string; // e.g., "7'0"
        skinColor: 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark';
        hairColor: string;
        jerseyNumber?: number;
        team: {
            name: string;
            primaryColor: string;
        };
    } | undefined;


export let showInfo: boolean = true;
export let showCard: boolean = true;
export let containerHeight: number = 600; // Height of the visualization container

    const skinColors = {
        'light': '#F5DEB3',
        'medium-light': '#E8C4A0', 
        'medium': '#D4A574',
        'medium-dark': '#C68642',
        'dark': '#8B4513'
    };

    $: heightParts = player?.height?.split("'") || [];
    $: heightFeet = player ? parseInt(heightParts[0]) || 6 : 6;
    $: heightInches = player && heightParts[1] ? parseInt(heightParts[1].replace('"', '')) || 0 : 0;
    $: totalHeightInches = player ? heightFeet * 12 + heightInches : 72; // Default to 6'0" if undefined

    $: wingspanParts = player?.wingspan?.split("'") || [];
    $: wingspanFeet = player ? parseInt(wingspanParts[0]) || heightFeet : heightFeet;
    $: wingspanInches = player && wingspanParts[1] ? parseInt(wingspanParts[1].replace('"', '')) || 0 : 0;
    $: totalWingspanInches = player ? wingspanFeet * 12 + wingspanInches : totalHeightInches;

    $: bmi = player ? (player.weight / (totalHeightInches * totalHeightInches)) * 703 : 24;
    $: buildScale = Math.max(0.8, Math.min(1.3, bmi / 24));
    $: wingspanDiff = totalWingspanInches - totalHeightInches;

    // Calculate the actual pixel height the player should occupy
    // 96 inches (8 feet) = full container height
    $: playerPixelHeight = (totalHeightInches / 96) * containerHeight;

    // Add top padding so the head is always visible
    $: topPadding = playerPixelHeight * 0.12; // 12% of player height as top margin
    $: svgHeight = playerPixelHeight + topPadding;

    // Scale all body parts proportionally to player's actual height
    $: headSize = playerPixelHeight * 0.14;
    $: shoulderWidth = headSize * 2.0 * buildScale;
    $: torsoHeight = playerPixelHeight * 0.45;
    $: legHeight = playerPixelHeight * 0.45;
    $: armWidth = headSize * 0.25 * buildScale;
    $: legWidth = headSize * 0.3 * buildScale;

    // Arm length adjustments for wingspan
    $: baseArmLength = torsoHeight * 0.75;
    $: armLength = baseArmLength + (wingspanDiff * 1.0);
    $: armOffsetFromTorso = headSize * 0.15;

    $: shortsColor = player?.team?.primaryColor || '#000000';
    $: skinColor = player ? skinColors[player.skinColor] : '#F5DEB3';

    // Position the player from the bottom up so feet are at y=0, but add topPadding
    $: feetY = playerPixelHeight + topPadding; // Bottom of the player
    $: hipY = feetY - legHeight;
    $: waistY = hipY - torsoHeight * 0.35;
    $: shoulderY = hipY - torsoHeight;
    $: headY = shoulderY - headSize * 0.7;

    $: gapSize = headSize * 0.06;
    $: jerseyEndY = waistY;
    $: shortsStartY = waistY + gapSize;
</script>

<div class="player-container">
    {#if player && showInfo}
        <div class="player-info">
            <h3 class="player-name">{player.name}</h3>
            <p class="team-name">{player.team.name}</p>
            <div class="stats">
                {player.height} • {player.weight}lbs • {player.wingspan} wingspan
            </div>
        </div>
    {/if}

    <div class="model-wrapper" class:no-card={!showCard} style="padding:0; background:transparent; box-shadow:none; border:none; display:block;">
        <svg 
            viewBox="0 0 120 {svgHeight}"
            class="player-model"
            style="display:block; height:{svgHeight}px; width:120px; position:relative; bottom:0; margin:0;"
        >
            {#if player}
                <!-- LEGS - positioned from hip down to feet -->
                <rect 
                    x="{120 - shoulderWidth * 0.25}" 
                    y={hipY} 
                    width={legWidth}
                    height={legHeight}
                    fill={skinColor}
                    rx="8"
                />
                <rect 
                    x="{120 + shoulderWidth * 0.25 - legWidth}" 
                    y={hipY} 
                    width={legWidth}
                    height={legHeight}
                    fill={skinColor}
                    rx="8"
                />

                <!-- SHORTS -->
                <rect 
                    x="{120 - shoulderWidth * 0.25 - 3}" 
                    y={shortsStartY} 
                    width={legWidth + 6}
                    height={torsoHeight * 0.35}
                    fill={shortsColor}
                    rx="6"
                />
                <rect 
                    x="{120 + shoulderWidth * 0.25 - legWidth - 3}" 
                    y={shortsStartY} 
                    width={legWidth + 6}
                    height={torsoHeight * 0.35}
                    fill={shortsColor}
                    rx="6"
                />

                <!-- JERSEY -->
                <rect 
                    x="{120 - shoulderWidth * 0.4}" 
                    y={shoulderY} 
                    width={shoulderWidth * 0.8}
                    height={jerseyEndY - shoulderY}
                    fill={player.team.primaryColor}
                    rx="8"
                />

                {#if player.jerseyNumber}
                    <text 
                        x="120" 
                        y={shoulderY + (jerseyEndY - shoulderY) * 0.6}
                        text-anchor="middle" 
                        font-size="{Math.max(headSize * 0.4, 12)}" 
                        font-weight="bold" 
                        font-family="Arial, sans-serif"
                        fill="white"
                        dominant-baseline="middle"
                    >
                        {player.jerseyNumber}
                    </text>
                {/if}

                <!-- ARMS -->
                <rect 
                    x="{120 - shoulderWidth * 0.4 - armWidth - armOffsetFromTorso}" 
                    y={shoulderY + 8} 
                    width={armWidth}
                    height={armLength}
                    fill={skinColor}
                    rx="8"
                />
                <rect 
                    x="{120 + shoulderWidth * 0.4 + armOffsetFromTorso}" 
                    y={shoulderY + 8} 
                    width={armWidth}
                    height={armLength}
                    fill={skinColor}
                    rx="8"
                />

                <!-- HANDS -->
                <circle 
                    cx="{120 - shoulderWidth * 0.4 - armWidth/2 - armOffsetFromTorso}" 
                    cy={shoulderY + 8 + armLength + headSize * 0.08}
                    r="{headSize * 0.12 * Math.sqrt(buildScale)}" 
                    fill={skinColor}
                />
                <circle 
                    cx="{120 + shoulderWidth * 0.4 + armWidth/2 + armOffsetFromTorso}" 
                    cy={shoulderY + 8 + armLength + headSize * 0.08}
                    r="{headSize * 0.12 * Math.sqrt(buildScale)}" 
                    fill={skinColor}
                />

                <!-- NECK -->
                <rect 
                    x="{120 - headSize * 0.15}" 
                    y={headY + headSize * 0.6} 
                    width="{headSize * 0.3}"
                    height="{headSize * 0.2}"
                    fill={skinColor}
                    rx="{headSize * 0.15}"
                />

                <!-- HEAD -->
                <circle 
                    cx="120" 
                    cy={headY}
                    r={headSize * 0.45} 
                    fill={skinColor}
                />
            {/if}
        </svg>
    </div>
</div>

<style>
    .player-container {
        text-align: center;
        padding: 6px;
    }

    .player-info {
        margin-bottom: 8px;
    }

    .player-name {
        font-size: 1rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 2px 0;
    }

    .team-name {
        font-size: 0.8rem;
        color: #6b7280;
        margin: 0 0 4px 0;
    }

    .stats {
        font-size: 0.7rem;
        color: #9ca3af;
        font-weight: 400;
    }

    .model-wrapper {
        background: #ffffff;
        border-radius: 8px;
        padding: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        display: inline-block;
        border: 1px solid #e5e7eb;
    }

    .model-wrapper.no-card {
        background: transparent;
        border-radius: 0;
        padding: 0;
        box-shadow: none;
        border: none;
    }

    .player-model {
        display: block;
        width: 100%;
        max-width: 140px;
        margin: 0 auto;
    }
</style>