/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-22
 * Title        : DayCell.tsx
 * Description  : day cell component for calendar view
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

import { View, Text, StyleSheet } from 'react-native'
import { CalendarEvent } from '../../models/CalendarEvent'
import { colours, spacing, typography } from '../../theme/index'
import { isToday } from '../../utils/calendarUtils'

interface DayCellProps {
    date: Date;
    events: CalendarEvent[];
    isCurrentMonth: boolean;
}

export default function DayCell({ date, events, isCurrentMonth }: DayCellProps) {
    const today = isToday(date);
    const dayNumber = date.getDate();
    const maxVisibleDots = 4;
    const displayEvents = events.slice(0, maxVisibleDots);
    const overflow = Math.max(0, events.length - maxVisibleDots);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: spacing.sm,
            aspectRatio: 1,
            backgroundColor: today ? colours.accent : colours.secondary,
            borderRadius: 8,
            opacity: isCurrentMonth ? 1 : 0.5
        },
        dayNumber: {
            ...typography.bodySmall,
            color: today ? 'white' : colours.dark,
            fontWeight: today ? '600' : '400',
            marginBottom: spacing.xs
        },
        dotsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.xs
        },
        dot: {
            width: 6,
            height: 6,
            backgroundColor: colours.accent,
            borderRadius: 1
        },
        overflowText: {
            ...typography.caption,
            color: colours.dark
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.dayNumber}>{dayNumber}</Text>
            <View style={styles.dotsContainer}>
                {displayEvents.map((event) => (
                    <View key={event.id} style={styles.dot} />
                ))}
                {overflow > 0 && (
                    <Text style={styles.overflowText}>+{overflow}</Text>
                )}
            </View>
        </View>
    )
}