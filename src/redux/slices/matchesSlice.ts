import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sportsService } from "../../services/sportsService";
import { MatchesState } from "../../types";

const initialState: MatchesState = {
  matches: [],
  leagues: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchPopularMatches = createAsyncThunk(
  "matches/fetchPopularMatches",
  async (_, { rejectWithValue }) => {
    try {
      const matches = await sportsService.getPopularMatches();
      return matches;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch matches");
    }
  }
);

export const fetchEventsByLeague = createAsyncThunk(
  "matches/fetchEventsByLeague",
  async (
    { leagueId, season }: { leagueId: string; season?: string },
    { rejectWithValue }
  ) => {
    try {
      const matches = await sportsService.getEventsByLeague(leagueId, season);
      return matches;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch league matches");
    }
  }
);

export const fetchNextEvents = createAsyncThunk(
  "matches/fetchNextEvents",
  async (leagueId: string, { rejectWithValue }) => {
    try {
      const matches = await sportsService.getNextEvents(leagueId);
      return matches;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch next events");
    }
  }
);

export const fetchPastEvents = createAsyncThunk(
  "matches/fetchPastEvents",
  async (leagueId: string, { rejectWithValue }) => {
    try {
      const matches = await sportsService.getPastEvents(leagueId);
      return matches;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch past events");
    }
  }
);

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    clearMatches: (state) => {
      state.matches = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch popular matches
    builder
      .addCase(fetchPopularMatches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches = action.payload;
      })
      .addCase(fetchPopularMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch events by league
      .addCase(fetchEventsByLeague.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEventsByLeague.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches = action.payload;
      })
      .addCase(fetchEventsByLeague.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch next events
      .addCase(fetchNextEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNextEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches = action.payload;
      })
      .addCase(fetchNextEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch past events
      .addCase(fetchPastEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPastEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches = action.payload;
      })
      .addCase(fetchPastEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMatches } = matchesSlice.actions;
export default matchesSlice.reducer;
