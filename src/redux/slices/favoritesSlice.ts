import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FavoritesState, Match, Team } from "../../types";

const FAVORITES_MATCHES_KEY = "@sportify_favorite_matches";
const FAVORITES_TEAMS_KEY = "@sportify_favorite_teams";

const initialState: FavoritesState = {
  favoriteMatches: [],
  favoriteTeams: [],
  isLoading: false,
};

// Async thunks
export const loadFavorites = createAsyncThunk(
  "favorites/loadFavorites",
  async () => {
    try {
      const [matchesData, teamsData] = await Promise.all([
        AsyncStorage.getItem(FAVORITES_MATCHES_KEY),
        AsyncStorage.getItem(FAVORITES_TEAMS_KEY),
      ]);

      return {
        matches: matchesData ? JSON.parse(matchesData) : [],
        teams: teamsData ? JSON.parse(teamsData) : [],
      };
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return { matches: [], teams: [] };
    }
  }
);

export const addFavoriteMatch = createAsyncThunk(
  "favorites/addFavoriteMatch",
  async (match: Match, { getState }) => {
    try {
      const state = getState() as { favorites: FavoritesState };
      const updatedMatches = [...state.favorites.favoriteMatches, match];
      await AsyncStorage.setItem(
        FAVORITES_MATCHES_KEY,
        JSON.stringify(updatedMatches)
      );
      return match;
    } catch (error) {
      console.error("Failed to add favorite match:", error);
      throw error;
    }
  }
);

export const removeFavoriteMatch = createAsyncThunk(
  "favorites/removeFavoriteMatch",
  async (matchId: string, { getState }) => {
    try {
      const state = getState() as { favorites: FavoritesState };
      const updatedMatches = state.favorites.favoriteMatches.filter(
        (match) => match.idEvent !== matchId
      );
      await AsyncStorage.setItem(
        FAVORITES_MATCHES_KEY,
        JSON.stringify(updatedMatches)
      );
      return matchId;
    } catch (error) {
      console.error("Failed to remove favorite match:", error);
      throw error;
    }
  }
);

export const addFavoriteTeam = createAsyncThunk(
  "favorites/addFavoriteTeam",
  async (team: Team, { getState }) => {
    try {
      const state = getState() as { favorites: FavoritesState };
      const updatedTeams = [...state.favorites.favoriteTeams, team];
      await AsyncStorage.setItem(
        FAVORITES_TEAMS_KEY,
        JSON.stringify(updatedTeams)
      );
      return team;
    } catch (error) {
      console.error("Failed to add favorite team:", error);
      throw error;
    }
  }
);

export const removeFavoriteTeam = createAsyncThunk(
  "favorites/removeFavoriteTeam",
  async (teamId: string, { getState }) => {
    try {
      const state = getState() as { favorites: FavoritesState };
      const updatedTeams = state.favorites.favoriteTeams.filter(
        (team) => team.idTeam !== teamId
      );
      await AsyncStorage.setItem(
        FAVORITES_TEAMS_KEY,
        JSON.stringify(updatedTeams)
      );
      return teamId;
    } catch (error) {
      console.error("Failed to remove favorite team:", error);
      throw error;
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favoriteMatches = [];
      state.favoriteTeams = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Load favorites
      .addCase(loadFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteMatches = action.payload.matches;
        state.favoriteTeams = action.payload.teams;
      })
      .addCase(loadFavorites.rejected, (state) => {
        state.isLoading = false;
      })

      // Add favorite match
      .addCase(addFavoriteMatch.fulfilled, (state, action) => {
        state.favoriteMatches.push(action.payload);
      })

      // Remove favorite match
      .addCase(removeFavoriteMatch.fulfilled, (state, action) => {
        state.favoriteMatches = state.favoriteMatches.filter(
          (match) => match.idEvent !== action.payload
        );
      })

      // Add favorite team
      .addCase(addFavoriteTeam.fulfilled, (state, action) => {
        state.favoriteTeams.push(action.payload);
      })

      // Remove favorite team
      .addCase(removeFavoriteTeam.fulfilled, (state, action) => {
        state.favoriteTeams = state.favoriteTeams.filter(
          (team) => team.idTeam !== action.payload
        );
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
