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

import { useState, useEffect } from "react";
import { View, StyleSheet, Modal } from 'react-native'
import MonthCard from "./MonthCard";
import EventViewer from "./EventViewer";
import CreateEventForm from './CreateEventForm'
import { CalendarEvent } from "../../models/CalendarEvent";
import { calendarColors, spacing } from '../../theme/index'
import { getDaysInMonthGrid, getEventsByDate, groupEventsByDate } from "../../utils/calendarUtils";
import { calendarAPI } from "../../services/api";

export default function MonthViewer() {
    const { year, month, prev, toToday, next } = useMonthNavigation();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await calendarAPI.getAllEvents();
            const eventsData = response.data?.events || [];
            console.log('🔍 Raw events from API:', eventsData.map((e: CalendarEvent) => ({ title: e.event_title, date: e.date })));
            setEvents(Array.isArray(eventsData) ? eventsData : []);
        } catch (error: any) {
            console.error('❌ Fetch failed:', error);
        }
    }

    function handleCreateEvent() {
        setShowCreateEvent(true);
    }

    const eventsByDate = groupEventsByDate(events);
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
                onRefresh={fetchEvents}
            />

            {selectedDate && (
                <EventViewer
                    date={selectedDate}
                    events={getEventsByDate(selectedDate, eventsByDate)}
                    onCreateEvent={handleCreateEvent}
                />
            )}

            {showCreateEvent && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showCreateEvent}
                    onRequestClose={() => setShowCreateEvent(false)}
                >
                    <CreateEventForm
                        selectedDate={selectedDate ?? undefined}
                        onSuccess={() => {
                            setShowCreateEvent(false);
                            fetchEvents();
                        }}
                        onCancel={() => setShowCreateEvent(false)}
                    />
                </Modal>
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