// Event Management Utilities for Autism Buddy Planner
// Provides reusable helper functions for event filtering, sorting, and categorization

import { ScheduledEvent } from "@/types";

/**
 * Event Categorization Helper Functions
 * Supports autism community needs for predictable event organization
 */

export interface CategorizedEvents {
  datedEvents: ScheduledEvent[];        // Events with both date and time specified
  tbdEvents: ScheduledEvent[];          // Events with TBD dates (legacy compatibility)
  timeTBDEvents: ScheduledEvent[];      // Events with date but TBD time
  dateTBDEvents: ScheduledEvent[];      // Events with time but TBD date
  completelyTBDEvents: ScheduledEvent[]; // Events with both date and time TBD
}

export interface EventFilters {
  includeCompleted?: boolean;
  fromDate?: string;
  toDate?: string;
  searchTerm?: string;
}

/**
 * Enhanced categorization for events with time TBD support
 * @param events - Array of scheduled events
 * @returns Object with categorized events supporting all TBD combinations
 */
export const categorizeEvents = (events: ScheduledEvent[]): CategorizedEvents => {
  // Handle backward compatibility for events without isTimeTBD field
  const normalizedEvents = events.map(event => ({
    ...event,
    isTimeTBD: event.isTimeTBD ?? false // Default to false for existing events
  }));

  // Categorize events based on TBD status combinations
  const datedEvents = normalizedEvents.filter(event => 
    !event.isTBD && event.date && !event.isTimeTBD && event.time
  );
  
  const timeTBDEvents = normalizedEvents.filter(event => 
    !event.isTBD && event.date && event.isTimeTBD
  );
  
  const dateTBDEvents = normalizedEvents.filter(event => 
    event.isTBD && !event.isTimeTBD && event.time
  );
  
  const completelyTBDEvents = normalizedEvents.filter(event => 
    event.isTBD && event.isTimeTBD
  );
  
  // Legacy TBD events (for backward compatibility)
  const tbdEvents = normalizedEvents.filter(event => 
    event.isTBD || !event.date
  );
  
  return {
    datedEvents: sortEventsByDate(datedEvents),
    tbdEvents: sortEventsByTitle(tbdEvents),
    timeTBDEvents: sortEventsByDate(timeTBDEvents),
    dateTBDEvents: sortEventsByTitle(dateTBDEvents),
    completelyTBDEvents: sortEventsByTitle(completelyTBDEvents)
  };
};

/**
 * Filters events for a specific date (used in daily routine integration)
 * @param events - Array of scheduled events
 * @param targetDate - Date string in YYYY-MM-DD format
 * @param excludeTBD - Whether to exclude TBD events (default: true)
 * @returns Filtered events for the target date
 */
export const getEventsForDate = (
  events: ScheduledEvent[], 
  targetDate: string, 
  excludeTBD: boolean = true
): ScheduledEvent[] => {
  return events.filter(event => {
    if (excludeTBD && event.isTBD) return false;
    return event.date === targetDate;
  });
};

/**
 * Gets time TBD events (events with date but undetermined time)
 * @param events - Array of scheduled events
 * @returns Array of time TBD events sorted by date
 */
export const getTimeTBDEvents = (events: ScheduledEvent[]): ScheduledEvent[] => {
  const timeTBDEvents = events.filter(event => 
    !event.isTBD && event.date && (event.isTimeTBD ?? false)
  );
  return sortEventsByDate(timeTBDEvents);
};

/**
 * Gets date TBD events (events with time but undetermined date)
 * @param events - Array of scheduled events
 * @returns Array of date TBD events sorted by title
 */
export const getDateTBDEvents = (events: ScheduledEvent[]): ScheduledEvent[] => {
  const dateTBDEvents = events.filter(event => 
    event.isTBD && !(event.isTimeTBD ?? false) && event.time
  );
  return sortEventsByTitle(dateTBDEvents);
};

/**
 * Gets completely TBD events (events with both date and time undetermined)
 * @param events - Array of scheduled events
 * @returns Array of completely TBD events sorted by title
 */
