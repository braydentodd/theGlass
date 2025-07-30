// src/routes/players/[slug]/$types.ts

export interface PageData {
	player: {
		name: string;
		slug: string;
		height: string;
		weight: number;
		wingspan: string;
		skinColor: 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark';
		hairColor: string;
		jerseyNumber: number;
		age: number;
		experience: number;
		position: string;
		college: string;
		draft: string;
		team: {
			name: string;
			primaryColor: string;
			secondaryColor: string;
		};
		stats: {
			ppg: number;
			rpg: number;
			apg: number;
			fg_pct: number;
		};
		advancedStats: {
			per: number;
			ts_pct: number;
			usg_pct: number;
			bpm: string;
			vorp: number;
		};
		contract: {
			years: number;
			totalValue: string;
			annualAverage: string;
			expiresYear: number;
			status: string;
			salaryByYear: string[];
		};
		recentPosts: Array<{
			title: string;
			excerpt: string;
			date: string;
			likes: number;
			comments: number;
		}>;
	};
}
