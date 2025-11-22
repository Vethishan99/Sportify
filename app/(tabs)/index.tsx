import {
  EmptyState,
  ErrorMessage,
  LoadingSpinner,
  MatchCard,
} from "@/src/components";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  addFavoriteMatch,
  loadFavorites,
  removeFavoriteMatch,
} from "@/src/redux/slices/favoritesSlice";
import { fetchPopularMatches } from "@/src/redux/slices/matchesSlice";
import { Match } from "@/src/types";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { colors, tokens } = useTheme();
  const dispatch = useAppDispatch();
  const { matches, isLoading, error } = useAppSelector(
    (state) => state.matches
  );
  const { favoriteMatches } = useAppSelector((state) => state.favorites);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(fetchPopularMatches());
    dispatch(loadFavorites());
  };

  const handleRefresh = () => {
    loadData();
  };

  const handleMatchPress = (match: Match) => {
    router.push({
      pathname: "/match/[id]",
      params: { id: match.idEvent, match: JSON.stringify(match) },
    });
  };

  const handleFavoritePress = (match: Match) => {
    const isFavorite = favoriteMatches.some(
      (fav) => fav.idEvent === match.idEvent
    );
    if (isFavorite) {
      dispatch(removeFavoriteMatch(match.idEvent));
    } else {
      dispatch(addFavoriteMatch(match));
    }
  };

  const isFavorite = (matchId: string) => {
    return favoriteMatches.some((fav) => fav.idEvent === matchId);
  };

  const renderMatch = ({ item }: { item: Match }) => (
    <MatchCard
      match={item}
      onPress={() => handleMatchPress(item)}
      onFavoritePress={() => handleFavoritePress(item)}
      isFavorite={isFavorite(item.idEvent)}
    />
  );

  if (isLoading && matches.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Modern gradient header */}
      <LinearGradient
        colors={[colors.card, colors.background]}
        style={styles.header}
      >
        <Text
          style={[
            styles.greeting,
            { color: colors.textSecondary, fontSize: tokens.fontSizes.md },
          ]}
        >
          Welcome back,
        </Text>
        <Text
          style={[
            styles.username,
            { color: colors.text, fontSize: tokens.fontSizes.display },
          ]}
        >
          {user?.fullName || "Fan"} 👋
        </Text>
      </LinearGradient>

      {error && <ErrorMessage message={error} />}

      <FlatList
        data={matches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.idEvent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              icon="Calendar"
              title="No Matches"
              message="Check back later for upcoming games!"
            />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  greeting: {
    fontWeight: "500",
    marginBottom: 4,
  },
  username: {
    fontWeight: "900",
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
});
