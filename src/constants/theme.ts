import { ThemeColors, ThemeTokens } from "../types";

// New, modern, sports-tech inspired color palette
export const lightTheme: ThemeColors = {
  // Vibrant Teal/Mint for a fresh look
  primary: "#00C48C", 
  // Slate/Blue for secondary accents
  secondary: "#546E7A", 
  // Off-white background for a less harsh light mode
  background: "#F2F2F7", 
  // Pure white card for contrast
  card: "#FFFFFF", 
  // Dark text
  text: "#1C1C1E", 
  // Medium gray for subtle text (dates, secondary info)
  textSecondary: "#6A6A6A", 
  // Light border for subtle separation
  border: "#E0E0E0", 
  // Semantic colors remain clear
  error: "#FF3B30", 
  success: "#34C759", 
  warning: "#FF9500",
};

export const darkTheme: ThemeColors = {
  // Primary remains vibrant for visibility
  primary: "#00E0A3", 
  // A muted blue/gray for secondary in dark mode
  secondary: "#90A4AE", 
  // Deep navy/charcoal for a premium dark mode
  background: "#0A0A0A", 
  // Slightly lighter gray for card surfaces
  card: "#1C1C1E", 
  // White text
  text: "#FFFFFF", 
  // Light gray for subtle text
  textSecondary: "#AAAAAA", 
  // Darker border for separation
  border: "#333333", 
  // Semantic colors adjusted for dark backgrounds
  error: "#FF453A", 
  success: "#32D74B", 
  warning: "#FF9F0A",
};

// Shared design tokens (system fonts assumed)
export const tokens: ThemeTokens = {
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
    pill: 999,
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  fontSizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    display: 30,
  },
  gradients: {
    subtlePrimary: ["#00C48C", "#00E0A3"],
    subtleSecondary: ["#546E7A", "#90A4AE"],
    surface: ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"],
  },
  elevation: {
    none: 0,
    sm: 2,
    md: 6,
    lg: 12,
  },
  transitions: {
    fast: 120,
    normal: 200,
    slow: 320,
  },
};