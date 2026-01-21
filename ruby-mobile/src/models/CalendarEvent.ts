/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-21
 * Title        : CalendarEvent.ts
 * Description  : Calendar event model, as to the backend
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

export interface CalendarEvent {
    id: number;
    event_title: string;
    date: string;
    start_time?: string | null;
    end_time?: string | null;
    location?: string | null;
    description?: string | null;
    labels?: string[] | null;
    recurring_rule?: string | null;
    reminder_time?: string | null;
    prompt?: string | null;
    created_at?: string;
}