import { ThemeProvider, useTheme } from "@/src/contexts/ThemeContext";
import { useAppDispatch } from "@/src/redux/hooks";
import { checkAuth } from "@/src/redux/slices/authSlice";
import { store } from "@/src/redux/store";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider } from "react-redux";

function AppNavigator() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthStatus = async () => {
    const result = await dispatch(checkAuth());
    if (checkAuth.fulfilled.match(result)) {
      if (result.payload.isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/auth/login");
      }
    }
  };

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="match/[id]"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
}