export const getCompletelyTBDEvents = (events: ScheduledEvent[]): ScheduledEvent[] => {
  const completelyTBDEvents = events.filter(event => 
    event.isTBD && (event.isTimeTBD ?? false)
  );
  return sortEventsByTitle(completelyTBDEvents);
};

/**
 * Gets TBD events (events without determined dates)
 * @param events - Array of scheduled events
 * @returns Array of TBD events sorted by title
 */
export const getTBDEvents = (events: ScheduledEvent[]): ScheduledEvent[] => {
  const tbdEvents = events.filter(event => event.isTBD || !event.date);
  return sortEventsByTitle(tbdEvents);
};

/**
 * Gets upcoming events (future dated events)
 * @param events - Array of scheduled events
 * @param fromDate - Starting date (defaults to today)
 * @returns Array of upcoming events sorted by date
 */
export const getUpcomingEvents = (
  events: ScheduledEvent[], 
  fromDate?: string
): ScheduledEvent[] => {
  const today = fromDate || new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter(event => {
    if (event.isTBD || !event.date) return false;
    return event.date >= today;
  });
  return sortEventsByDate(upcomingEvents);
};

/**
 * Event Sorting Functions
 * Provides consistent sorting for autism-friendly predictable display
 */

/**
 * Sort events by date (earliest first)
 * @param events - Array of events to sort
 * @returns Sorted array of events
 */
export const sortEventsByDate = (events: ScheduledEvent[]): ScheduledEvent[] => {
  return [...events].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
};

/**
 * Sort events by title (alphabetical)
 * @param events - Array of events to sort
 * @returns Sorted array of events
 */
export const sortEventsByTitle = (events: ScheduledEvent[]): ScheduledEvent[] => {
  return [...events].sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * Sort events by time (earliest time first)
 * @param events - Array of events to sort
 * @returns Sorted array of events
 */
export const sortEventsByTime = (events: ScheduledEvent[]): ScheduledEvent[] => {
  return [...events].sort((a, b) => {
    // Convert time strings to comparable values
    const timeA = convertTimeToMinutes(a.time);
    const timeB = convertTimeToMinutes(b.time);
    return timeA - timeB;
  });
};

/**
 * Sort events by creation order (most recent first)
 * Note: Uses ID as proxy for creation time (timestamp-based IDs)
 * @param events - Array of events to sort
 * @returns Sorted array of events
 */
export const sortEventsByCreationOrder = (events: ScheduledEvent[]): ScheduledEvent[] => {
  return [...events].sort((a, b) => {
    // Assuming IDs are timestamp-based (Date.now().toString())
    const idA = parseInt(a.id) || 0;
    const idB = parseInt(b.id) || 0;
    return idB - idA; // Most recent first
  });
};

/**
 * Event Display Logic Helpers
 * Supports mixed event types and autism-friendly presentation
 */

/**
 * Format date for display with autism-friendly consistency
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Formatted date string or "TBD" for empty dates
 */
export const formatEventDate = (dateString?: string): string => {
  if (!dateString) return "TBD";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", { 
    weekday: "short", 
    month: "short", 
    day: "numeric",
    year: "numeric"
  });
};

/**
 * Get event display text for date and time
 * @param event - Scheduled event
 * @returns Formatted display string
 */
export const getEventDisplayText = (event: ScheduledEvent): string => {
  if (event.isTBD || !event.date) {
    return `TBD Date at ${event.time}`;
  }
  return `${formatEventDate(event.date)} at ${event.time}`;
};

/**
 * Formats event time display with TBD support
 * @param event - Scheduled event
 * @returns Formatted time string
 */
export const formatEventTime = (event: ScheduledEvent): string => {
  if (event.isTimeTBD ?? false) {
    return "TBD Time";
  }
  return event.time || "TBD Time";
};

/**
 * Enhanced event display text combining date and time with TBD support
 * @param event - Scheduled event
 * @returns Complete formatted display text
 */
