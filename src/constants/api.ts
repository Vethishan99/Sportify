export const API_BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

export const API_ENDPOINTS = {
  // Leagues
  ALL_LEAGUES: "/all_leagues.php",
  LEAGUE_DETAILS: "/lookupleague.php",

  // Teams
  TEAMS_IN_LEAGUE: "/lookup_all_teams.php",
  TEAM_DETAILS: "/lookupteam.php",

  // Events/Matches
  NEXT_EVENTS: "/eventsnextleague.php",
  PAST_EVENTS: "/eventspastleague.php",
  EVENTS_BY_LEAGUE: "/eventsseason.php",
  EVENT_DETAILS: "/lookupevent.php",
};

// Popular football league IDs
export const POPULAR_LEAGUES = {
  PREMIER_LEAGUE: "4328",
  LA_LIGA: "4335",
  SERIE_A: "4332",
  BUNDESLIGA: "4331",
  LIGUE_1: "4334",
  CHAMPIONS_LEAGUE: "4480",
};

// Dummy Auth API (using DummyJSON)
export const AUTH_API_BASE = "https://dummyjson.com";
