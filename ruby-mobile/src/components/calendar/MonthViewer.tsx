/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-26
 * Title        : MonthViewer.tsx
 * Description  : overarching view to render and collect month based info for the calendar
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

import { useState } from "react";
import { View, StyleSheet } from 'react-native'
import MonthCard from "./MonthCard";
import EventViewer from "./EventViewer";
import { CalendarEvent } from "../../models/CalendarEvent";
import { calendarColors, spacing } from '../../theme/index'
import { getDaysInMonthGrid, getEventsByDate, groupEventsByDate } from "../../utils/calendarUtils";

export default function MonthViewer() {
    const { year, month, prev, toToday, next } = useMonthNavigation();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Mock events - distributed across random dates
    const mockEvents: CalendarEvent[] = [
        { id: 1, event_title: 'Team Meeting', date: new Date(year, month, 5).toISOString().split('T')[0] },
        { id: 2, event_title: 'Project Review', date: new Date(year, month, 5).toISOString().split('T')[0] },
        { id: 3, event_title: 'Client Call', date: new Date(year, month, 12).toISOString().split('T')[0] },
        { id: 4, event_title: 'Lunch Meeting', date: new Date(year, month, 12).toISOString().split('T')[0] },
        { id: 5, event_title: 'Design Review', date: new Date(year, month, 12).toISOString().split('T')[0] },
        { id: 9, event_title: 'Steve Meeting', date: new Date(year, month, 12).toISOString().split('T')[0] },
        { id: 6, event_title: 'Sprint Planning', date: new Date(year, month, 18).toISOString().split('T')[0] },
        { id: 7, event_title: 'Standup', date: new Date(year, month, 18).toISOString().split('T')[0] },
        { id: 8, event_title: 'Demo', date: new Date(year, month, 25).toISOString().split('T')[0] },
    ];

    const eventsByDate = groupEventsByDate(mockEvents);
    const days = getDaysInMonthGrid(year, month);

    return (
        <View style={styles.container}>
            <MonthCard
                year={year}
                month={month}
                days={days}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                eventsByDate={eventsByDate}
                onPrev={prev}
                onToday={toToday}
                onNext={next}
            />

            {selectedDate && (
                <EventViewer
                    date={selectedDate}
                    events={getEventsByDate(selectedDate, eventsByDate)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: calendarColors.background
    }
})

function useMonthNavigation() {
    const today = new Date()
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    function prev() {
        setMonth((month === 0) ? 11 : month - 1);
        if (month === 0) setYear(year - 1);
    }

    function toToday() {
        setMonth(today.getMonth());
        setYear(today.getFullYear())
    }

    function next() {
        setMonth((month === 11) ? 0 : month + 1);
        if (month === 11) setYear(year + 1);
    }

    return { year, month, prev, toToday, next }
}