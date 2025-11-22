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
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {favoriteMatches.length}{" "}
          {favoriteMatches.length === 1 ? "game" : "games"} tracked
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
            title="No Favorites"
            message="Tap the heart icon on a match to save it here."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 20,
  },
});
