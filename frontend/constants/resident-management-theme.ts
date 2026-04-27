import { Fonts } from '@/constants/theme';

export const ResidentTheme = {
  colors: {
    pageBg: '#F4F9FF',
    cardBg: '#FFFFFF',
    brand: '#1D4ED8',
    brandSoft: '#DBEAFE',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    border: '#BFDBFE',
    danger: '#DC2626',
    success: '#059669',
  },
  fonts: {
    family: Fonts?.sans ?? 'normal',
    tiny: 11,
    small: 13,
    base: 14,
    medium: 15,
    heading: 18,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
};
