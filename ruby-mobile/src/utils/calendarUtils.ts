/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-22
 * Title        : calendarUtils.ts
 * Description  : Utility functions for calendar view logic
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

import { CalendarEvent } from '../models/CalendarEvent';

/** 
 * Groups events by their date string (YYYY-MM-DD format)
 * Returns a Map for O(1) lookup
*/
export function groupEventsByDate(events: CalendarEvent[]): Map<string, CalendarEvent[]> {
    const grouped = new Map<string, CalendarEvent[]>();

    events.forEach(event => {
        const dateKey = event.date.split('T')[0];

        if (!grouped.has(dateKey)) {
            grouped.set(dateKey, []);
        }
        grouped.get(dateKey)!.push(event);
    });

    return grouped;
}

/**
 * generates all days for a month view (including padding from prev/next month)
 * returns array of (date, isCurrentMonth) objects
 */
export function getDaysInMonthGrid(year: number, month: number): Array<{date: Date, isCurrentMonth: boolean}> {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: Array<{date: Date, isCurrentMonth: boolean}> = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
        days.push({
            date: new Date(current),
            isCurrentMonth: current.getMonth() === month
        });
    current.setDate(current.getDate() + 1);
    }

    return days;
}

/**
 * formats a date to YYYY-MM-DD for consistent comparison
 */
export function formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String((date.getMonth() + 1)).padStart(2, '0');
    const day = String(date.getDay()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/**
 * returns a boolean depending on whether the argument is today's date
 */
export function isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}