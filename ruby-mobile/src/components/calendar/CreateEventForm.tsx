/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-27
 * Title        : CreateEventForm.tsx
 * Description  : Form to create a calendar event manually, and send it to the backend.
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, FlatList } from "react-native";
import { useState, useEffect } from 'react'
import { calendarColors, spacing, typography } from "../../theme";
import { calendarAPI } from "../../services/api";
import { formatDateKey } from "../../utils/calendarUtils";

interface EventFormProps {
    event_title: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    description: string;
    labels: string[];
}

interface CreateEventFormProps {
    selectedDate?: Date;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function CreateEventForm({ onSuccess, onCancel, selectedDate }: CreateEventFormProps) {
    const [formData, setFormData] = useState<EventFormProps>({
        event_title: '',
        start_time: '',
        end_time: '',
        location: '',
        description: '',
        labels: [],
        date: '', // Initialize date
    });

    const [labelInput, setLabelInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedDate) {
            const dateString = formatDateKey(selectedDate);
            handleFieldChange('date', dateString);
        }
    }, [selectedDate]);

    const handleFieldChange = (field: keyof EventFormProps, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const addLabel = () => {
        if (labelInput.trim() === '') return;

        setFormData(prev => ({
            ...prev,
            labels: [...prev.labels, labelInput]
        }));
        setLabelInput('');
    }

    const removeLabel = (index: number) => {
        setFormData(prev => ({
            ...prev,
            labels: prev.labels.filter((_, i) => i !== index)
        }));
    }

    const handleSubmit = async () => {
        setError('');

        if (!formData.event_title.trim()) {
            setError('Event title is required');
            return;
        }

        setIsLoading(true);
        try {
            console.log('📤 Submitting event:', formData);
            const response = await calendarAPI.createEventDirect(formData);
            console.log('✅ Event created:', response);
            setIsLoading(false);
            onSuccess?.();
        } catch (error: any) {
            console.error('❌ Submit failed:', {
                message: error.message,
                status: error.response?.status,
                url: error.config?.url,
                data: error.response?.data,
                requestData: formData
            });
            setError(error.response?.data?.error || error.message || 'Failed to create event');
            setIsLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Create Event</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}

            <Text style={styles.label}>Event Title *</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter event title"
                placeholderTextColor={calendarColors.dayNumber}
                value={formData.event_title}
                onChangeText={(text) => handleFieldChange('event_title', text)} 
            />

            <Text style={styles.label}>Date *</Text>
            <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={calendarColors.dayNumber}
                value={formData.date}
                onChangeText={(text) => handleFieldChange('date', text)}
            />

            <Text style={styles.label}>Start Time</Text>
            <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor={calendarColors.dayNumber}
                value={formData.start_time}
                onChangeText={(text) => handleFieldChange('start_time', text)}
            />

            <Text style={styles.label}>End Time</Text>
            <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor={calendarColors.dayNumber}
                value={formData.end_time}
                onChangeText={(text) => handleFieldChange('end_time', text)}
            />

            <Text style={styles.label}>Location</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter location"
                placeholderTextColor={calendarColors.dayNumber}
                value={formData.location}
                onChangeText={(text) => handleFieldChange('location', text)}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter description"
                placeholderTextColor={calendarColors.dayNumber}
                value={formData.description}
                onChangeText={(text) => handleFieldChange('description', text)}
                multiline
                numberOfLines={4}
            />

            <Text style={styles.label}>Labels</Text>
            <View style={styles.labelContainer}>
                <TextInput
                    style={styles.labelInput}
                    placeholder="Enter label"
                    placeholderTextColor={calendarColors.dayNumber}
                    value={labelInput}
                    onChangeText={setLabelInput}
                />
                <Pressable style={styles.addLabelButton} onPress={addLabel}>
                    <Text style={styles.addLabelButtonText}>Add</Text>
                </Pressable>
            </View>

            <View style={styles.labelsDisplay}>
                {formData.labels.map((label, index) => (
                    <Pressable
                        key={index}
                        style={styles.labelTag}
                        onPress={() => removeLabel(index)}
                    >
                        <Text style={styles.labelTagText}>{label}</Text>
                        <Text style={styles.labelTagText}>✕</Text>
                    </Pressable>
                ))}
            </View>

            <View style={styles.buttonRow}>
                <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
                    <Text style={styles.buttonText}>{isLoading ? 'Creating...' : 'Create Event'}</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: calendarColors.background,
        padding: spacing.md,
    },
    title: {
        ...typography.h1,
        color: calendarColors.dayNumber,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    label: {
        ...typography.subtitle,
        color: calendarColors.dayNumber,
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: calendarColors.border,
        color: calendarColors.dayNumber,
        padding: spacing.sm,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: calendarColors.todayBorder,
        ...typography.body,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    errorText: {
        ...typography.bodySmall,
        color: '#FF6B6B',
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    labelContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: spacing.md,
        marginBottom: spacing.md,
    },
    labelInput: {
        flex: 1,
        backgroundColor: calendarColors.border,
        color: calendarColors.dayNumber,
        padding: spacing.sm,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: calendarColors.todayBorder,
        ...typography.body,
    },
    addLabelButton: {
        backgroundColor: calendarColors.todayBorder,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addLabelButtonText: {
        ...typography.button,
        color: calendarColors.dayNumber,
    },
    labelsDisplay: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    labelTag: {
        backgroundColor: calendarColors.todayBorder,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    labelTagText: {
        ...typography.caption,
        color: calendarColors.dayNumber,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
    submitButton: {
        flex: 1,
        backgroundColor: calendarColors.todayBorder,
        paddingVertical: spacing.md,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: calendarColors.border,
        paddingVertical: spacing.md,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        ...typography.button,
        color: calendarColors.dayNumber,
    },
});