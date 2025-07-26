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
	};

	// For player pages, we might want to hide the info card
	export let showInfo: boolean = true;
	export let showCard: boolean = true;

	// Simple, clean skin colors
	const skinColors = {
		'light': '#F5DEB3',
		'medium-light': '#E8C4A0', 
		'medium': '#D4A574',
		'medium-dark': '#C68642',
		'dark': '#8B4513'
	};

	// Parse measurements
	$: heightParts = player.height.split("'");
	$: heightFeet = parseInt(heightParts[0]) || 6;
	$: heightInches = heightParts[1] ? parseInt(heightParts[1].replace('"', '')) || 0 : 0;
	$: totalHeightInches = heightFeet * 12 + heightInches;
	
	$: wingspanParts = player.wingspan.split("'");
	$: wingspanFeet = parseInt(wingspanParts[0]) || heightFeet;
	$: wingspanInches = wingspanParts[1] ? parseInt(wingspanParts[1].replace('"', '')) || 0 : 0;
	$: totalWingspanInches = wingspanFeet * 12 + wingspanInches;

	// Simple scaling
	$: bmi = (player.weight / (totalHeightInches * totalHeightInches)) * 703;
	$: heightScale = totalHeightInches / 72; // 6'0" baseline
	$: buildScale = Math.max(0.8, Math.min(1.3, bmi / 24));
	$: wingspanDiff = totalWingspanInches - totalHeightInches;
	
	// Clean proportions - adjusted for elite athletes with better balance
	$: figureHeight = 320 * heightScale;
	$: headSize = figureHeight * 0.14; // Bigger head for better proportions
	$: shoulderWidth = headSize * 2.0 * buildScale; // Reduced from 2.4 - more realistic torso
	$: torsoHeight = figureHeight * 0.45; // Increased from 0.4 - longer torso
	$: legHeight = figureHeight * 0.45; // Reduced from 0.5 - shorter legs
	
	// Proportional limb widths based on build - made thicker
	$: armWidth = headSize * 0.25 * buildScale; // Thicker arms
	$: legWidth = headSize * 0.3 * buildScale; // Thicker legs
	
	// Arm length should reflect wingspan - elite athletes have longer arms
	$: baseArmLength = torsoHeight * 0.75; // Increased base length for athletes
	$: armLength = baseArmLength + (wingspanDiff * 2.0); // More dramatic wingspan effect
	
	// Wingspan affects both arm spread AND arm length for elite athletes
	$: armSpread = Math.max(0, wingspanDiff * 2.2); // Increased for wingspan visualization
	
	// Consistent arm positioning - always same distance from torso edge
	$: armOffsetFromTorso = headSize * 0.15; // Fixed distance from torso edge
	
	// Calculate lighter shorts color (30% lighter than jersey)
	$: shortsColor = player.team.primaryColor;
	
	// Positioning - adjusted for better proportions
	$: headY = 60;
	$: shoulderY = headY + headSize * 0.7;
	$: waistY = shoulderY + torsoHeight * 0.65; // Moved waist up for better jersey proportions
	$: hipY = shoulderY + torsoHeight;
	$: legEndY = hipY + legHeight;
	
	// Visual gap between jersey and shorts (showing waistline)
	$: gapSize = headSize * 0.06; // Smaller gap for better proportions
	$: jerseyEndY = waistY; // Jersey ends at waist
	$: shortsStartY = waistY + gapSize; // Shorts start after the gap
	
	$: skinColor = skinColors[player.skinColor];
</script>

<div class="player-container">
	{#if showInfo}
		<div class="player-info">
			<h3 class="player-name">{player.name}</h3>
			<p class="team-name">{player.team.name}</p>
			<div class="stats">
				{player.height} • {player.weight}lbs • {player.wingspan}" wingspan
			</div>
		</div>
	{/if}
	
	<div class="model-wrapper" class:no-card={!showCard}>
		<svg 
			viewBox="0 0 240 {figureHeight + 120}" 
			class="player-model"
			style="height: {Math.min(figureHeight + 120, 400)}px;"
		>
			
			<!-- LEGS - Start at same position as before -->
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
			
			<!-- SHORTS - Adjusted length for better proportions -->
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
			
			<!-- JERSEY - Ends at waist with gap before shorts -->
			<rect 
				x="{120 - shoulderWidth * 0.4}" 
				y={shoulderY} 
				width={shoulderWidth * 0.8}
				height={jerseyEndY - shoulderY}
				fill={player.team.primaryColor}
				rx="8"
			/>
			
			<!-- JERSEY NUMBER - Positioned within shorter jersey -->
			{#if player.jerseyNumber}
				<text 
					x="120" 
					y={shoulderY + (jerseyEndY - shoulderY) * 0.5}
					text-anchor="middle" 
					font-size="{Math.max(headSize * 0.5, 16)}" 
					font-weight="bold" 
					font-family="Arial, sans-serif"
					fill="white"
				>
					{player.jerseyNumber}
				</text>
			{/if}
			
			<!-- ARMS - Consistent distance from torso edge -->
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
			
			<!-- HANDS - Positioned at end of arms -->
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
			
			<!-- NECK - Minimal -->
			<rect 
				x="{120 - headSize * 0.15}" 
				y={headY + headSize * 0.6} 
				width="{headSize * 0.3}"
				height="{headSize * 0.2}"
				fill={skinColor}
				rx="{headSize * 0.15}"
			/>
			
			<!-- HEAD - Clean circle -->
			<circle 
				cx="120" 
				cy={headY}
				r={headSize * 0.45} 
				fill={skinColor}
			/>
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