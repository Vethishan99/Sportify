import { useTheme } from "@/src/contexts/ThemeContext";
import { Feather } from "@expo/vector-icons";
import React from "react";

interface IconProps {
  name: keyof typeof Feather.glyphMap;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 22,
  color,
  style,
}) => {
  const { colors } = useTheme();
  const iconColor = color || colors.text;

  return <Feather name={name} size={size} color={iconColor} style={style} />;
};

export default Icon;