export const getEnhancedEventDisplayText = (event: ScheduledEvent): string => {
  const dateText = (event.isTBD || !event.date) ? "TBD Date" : formatEventDate(event.date);
  const timeText = formatEventTime(event);
  
  if ((event.isTBD || !event.date) && (event.isTimeTBD ?? false)) {
    return "Completely TBD";
  } else if (event.isTBD || !event.date) {
    return `${timeText} - Date TBD`;
  } else if (event.isTimeTBD ?? false) {
    return `${dateText} - Time TBD`;
  } else {
    return `${dateText} at ${timeText}`;
  }
};

/**
 * Check if an event is happening today
 * @param event - Scheduled event
 * @param targetDate - Target date (defaults to today)
 * @returns Boolean indicating if event is today
 */
export const isEventToday = (event: ScheduledEvent, targetDate?: string): boolean => {
  const today = targetDate || new Date().toISOString().split('T')[0];
  return !event.isTBD && event.date === today;
};

/**
 * Check if an event is overdue
 * @param event - Scheduled event
 * @param currentDate - Current date (defaults to today)
 * @returns Boolean indicating if event is overdue
 */
export const isEventOverdue = (event: ScheduledEvent, currentDate?: string): boolean => {
  if (event.isTBD || !event.date) return false;
  const today = currentDate || new Date().toISOString().split('T')[0];
  return event.date < today;
};

/**
 * Get count of events by category
 * @param events - Array of events to count
 * @returns Object with counts for different event categories
 */
export const getEventCounts = (events: ScheduledEvent[]) => {
  const { 
    datedEvents, 
    tbdEvents, 
    timeTBDEvents, 
    dateTBDEvents, 
    completelyTBDEvents 
  } = categorizeEvents(events);
  const today = new Date().toISOString().split('T')[0];
  
  const todayEvents = getEventsForDate(events, today);
  const upcomingEvents = getUpcomingEvents(events).filter(event => event.date !== today);
  const overdueEvents = datedEvents.filter(event => isEventOverdue(event));

  return {
    total: events.length,
    dated: datedEvents.length,
    tbd: tbdEvents.length, // Legacy compatibility
    timeTBD: timeTBDEvents.length,
    dateTBD: dateTBDEvents.length,
    completelyTBD: completelyTBDEvents.length,
    today: todayEvents.length,
    upcoming: upcomingEvents.length,
    overdue: overdueEvents.length
  };
};

/**
 * Advanced filtering for complex event queries
 * @param events - Array of events to filter
 * @param filters - Filter criteria object
 * @returns Filtered array of events
 */
export const filterEvents = (events: ScheduledEvent[], filters: EventFilters): ScheduledEvent[] => {
  let filteredEvents = [...events];

  // Date range filtering
  if (filters.fromDate) {
    filteredEvents = filteredEvents.filter(event => {
      if (event.isTBD || !event.date) return false;
      return event.date >= filters.fromDate!;
    });
  }

  if (filters.toDate) {
    filteredEvents = filteredEvents.filter(event => {
      if (event.isTBD || !event.date) return false;
      return event.date <= filters.toDate!;
    });
  }

  // Search term filtering
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    filteredEvents = filteredEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm) ||
      event.time.toLowerCase().includes(searchTerm)
    );
  }

  return filteredEvents;
};

/**
 * Utility helper functions
 */

/**
 * Convert time string (e.g., "2:00 PM") to minutes since midnight
 * @param timeString - Time string in format "HH:MM AM/PM"
 * @returns Number of minutes since midnight
 */
export const convertTimeToMinutes = (timeString: string): number => {
  const [time, period] = timeString.split(' ');
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr) || 0;

  // Convert to 24-hour format
  if (period && period.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period && period.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }

  return hour * 60 + minute;
};

/**
 * Group events by date for calendar-style display
 * @param events - Array of events to group
 * @returns Object with date keys and event arrays
 */
export const groupEventsByDate = (events: ScheduledEvent[]): Record<string, ScheduledEvent[]> => {
  const grouped: Record<string, ScheduledEvent[]> = {};
  
  events.forEach(event => {
    const dateKey = event.date || 'tbd';
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(event);
  });

  // Sort events within each date group by time
  Object.keys(grouped).forEach(dateKey => {
    grouped[dateKey] = sortEventsByTime(grouped[dateKey]);
  });

  return grouped;
};