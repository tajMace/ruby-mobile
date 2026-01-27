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

import { useState } from "react";
import { View, StyleSheet } from 'react-native'
import MonthCard from "./MonthCard";
import EventViewer from "./EventViewer";
import { CalendarEvent } from "../../models/CalendarEvent";
import { calendarColors, spacing } from '../../theme/index'
import { getDaysInMonthGrid, getEventsByDate, groupEventsByDate } from "../../utils/calendarUtils";

export default function MonthViewer() {
    const { year, month, prev, toToday, next } = useMonthNavigation();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showCreateEvent, setShowCreateEvent] = useState(false);

    function handleCreateEvent() {
        setShowCreateEvent(true);
    }

    // Mock events - distributed across random dates
    const mockEvents: CalendarEvent[] = [
        { 
            id: 1, 
            event_title: 'Team Meeting', 
            date: new Date(year, month, 5).toISOString().split('T')[0],
            start_time: '10:00 AM',
            end_time: '11:00 AM',
            location: 'Conference Room A',
            description: 'Weekly sync with the team',
            labels: ['work', 'meeting']
        },
        { 
            id: 2, 
            event_title: 'Project Review', 
            date: new Date(year, month, 5).toISOString().split('T')[0],
            start_time: '2:00 PM',
            end_time: '3:30 PM',
            location: 'Virtual - Zoom',
            description: 'Q1 project status review',
            labels: ['work']
        },
        { 
            id: 3, 
            event_title: 'Client Call', 
            date: new Date(year, month, 12).toISOString().split('T')[0],
            start_time: '9:00 AM',
            end_time: '10:00 AM',
            location: 'Office',
            description: 'Discuss project requirements',
            labels: ['client', 'important']
        },
        { 
            id: 4, 
            event_title: 'Lunch Meeting', 
            date: new Date(year, month, 12).toISOString().split('T')[0],
            start_time: '12:00 PM',
            end_time: '1:00 PM',
            location: 'Downtown Cafe',
            description: 'Casual team lunch',
            labels: ['team', 'social']
        },
        { 
            id: 5, 
            event_title: 'Design Review', 
            date: new Date(year, month, 12).toISOString().split('T')[0],
            start_time: '3:00 PM',
            end_time: '4:00 PM',
            location: 'Design Studio',
            description: 'Review new UI mockups',
            labels: ['design', 'review']
        },
        { 
            id: 9, 
            event_title: 'Steve Meeting', 
            date: new Date(year, month, 12).toISOString().split('T')[0],
            start_time: '4:30 PM',
            end_time: '5:30 PM',
            location: 'Office - Room 201',
            description: 'One-on-one sync',
            labels: ['1:1', 'management']
        },
        { 
            id: 6, 
            event_title: 'Sprint Planning', 
            date: new Date(year, month, 18).toISOString().split('T')[0],
            start_time: '10:00 AM',
            end_time: '12:00 PM',
            location: 'Conference Room B',
            description: 'Plan sprint tasks and deliverables',
            labels: ['agile', 'planning']
        },
        { 
            id: 7, 
            event_title: 'Standup', 
            date: new Date(year, month, 18).toISOString().split('T')[0],
            start_time: '9:15 AM',
            end_time: '9:30 AM',
            location: 'Virtual',
            description: 'Daily standup sync',
            labels: ['daily', 'agile']
        },
        { 
            id: 8, 
            event_title: 'Demo', 
            date: new Date(year, month, 25).toISOString().split('T')[0],
            start_time: '11:00 AM',
            end_time: '12:00 PM',
            location: 'Main Hall',
            description: 'Demo new features to stakeholders',
            labels: ['demo', 'release']
        },
    ];

    const eventsByDate = groupEventsByDate(mockEvents);
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
            />

            {selectedDate && (
                <EventViewer
                    date={selectedDate}
                    events={getEventsByDate(selectedDate, eventsByDate)}
                    onCreateEvent={handleCreateEvent}
                />
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