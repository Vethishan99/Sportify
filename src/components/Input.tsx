import { useTheme } from "@/src/contexts/ThemeContext";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Icon from "./Icon";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: any;
  rightIcon?: any;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}) => {
  const { colors, tokens } = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.card,
            borderColor: error ? colors.error : colors.border,
            borderWidth: 1,
          },
        ]}
      >
        {leftIcon && (
          <View style={styles.iconLeft}>
            <Icon name={leftIcon} size={20} color={colors.textSecondary} />
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            leftIcon && { paddingLeft: 0 },
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          {...props}
        />
        {rightIcon && (
          <View style={styles.iconRight}>
            <Icon name={rightIcon} size={20} color={colors.textSecondary} />
          </View>
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
  },
  iconLeft: {
    marginRight: 12,
  },
  iconRight: {
    marginLeft: 12,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});

export default Input;
