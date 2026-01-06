export interface FootballNews {
  id: number;
  publishedAt: string;
  image: string;
  title: string;
  subtitle: string;
  content: string[];
  category: string;
}

export const footballNewsMock: FootballNews[] = [
  {
    id: 1,
    publishedAt: "2026-01-05",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg",
    title: "Late Goal Drama Shocks Fans in Premier League Clash",
    subtitle:
      "A last-minute strike changed everything as the stadium erupted in disbelief",
    category: "Match Report",
    content: [
      "The Premier League witnessed another dramatic night as a late goal completely shifted the momentum of the match.",
      "Throughout the first half, possession was evenly split, with both sides struggling to break down compact defensive lines.",
      "The tempo increased significantly after halftime, with substitutions injecting fresh energy into the match.",
      "As the clock ticked past the 90th minute, it seemed inevitable that the match would end in a draw.",
      "In a stunning turn of events, a quick counterattack resulted in a perfectly placed shot into the bottom corner.",
      "The result has major implications for the league table, adding pressure to upcoming fixtures.",
    ],
  },
  {
    id: 2,
    publishedAt: "2026-01-04",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg",
    title: "Young Star Impresses on International Debut",
    subtitle: "The teenager delivered a composed performance beyond his years",
    category: "International",
    content: [
      "International football welcomed a new rising star as the young midfielder made his debut under intense pressure.",
      "Playing against experienced opposition, he showcased excellent ball control and positional awareness.",
      "In the second half, his confidence grew, and he began driving forward with intent.",
      "The coaching staff praised his discipline and tactical understanding.",
      "Fans quickly took notice, applauding every touch as his influence on the game became more evident.",
      "With performances like this, his future at the international level looks extremely promising.",
    ],
  },
  {
    id: 3,
    publishedAt: "2026-01-03",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg",
    title: "Manager Defends Tactics After Goalless Draw",
    subtitle: "Criticism grows despite a solid defensive display",
    category: "Tactics",
    content: [
      "Following a tense goalless draw, the manager addressed criticism surrounding his tactical approach.",
      "The match itself was tightly contested, with few opportunities created by either side.",
      "Opposition attacks were neutralized effectively throughout the match.",
      "The manager highlighted the importance of consistency and balance.",
      "He acknowledged the need for improvement in the final third.",
      "Results like this may prove crucial as the season progresses.",
    ],
  },
  {
    id: 4,
    publishedAt: "2026-01-03",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg",
    title: "Transfer Rumours Heat Up Ahead of Deadline Day",
    subtitle: "Clubs prepare last-minute moves",
    category: "Transfers",
    content: [
      "Transfer deadline day is approaching with clubs scrambling to finalize deals.",
      "Several high-profile names are linked with late moves.",
      "Negotiations intensified overnight across Europe.",
      "Managers are eager to strengthen weak positions.",
      "Fans remain glued to updates as speculation grows.",
      "The final hours promise plenty of drama.",
    ],
  },
  {
    id: 5,
    publishedAt: "2026-01-03",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg",
    title: "Champions League Draw Sets Up Blockbuster Ties",
    subtitle: "European giants face off",
    category: "UEFA",
    content: [
      "The Champions League draw has produced several mouth-watering fixtures.",
      "Top European sides will clash in the knockout rounds.",
      "Managers reacted cautiously to the draw results.",
      "Fans are already anticipating classic encounters.",
      "Preparation will be key as teams analyze opponents.",
      "The road to the final promises elite competition.",
    ],
  },
];
