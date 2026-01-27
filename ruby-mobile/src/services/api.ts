/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-20
 * Title        : api.ts
 * Description  : axios file to link the backend api to the frontend through api calls
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

import axios from 'axios'
import { CalendarEvent } from '../models/CalendarEvent';

const API_BASE_URL = 'http://134.199.150.224:3000';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000
});

export const calendarAPI = {
    // ----- CREATE -----
    // create with AI pipeline (from natural language)
    createEvent: (request: string) => 
        api.post('/calendar', { request }),

    // create directly (structured data)
    createEventDirect: (data: Omit<CalendarEvent, 'id' | 'created_at'>) => 
        api.post('/calendar/direct', data),

    // ----- READ -----
    getAllEvents: () => 
        api.get('/calendar'),
    
    getEventById: (id: number) => 
        api.get(`/calendar/${id}`),
    
    getEventsByDate: (date: string) => 
        api.get(`/calendar/date/${date}`),
    
    getUpcomingEvents: (days: number = 7) => 
        api.get(`/calendar/upcoming/${days}`),
    
    getEventsByDateRange: (startDate: string, endDate: string) => 
        api.get(`/calendar/range/${startDate}/${endDate}`),
    
    getEventsByLabels: (labels: string[]) => 
        api.post('/calendar/labels/search', { labels }),
    
    searchEvents: (query: string) => 
        api.get(`/calendar/search/${query}`),
    
    getRecurringEvents: () => 
        api.get('/calendar/recurring/all'),

    // ----- UPDATE -----
    updateEvent: (id: number, updates: Partial<CalendarEvent>) => 
        api.post(`/calendar/${id}`, updates),

    rescheduleEvent: (id: number, newStartDate: string, newStartTime?: string, newEndTime?: string) => 
        api.post(`/calendar/${id}/reschedule`, { newStartDate, newStartTime, newEndTime }),

    // ----- DELETE -----
    deleteEvent: (id: number) => 
        api.delete('/calendar', { data: { id } }),
    
    deleteAllEvents: () => 
        api.delete('/calendar/all'),
    
    deleteEventsByDate: (date: string) => 
        api.delete(`/calendar/date/${date}`),

    // ----- UTILITY -----
    checkConflict: (date: string, startTime: string, endTime: string) => 
        api.post('/calendar/conflict/check', { date, startTime, endTime })
};

export const ticketAPI = {
    // Create
    createTicket: (data: any) => api.post('/calendar', data),

    // Read
    getAllTickets: () => api.get('/calendar'),
    getTicketById: (id: number) => api.get(`/calendar/${id}`),
    searchTickets: (q: string) => api.get('/ticket/search', { params: { q } }),
    searchParentTickets: (q: string) => api.get('/ticket/search-parent', { params: { q } }),
    
    // Update
    updateTicket: (id: number, data: any) => api.post(`/calendar/${id}`, data),

    // Delete
    deleteTicket: (id: number) => api.delete(`/calendar/${id}`),

    // Subtickets
    getSubtickets: (id: number) => api.get(`/ticket/${id}/subtickets`),
    getParentTicket: (id: number) => api.get(`/ticket/${id}/parent`),

    // Filters
    findByStatus: (status: string) => api.get(`/tickets/status/${status}`),
    findByPriority: (priority: number) => api.get(`/tickets/priority/${priority}`),
    findByDate: (date: string) => api.get(`/tickets/date/${date}`),
    findUpcoming: (days?: number) => api.get('/tickets/upcoming', { params: { days } }),
};

export const quickNoteAPI = {
    createNote: (request: string) => api.post('/quicknote', { request }),
    getAllNotes: () => api.get('/quicknote'),
    deleteNote: (id: number) => api.delete('/quicknote', { data: { id } }),
    deleteAllNotes: () => api.delete('/quicknote/all'),
};

