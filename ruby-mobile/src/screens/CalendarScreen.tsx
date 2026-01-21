/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-21
 * Title        : CalendarScreen.tsx
 * Description  : displays Calendar events
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

import { useState, useEffect } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { calendarAPI } from '../services/api'
import { CalendarEvent } from '../models/CalendarEvent';

export default function CalendarScreen() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await calendarAPI.getAllEvents();
            setEvents(response.data.events);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <ActivityIndicator size="large" />;
    if (error) return <Text> Error: {error}</Text>;

    return (
        <View>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.event_title}</Text>
                        <Text>{item.date}</Text>
                    </View>
                )}
            />
        </View>
    );
}