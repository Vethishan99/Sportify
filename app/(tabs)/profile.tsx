import { useTheme } from "@/src/contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { forceLogout, logout } from "@/src/redux/slices/authSlice";
import { clearFavorites } from "@/src/redux/slices/favoritesSlice";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { favoriteMatches } = useAppSelector((state) => state.favorites);

  const performLogout = async () => {
    try {
      console.log("Performing logout...");
      const action = await dispatch(logout());
      if (logout.fulfilled.match(action)) {
        console.log("Logout thunk fulfilled");
      } else {
        console.warn("Logout thunk rejected, forcing local logout");
        dispatch(forceLogout());
      }
    } catch (e) {
      console.error("Logout dispatch error, forcing local logout", e);
      dispatch(forceLogout());
    }
    await dispatch(clearFavorites());
    // Extra storage safety: try clearing again in case thunk failed
    // (non-blocking) dynamic import to avoid circular deps
    import("@/src/utils/storage").then((m) => {
      m.storageUtils.clearAuthData().catch((err: any) => {
        console.error("Secondary storage clear failed", err);
      });
    });
    router.replace("/auth/login");
  };

  const handleLogout = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to logout?")) {
        performLogout();
      }
    } else {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: performLogout,
        },
      ]);
    }
  };

  // Guard: if auth state becomes unauthenticated anywhere, ensure user is moved to login
  useEffect(() => {
    if (!isAuthenticated && user === null) {
      // Only redirect if we're truly logged out (not initial load)
      const timer = setTimeout(() => {
        router.replace("/auth/login");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header - Changed to a clean, safe-area-friendly view */}
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
            {
              backgroundColor: colors.card,
              // New shadow for depth
              shadowColor: colors.text,
            },
          ]}
        >
          <View
            style={[
              styles.avatarContainer,
              // Avatar uses the primary color background
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
            {
              backgroundColor: colors.card,
              shadowColor: colors.text,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Statistics
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Feather name="heart" size={28} color={colors.error} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {favoriteMatches.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Favorite Matches
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              shadowColor: colors.text,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Settings
          </Text>

          {/* Dark Mode Toggle - Integrated with the new primary color */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Feather
                name={isDark ? "moon" : "sun"}
                size={22}
                color={colors.primary} // Icon uses primary color
                style={styles.settingIcon}
              />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <View
              style={[
                styles.switch,
                // Background is primary when active, border color when inactive
                { backgroundColor: isDark ? colors.primary : colors.border },
              ]}
            >
              <View
                style={[
                  styles.switchThumb,
                  { backgroundColor: colors.card },
                  // Thumb position based on state
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
            {
              backgroundColor: colors.card,
              shadowColor: colors.text,
            },
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

        {/* Logout Button - prominent and uses error color */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Feather name="log-out" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Made with <Feather name="heart" size={10} color={colors.error} />{" "}
            for IN3210
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
  // Simplified Header for modern full-bleed look
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    borderBottomWidth: 0, // Removed border
  },
  title: {
    fontSize: 32, // Larger title
    fontWeight: "900", // Extra bold
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 16, // More rounded corners
    padding: 20,
    marginBottom: 16,
    borderWidth: 0, // Removed border
    elevation: 8, // Stronger shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 2,
    fontWeight: "500",
  },
  cardTitle: {
    fontSize: 20, // Larger card title
    fontWeight: "800",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center", // Centered stats
  },
  statItem: {
    alignItems: "center",
    padding: 10,
    minWidth: 100,
  },
  statValue: {
    fontSize: 30, // Larger stat value
    fontWeight: "800",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16, // Increased vertical padding
    borderBottomWidth: 1, // Subtle separator for settings list
    borderBottomColor: "#F0F0F0", // Light gray separator
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "600",
  },
  switch: {
    width: 48, // Adjusted width
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
    paddingVertical: 10,
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
    paddingVertical: 18, // Increased padding
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18, // Larger text
    fontWeight: "700",
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
  },
});
