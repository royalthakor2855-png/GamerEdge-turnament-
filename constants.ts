
import { Tournament } from './types';

export const ADMIN_CONFIG = {
  EMAIL: 'hhareshthakor643@gmail.com',
  MOBILE: '9974053021',
  SECRET_PIN: '9974053',
};

const GAMES = [
  'Free Fire', 'BGMI', 'Call of Duty', 'Valorant Mobile', 'Ludo King', 
  'Clash of Clans', 'Pokemon UNITE', 'Carrom Pool', '8 Ball Pool', 'Stumble Guys',
  'Minecraft', 'Among Us', 'Roblox', 'Apex Legends Mobile', 'PUBG New State',
  'Fau-G', 'World Cricket Championship 3', 'Real Cricket 24', 'Candy Crush',
  'Clash Royale', 'Brawl Stars', 'Mobile Legends', 'League of Legends: Wild Rift',
  'Genshin Impact', 'Diablo Immortal', 'TFT Mobile', 'Legends of Runeterra',
  'Hearthstone', 'Dead by Daylight Mobile', 'Modern Combat 5', 'Asphalt 9',
  'Need for Speed No Limits', 'Mario Kart Tour', 'Rocket League Sideswipe',
  'NBA 2K Mobile', 'FIFA Mobile', 'Madden NFL Mobile', 'Tennis Clash',
  'Golf Battle', 'Archery Master 3D', 'Knife Hit', 'Subway Surfers',
  'Temple Run 2', 'Hill Climb Racing', 'Angry Birds 2', 'Plants vs Zombies',
  'Fruit Ninja', 'Jetpack Joyride', 'Shadow Fight 3', 'Mortal Kombat Mobile'
] as const;

export const MOCK_TOURNAMENTS: Tournament[] = GAMES.map((game, index) => ({
  id: (index + 1).toString(),
  game: (['Free Fire', 'BGMI', 'Call of Duty', 'Valorant Mobile'].includes(game) 
    ? game 
    : 'Call of Duty') as Tournament['game'], // Using standard types but display title can be custom
  displayGame: game, // Helper for UI
  title: `${game} Master Series S${Math.floor(Math.random() * 10) + 1}`,
  entryFee: [0, 10, 20, 50, 100][Math.floor(Math.random() * 5)],
  prizePool: [1000, 2000, 5000, 10000, 25000][Math.floor(Math.random() * 5)],
  startTime: new Date(Date.now() + (index * 3600000)).toISOString(),
  maxPlayers: [48, 100, 10, 5, 2][Math.floor(Math.random() * 5)],
  currentPlayers: Math.floor(Math.random() * 20),
  map: ['Arena', 'Classic', 'Purgatory', 'Erangel', 'Bermuda'][Math.floor(Math.random() * 5)],
  mode: (['Solo', 'Duo', 'Squad'] as const)[Math.floor(Math.random() * 3)],
  status: 'Upcoming'
}));
