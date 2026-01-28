/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-28
 * Title        : EventDetailView.tsx
 * Description  : pop-up view to show full, single event details
 * Copyright (c) 2026 Taj Macé.
 * =============<< ********* >>=============
 */

import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { CalendarEvent } from '../../models/CalendarEvent'
import { calendarColors, spacing, typography } from '../../theme/index'
import { formatDateKey } from '../../utils/calendarUtils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface EventDetailViewProps {
    event: CalendarEvent
    onClose?: () => void
    onEdit?: () => void
    onDelete?: () => void
}

export default function EventDetailView({ event, onClose, onEdit, onDelete }: EventDetailViewProps) {
    const [expanded, setExpanded] = useState(false)
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable style={styles.headerLeft} onPress={onClose}>
                    <Text style={styles.headerButtonText}>✕</Text>
                </Pressable>

                <View style={styles.headerInfo}>
                    <Text style={styles.headerDate}>{formatDateKey(new Date(event.date))}</Text>
                    <Text style={styles.headerTime}>
                        {event.start_time || '—'} - {event.end_time || '—'}
                    </Text>
                </View>

                <Pressable style={styles.headerRight} onPress={onEdit}>
                    <Text style={styles.headerButtonText}>Update</Text>
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <View style={styles.timeSection}>
                        <Text style={styles.sectionTitle}>
                            {event.event_title || 'Event Details'}
                        </Text>
                    </View>

                    <View style={styles.labelsContainer}>
                        <Text style={styles.sectionLabel}>Labels</Text>
                        <View style={styles.labelsList}>
                            {(event.labels || []).length === 0 && (
                                <Text style={styles.noDescription}>No labels</Text>
                            )}
                            {(event.labels || []).map((label, i) => (
                                <View key={i} style={styles.labelItem}>
                                    <Text style={styles.labelText}>{label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.sectionLabel}>Description</Text>
                        {event.description ? (
                            <>
                                <Text style={styles.descriptionText} numberOfLines={expanded ? undefined : 5}>
                                    {event.description}
                                </Text>
                                {event.description.length > 220 && (
                                    <Pressable onPress={() => setExpanded(!expanded)}>
                                        <Text style={styles.expandText}>{expanded ? 'Show less' : 'Show more'}</Text>
                                    </Pressable>
                                )}
                            </>
                        ) : (
                            <Text style={styles.noDescription}>No description</Text>
                        )}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.deleteCardWrapper}>
                <Pressable style={styles.deleteCard} onPress={onDelete}>
                    <Text style={styles.deleteCardText}>Delete Event</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: calendarColors.background
    },
    header: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: calendarColors.border,
    },
    headerLeft: {
        padding: spacing.sm,
        zIndex: 1,
    },
    headerRight: {
        padding: spacing.sm,
        zIndex: 1,
    },
    headerInfo: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 0,
    },
    headerDate: {
        ...typography.subtitle,
        color: calendarColors.dayNumber,
        textAlign: 'center',
    },
    headerTime: {
        ...typography.body,
        color: calendarColors.dayNumber,
        marginTop: spacing.xs,
        textAlign: 'center',
    },
    timeSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: calendarColors.border,
        marginHorizontal: spacing.md,
        marginVertical: spacing.md,
        borderRadius: 8,
    },
    sectionTitle: {
        ...typography.h1,
        color: calendarColors.dayNumber,
        textAlign: 'center',
    },
    timeColumn: {
        alignItems: 'center'
    },
    timeLabel: {
        ...typography.body,
        color: calendarColors.dayNumber,
        marginBottom: spacing.xs
    },
    timeValue: {
        ...typography.h2,
        color: calendarColors.dayNumber,
    },
    descriptionContainer: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        marginHorizontal: spacing.md,
        marginVertical: spacing.md,
        backgroundColor: calendarColors.border,
        borderRadius: 8
    },
    descriptionText: {
        ...typography.body,
        color: calendarColors.dayNumber,
    },
    labelsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    labelChip: {
        backgroundColor: calendarColors.todayBorder,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 12,
        marginLeft: spacing.xs,
    },
    labelText: {
        ...typography.caption,
        color: calendarColors.dayNumber,
    },

    headerButtonText: {
        ...typography.button,
        color: calendarColors.dayNumber,
    }
    ,
    content: {
        padding: spacing.md,
    },
    card: {
        backgroundColor: calendarColors.background,
        borderRadius: 12,
        paddingBottom: spacing.lg,
    },
    descriptionColumn: {
        flex: 2,
        paddingRight: spacing.md,
    },
    labelsContainer: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        marginHorizontal: spacing.md,
        marginVertical: spacing.sm,
        backgroundColor: calendarColors.border,
        borderRadius: 8
    },
    labelsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
        marginTop: spacing.xs,
    },
    labelItem: {
        backgroundColor: calendarColors.todayBorder,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 8,
        marginBottom: spacing.xs,
        alignSelf: 'flex-start'
    },
    whenColumn: {
        flex: 1,
    },
    sectionLabel: {
        ...typography.subtitle,
        color: calendarColors.dayNumber,
        marginBottom: spacing.xs,
    },
    dateText: {
        ...typography.body,
        color: calendarColors.dayNumber,
        marginTop: spacing.xs,
    },
    expandText: {
        ...typography.caption,
        color: calendarColors.todayBorder,
        marginTop: spacing.xs,
    },
    noDescription: {
        ...typography.caption,
        color: calendarColors.dayNumber,
        fontStyle: 'italic',
    },
    deleteCardWrapper: {
        padding: spacing.md,
        backgroundColor: 'transparent',
    },
    deleteCard: {
        backgroundColor: '#FF6B6B',
        paddingVertical: spacing.md,
        borderRadius: 12,
        alignItems: 'center',
    },
    deleteCardText: {
        ...typography.button,
        color: '#fff',
    }
})