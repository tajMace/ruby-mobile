/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-26
 * Title        : EventViewer.tsx
 * Description  : component to view events in bar format below the MonthCard itself
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { CalendarEvent } from '../../models/CalendarEvent'
import { calendarColors, spacing, typography } from '../../theme'
import { typography } from '../../theme/typography';

interface EventViewerProps {
    date: Date;
    events: CalendarEvent[];
}

export default function EventViewer({ date, events }: EventViewerProps) {
    return (
        <ScrollView style={styles.container}>

        </ScrollView>
    );
}

function EventCard({ event }: { event: CalendarEvent }) {

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: calendarColors.background,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        maxHeight: 400,
        borderTopWidth: 1,
        borderTopColor: calendarColors.border
    },
    eventCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: calendarColors.background,
        borderWidth: 1,
        borderColor: calendarColors.border,
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.md,
        gap: spacing.md
    },
    leftContent: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    rightContent: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
    },
    eventTitle: {
        ...typography.h3,
        color: calendarColors.dayNumber,
        marginBottom: spacing.xs
    },
    eventDescription: {
        ...typography.bodySmall,
        color: calendarColors.dayNumber,
        opacity: 0.7
    },
    eventDate: {
        ...typography.h2,
        color: calendarColors.todayBorder,
        marginBottom: spacing.xs
    },
    eventLocation: {
        ...typography.caption,
        color: calendarColors.dayNumber,
        marginBottom: spacing.sm
    },
    eventTag: {
        ...typography.caption,
        color: calendarColors.dayNumber,
        backgroundColor: calendarColors.border,
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.xs,
        borderRadius: 4,
        maginBottom: spacing.xs
    },
    
});