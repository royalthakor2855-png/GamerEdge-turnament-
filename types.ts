
export interface Tournament {
  id: string;
  game: 'Free Fire' | 'BGMI' | 'Call of Duty' | 'Valorant Mobile';
  displayGame?: string; // For the 50+ diverse games
  title: string;
  entryFee: number;
  prizePool: number;
  startTime: string;
  maxPlayers: number;
  currentPlayers: number;
  map: string;
  mode: 'Solo' | 'Duo' | 'Squad';
  status: 'Upcoming' | 'Live' | 'Completed';
}

export interface User {
  phone: string;
  email?: string; // Added for strict admin validation
  name: string;
  isAdmin: boolean;
  walletBalance: number;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};
