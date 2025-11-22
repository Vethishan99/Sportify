import { POPULAR_LEAGUES } from "../constants/api";
import { League, Match, Team } from "../types";
import apiClient from "./apiClient";

export const sportsService = {
  // Get events for a specific league and season
  getEventsByLeague: async (
    leagueId: string,
    season: string = "2024-2025"
  ): Promise<Match[]> => {
    try {
      const response = await apiClient.get("/eventsseason.php", {
        params: { id: leagueId, s: season },
      });
      return response.data.events || [];
    } catch (error) {
      console.error("Failed to fetch events:", error);
      return [];
    }
  },

  // Get next 15 events for a league
  getNextEvents: async (leagueId: string): Promise<Match[]> => {
    try {
      const response = await apiClient.get("/eventsnextleague.php", {
        params: { id: leagueId },
      });
      return response.data.events || [];
    } catch (error) {
      console.error("Failed to fetch next events:", error);
      return [];
    }
  },

  // Get past events for a league
  getPastEvents: async (leagueId: string): Promise<Match[]> => {
    try {
      const response = await apiClient.get("/eventspastleague.php", {
        params: { id: leagueId },
      });
      return response.data.events || [];
    } catch (error) {
      console.error("Failed to fetch past events:", error);
      return [];
    }
  },

  // Get event details by ID
  getEventDetails: async (eventId: string): Promise<Match | null> => {
    try {
      const response = await apiClient.get("/lookupevent.php", {
        params: { id: eventId },
      });
      return response.data.events?.[0] || null;
    } catch (error) {
      console.error("Failed to fetch event details:", error);
      return null;
    }
  },

  // Get all teams in a league
  getTeamsInLeague: async (leagueId: string): Promise<Team[]> => {
    try {
      const response = await apiClient.get("/lookup_all_teams.php", {
        params: { id: leagueId },
      });
      return response.data.teams || [];
    } catch (error) {
      console.error("Failed to fetch teams:", error);
      return [];
    }
  },

  // Get team details by ID
  getTeamDetails: async (teamId: string): Promise<Team | null> => {
    try {
      const response = await apiClient.get("/lookupteam.php", {
        params: { id: teamId },
      });
      return response.data.teams?.[0] || null;
    } catch (error) {
      console.error("Failed to fetch team details:", error);
      return null;
    }
  },

  // Get all leagues
  getAllLeagues: async (): Promise<League[]> => {
    try {
      const response = await apiClient.get("/all_leagues.php");
      // Filter to get only football leagues
      const allLeagues = response.data.leagues || [];
      return allLeagues.filter(
        (league: League) => league.strSport === "Soccer"
      );
    } catch (error) {
      console.error("Failed to fetch leagues:", error);
      return [];
    }
  },

  // Fetch matches from multiple popular leagues
  getPopularMatches: async (): Promise<Match[]> => {
    try {
      const leagueIds = Object.values(POPULAR_LEAGUES);
      const promises = leagueIds.map((id) => sportsService.getNextEvents(id));
      const results = await Promise.all(promises);

      // Combine and flatten all matches
      const allMatches = results.flat();

      // Remove duplicates based on idEvent
      const uniqueMatches = allMatches.filter(
        (match, index, self) =>
          index === self.findIndex((m) => m.idEvent === match.idEvent)
      );

      // Sort by date
      return uniqueMatches.sort((a, b) => {
        const dateA = new Date(a.dateEvent).getTime();
        const dateB = new Date(b.dateEvent).getTime();
        return dateA - dateB;
      });
    } catch (error) {
      console.error("Failed to fetch popular matches:", error);
      return [];
    }
  },
};
