import { EmptyState, LoadingSpinner, MatchCard } from "@/src/components";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  loadFavorites,
  removeFavoriteMatch,
} from "@/src/redux/slices/favoritesSlice";
import { Match } from "@/src/types";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { favoriteMatches, isLoading } = useAppSelector(
    (state) => state.favorites
  );

  useEffect(() => {
    dispatch(loadFavorites());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMatchPress = (match: Match) => {
    router.push({
      pathname: "/match/[id]",
      params: { id: match.idEvent, match: JSON.stringify(match) },
    });
  };

  const handleRemoveFavorite = (match: Match) => {
    dispatch(removeFavoriteMatch(match.idEvent));
  };

  const renderMatch = ({ item }: { item: Match }) => (
    <MatchCard
      match={item}
      onPress={() => handleMatchPress(item)}
      onFavoritePress={() => handleRemoveFavorite(item)}
      isFavorite={true}
    />
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {favoriteMatches.length}{" "}
          {favoriteMatches.length === 1 ? "match" : "matches"} saved
        </Text>
      </View>

      <FlatList
        data={favoriteMatches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.idEvent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="heart"
            title="No favorites yet"
            message="Start adding your favorite matches from the home screen"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
});
