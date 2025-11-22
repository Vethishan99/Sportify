import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface EmptyStateProps {
  icon?: keyof typeof Feather.glyphMap;
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "inbox",
  title,
  message,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Feather name={icon} size={64} color={colors.textSecondary} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
