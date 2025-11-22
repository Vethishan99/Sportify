import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Match } from "../types";
import { formatDate, formatTime, getMatchStatus } from "../utils/helpers";

interface MatchCardProps {
  match: Match;
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  const { colors } = useTheme();
  const status = getMatchStatus(
    match.strStatus,
    match.intHomeScore,
    match.intAwayScore
  );

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Favorite Button */}
      {onFavoritePress && (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
        >
          <Feather
            name="heart"
            size={20}
            color={isFavorite ? colors.error : colors.textSecondary}
          />
        </TouchableOpacity>
      )}

      {/* League Badge */}
      <View style={[styles.badge, { backgroundColor: colors.primary }]}>
        <Text style={styles.badgeText}>{match.strLeague}</Text>
      </View>

      {/* Match Info */}
      <View style={styles.matchInfo}>
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {formatDate(match.dateEvent)} • {formatTime(match.strTime)}
        </Text>
        <Text style={[styles.matchTitle, { color: colors.text }]}>
          {match.strEvent}
        </Text>

        {/* Teams */}
        <View style={styles.teamsContainer}>
          <View style={styles.teamRow}>
            <Text style={[styles.teamName, { color: colors.text }]}>
              {match.strHomeTeam}
            </Text>
            {match.intHomeScore !== null && (
              <Text style={[styles.score, { color: colors.text }]}>
                {match.intHomeScore}
              </Text>
            )}
          </View>
          <View style={styles.teamRow}>
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
      </View>

      {/* Thumbnail */}
      {match.strThumb && (
        <Image
          source={{ uri: match.strThumb }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 4,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  matchInfo: {
    marginBottom: 12,
  },
  date: {
    fontSize: 12,
    marginBottom: 4,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  teamsContainer: {
    marginBottom: 12,
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  teamName: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  score: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  thumbnail: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
});
