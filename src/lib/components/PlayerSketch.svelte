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

    $: weightHeightRatio = player ? player.weight / totalHeightInches : 2.8; //
    $: wingspanRatio = totalWingspanInches / totalHeightInches; // Typical range: 1.0-1.1
    $: wingspanAdjustment = Math.max(0.92, Math.min(1.08, 2.05 - wingspanRatio)); // Longer wingspan = leaner
    $: athleteBuildIndex = (weightHeightRatio * wingspanAdjustment) / 2.8; // Normalized to ~1.0 for average NBA player
    $: buildScale = Math.max(0.85, Math.min(1.4, athleteBuildIndex));
    $: wingspanDiff = totalWingspanInches - totalHeightInches;

    // Scale height relative to container - EXACTLY to playerPixelHeight
    $: playerPixelHeight = (totalHeightInches / 96) * containerHeight;
    $: svgHeight = playerPixelHeight + (playerPixelHeight * 0.05);

    // Improved proportions for basketball players
    $: headSize = playerPixelHeight * 0.11; // Smaller head for athletic proportions
    $: neckHeight = headSize * 0.25; // Proper neck proportion
    $: torsoHeight = playerPixelHeight * 0.45; // Longer torso
    $: legHeight = playerPixelHeight * 0.44; // Keep leg proportion

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
    // Note: neck scaling is applied after this calculation to maintain total height accuracy
    $: totalVerticalCheck = headSize * 0.9 + neckHeight + torsoHeight + legHeight;
    $: scalingFactor = playerPixelHeight / totalVerticalCheck;
    
    // Apply scaling to ensure pixel-perfect height
    $: scaledHeadSize = headSize * scalingFactor;
    $: scaledNeckHeight = neckHeight * scalingFactor * (0.9 + (buildScale - 1) * 0.3 + (weightAdj - 1) * 0.2); // Neck scales with build and weight
    $: scaledTorsoHeight = torsoHeight * scalingFactor;
    $: scaledLegHeight = legHeight * scalingFactor;

    // Dynamic SVG dimensions based on player build
    $: baseSvgWidth = 175; // Base width for average player
    $: svgWidthAdjustment = buildScale * 0.3 + (wingspanDiff / 12) * 0.15; // Wider for bigger/longer players
    $: dynamicSvgWidth = Math.max(150, Math.min(200, baseSvgWidth + (svgWidthAdjustment * 40))); // Clamp between 240-350px
    $: centerX = dynamicSvgWidth / 2; // Dynamic center based on actual SVG width
    
    // Weight adjustment for limb thickness (heavier players = slightly thicker limbs)
    $: weightAdj = player ? Math.min(1.15, Math.max(0.85, 1 + (player.weight - 220) / 220 * 0.12)) : 1; // NBA avg ~220lbs
    
    // Recalculate other measurements based on scaled head
    $: scaledShoulderWidth = scaledHeadSize * 2.2 * buildScale;
    $: scaledArmWidth = Math.max(8, scaledHeadSize * 0.22 * buildScale * weightAdj); // Clamp minimum width
    $: scaledLegWidth = Math.max(12, scaledHeadSize * 0.32 * buildScale * weightAdj); // Clamp minimum width
    
    // More realistic arm length: wingspan - shoulder width, divided by 2
    // This properly accounts for narrow vs wide shoulders affecting arm length
    $: shoulderWidthInches = (scaledShoulderWidth / playerPixelHeight) * totalHeightInches; // Convert shoulder width back to inches
    $: armLengthInches = Math.max(22, (totalWingspanInches - shoulderWidthInches) / 2); // Each arm, minimum 24" for realism
    $: scaledArmLength = (armLengthInches / totalHeightInches) * playerPixelHeight; // Convert back to pixels
    
    $: scaledArmOffsetFromTorso = scaledHeadSize * 0.12;

    // Hand size scales with wingspan: base hand size plus a factor of wingspanDiff
    $: handSizeBase = scaledHeadSize * 0.11 * Math.sqrt(buildScale);
    $: handSize = handSizeBase * (1 + Math.max(0, wingspanDiff) / 12 * 0.22); // up to ~18% larger for +12in wingspan

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
    $: shoulderY_shifted = shoulderY + verticalOffset;
    $: headY_shifted = headY + verticalOffset;
    $: shortsStartY_shifted = shortsStartY + verticalOffset;
    $: jerseyEndY_shifted = jerseyEndY + verticalOffset;

    // Debug: Check if measurements add up correctly
    $: if (player) {
        const totalHeight = scaledHeadSize * 0.9 + scaledNeckHeight + scaledTorsoHeight + scaledLegHeight;
    }
