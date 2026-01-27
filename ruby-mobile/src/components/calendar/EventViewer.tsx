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

import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { CalendarEvent } from '../../models/CalendarEvent'
import { calendarColors, spacing, typography } from '../../theme'

interface EventViewerProps {
    date: Date;
    events: CalendarEvent[];
    onCreateEvent?: () => void;
}

export default function EventViewer({ date, events, onCreateEvent }: EventViewerProps) {
    return (
        <ScrollView style={styles.container}>
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
            <CreateEventButton onPress={onCreateEvent} />
        </ScrollView>
    );
}

function EventCard({ event }: { event: CalendarEvent }) {
    return (
        <View style={styles.eventCard}>
            <View style={styles.leftContent}>
                <Text style={styles.eventTitle}>{event.event_title}</Text>
                {event.location && (
                    <Text style={styles.eventLocation}>{event.location}</Text>
                )}
                {event.description && (
                    <Text style={styles.eventDescription}>{event.description}</Text>
                )}
            </View>

            <View style={styles.rightContent}>
                {event.labels && event.labels.length > 0 && (
                    <View style={styles.tagsContainer}>
                        {event.labels.map((label, index) => (
                            <Text key={index} style={styles.eventTag}>{label}</Text>
                        ))}
                    </View>
                )}

                {event.start_time && (
                    <Text style={styles.eventStartTime}>{event.start_time}</Text>
                )}
                {event.end_time && (
                    <Text style={styles.eventEndTime}>{event.end_time}</Text>
                )}
            </View>
        </View>
    );
}

function CreateEventButton({ onPress }: { onPress?: () => void }) {
    return (
        <Pressable onPress={onPress} style={styles.addButton}>
            <Text style={styles.addButtonText}>Create Event +</Text>
        </Pressable>
    )
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
    eventStartTime: {
        ...typography.h2,
        color: calendarColors.dayNumber,
        marginBottom: spacing.xs
    },
    eventEndTime: {
        ...typography.h3,
        color: calendarColors.dayNumber,
        marginBottom: spacing.xs
    },
    eventLocation: {
        ...typography.caption,
        color: calendarColors.dayNumber,
        marginBottom: spacing.sm
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
        marginBottom: spacing.sm,
        justifyContent: 'flex-end'
    },
    eventTag: {
        ...typography.caption,
        color: calendarColors.dayNumber,
        backgroundColor: calendarColors.border,
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.xs,
        borderRadius: 4,
        marginBottom: spacing.xs
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        minHeight: 150
    },
    emptyStateText: {
        ...typography.subtitle,
        color: calendarColors.dayNumber,
        opacity: 0.6
    },
    addButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: calendarColors.background,
        borderWidth: 1,
        borderColor: calendarColors.border,
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.md,
        gap: spacing.md
    },
    addButtonText: {
        ...typography.h2,
        color: calendarColors.dayNumber
    }
});