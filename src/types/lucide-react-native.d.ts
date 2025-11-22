declare module 'lucide-react-native' {
  import * as React from 'react';
  export interface IconProps {
    color?: string;
    size?: number;
    strokeWidth?: number;
    style?: any;
  }
  export type LucideIcon = React.FC<IconProps>;
  // Export a subset placeholder; actual package provides many icons.
  export const Home: LucideIcon;
  export const Heart: LucideIcon;
  export const User: LucideIcon;
  export const Clock: LucideIcon;
  export const Zap: LucideIcon;
  export const Key: LucideIcon;
  export const Lock: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const Calendar: LucideIcon;
  // Fallback index signature
  export const createLucideIcon: any;
  const icons: Record<string, LucideIcon>;
  export default icons;
}
