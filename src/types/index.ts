// User types
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Match types
export interface Match {
  idEvent: string;
  strEvent: string;
  strLeague: string;
  strSeason: string;
  dateEvent: string;
  strTime: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  intRound?: string | number | null;
  strStatus: string;
  strThumb: string | null;
  strSquare: string | null;
  strBanner: string | null;
}

// League types
export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

// Team types
export interface Team {
  idTeam: string;
  strTeam: string;
  strTeamBadge: string;
  strLeague: string;
  strStadium: string;
  intFormedYear: string;
  strCountry: string;
  strDescriptionEN: string;
}

// Matches State
export interface MatchesState {
  matches: Match[];
  leagues: League[];
  isLoading: boolean;
  error: string | null;
}

// Favorites State
export interface FavoritesState {
  favoriteMatches: Match[];
  favoriteTeams: Team[];
  isLoading: boolean;
}

// Theme types
export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

// Design tokens (non-color) for consistent UI styling
export interface ThemeTokens {
  radius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    pill: number;
  };
  spacing: {
    xxs: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    display: number;
  };
  gradients: {
    subtlePrimary: string[];
    subtleSecondary: string[];
    surface: string[];
  };
  elevation: {
    none: number;
    sm: number;
    md: number;
    lg: number;
  };
  transitions: {
    fast: number;
    normal: number;
    slow: number;
  };
}
