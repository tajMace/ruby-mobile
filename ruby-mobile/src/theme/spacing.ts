/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-22
 * Title        : spacing.ts
 * Description  : spacing choices across project
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

export const spacing = {
  xs: 4,      // Tight spacing (borders, small gaps)
  sm: 8,      // Small spacing (component padding)
  md: 16,     // Medium spacing (section padding, standard gaps)
  lg: 24,     // Large spacing (major section breaks)
  xl: 32,     // Extra large spacing (screen padding)
  xxl: 48,    // 2X large spacing (major layout breaks)
} as const;

export type SpacingKey = keyof typeof spacing;