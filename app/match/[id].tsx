import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          {match.strThumb ? (
            <Image
              source={{ uri: match.strThumb }}
              style={styles.headerImage}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.placeholderImage,
                { backgroundColor: colors.secondary },
              ]}
            />
          )}
          {/* Overlay gradient hack using opacity */}
          <View style={styles.overlay} />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleFavoritePress}
          >
            <Feather
              name="heart"
              size={24}
              color={isFavorite ? colors.error : "#FFF"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Header Info */}
          <View style={styles.headerInfo}>
            <View
              style={[styles.leagueBadge, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.badgeText}>{match.strLeague}</Text>
            </View>
            <Text style={[styles.matchTitle, { color: colors.text }]}>
              {match.strEvent}
            </Text>
            <View style={styles.dateRow}>
              <Feather name="calendar" size={14} color={colors.textSecondary} />
              <Text style={[styles.dateText, { color: colors.textSecondary }]}>
                {formatDate(match.dateEvent)} • {formatTime(match.strTime)}
              </Text>
            </View>
          </View>

          {/* Scoreboard Card */}
          <View
            style={[
              styles.scoreCard,
              {
                backgroundColor: colors.card,
                shadowColor: colors.text,
              },
            ]}
          >
            <View style={styles.teamColumn}>
              <Text style={[styles.teamName, { color: colors.text }]}>
                {match.strHomeTeam}
              </Text>
              <Text style={[styles.score, { color: colors.primary }]}>
                {match.intHomeScore ?? "-"}
              </Text>
            </View>

            <View style={styles.vsColumn}>
              <View
                style={[
                  styles.statusPill,
                  {
                    backgroundColor:
                      status === "Completed"
                        ? colors.success
                        : status === "Upcoming"
                        ? colors.secondary
                        : colors.warning,
                  },
                ]}
              >
                <Text style={styles.statusText}>{status}</Text>
              </View>
            </View>

            <View style={styles.teamColumn}>
              <Text style={[styles.teamName, { color: colors.text }]}>
                {match.strAwayTeam}
              </Text>
              <Text style={[styles.score, { color: colors.primary }]}>
                {match.intAwayScore ?? "-"}
              </Text>
            </View>
          </View>

          {/* Details / Season */}
          {match.strSeason && (
            <View
              style={[styles.detailsCard, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Match Details
              </Text>
              <View
                style={[styles.detailRow, { borderBottomColor: colors.border }]}
              >
                <Text
                  style={[styles.detailLabel, { color: colors.textSecondary }]}
                >
                  Season
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {match.strSeason}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text
                  style={[styles.detailLabel, { color: colors.textSecondary }]}
                >
                  Round
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {match.intRound || "Regular Season"}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: { height: 280, width: "100%" },
  headerImage: { width: "100%", height: "100%" },
  placeholderImage: { width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", // Darken image for button visibility
  },
  navBar: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginTop: -40, // Overlap effect
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerInfo: { marginBottom: 20 },
  leagueBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  matchTitle: { fontSize: 26, fontWeight: "800", marginBottom: 8 },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dateText: { fontSize: 14, fontWeight: "500" },
  scoreCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  teamColumn: { flex: 1, alignItems: "center" },
  vsColumn: { width: 80, alignItems: "center" },
  teamName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  score: { fontSize: 42, fontWeight: "900" },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  detailsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  detailLabel: { fontSize: 14 },
  detailValue: { fontSize: 14, fontWeight: "600" },
  errorText: { fontSize: 16, textAlign: "center", marginTop: 50 },
});
