import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAppSelector } from "../src/redux/hooks";

export default function Index() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Small delay to let auth check complete
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/auth/login");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
      }}
    >
      <ActivityIndicator size="large" color="#2196F3" />
    </View>
  );
}
