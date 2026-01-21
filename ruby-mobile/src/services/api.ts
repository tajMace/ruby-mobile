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

const API_BASE_URL = 'http://134.199.150.224:3000';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000
});

export const calendarAPI = {
    // Create
    createEvent: (data: any) => api.post('/calendar', data),

    // Read
    getAllEvents: () => api.get('/calendar'),
    getEventById: (id: number) => api.get(`/calendar/${id}`),
    
    // Update
    updateEvent: (id: number, data: any) => api.post(`/calendar/${id}`, data),

    // Delete
    deleteEvent: (id: number) => api.delete(`/calendar/${id}`)
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

