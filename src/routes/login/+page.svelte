<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { onMount } from 'svelte';

	function handleSignIn(provider: string) {
		signIn(provider);
	}

	let mounted = false;
	onMount(() => {
		mounted = true;
	});
</script>

<style>
	/* Dark professional background */
	.dark-arena {
		background: 
			radial-gradient(circle at 50% 30%, rgba(30, 30, 35, 1) 0%, rgba(15, 15, 20, 1) 100%),
			linear-gradient(135deg, #0f0f14 0%, #1a1a22 50%, #0f0f14 100%);
		position: relative;
	}

	.dark-arena::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.03) 0%, transparent 50%),
			radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.02) 0%, transparent 50%);
	}

	/* Logo painted on wall effect */
	.logo-wall-paint {
		position: relative;
		filter: 
			drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))
			drop-shadow(0 0 20px rgba(239, 68, 68, 0.1));
		transition: all 0.4s ease;
	}
	
	.logo-wall-paint::before {
		content: '';
		position: absolute;
		top: -8px;
		left: -8px;
		right: -8px;
		bottom: -8px;
		background: 
			radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.05) 0%, transparent 40%),
			radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.03) 0%, transparent 30%),
			radial-gradient(circle at 40% 80%, rgba(0, 0, 0, 0.04) 0%, transparent 35%),
			linear-gradient(45deg, 
				transparent 30%, 
				rgba(0, 0, 0, 0.02) 31%, 
				rgba(0, 0, 0, 0.02) 33%, 
				transparent 34%),
			linear-gradient(-45deg, 
				transparent 60%, 
				rgba(0, 0, 0, 0.015) 61%, 
				rgba(0, 0, 0, 0.015) 63%, 
				transparent 64%);
		z-index: -1;
		border-radius: 8px;
		opacity: 0.6;
	}
	
	.logo-wall-paint::after {
		content: '';
		position: absolute;
		top: 10%;
		left: 15%;
		width: 25%;
		height: 20%;
		background: 
			radial-gradient(ellipse at center, rgba(0, 0, 0, 0.08) 0%, transparent 70%);
		z-index: -1;
		border-radius: 50%;
		transform: rotate(-15deg);
		opacity: 0.4;
	}
	
	.logo-wall-paint:hover {
		transform: scale(1.02);
		filter: 
			drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))
			drop-shadow(0 0 30px rgba(239, 68, 68, 0.15));
	}

	/* Clean outline buttons */
	.outline-button {
		background: transparent;
		border: 2px solid rgba(255, 255, 255, 0.8);
		border-radius: 12px;
		box-shadow: 
			0 4px 16px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}
	
	.outline-button:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 1);
		transform: translateY(-2px);
		box-shadow: 
			0 8px 24px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}
	
	.outline-button:active {
		transform: translateY(0);
		background: rgba(255, 255, 255, 0.05);
		box-shadow: 
			0 2px 8px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.fade-in {
		opacity: 0;
		transform: translateY(10px);
		animation: fadeInSharp 0.6s ease-out forwards;
	}

	@keyframes fadeInSharp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Ambient particle effects */
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
		background: radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, rgba(255, 87, 51, 0.4) 50%, transparent 100%);
		border-radius: 50%;
		animation: float 8s infinite ease-in-out;
	}

	/* Optimized particles (100 total) with better spacing and timing */
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

	<div class="min-h-screen dark-arena relative overflow-hidden">
	<!-- Floating particles (100 total - optimized for performance) -->
	<div class="ambient-particles">
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
		<div class="particle"></div>
	</div>
	
	<div class="relative z-10 min-h-screen flex items-center justify-center p-8">
		<div class="w-full max-w-2xl">
			
			<!-- Logo with painted/printed wall effect -->
			<div class="text-center mb-16">
				<div class="mx-auto w-[40rem] logo-wall-paint {mounted ? 'fade-in' : ''}" style="animation-delay: 0.1s;">
					<img 
						src="/white_wordmark.png" 
						alt="The Glass" 
						class="w-full h-auto object-contain"
					/>
				</div>
			</div>

			<!-- Clean outline buttons -->
			<div class="space-y-4 {mounted ? 'fade-in' : ''}" style="animation-delay: 0.3s;">
				<div class="max-w-sm mx-auto">
					<!-- Google Sign In -->
					<button
						on:click={() => handleSignIn('google')}
						class="outline-button w-full flex items-center justify-center py-5 px-8 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300"
					>
						<svg class="w-6 h-6 mr-4" viewBox="0 0 24 24">
							<path fill="#FFFFFF" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="#FFFFFF" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="#FFFFFF" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="#FFFFFF" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
						<span class="text-lg">Sign in with Google</span>
					</button>
				</div>

				<div class="max-w-sm mx-auto">
					<!-- Microsoft Sign In -->
					<button
						on:click={() => handleSignIn('microsoft-entra-id')}
						class="outline-button w-full flex items-center justify-center py-5 px-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
					>
						<svg class="w-6 h-6 mr-4" viewBox="0 0 24 24">
							<path fill="#FFFFFF" d="M1 1h10v10H1z"/>
							<path fill="#FFFFFF" d="M13 1h10v10H13z"/>
							<path fill="#FFFFFF" d="M1 13h10v10H1z"/>
							<path fill="#FFFFFF" d="M13 13h10v10H13z"/>
						</svg>
						<span class="text-lg">Sign in with Microsoft</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

