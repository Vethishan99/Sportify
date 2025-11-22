import { useTheme } from "@/src/contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout } from "@/src/redux/slices/authSlice";
import { clearFavorites } from "@/src/redux/slices/favoritesSlice";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { favoriteMatches } = useAppSelector((state) => state.favorites);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await dispatch(logout());
          await dispatch(clearFavorites());
          router.replace("/auth/login");
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.avatarContainer,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.avatarText}>
              {user?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.fullName}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            @{user?.username}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user?.email}
          </Text>
        </View>

        {/* Stats Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Statistics
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Feather name="heart" size={24} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {favoriteMatches.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Favorites
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Settings
          </Text>

          {/* Dark Mode Toggle */}
          <TouchableOpacity style={styles.settingItem} onPress={toggleTheme}>
            <View style={styles.settingLeft}>
              <Feather
                name={isDark ? "moon" : "sun"}
                size={20}
                color={colors.textSecondary}
                style={styles.settingIcon}
              />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <View
              style={[
                styles.switch,
                { backgroundColor: isDark ? colors.primary : colors.border },
              ]}
            >
              <View
                style={[
                  styles.switchThumb,
                  { backgroundColor: colors.card },
                  isDark && styles.switchThumbActive,
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>About</Text>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Version
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              1.0.0
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Developer
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              Sportify Team
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Made with ❤️ for IN3210
          </Text>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
  },
  switch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: "center",
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  switchThumbActive: {
    alignSelf: "flex-end",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
  },
});