</script>

<div class="player-container">
    <div class="model-wrapper" class:no-card={!showCard} style="padding:0; background:transparent; box-shadow:none; border:none; display:block;">
        <svg viewBox="0 0 {dynamicSvgWidth} {svgHeight}" class="player-model" style="display:block; height:{svgHeight}px; width:{dynamicSvgWidth}px; position:relative; bottom:0; margin:0;">
            {#if player}
                <!-- LEGS -->
                <rect x="{centerX - scaledShoulderWidth * 0.22 - 2}" y={hipY_shifted} width={scaledLegWidth} height={scaledLegHeight} fill={skinColor} rx="8"/>
                <rect x="{centerX + scaledShoulderWidth * 0.22 - scaledLegWidth + 2}" y={hipY_shifted} width={scaledLegWidth} height={scaledLegHeight} fill={skinColor} rx="8"/>

                <!-- SHORTS -->
                <rect x="{centerX - scaledShoulderWidth * 0.25 - 6.5}" y={shortsStartY_shifted} width={scaledLegWidth + 16} height={shortsHeight} fill={shortsColor} rx="6"/>
                <rect x="{centerX + scaledShoulderWidth * 0.25 - scaledLegWidth - 9.5}" y={shortsStartY_shifted} width={scaledLegWidth + 16} height={shortsHeight} fill={shortsColor} rx="6"/>

                <!-- JERSEY/TORSO -->
                <rect x="{centerX - scaledShoulderWidth * 0.42}" y={shoulderY_shifted} width={scaledShoulderWidth * 0.84} height={jerseyEndY_shifted - shoulderY_shifted} fill={player.team.primaryColor} rx="8"/>

                <!-- ARMS -->
                <rect x="{centerX - scaledShoulderWidth * 0.42 - scaledArmWidth - scaledArmOffsetFromTorso}" y={shoulderY_shifted + 8}
                      width={scaledArmWidth} height={scaledArmLength} fill={skinColor} rx="8"/>
                <rect x="{centerX + scaledShoulderWidth * 0.42 + scaledArmOffsetFromTorso}" y={shoulderY_shifted + 8}
                      width={scaledArmWidth} height={scaledArmLength} fill={skinColor} rx="8"/>

                <!-- HANDS -->
                <circle cx="{centerX - scaledShoulderWidth * 0.42 - scaledArmWidth/2 - scaledArmOffsetFromTorso}"
                        cy={shoulderY_shifted + 12 + scaledArmLength + scaledHeadSize * 0.08}
                        r="{handSize}" fill={skinColor}/>
                <circle cx="{centerX + scaledShoulderWidth * 0.42 + scaledArmWidth/2 + scaledArmOffsetFromTorso}"
                        cy={shoulderY_shifted + 12 + scaledArmLength + scaledHeadSize * 0.08}
                        r="{handSize}" fill={skinColor}/>

                <!-- NECK (emerges from jersey, doesn't connect to head) -->
                <rect x="{centerX - scaledHeadSize * 0.14}" y={shoulderY_shifted - scaledHeadSize * 0.1} width="{scaledHeadSize * 0.28}"
                      height="{scaledNeckHeight}" fill={skinColor} rx="{scaledHeadSize * 0.14}"/>

                <!-- HEAD (floating above neck) -->
                <circle cx="{centerX}" cy={headY_shifted + scaledHeadSize * 0.45} r={scaledHeadSize * 0.45} fill={skinColor}/>

                <!-- EYES (black) -->
                <circle cx="{centerX - scaledHeadSize * 0.15}" cy="{headY_shifted + scaledHeadSize * 0.35}" r="{scaledHeadSize * 0.05}" fill="#111"/>
                <circle cx="{centerX + scaledHeadSize * 0.15}" cy="{headY_shifted + scaledHeadSize * 0.35}" r="{scaledHeadSize * 0.05}" fill="#111"/>

                <!-- JERSEY NUMBER (centered on torso) -->
                {#if player.jerseyNumber}
                <text
                    x="{centerX}"
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