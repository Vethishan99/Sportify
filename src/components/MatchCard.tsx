import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Match } from "../types";
import { formatDate, formatTime, getMatchStatus } from "../utils/helpers";
import Icon from "./Icon";

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
  const { colors, tokens, isDark } = useTheme();
  const status = getMatchStatus(
    match.strStatus,
    match.intHomeScore,
    match.intAwayScore
  );

  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return colors.success;
      case "Upcoming":
        return colors.secondary;
      default:
        return colors.warning;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          shadowColor: isDark ? "#000" : colors.text,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image with gradient overlay */}
      {match.strThumb && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: match.strThumb }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", colors.card]}
            style={styles.imageGradient}
          />
        </View>
      )}

      <View style={[styles.content, { paddingHorizontal: tokens.spacing.lg }]}>
        {/* Header with league badge and favorite */}
        <View style={styles.header}>
          <View
            style={[
              styles.leagueBadge,
              { backgroundColor: colors.primary + "15" },
            ]}
          >
            <Text
              style={[
                styles.leagueText,
                { color: colors.primary, fontSize: tokens.fontSizes.xs },
              ]}
            >
              {match.strLeague}
            </Text>
          </View>
          {onFavoritePress && (
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={onFavoritePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon
                name={isFavorite ? "heart" : "heart"}
                size={22}
                color={isFavorite ? colors.error : colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Match title */}
        <Text
          style={[
            styles.matchTitle,
            { color: colors.text, fontSize: tokens.fontSizes.lg },
          ]}
          numberOfLines={2}
        >
          {match.strEvent}
        </Text>

        {/* Date & Time */}
        <View style={styles.dateRow}>
          <Icon name="clock" size={14} color={colors.textSecondary} />
          <Text
            style={[
              styles.dateText,
              {
                color: colors.textSecondary,
                fontSize: tokens.fontSizes.sm,
                marginLeft: tokens.spacing.xs,
              },
            ]}
          >
            {formatDate(match.dateEvent)} • {formatTime(match.strTime)}
          </Text>
        </View>

        {/* Divider */}
        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.border,
              marginVertical: tokens.spacing.md,
            },
          ]}
        />

        {/* Teams and scores */}
        <View style={styles.teamsContainer}>
          <View style={styles.teamRow}>
            <Text
              style={[
                styles.teamName,
                { color: colors.text, fontSize: tokens.fontSizes.md },
              ]}
              numberOfLines={1}
            >
              {match.strHomeTeam}
            </Text>
            {match.intHomeScore !== null && (
              <Text
                style={[
                  styles.score,
                  { color: colors.primary, fontSize: tokens.fontSizes.xl },
                ]}
              >
                {match.intHomeScore}
              </Text>
            )}
          </View>

          <View style={styles.teamRow}>
            <Text
              style={[
                styles.teamName,
                { color: colors.text, fontSize: tokens.fontSizes.md },
              ]}
              numberOfLines={1}
            >
              {match.strAwayTeam}
            </Text>
            {match.intAwayScore !== null && (
              <Text
                style={[
                  styles.score,
                  { color: colors.primary, fontSize: tokens.fontSizes.xl },
                ]}
              >
                {match.intAwayScore}
              </Text>
            )}
          </View>
        </View>

        {/* Status badge */}
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor() + "15",
              marginTop: tokens.spacing.md,
            },
          ]}
        >
          <View
            style={[styles.statusDot, { backgroundColor: getStatusColor() }]}
          />
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(), fontSize: tokens.fontSizes.xs },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: "hidden",
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  imageContainer: {
    width: "100%",
    height: 140,
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  content: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  leagueBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  leagueText: {
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  favoriteButton: {
    padding: 4,
  },
  matchTitle: {
    fontWeight: "800",
    lineHeight: 24,
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontWeight: "500",
  },
  divider: {
    height: 1,
  },
  teamsContainer: {
    gap: 12,
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamName: {
    fontWeight: "600",
    flex: 1,
    marginRight: 12,
  },
  score: {
    fontWeight: "800",
    minWidth: 30,
    textAlign: "right",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
