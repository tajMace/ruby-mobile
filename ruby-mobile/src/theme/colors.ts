/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-22
 * Title        : colours.ts
 * Description  : colour choices across the project
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */
export const calendarColors = {
    background: "#3A3A3A",          // graphite
    todayBorder: "#623CEA",         // majorelle blue
    border: "#4A4A4A",              // charcoal
    dayNumber: "#FFFFFF",           // white
    eventDot: "#BC9EC1"             // lilac
} as const;

export type ColourKey = keyof typeof calendarColors;