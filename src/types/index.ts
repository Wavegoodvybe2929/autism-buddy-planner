// Shared TypeScript interfaces for Autism Buddy Planner
// This file ensures type consistency across all components

export interface Task {
  id: string;
  title: string;
  icon: string;
  time: string;
  completed: boolean;
  isScheduledEvent?: boolean;
}

export interface ScheduledEvent {
  id: string;
  title: string;
  icon: string;
  time?: string;        // Optional for TBD times
  date?: string;        // Optional for TBD events
  isTBD: boolean;       // New field to track TBD status
  isTimeTBD: boolean;   // NEW: Time uncertainty flag
}

export interface Preset {
  id: string;
  name: string;
  tasks: Task[];
}

// Props interface for components using scheduled events
export interface ScheduledEventDialogProps {
  onAddEvent: (event: { title: string; icon: string; time?: string; date?: string; isTBD: boolean; isTimeTBD: boolean }) => void;
}

export interface ScheduledEventsManagerProps {
  events: ScheduledEvent[];
  onUpdateEvent: (event: ScheduledEvent) => void;
  onDeleteEvent: (id: string) => void;
}