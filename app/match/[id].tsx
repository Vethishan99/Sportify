import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../src/contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import {
  addFavoriteMatch,
  removeFavoriteMatch,
} from "../../src/redux/slices/favoritesSlice";
import { Match } from "../../src/types";
import {
  formatDate,
  formatTime,
  getMatchStatus,
} from "../../src/utils/helpers";

export default function MatchDetailsScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { favoriteMatches } = useAppSelector((state) => state.favorites);

  const match: Match = params.match ? JSON.parse(params.match as string) : null;

  if (!match) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Match not found
        </Text>
      </View>
    );
  }

  const isFavorite = favoriteMatches.some(
    (fav) => fav.idEvent === match.idEvent
  );
  const status = getMatchStatus(
    match.strStatus,
    match.intHomeScore,
    match.intAwayScore
  );

  const handleFavoritePress = () => {
    if (isFavorite) {
      dispatch(removeFavoriteMatch(match.idEvent));
    } else {
      dispatch(addFavoriteMatch(match));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        {match.strThumb && (
          <Image
            source={{ uri: match.strThumb }}
            style={styles.headerImage}
            resizeMode="cover"
          />
        )}

        {/* Back and Favorite Buttons */}
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.card }]}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: colors.card }]}
          onPress={handleFavoritePress}
        >
          <Feather
            name="heart"
            size={24}
            color={isFavorite ? colors.error : colors.textSecondary}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          {/* League Badge */}
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={styles.badgeText}>{match.strLeague}</Text>
          </View>

          {/* Match Title */}
          <Text style={[styles.matchTitle, { color: colors.text }]}>
            {match.strEvent}
          </Text>

          {/* Date & Time */}
          <View style={styles.infoRow}>
            <Feather name="calendar" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              {formatDate(match.dateEvent)} • {formatTime(match.strTime)}
            </Text>
          </View>

          {/* Status Badge */}
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  status === "Completed"
                    ? colors.success
                    : status === "Upcoming"
                    ? colors.secondary
                    : colors.textSecondary,
              },
            ]}
          >
            <Text style={styles.statusText}>{status}</Text>
          </View>

          {/* Score Card */}
          <View
            style={[
              styles.scoreCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {/* Home Team */}
            <View style={styles.teamContainer}>
              <Text style={[styles.teamName, { color: colors.text }]}>
                {match.strHomeTeam}
              </Text>
              {match.intHomeScore !== null && (
                <Text style={[styles.score, { color: colors.text }]}>
                  {match.intHomeScore}
                </Text>
              )}
            </View>

            <Text style={[styles.vs, { color: colors.textSecondary }]}>VS</Text>

            {/* Away Team */}
            <View style={styles.teamContainer}>
              <Text style={[styles.teamName, { color: colors.text }]}>
                {match.strAwayTeam}
              </Text>
              {match.intAwayScore !== null && (
                <Text style={[styles.score, { color: colors.text }]}>
                  {match.intAwayScore}
                </Text>
              )}
            </View>
          </View>

          {/* Additional Info */}
          {match.strSeason && (
            <View
              style={[
                styles.infoCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.infoCardTitle, { color: colors.text }]}>
                Season
              </Text>
              <Text
                style={[styles.infoCardValue, { color: colors.textSecondary }]}
              >
                {match.strSeason}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: 250,
  },
  backButton: {
    position: "absolute",
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  favoriteButton: {
    position: "absolute",
    top: 48,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  content: {
    padding: 20,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  matchTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 24,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  scoreCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
  },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  score: {
    fontSize: 32,
    fontWeight: "700",
    marginLeft: 16,
  },
  vs: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 8,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
});
