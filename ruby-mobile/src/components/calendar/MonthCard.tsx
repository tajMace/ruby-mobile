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

import { View, Text, StyleSheet, Pressable } from 'react-native'
import DayCell from './DayCell'
import { CalendarEvent } from '../../models/CalendarEvent'
import { calendarColors, spacing, typography } from '../../theme/index'
import { getEventsByDate } from '../../utils/calendarUtils';

interface MonthCardProps {
    year: number;
    month: number;
    days: Array<{ date: Date; isCurrentMonth: boolean }>;
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    eventsByDate: Map<string, CalendarEvent[]>;
    onPrev: () => void;
    onToday: () => void;
    onNext: () => void;
    onRefresh?: () => void;
}

export default function MonthCard({
    year, 
    month,
    days,
    selectedDate,
    onSelectDate,
    eventsByDate,
    onPrev,
    onToday,
    onNext,
    onRefresh
}: MonthCardProps) {
    const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long'});
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
                            onPress={() => onSelectDate(dayObj.date)}
                            isSelected={selectedDate?.toDateString() === dayObj.date.toDateString()}
                        />
                    </View>
                ))}
            </View>

            <View style={styles.navigationRow}>
                <Pressable onPress={onPrev}>
                    <Text style={styles.navButton}>← Prev</Text>
                </Pressable>

                <Pressable onPress={onToday}>
                    <Text style={styles.navButton}>Today</Text>
                </Pressable>

                <Pressable onPress={onNext}>
                    <Text style={styles.navButton}>Next →</Text>
                </Pressable>

                <Pressable onPress={onRefresh}>
                    <Text style={styles.navButton}>🔄</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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