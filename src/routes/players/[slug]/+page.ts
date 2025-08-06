// src/routes/players/[slug]/+page.ts

import { error } from '@sveltejs/kit';

export const load = ({ params }: { params: { slug: string } }) => {
	const players = {
		'jalen-brunson': {
			name: "Jalen Brunson",
			slug: "jalen-brunson",
			height: "6'2\"",
			weight: 190,
			wingspan: "6'3\"",
			skinColor: 'medium' as const,
			jerseyNumber: 11,
			position: "PG",
			experience: 6,
			birthDate: "1996-08-31",
			team: {
				name: "New York Knicks",
				primaryColor: "#006BB6",
				secondaryColor: "#F58426"
			},
			recentPosts: [
				{
					title: "Brunson's clutch performance vs Lakers",
					excerpt: "Breaking down how Jalen Brunson took over in the 4th quarter...",
					date: "2 days ago",
					likes: 342,
					comments: 89
				}
			]
		},
		'lebron-james': {
			name: "LeBron James",
			slug: "lebron-james",
			height: "6'9\"",
			weight: 250,
			wingspan: "7'0\"",
			skinColor: 'medium-dark' as const,
			jerseyNumber: 23,
			position: "SF",
			experience: 22,
			birthDate: "1984-12-30",
			team: {
				name: "Los Angeles Lakers",
				primaryColor: "#552583",
				secondaryColor: "#FDB927"
			},
			recentPosts: [
				{
					title: "LeBron's historic milestone achieved",
					excerpt: "At age 40, LeBron continues to defy expectations...",
					date: "1 day ago",
					likes: 1247,
					comments: 203
				}
			]
		},
		'tyler-herro': {
			name: "Tyler Herro",
			slug: "tyler-herro",
			height: "6'5\"",
			weight: 195,
			wingspan: "6'3\"",
			skinColor: 'medium-light' as const,
			jerseyNumber: 14,
			position: "SG",
			experience: 5,
			birthDate: "2000-01-20",
			team: {
				name: "Miami Heat",
				primaryColor: "#98002E",
				secondaryColor: "#F9A01B"
			},
			recentPosts: [
				{
					title: "Herro's 3-point shooting surge continues",
					excerpt: "Tyler Herro has been on fire from beyond the arc, shooting 40%+ from three over his last 10 games...",
					date: "3 days ago",
					likes: 198,
					comments: 45
				},
				{
					title: "Is Herro ready for a bigger role?",
					excerpt: "With his improved efficiency and leadership, many are wondering if Tyler Herro is ready to take the next step...",
					date: "1 week ago",
					likes: 267,
					comments: 72
				}
			]
		},
		'nikola-jokic': {
			name: "Nikola Jokić",
			slug: "nikola-jokic",
			height: "6'11\"",
			weight: 284,
			wingspan: "7'3\"",
			skinColor: 'light' as const,
			jerseyNumber: 15,
			position: "C",
			experience: 10,
			birthDate: "1995-02-19",
			team: {
				name: "Denver Nuggets",
				primaryColor: "#0E2240",
				secondaryColor: "#FEC524"
			},
			recentPosts: [
				{
					title: "Jokić's triple-double streak reaches new heights",
					excerpt: "The Joker continues to dominate with his unique combination of scoring, rebounding, and playmaking...",
					date: "4 hours ago",
					likes: 823,
					comments: 156
				},
				{
					title: "Breaking down Jokić's passing genius",
					excerpt: "An in-depth analysis of how Nikola Jokić sees the court differently than any other center in NBA history...",
					date: "2 days ago",
					likes: 671,
					comments: 134
				}
			]
		},
		'victor-wembanyama': {
			name: "Victor Wembanyama",
			slug: "victor-wembanyama",
			height: "7'4\"",
			weight: 230,
			wingspan: "8'0\"",
			skinColor: 'dark' as const,
			jerseyNumber: 1,
			position: "C",
			experience: 2,
			birthDate: "2004-01-04",
			team: {
				name: "San Antonio Spurs",
				primaryColor: "#C4CED4",
				secondaryColor: "#000000"
			},
			recentPosts: [
				{
					title: "Wemby's defensive impact is generational",
					excerpt: "Victor Wembanyama is redefining what rim protection looks like in the modern NBA...",
					date: "6 hours ago",
					likes: 1089,
					comments: 287
				},
				{
					title: "The evolution of Wembanyama's three-point shot",
					excerpt: "How the 7'4\" phenom is developing his perimeter game and what it means for the future...",
					date: "1 day ago",
					likes: 734,
					comments: 198
				},
				{
					title: "Rookie season recap: Wemby's historic year",
					excerpt: "Breaking down Victor Wembanyama's incredible rookie campaign and what records he's already breaking...",
					date: "5 days ago",
					likes: 1456,
					comments: 341
				}
			]
		}
	};

	const player = players[params.slug as keyof typeof players];
	
	if (!player) {
		throw error(404, 'Player not found');
	}

	return {
		player
	};
};
