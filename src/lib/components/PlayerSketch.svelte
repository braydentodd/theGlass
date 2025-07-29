<script lang="ts">
    export let player: {
        name: string;
        height: string; // e.g., "6'9"
        weight: number; // lbs
        wingspan: string; // e.g., "7'0"
        skinColor: 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark';
        hairColor: string;
        jerseyNumber?: string | number;
        team: {
            name: string;
            primaryColor: string;
        };
    } | undefined;

    export let showCard: boolean = true;
    export let containerHeight: number = 600;

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
    $: totalHeightInches = player ? heightFeet * 12 + heightInches : 0;

    $: wingspanParts = player?.wingspan?.split("'") || [];
    $: wingspanFeet = player ? parseInt(wingspanParts[0]) || heightFeet : heightFeet;
    $: wingspanInches = player && wingspanParts[1] ? parseInt(wingspanParts[1].replace('"', '')) || 0 : 0;
    $: totalWingspanInches = player ? wingspanFeet * 12 + wingspanInches : totalHeightInches;

    $: bmi = player ? (player.weight / (totalHeightInches * totalHeightInches)) * 703 : 24;
    $: buildScale = Math.max(0.85, Math.min(1.4, bmi / 24));
    $: wingspanDiff = totalWingspanInches - totalHeightInches;

    // Scale height relative to container - EXACTLY to playerPixelHeight
    $: playerPixelHeight = (totalHeightInches / 96) * containerHeight;
    $: svgHeight = playerPixelHeight + (playerPixelHeight * 0.05);

    // Improved proportions for basketball players
    $: headSize = playerPixelHeight * 0.11; // Smaller head for athletic proportions
    $: neckHeight = headSize * 0.25; // Proper neck proportion
    $: shoulderWidth = headSize * 2.2 * buildScale; // Wider shoulders for athletes
    $: torsoHeight = playerPixelHeight * 0.48; // Longer torso
    $: legHeight = playerPixelHeight * 0.41; // Keep leg proportion
    
    // Improved limb proportions
    $: armWidth = headSize * 0.22 * buildScale; // Slightly thinner arms
    $: legWidth = headSize * 0.32 * buildScale; // Slightly thicker legs
    $: baseArmLength = torsoHeight * 0.8; // Longer base arm length
    $: armLength = baseArmLength + (wingspanDiff * 1.8); // Better wingspan scaling
    $: armOffsetFromTorso = headSize * 0.12;

    $: shortsColor = player?.team?.primaryColor || '#000000';
    $: skinColor = player ? skinColors[player.skinColor] : '#F5DEB3';

    // Determine jersey number color: white unless jersey is white, then black
    function isColorWhite(color: string) {
        if (!color) return false;
        const c = color.toLowerCase();
        return c === '#fff' || c === '#ffffff' || c === 'white' || c === 'rgb(255,255,255)' || c === 'rgba(255,255,255,1)';
    }
    $: jerseyNumberColor = isColorWhite(player?.team?.primaryColor ?? '') ? '#222' : '#fff';

    // CRITICAL: Ensure all vertical measurements add up to exactly playerPixelHeight
    $: totalVerticalCheck = headSize * 0.9 + neckHeight + torsoHeight + legHeight;
    $: scalingFactor = playerPixelHeight / totalVerticalCheck;
    
    // Apply scaling to ensure pixel-perfect height
    $: scaledHeadSize = headSize * scalingFactor;
    $: scaledNeckHeight = neckHeight * scalingFactor;
    $: scaledTorsoHeight = torsoHeight * scalingFactor;
    $: scaledLegHeight = legHeight * scalingFactor;

    // Recalculate other measurements based on scaled head
    $: scaledShoulderWidth = scaledHeadSize * 2.2 * buildScale;
    $: scaledArmWidth = scaledHeadSize * 0.22 * buildScale;
    $: scaledLegWidth = scaledHeadSize * 0.32 * buildScale;
    $: scaledArmLength = (scaledTorsoHeight * 0.8) + (wingspanDiff * 1.8);
    $: scaledArmOffsetFromTorso = scaledHeadSize * 0.12;

    // Hand size scales with wingspan: base hand size plus a factor of wingspanDiff
    $: handSizeBase = scaledHeadSize * 0.11 * Math.sqrt(buildScale);
    $: handSize = handSizeBase * (1 + Math.max(0, wingspanDiff) / 12 * 0.18); // up to ~18% larger for +12in wingspan

    // Base positions (from bottom up)
    $: feetY = playerPixelHeight;
    $: hipY = feetY - scaledLegHeight;
    $: waistY = hipY - scaledTorsoHeight * 0.35;
    $: shoulderY = hipY - scaledTorsoHeight;
    $: neckY = shoulderY - scaledNeckHeight;
    $: headY = neckY - scaledHeadSize * 0.9;

    // Clothing calculations
    $: gapSize = scaledHeadSize * 0.07; // Smaller gap
    $: jerseyEndY = waistY;
    $: shortsStartY = waistY + gapSize;
    $: shortsHeight = scaledTorsoHeight * 0.4;

    // Vertical offset to align bottom with SVG bottom
    $: modelBottom = feetY;
    $: verticalOffset = svgHeight - modelBottom;

    // Apply vertical offset to all Y positions
    $: hipY_shifted = hipY + verticalOffset;
    $: waistY_shifted = waistY + verticalOffset;
    $: shoulderY_shifted = shoulderY + verticalOffset;
    $: neckY_shifted = neckY + verticalOffset;
    $: headY_shifted = headY + verticalOffset;
    $: shortsStartY_shifted = shortsStartY + verticalOffset;
    $: jerseyEndY_shifted = jerseyEndY + verticalOffset;

    // Debug: Check if measurements add up correctly
    $: if (player) {
        const totalHeight = scaledHeadSize * 0.9 + scaledNeckHeight + scaledTorsoHeight + scaledLegHeight;
        console.log(`Target height: ${playerPixelHeight}px, Actual height: ${totalHeight}px, Difference: ${Math.abs(playerPixelHeight - totalHeight)}px`);
    }
