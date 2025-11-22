import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import Icon from "./Icon";

interface EmptyStateProps {
  icon?: any;
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "inbox",
  title,
  message,
}) => {
  const { colors, tokens } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.primary + "10" },
        ]}
      >
        <Icon name={icon} size={48} color={colors.primary} />
      </View>

      <Text
        style={[
          styles.title,
          { color: colors.text, fontSize: tokens.fontSizes.xl },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.message,
          {
            color: colors.textSecondary,
            fontSize: tokens.fontSizes.md,
          },
        ]}
      >
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
    padding: 40,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
  },
});
