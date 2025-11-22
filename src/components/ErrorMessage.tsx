import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.error },
      ]}
    >
      <Feather name="alert-circle" size={24} color={colors.error} />
      <Text style={[styles.message, { color: colors.error }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  message: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
});
