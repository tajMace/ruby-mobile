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

import { View, Text, StyleSheet, Pressable } from 'react-native'
import { CalendarEvent } from '../../models/CalendarEvent'
import { calendarColors, spacing, typography } from '../../theme/index'
import { isToday } from '../../utils/calendarUtils'

interface DayCellProps {
    date: Date;
    events: CalendarEvent[];
    isCurrentMonth: boolean;
    onPress?: () => void;
    isSelected?: boolean;
}

export default function DayCell({ date, events, isCurrentMonth, onPress, isSelected }: DayCellProps) {
    const dayNumber = date.getDate();
    const maxVisibleDots = 6;
    const displayEvents = events.slice(0, maxVisibleDots);
    const overflow = Math.max(0, events.length - maxVisibleDots);

    const styles = getStyles(!!isSelected, isCurrentMonth, events.length);

    return (
        <Pressable 
            onPress={onPress} 
            style={({ pressed }) => [
                styles.container, 
                isSelected && styles.selected, 
                pressed && styles.pressed
            ]}
        >
            <Text style={styles.dayNumber}>{dayNumber}</Text>
            <View style={styles.dotsContainer}>
                {displayEvents.map((event) => (
                    <View key={event.id} style={styles.dot} />
                ))}
                {overflow > 0 && (
                    <Text style={styles.overflowText}>+{overflow}</Text>
                )}
            </View>
        </Pressable>
    );
}

function getStyles(isSelected: boolean, isCurrentMonth: boolean, dotCount: number) {
    const isSingleRow = dotCount <= 3;

    return StyleSheet.create({
        container: {
            flex: 1,
            padding: spacing.xs,
            aspectRatio: 1,
            borderWidth: 2,
            borderRadius: 6,
            borderColor: isSelected ? calendarColors.todayBorder : calendarColors.border,
            opacity: isCurrentMonth ? 1 : 0.5,
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
        },
        dayNumber: {
            ...typography.button,
            color: calendarColors.dayNumber,
            fontWeight: isSelected ? '600' : '400',
            marginBottom: 0
        },
        dotsContainer: {
            width: '70%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.xs,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: (isSingleRow) ? 'auto' : 0,
            marginBottom: (isSingleRow) ? 'auto' : 0
        },
        dot: {
            width: '20%',
            aspectRatio: 1,
            backgroundColor: calendarColors.eventDot,
            borderRadius: 1
        },
        overflowText: {
            ...typography.caption,
            color: calendarColors.dayNumber
        },
        selected: {
            borderColor: calendarColors.todayBorder,
            borderWidth: 3
        },
        pressed: {
            opacity: 0.7
        }
    });
}