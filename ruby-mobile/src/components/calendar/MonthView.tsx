/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-24
 * Title        : MonthView.tsx
 * Description  : month view component, including DayCells, for calendar view
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import DayCell from './DayCell'
import { CalendarEvent } from '../../models/CalendarEvent'
import { calendarColors, spacing, typography } from '../../theme/index'
import { getDaysInMonthGrid, getEventsByDate, groupEventsByDate } from '../../utils/calendarUtils';

export default function MonthCard() {
    const { year, month, prev, toToday, next } = useMonthNavigation();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const days = getDaysInMonthGrid(year, month);
    const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long'});

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

    const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <View style={styles.container}>
            <Text style={styles.monthTitle}>
                {monthName} {year}
            </Text>

            <View style={styles.weekdayRow}>
                {WEEKDAYS.map((day) => (
                    <Text key={day} style={styles.weekdayLabel}>
                        {day}
                    </Text>
                ))}
            </View>

            <View style={styles.calendarGrid}>
                {days.map((dayObj, index) => (
                    <View key={index} style={styles.cellWrapper}>
                        <DayCell
                            date={dayObj.date}
                            events={getEventsByDate(dayObj.date, eventsByDate)}
                            isCurrentMonth={dayObj.isCurrentMonth}
                            onPress={() => setSelectedDate(dayObj.date)}
                            isSelected={selectedDate?.toDateString() === dayObj.date.toDateString()}
                        />
                    </View>
                ))}
            </View>

            <View style={styles.navigationRow}>
                <Pressable onPress={prev}>
                    <Text style={styles.navButton}>← Prev</Text>
                </Pressable>

                <Pressable onPress={toToday}>
                    <Text style={styles.navButton}>Today</Text>
                </Pressable>

                <Pressable onPress={next}>
                    <Text style={styles.navButton}>Next →</Text>
                </Pressable>
            </View>
        </View>
    )
}

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: calendarColors.background,
        padding: spacing.md
    },
    monthTitle: {
        ...typography.h2,
        color: calendarColors.dayNumber,
        textAlign: 'center',
        marginBottom: spacing.md
    },
    weekdayRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: spacing.md
    },
    weekdayLabel: {
        ...typography.caption,
        color: calendarColors.dayNumber,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center'
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    cellWrapper: {
        width: '14.28%',
        aspectRatio: 1,
        marginBottom: spacing.sm,
    },
    navigationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.md
    },
    navButton: {
        color: calendarColors.dayNumber,
        fontSize: 16,
        fontWeight: '600'
    }
});