</script>

<div class="player-container">
    <div class="model-wrapper" class:no-card={!showCard} style="padding:0; background:transparent; box-shadow:none; border:none; display:block;">
        <svg viewBox="0 0 300 {svgHeight}" class="player-model" style="display:block; height:{svgHeight}px; width:300px; position:relative; bottom:0; margin:0;">
            {#if player}
                <!-- LEGS -->
                <rect x="{100 - scaledShoulderWidth * 0.22 - 2}" y={hipY_shifted} width={scaledLegWidth} height={scaledLegHeight} fill={skinColor} rx="8"/>
                <rect x="{100 + scaledShoulderWidth * 0.22 - scaledLegWidth + 2}" y={hipY_shifted} width={scaledLegWidth} height={scaledLegHeight} fill={skinColor} rx="8"/>

                <!-- SHORTS -->
                <rect x="{100 - scaledShoulderWidth * 0.25 - 6.5}" y={shortsStartY_shifted} width={scaledLegWidth + 16} height={shortsHeight} fill={shortsColor} rx="6"/>
                <rect x="{100 + scaledShoulderWidth * 0.25 - scaledLegWidth - 9.5}" y={shortsStartY_shifted} width={scaledLegWidth + 16} height={shortsHeight} fill={shortsColor} rx="6"/>

                <!-- JERSEY/TORSO -->
                <rect x="{100 - scaledShoulderWidth * 0.42}" y={shoulderY_shifted} width={scaledShoulderWidth * 0.84} height={jerseyEndY_shifted - shoulderY_shifted} fill={player.team.primaryColor} rx="8"/>

                <!-- ARMS -->
                <rect x="{100 - scaledShoulderWidth * 0.42 - scaledArmWidth - scaledArmOffsetFromTorso}" y={shoulderY_shifted + 8}
                      width={scaledArmWidth} height={scaledArmLength} fill={skinColor} rx="8"/>
                <rect x="{100 + scaledShoulderWidth * 0.42 + scaledArmOffsetFromTorso}" y={shoulderY_shifted + 8}
                      width={scaledArmWidth} height={scaledArmLength} fill={skinColor} rx="8"/>

                <!-- HANDS -->
                <circle cx="{100 - scaledShoulderWidth * 0.42 - scaledArmWidth/2 - scaledArmOffsetFromTorso}"
                        cy={shoulderY_shifted + 12 + scaledArmLength + scaledHeadSize * 0.08}
                        r="{handSize}" fill={skinColor}/>
                <circle cx="{100 + scaledShoulderWidth * 0.42 + scaledArmWidth/2 + scaledArmOffsetFromTorso}"
                        cy={shoulderY_shifted + 12 + scaledArmLength + scaledHeadSize * 0.08}
                        r="{handSize}" fill={skinColor}/>

                <!-- NECK (emerges from jersey, doesn't connect to head) -->
                <rect x="{100 - scaledHeadSize * 0.14}" y={shoulderY_shifted - scaledHeadSize * 0.1} width="{scaledHeadSize * 0.28}"
                      height="{scaledHeadSize * 0.2}" fill={skinColor} rx="{scaledHeadSize * 0.14}"/>

                <!-- HEAD (floating above neck) -->
                <circle cx="100" cy={headY_shifted + scaledHeadSize * 0.45} r={scaledHeadSize * 0.45} fill={skinColor}/>

                <!-- EYES (black) -->
                <circle cx="{100 - scaledHeadSize * 0.15}" cy="{headY_shifted + scaledHeadSize * 0.35}" r="{scaledHeadSize * 0.05}" fill="#111"/>
                <circle cx="{100 + scaledHeadSize * 0.15}" cy="{headY_shifted + scaledHeadSize * 0.35}" r="{scaledHeadSize * 0.05}" fill="#111"/>

                <!-- JERSEY NUMBER (centered on torso) -->
                {#if player.jerseyNumber}
                <text
                    x="100"
                    y="{shoulderY_shifted + (jerseyEndY_shifted - shoulderY_shifted) / 2 + scaledHeadSize * 0.18}"
                    text-anchor="middle"
                    alignment-baseline="middle"
                    font-size="{scaledHeadSize * .85}"
                    font-family="monospace, sans-serif"
                    font-weight="bold"
                    fill="{jerseyNumberColor}"
                >
                    {player.jerseyNumber}
                </text>
                {/if}
            {/if}
        </svg>
    </div>
</div>

<style>
    .player-container { text-align: center; }
</style>