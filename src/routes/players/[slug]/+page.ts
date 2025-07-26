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
			hairStyle: 'short' as const,
			hairColor: "#2B1810",
			jerseyNumber: 11,
			position: "PG",
			experience: 6,
			birthDate: "1996-08-31",
			team: {
				name: "New York Knicks",
				primaryColor: "#006BB6",
				secondaryColor: "#F58426"
			},
			detailedStats: {
				totals: [
					{ label: "GP", value: "77", percentile: 85 },
					{ label: "MIN", value: "2633", percentile: 92 },
					{ label: "PTS", value: "2028", percentile: 88 },
					{ label: "2PA", value: "892", percentile: 75 },
					{ label: "2P%", value: "49.2", percentile: 65 },
					{ label: "3PA", value: "485", percentile: 70 },
					{ label: "3P%", value: "40.1", percentile: 85 },
					{ label: "FTA", value: "573", percentile: 90 },
					{ label: "FT%", value: "84.7", percentile: 80 },
					{ label: "ASTS", value: "534", percentile: 88 },
					{ label: "TOVS", value: "231", percentile: 45 },
					{ label: "OREBS", value: "39", percentile: 35 },
					{ label: "DREBS", value: "289", percentile: 60 },
					{ label: "STLS", value: "62", percentile: 55 },
					{ label: "BLKS", value: "12", percentile: 25 },
					{ label: "PFS", value: "154", percentile: 65 },
					{ label: "+/-", value: "+387", percentile: 95 },
					{ label: "RAPM", value: "+4.2", percentile: 90 }
				],
				per_game: [
					{ label: "GP", value: "77", percentile: 85 },
					{ label: "MIN", value: "34.2", percentile: 92 },
					{ label: "PTS", value: "26.3", percentile: 88 },
					{ label: "2PA", value: "11.6", percentile: 75 },
					{ label: "2P%", value: "49.2", percentile: 65 },
					{ label: "3PA", value: "6.3", percentile: 70 },
					{ label: "3P%", value: "40.1", percentile: 85 },
					{ label: "FTA", value: "7.4", percentile: 90 },
					{ label: "FT%", value: "84.7", percentile: 80 },
					{ label: "ASTS", value: "6.9", percentile: 88 },
					{ label: "TOVS", value: "3.0", percentile: 45 },
					{ label: "OREBS", value: "0.5", percentile: 35 },
					{ label: "DREBS", value: "3.8", percentile: 60 },
					{ label: "STLS", value: "0.8", percentile: 55 },
					{ label: "BLKS", value: "0.2", percentile: 25 },
					{ label: "PFS", value: "2.0", percentile: 65 },
					{ label: "+/-", value: "+5.0", percentile: 95 },
					{ label: "RAPM", value: "+4.2", percentile: 90 }
				],
				per_36: [
					{ label: "GP", value: "77", percentile: 85 },
					{ label: "MIN", value: "36.0", percentile: 100 },
					{ label: "PTS", value: "27.7", percentile: 88 },
					{ label: "2PA", value: "12.2", percentile: 75 },
					{ label: "2P%", value: "49.2", percentile: 65 },
					{ label: "3PA", value: "6.6", percentile: 70 },
					{ label: "3P%", value: "40.1", percentile: 85 },
					{ label: "FTA", value: "7.8", percentile: 90 },
					{ label: "FT%", value: "84.7", percentile: 80 },
					{ label: "ASTS", value: "7.3", percentile: 88 },
					{ label: "TOVS", value: "3.2", percentile: 45 },
					{ label: "OREBS", value: "0.5", percentile: 35 },
					{ label: "DREBS", value: "4.0", percentile: 60 },
					{ label: "STLS", value: "0.8", percentile: 55 },
					{ label: "BLKS", value: "0.2", percentile: 25 },
					{ label: "PFS", value: "2.1", percentile: 65 },
					{ label: "+/-", value: "+5.3", percentile: 95 },
					{ label: "RAPM", value: "+4.2", percentile: 90 }
				],
				per_100: [
					{ label: "GP", value: "77", percentile: 85 },
					{ label: "MIN", value: "100.0", percentile: 100 },
					{ label: "PTS", value: "76.9", percentile: 88 },
					{ label: "2PA", value: "33.9", percentile: 75 },
					{ label: "2P%", value: "49.2", percentile: 65 },
					{ label: "3PA", value: "18.4", percentile: 70 },
					{ label: "3P%", value: "40.1", percentile: 85 },
					{ label: "FTA", value: "21.7", percentile: 90 },
					{ label: "FT%", value: "84.7", percentile: 80 },
					{ label: "ASTS", value: "20.3", percentile: 88 },
					{ label: "TOVS", value: "8.8", percentile: 45 },
					{ label: "OREBS", value: "1.5", percentile: 35 },
					{ label: "DREBS", value: "11.0", percentile: 60 },
					{ label: "STLS", value: "2.4", percentile: 55 },
					{ label: "BLKS", value: "0.5", percentile: 25 },
					{ label: "PFS", value: "5.8", percentile: 65 },
					{ label: "+/-", value: "+14.7", percentile: 95 },
					{ label: "RAPM", value: "+4.2", percentile: 90 }
				]
			},
			salaryBreakdown: [
				{ year: "2024-25", amount: "$24.9M", capPercent: "18.2", percentile: 75 },
				{ year: "2025-26", amount: "$26.2M", capPercent: "17.8", percentile: 78 },
				{ year: "2026-27", amount: "$27.5M", capPercent: "17.4", percentile: 80 },
				{ year: "2027-28", amount: "$28.8M", capPercent: "17.0", percentile: 82 }
			],
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
			hairStyle: 'bald' as const,
			hairColor: "#2B1810",
			jerseyNumber: 23,
			position: "SF",
			experience: 22,
			birthDate: "1984-12-30",
			team: {
				name: "Los Angeles Lakers",
				primaryColor: "#552583",
				secondaryColor: "#FDB927"
			},
			detailedStats: {
				totals: [
					{ label: "GP", value: "71", percentile: 75 },
					{ label: "MIN", value: "2530", percentile: 88 },
					{ label: "PTS", value: "1714", percentile: 85 },
					{ label: "2PA", value: "732", percentile: 70 },
					{ label: "2P%", value: "57.8", percentile: 90 },
					{ label: "3PA", value: "332", percentile: 55 },
					{ label: "3P%", value: "35.7", percentile: 60 },
					{ label: "FTA", value: "401", percentile: 75 },
					{ label: "FT%", value: "75.1", percentile: 50 },
					{ label: "ASTS", value: "576", percentile: 95 },
					{ label: "TOVS", value: "252", percentile: 35 },
					{ label: "OREBS", value: "71", percentile: 65 },
					{ label: "DREBS", value: "494", percentile: 85 },
					{ label: "STLS", value: "92", percentile: 80 },
					{ label: "BLKS", value: "42", percentile: 70 },
					{ label: "PFS", value: "127", percentile: 70 },
					{ label: "+/-", value: "+201", percentile: 80 },
					{ label: "RAPM", value: "+2.8", percentile: 75 }
				],
				per_game: [
					{ label: "GP", value: "71", percentile: 75 },
					{ label: "MIN", value: "35.6", percentile: 88 },
					{ label: "PTS", value: "24.1", percentile: 85 },
					{ label: "2PA", value: "10.3", percentile: 70 },
					{ label: "2P%", value: "57.8", percentile: 90 },
					{ label: "3PA", value: "4.7", percentile: 55 },
					{ label: "3P%", value: "35.7", percentile: 60 },
					{ label: "FTA", value: "5.6", percentile: 75 },
					{ label: "FT%", value: "75.1", percentile: 50 },
					{ label: "ASTS", value: "8.1", percentile: 95 },
					{ label: "TOVS", value: "3.5", percentile: 35 },
					{ label: "OREBS", value: "1.0", percentile: 65 },
					{ label: "DREBS", value: "7.0", percentile: 85 },
					{ label: "STLS", value: "1.3", percentile: 80 },
					{ label: "BLKS", value: "0.6", percentile: 70 },
					{ label: "PFS", value: "1.8", percentile: 70 },
					{ label: "+/-", value: "+2.8", percentile: 80 },
					{ label: "RAPM", value: "+2.8", percentile: 75 }
				],
				per_36: [
					{ label: "GP", value: "71", percentile: 75 },
					{ label: "MIN", value: "36.0", percentile: 100 },
					{ label: "PTS", value: "24.4", percentile: 85 },
					{ label: "2PA", value: "10.4", percentile: 70 },
					{ label: "2P%", value: "57.8", percentile: 90 },
					{ label: "3PA", value: "4.7", percentile: 55 },
					{ label: "3P%", value: "35.7", percentile: 60 },
					{ label: "FTA", value: "5.7", percentile: 75 },
					{ label: "FT%", value: "75.1", percentile: 50 },
					{ label: "ASTS", value: "8.2", percentile: 95 },
					{ label: "TOVS", value: "3.6", percentile: 35 },
					{ label: "OREBS", value: "1.0", percentile: 65 },
					{ label: "DREBS", value: "7.0", percentile: 85 },
					{ label: "STLS", value: "1.3", percentile: 80 },
					{ label: "BLKS", value: "0.6", percentile: 70 },
					{ label: "PFS", value: "1.8", percentile: 70 },
					{ label: "+/-", value: "+2.9", percentile: 80 },
					{ label: "RAPM", value: "+2.8", percentile: 75 }
				],
				per_100: [
					{ label: "GP", value: "71", percentile: 75 },
					{ label: "MIN", value: "100.0", percentile: 100 },
					{ label: "PTS", value: "67.7", percentile: 85 },
					{ label: "2PA", value: "28.9", percentile: 70 },
					{ label: "2P%", value: "57.8", percentile: 90 },
					{ label: "3PA", value: "13.1", percentile: 55 },
					{ label: "3P%", value: "35.7", percentile: 60 },
					{ label: "FTA", value: "15.8", percentile: 75 },
					{ label: "FT%", value: "75.1", percentile: 50 },
					{ label: "ASTS", value: "22.8", percentile: 95 },
					{ label: "TOVS", value: "10.0", percentile: 35 },
					{ label: "OREBS", value: "2.8", percentile: 65 },
					{ label: "DREBS", value: "19.5", percentile: 85 },
					{ label: "STLS", value: "3.6", percentile: 80 },
					{ label: "BLKS", value: "1.7", percentile: 70 },
					{ label: "PFS", value: "5.0", percentile: 70 },
					{ label: "+/-", value: "+7.9", percentile: 80 },
					{ label: "RAPM", value: "+2.8", percentile: 75 }
				]
			},
			salaryBreakdown: [
				{ year: "2024-25", amount: "$48.7M", capPercent: "35.6", percentile: 98 },
				{ year: "2025-26", amount: "$52.6M", capPercent: "35.7", percentile: 99 }
			],
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
			hairStyle: 'fade' as const,
			hairColor: "#8B4513",
			jerseyNumber: 14,
			position: "SG",
			experience: 5,
			birthDate: "2000-01-20",
			team: {
				name: "Miami Heat",
				primaryColor: "#98002E",
				secondaryColor: "#F9A01B"
			},
			detailedStats: {
				totals: [
					{ label: "GP", value: "62", percentile: 65 },
					{ label: "MIN", value: "1985", percentile: 75 },
					{ label: "PTS", value: "1302", percentile: 70 },
					{ label: "2PA", value: "512", percentile: 60 },
					{ label: "2P%", value: "48.3", percentile: 55 },
					{ label: "3PA", value: "434", percentile: 80 },
					{ label: "3P%", value: "39.6", percentile: 85 },
					{ label: "FTA", value: "198", percentile: 65 },
					{ label: "FT%", value: "86.4", percentile: 85 },
					{ label: "ASTS", value: "310", percentile: 70 },
					{ label: "TOVS", value: "167", percentile: 40 },
					{ label: "OREBS", value: "31", percentile: 40 },
					{ label: "DREBS", value: "217", percentile: 55 },
					{ label: "STLS", value: "49", percentile: 50 },
					{ label: "BLKS", value: "19", percentile: 35 },
					{ label: "PFS", value: "124", percentile: 60 },
					{ label: "+/-", value: "+89", percentile: 70 },
					{ label: "RAPM", value: "+1.4", percentile: 65 }
				],
				per_game: [
					{ label: "GP", value: "62", percentile: 65 },
					{ label: "MIN", value: "32.0", percentile: 75 },
					{ label: "PTS", value: "21.0", percentile: 70 },
					{ label: "2PA", value: "8.3", percentile: 60 },
					{ label: "2P%", value: "48.3", percentile: 55 },
					{ label: "3PA", value: "7.0", percentile: 80 },
					{ label: "3P%", value: "39.6", percentile: 85 },
					{ label: "FTA", value: "3.2", percentile: 65 },
					{ label: "FT%", value: "86.4", percentile: 85 },
					{ label: "ASTS", value: "5.0", percentile: 70 },
					{ label: "TOVS", value: "2.7", percentile: 40 },
					{ label: "OREBS", value: "0.5", percentile: 40 },
					{ label: "DREBS", value: "3.5", percentile: 55 },
					{ label: "STLS", value: "0.8", percentile: 50 },
					{ label: "BLKS", value: "0.3", percentile: 35 },
					{ label: "PFS", value: "2.0", percentile: 60 },
					{ label: "+/-", value: "+1.4", percentile: 70 },
					{ label: "RAPM", value: "+1.4", percentile: 65 }
				],
				per_36: [
					{ label: "GP", value: "62", percentile: 65 },
					{ label: "MIN", value: "36.0", percentile: 100 },
					{ label: "PTS", value: "23.6", percentile: 70 },
					{ label: "2PA", value: "9.3", percentile: 60 },
					{ label: "2P%", value: "48.3", percentile: 55 },
					{ label: "3PA", value: "7.9", percentile: 80 },
					{ label: "3P%", value: "39.6", percentile: 85 },
					{ label: "FTA", value: "3.6", percentile: 65 },
					{ label: "FT%", value: "86.4", percentile: 85 },
					{ label: "ASTS", value: "5.6", percentile: 70 },
					{ label: "TOVS", value: "3.0", percentile: 40 },
					{ label: "OREBS", value: "0.6", percentile: 40 },
					{ label: "DREBS", value: "3.9", percentile: 55 },
					{ label: "STLS", value: "0.9", percentile: 50 },
					{ label: "BLKS", value: "0.3", percentile: 35 },
					{ label: "PFS", value: "2.2", percentile: 60 },
					{ label: "+/-", value: "+1.6", percentile: 70 },
					{ label: "RAPM", value: "+1.4", percentile: 65 }
				],
				per_100: [
					{ label: "GP", value: "62", percentile: 65 },
					{ label: "MIN", value: "100.0", percentile: 100 },
					{ label: "PTS", value: "65.6", percentile: 70 },
					{ label: "2PA", value: "25.8", percentile: 60 },
					{ label: "2P%", value: "48.3", percentile: 55 },
					{ label: "3PA", value: "21.9", percentile: 80 },
					{ label: "3P%", value: "39.6", percentile: 85 },
					{ label: "FTA", value: "10.0", percentile: 65 },
					{ label: "FT%", value: "86.4", percentile: 85 },
					{ label: "ASTS", value: "15.6", percentile: 70 },
					{ label: "TOVS", value: "8.4", percentile: 40 },
					{ label: "OREBS", value: "1.6", percentile: 40 },
					{ label: "DREBS", value: "10.9", percentile: 55 },
					{ label: "STLS", value: "2.5", percentile: 50 },
					{ label: "BLKS", value: "1.0", percentile: 35 },
					{ label: "PFS", value: "6.2", percentile: 60 },
					{ label: "+/-", value: "+4.5", percentile: 70 },
					{ label: "RAPM", value: "+1.4", percentile: 65 }
				]
			},
			salaryBreakdown: [
				{ year: "2024-25", amount: "$29.0M", capPercent: "21.2", percentile: 82 },
				{ year: "2025-26", amount: "$31.0M", capPercent: "21.0", percentile: 84 },
				{ year: "2026-27", amount: "$33.0M", capPercent: "20.9", percentile: 86 },
				{ year: "2027-28", amount: "$35.0M", capPercent: "20.7", percentile: 88 }
			],
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
			hairStyle: 'long' as const,
			hairColor: "#8B4513",
			jerseyNumber: 15,
			position: "C",
			experience: 10,
			birthDate: "1995-02-19",
			team: {
				name: "Denver Nuggets",
				primaryColor: "#0E2240",
				secondaryColor: "#FEC524"
			},
			detailedStats: {
				totals: [
					{ label: "GP", value: "79", percentile: 90 },
					{ label: "MIN", value: "2732", percentile: 95 },
					{ label: "PTS", value: "2267", percentile: 95 },
					{ label: "2PA", value: "1042", percentile: 85 },
					{ label: "2P%", value: "58.7", percentile: 95 },
					{ label: "3PA", value: "237", percentile: 40 },
					{ label: "3P%", value: "35.9", percentile: 65 },
					{ label: "FTA", value: "395", percentile: 80 },
					{ label: "FT%", value: "81.7", percentile: 75 },
					{ label: "ASTS", value: "715", percentile: 99 },
					{ label: "TOVS", value: "276", percentile: 30 },
					{ label: "OREBS", value: "205", percentile: 95 },
					{ label: "DREBS", value: "794", percentile: 98 },
					{ label: "STLS", value: "103", percentile: 85 },
					{ label: "BLKS", value: "67", percentile: 80 },
					{ label: "PFS", value: "206", percentile: 40 },
					{ label: "+/-", value: "+445", percentile: 98 },
					{ label: "RAPM", value: "+6.8", percentile: 99 }
				],
				per_game: [
					{ label: "GP", value: "79", percentile: 90 },
					{ label: "MIN", value: "34.6", percentile: 95 },
					{ label: "PTS", value: "28.7", percentile: 95 },
					{ label: "2PA", value: "13.2", percentile: 85 },
					{ label: "2P%", value: "58.7", percentile: 95 },
					{ label: "3PA", value: "3.0", percentile: 40 },
					{ label: "3P%", value: "35.9", percentile: 65 },
					{ label: "FTA", value: "5.0", percentile: 80 },
					{ label: "FT%", value: "81.7", percentile: 75 },
					{ label: "ASTS", value: "9.1", percentile: 99 },
					{ label: "TOVS", value: "3.5", percentile: 30 },
					{ label: "OREBS", value: "2.6", percentile: 95 },
					{ label: "DREBS", value: "10.0", percentile: 98 },
					{ label: "STLS", value: "1.3", percentile: 85 },
					{ label: "BLKS", value: "0.8", percentile: 80 },
					{ label: "PFS", value: "2.6", percentile: 40 },
					{ label: "+/-", value: "+5.6", percentile: 98 },
					{ label: "RAPM", value: "+6.8", percentile: 99 }
				],
				per_36: [
					{ label: "GP", value: "79", percentile: 90 },
					{ label: "MIN", value: "36.0", percentile: 100 },
					{ label: "PTS", value: "29.9", percentile: 95 },
					{ label: "2PA", value: "13.7", percentile: 85 },
					{ label: "2P%", value: "58.7", percentile: 95 },
					{ label: "3PA", value: "3.1", percentile: 40 },
					{ label: "3P%", value: "35.9", percentile: 65 },
					{ label: "FTA", value: "5.2", percentile: 80 },
					{ label: "FT%", value: "81.7", percentile: 75 },
					{ label: "ASTS", value: "9.4", percentile: 99 },
					{ label: "TOVS", value: "3.6", percentile: 30 },
					{ label: "OREBS", value: "2.7", percentile: 95 },
					{ label: "DREBS", value: "10.4", percentile: 98 },
					{ label: "STLS", value: "1.4", percentile: 85 },
					{ label: "BLKS", value: "0.9", percentile: 80 },
					{ label: "PFS", value: "2.7", percentile: 40 },
					{ label: "+/-", value: "+5.8", percentile: 98 },
					{ label: "RAPM", value: "+6.8", percentile: 99 }
				],
				per_100: [
					{ label: "GP", value: "79", percentile: 90 },
					{ label: "MIN", value: "100.0", percentile: 100 },
					{ label: "PTS", value: "83.0", percentile: 95 },
					{ label: "2PA", value: "38.1", percentile: 85 },
					{ label: "2P%", value: "58.7", percentile: 95 },
					{ label: "3PA", value: "8.7", percentile: 40 },
					{ label: "3P%", value: "35.9", percentile: 65 },
					{ label: "FTA", value: "14.4", percentile: 80 },
					{ label: "FT%", value: "81.7", percentile: 75 },
					{ label: "ASTS", value: "26.2", percentile: 99 },
					{ label: "TOVS", value: "10.1", percentile: 30 },
					{ label: "OREBS", value: "7.5", percentile: 95 },
					{ label: "DREBS", value: "29.1", percentile: 98 },
					{ label: "STLS", value: "3.8", percentile: 85 },
					{ label: "BLKS", value: "2.5", percentile: 80 },
					{ label: "PFS", value: "7.5", percentile: 40 },
					{ label: "+/-", value: "+16.3", percentile: 98 },
					{ label: "RAPM", value: "+6.8", percentile: 99 }
				]
			},
			salaryBreakdown: [
				{ year: "2024-25", amount: "$51.4M", capPercent: "37.6", percentile: 99 },
				{ year: "2025-26", amount: "$55.2M", capPercent: "37.4", percentile: 99 },
				{ year: "2026-27", amount: "$59.1M", capPercent: "37.4", percentile: 99 },
				{ year: "2027-28", amount: "$63.0M", capPercent: "37.2", percentile: 99 },
				{ year: "2028-29", amount: "$66.8M", capPercent: "37.1", percentile: 99 }
			],
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
			wingspan: "7'9\"",
			skinColor: 'dark' as const,
			hairStyle: 'afro' as const,
			hairColor: "#2B1810",
			jerseyNumber: 1,
			position: "C",
			experience: 2,
			birthDate: "2004-01-04",
			team: {
				name: "San Antonio Spurs",
				primaryColor: "#C4CED4",
				secondaryColor: "#000000"
			},
			detailedStats: {
				totals: [
					{ label: "GP", value: "71", percentile: 75 },
					{ label: "MIN", value: "2329", percentile: 85 },
					{ label: "PTS", value: "1708", percentile: 80 },
					{ label: "2PA", value: "693", percentile: 65 },
					{ label: "2P%", value: "52.1", percentile: 70 },
					{ label: "3PA", value: "518", percentile: 90 },
					{ label: "3P%", value: "32.5", percentile: 45 },
					{ label: "FTA", value: "490", percentile: 85 },
					{ label: "FT%", value: "79.6", percentile: 70 },
					{ label: "ASTS", value: "254", percentile: 75 },
					{ label: "TOVS", value: "263", percentile: 25 },
					{ label: "OREBS", value: "158", percentile: 90 },
					{ label: "DREBS", value: "554", percentile: 95 },
					{ label: "STLS", value: "85", percentile: 80 },
					{ label: "BLKS", value: "254", percentile: 99 },
					{ label: "PFS", value: "178", percentile: 50 },
					{ label: "+/-", value: "-89", percentile: 25 },
					{ label: "RAPM", value: "+1.2", percentile: 60 }
				],
				per_game: [
					{ label: "GP", value: "71", percentile: 75 },
					{ label: "MIN", value: "32.8", percentile: 85 },
					{ label: "PTS", value: "24.1", percentile: 80 },
					{ label: "2PA", value: "9.8", percentile: 65 },
					{ label: "2P%", value: "52.1", percentile: 70 },
					{ label: "3PA", value: "7.3", percentile: 90 },
					{ label: "3P%", value: "32.5", percentile: 45 },
					{ label: "FTA", value: "6.9", percentile: 85 },
					{ label: "FT%", value: "79.6", percentile: 70 },
					{ label: "ASTS", value: "3.6", percentile: 75 },
					{ label: "TOVS", value: "3.7", percentile: 25 },
					{ label: "OREBS", value: "2.2", percentile: 90 },
					{ label: "DREBS", value: "7.8", percentile: 95 },
					{ label: "STLS", value: "1.2", percentile: 80 },
					{ label: "BLKS", value: "3.6", percentile: 99 },
					{ label: "PFS", value: "2.5", percentile: 50 },
					{ label: "+/-", value: "-1.3", percentile: 25 },
					{ label: "RAPM", value: "+1.2", percentile: 60 }
				],
				per_36: [
					{ label: "GP", value: "71", percentile: 75 },
					{ label: "MIN", value: "36.0", percentile: 100 },
					{ label: "PTS", value: "26.4", percentile: 80 },
					{ label: "2PA", value: "10.7", percentile: 65 },
					{ label: "2P%", value: "52.1", percentile: 70 },
					{ label: "3PA", value: "8.0", percentile: 90 },
					{ label: "3P%", value: "32.5", percentile: 45 },
					{ label: "FTA", value: "7.6", percentile: 85 },
					{ label: "FT%", value: "79.6", percentile: 70 },
					{ label: "ASTS", value: "3.9", percentile: 75 },
					{ label: "TOVS", value: "4.1", percentile: 25 },
					{ label: "OREBS", value: "2.4", percentile: 90 },
					{ label: "DREBS", value: "8.6", percentile: 95 },
					{ label: "STLS", value: "1.3", percentile: 80 },
					{ label: "BLKS", value: "3.9", percentile: 99 },
					{ label: "PFS", value: "2.7", percentile: 50 },
					{ label: "+/-", value: "-1.4", percentile: 25 },
					{ label: "RAPM", value: "+1.2", percentile: 60 }
				],
				per_100: [
					{ label: "GP", value: "71", percentile: 75 },
					{ label: "MIN", value: "100.0", percentile: 100 },
					{ label: "PTS", value: "73.3", percentile: 80 },
					{ label: "2PA", value: "29.8", percentile: 65 },
					{ label: "2P%", value: "52.1", percentile: 70 },
					{ label: "3PA", value: "22.2", percentile: 90 },
					{ label: "3P%", value: "32.5", percentile: 45 },
					{ label: "FTA", value: "21.0", percentile: 85 },
					{ label: "FT%", value: "79.6", percentile: 70 },
					{ label: "ASTS", value: "10.9", percentile: 75 },
					{ label: "TOVS", value: "11.3", percentile: 25 },
					{ label: "OREBS", value: "6.8", percentile: 90 },
					{ label: "DREBS", value: "23.8", percentile: 95 },
					{ label: "STLS", value: "3.7", percentile: 80 },
					{ label: "BLKS", value: "10.9", percentile: 99 },
					{ label: "PFS", value: "7.6", percentile: 50 },
					{ label: "+/-", value: "-3.8", percentile: 25 },
					{ label: "RAPM", value: "+1.2", percentile: 60 }
				]
			},
			salaryBreakdown: [
				{ year: "2024-25", amount: "$12.9M", capPercent: "9.4", percentile: 40 },
				{ year: "2025-26", amount: "$13.5M", capPercent: "9.2", percentile: 42 },
				{ year: "2026-27", amount: "$17.1M", capPercent: "10.8", percentile: 55 },
				{ year: "2027-28", amount: "$18.5M", capPercent: "10.9", percentile: 58 }
			],
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
