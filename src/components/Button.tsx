import { useTheme } from "@/src/contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: any;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  style,
}) => {
  const { colors, tokens } = useTheme();

  const sizeStyles = {
    sm: {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
    },
    md: {
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
    },
    lg: {
      paddingVertical: tokens.spacing.lg,
      paddingHorizontal: tokens.spacing.xl,
    },
  };

  const textSizes = {
    sm: tokens.fontSizes.sm,
    md: tokens.fontSizes.md,
    lg: tokens.fontSizes.lg,
  };

  const getVariantStyle = () => {
    switch (variant) {
      case "secondary":
        return { backgroundColor: colors.secondary };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.primary,
        };
      case "ghost":
        return { backgroundColor: "transparent" };
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const getTextColor = () => {
    if (variant === "outline" || variant === "ghost") return colors.primary;
    return "#FFFFFF";
  };

  const buttonStyle = [
    styles.button,
    sizeStyles[size],
    getVariantStyle(),
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyle: TextStyle = {
    color: getTextColor(),
    fontSize: textSizes[size],
    fontWeight: "700",
  };

  if (variant === "primary" && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[buttonStyle, { backgroundColor: "transparent" }]}
      >
        <LinearGradient
          colors={tokens.gradients.subtlePrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: tokens.radius.lg }]}
        />
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={buttonStyle}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
  },
});

export default Button;
