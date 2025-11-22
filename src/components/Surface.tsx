import { useTheme } from "@/src/contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, ViewStyle } from "react-native";

interface SurfaceProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  elevation?: "none" | "sm" | "md" | "lg";
  gradient?: boolean;
  pressable?: boolean;
}

export const Surface: React.FC<SurfaceProps> = ({
  children,
  style,
  elevation = "sm",
  gradient = false,
  pressable = false,
}) => {
  const { colors, tokens, isDark } = useTheme();

  const elevationStyle = {
    shadowColor: isDark ? "#000" : colors.text,
    shadowOffset: { width: 0, height: tokens.elevation[elevation] },
    shadowOpacity: isDark ? 0.4 : 0.1,
    shadowRadius: tokens.elevation[elevation] * 2,
    elevation: tokens.elevation[elevation],
  };

  const baseStyle = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    ...elevationStyle,
  };

  if (gradient) {
    return (
      <LinearGradient
        colors={[colors.card, isDark ? "#2A2A2E" : "#FAFAFA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[baseStyle, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return <View style={[baseStyle, style]}>{children}</View>;
};

export default Surface;
