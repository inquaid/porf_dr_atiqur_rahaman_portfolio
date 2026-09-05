export const lightTheme = {
  // Modern color palette
  primary: '#6366f1', // indigo
  secondary: '#8b5cf6', // violet
  accent: '#06b6d4', // cyan
  background: '#f8fafc', // slate-50
  secondaryBackground: '#f1f5f9', // slate-100
  text: '#1e293b', // slate-800
  textMuted: '#64748b', // slate-500
  border: '#e2e8f0', // slate-200

  // Shadows with modern blur
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',

  // Gradients
  metalGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  buttonGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  hoverGradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
  textGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',

  // Card styling
  cardBackground: '#ffffff',
  cardBorder: 'rgba(99, 102, 241, 0.1)',

  // Scrollbar
  scrollbarTrack: '#f1f5f9',
  scrollbarThumb: '#cbd5e1',

  mode: 'light' as const,
};

export const darkTheme = {
  // Modern dark color palette
  primary: '#818cf8', // indigo-400
  secondary: '#a78bfa', // violet-400
  accent: '#22d3ee', // cyan-400
  background: '#0f172a', // slate-900
  secondaryBackground: '#1e293b', // slate-800
  text: '#f1f5f9', // slate-100
  textMuted: '#94a3b8', // slate-400
  border: '#334155', // slate-700

  // Shadows with glow effect for dark mode
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',

  // Gradients
  metalGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  buttonGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  hoverGradient: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
  textGradient: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #22d3ee 100%)',

  // Card styling
  cardBackground: '#1e293b',
  cardBorder: 'rgba(129, 140, 248, 0.15)',

  // Scrollbar
  scrollbarTrack: '#1e293b',
  scrollbarThumb: '#475569',

  mode: 'dark' as const,
};

// Base theme type for styled-components
export interface ThemeType {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  secondaryBackground: string;
  text: string;
  textMuted: string;
  border: string;
  shadow: string;
  shadowLg: string;
  metalGradient: string;
  buttonGradient: string;
  hoverGradient: string;
  textGradient: string;
  cardBackground: string;
  cardBorder: string;
  scrollbarTrack: string;
  scrollbarThumb: string;
  mode: 'light' | 'dark';
}
