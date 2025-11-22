import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "large",
  fullScreen = false,
}) => {
  const { colors } = useTheme();

  if (fullScreen) {
    return (
      <View
        style={[
          styles.fullScreenContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size={size} color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
