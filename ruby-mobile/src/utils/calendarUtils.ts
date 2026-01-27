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

    if (!events || !Array.isArray(events)) {
        return grouped;
    }

    events.forEach(event => {
        // Handle both ISO format (2026-01-27T...) and simple date format (2026-01-27)
        const dateKey = event.date.includes('T') ? event.date.split('T')[0] : event.date;

        if (!grouped.has(dateKey)) {
            grouped.set(dateKey, []);
        }
        grouped.get(dateKey)!.push(event);
    });

    return grouped;
}

export function getEventsByDate(date: Date, events: Map<string, CalendarEvent[]>): CalendarEvent[]{
    const year = date.getUTCFullYear();
    const month = String((date.getUTCMonth() + 1)).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    return events.get(dateKey) || [];
}

/**
 * generates all days for a month view (including padding from prev/next month)
 * returns array of (date, isCurrentMonth) objects
 */
export function getDaysInMonthGrid(year: number, month: number): Array<{date: Date, isCurrentMonth: boolean}> {
    // Create dates in UTC to avoid timezone issues
    const firstDay = new Date(Date.UTC(year, month, 1));
    const lastDay = new Date(Date.UTC(year, month + 1, 0));

    const startDate = new Date(firstDay);
    startDate.setUTCDate(startDate.getUTCDate() - firstDay.getUTCDay());

    const days: Array<{date: Date, isCurrentMonth: boolean}> = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
        days.push({
            date: new Date(current),
            isCurrentMonth: current.getUTCMonth() === month
        });
        current.setUTCDate(current.getUTCDate() + 1);
    }

    return days;
}

/**
 * formats a date to YYYY-MM-DD for consistent comparison
 */
export function formatDateKey(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String((date.getUTCMonth() + 1)).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/**
 * returns a boolean depending on whether the argument is today's date
 */
export function isToday(date: Date): boolean {
    const today = new Date();
    return date.getUTCDate() === today.getUTCDate() &&
           date.getUTCMonth() === today.getUTCMonth() &&
           date.getUTCFullYear() === today.getUTCFullYear();
}