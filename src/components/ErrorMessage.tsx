import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import Icon from "./Icon";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { colors, tokens, isDark } = useTheme();

  const backgroundColor = isDark ? colors.error + "15" : colors.error + "10";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderColor: colors.error + "40",
        },
      ]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: colors.error + "20" }]}
      >
        <Icon name="alert-circle" size={18} color={colors.error} />
      </View>
      <Text
        style={[
          styles.message,
          { color: colors.error, fontSize: tokens.fontSizes.sm },
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontWeight: "600",
    lineHeight: 20,
  },
});
