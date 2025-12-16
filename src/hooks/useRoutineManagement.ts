import { useState, useCallback } from "react";
import { Task, ScheduledEvent, Preset } from "@/types";

interface RoutineState {
  tasks: Task[];
  scheduledEvents: ScheduledEvent[];
  presets: Preset[];
  currentPresetId: string;
}

interface RoutineBackup {
  timestamp: number;
  state: RoutineState;
}

export const useRoutineManagement = (
  initialTasks: Task[],
  initialEvents: ScheduledEvent[],
  initialPresets: Preset[],
  initialPresetId: string
) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>(initialEvents);
  const [presets, setPresets] = useState<Preset[]>(initialPresets);
  const [currentPresetId, setCurrentPresetId] = useState<string>(initialPresetId);
  const [backupHistory, setBackupHistory] = useState<RoutineBackup[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Create backup of current routine state
  const createBackup = useCallback(() => {
    const backup: RoutineBackup = {
      timestamp: Date.now(),
      state: {
        tasks: [...tasks],
        scheduledEvents: [...scheduledEvents],
        presets: [...presets],
        currentPresetId,
      },
    };
    setBackupHistory(prev => [...prev.slice(-9), backup]); // Keep last 10 backups
  }, [tasks, scheduledEvents, presets, currentPresetId]);

  // Restore from backup
  const restoreFromBackup = useCallback((backup: RoutineBackup) => {
    setTasks(backup.state.tasks);
    setScheduledEvents(backup.state.scheduledEvents);
    setPresets(backup.state.presets);
    setCurrentPresetId(backup.state.currentPresetId);
    setHasUnsavedChanges(true);
  }, []);

  // Task management functions
  const addTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task]);
    setHasUnsavedChanges(true);
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    setHasUnsavedChanges(true);
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setHasUnsavedChanges(true);
  }, []);

  const reorderTasks = useCallback((startIndex: number, endIndex: number) => {
    setTasks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
    setHasUnsavedChanges(true);
  }, []);

  // Event management functions
  const addEvent = useCallback((event: ScheduledEvent) => {
    setScheduledEvents(prev => [...prev, event]);
    setHasUnsavedChanges(true);
  }, []);

  const updateEvent = useCallback((eventId: string, updates: Partial<ScheduledEvent>) => {
    setScheduledEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    ));
    setHasUnsavedChanges(true);
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    setScheduledEvents(prev => prev.filter(event => event.id !== eventId));
    setHasUnsavedChanges(true);
  }, []);

  // Preset management functions
  const createPreset = useCallback((name: string, sourceTasks?: Task[]) => {
    const tasksToUse = sourceTasks || tasks;
    const newPreset: Preset = {
      id: Date.now().toString(),
      name,
      tasks: tasksToUse.map(task => ({ ...task, completed: false })),
    };
    setPresets(prev => [...prev, newPreset]);
    setHasUnsavedChanges(true);
    return newPreset;
  }, [tasks]);

  const updatePreset = useCallback((presetId: string, updates: Partial<Preset>) => {
    setPresets(prev => prev.map(preset => 
      preset.id === presetId ? { ...preset, ...updates } : preset
    ));
    setHasUnsavedChanges(true);
  }, []);

  const deletePreset = useCallback((presetId: string) => {
    setPresets(prev => prev.filter(preset => preset.id !== presetId));
    if (currentPresetId === presetId) {
      // Switch to first available preset or default
      const remainingPresets = presets.filter(p => p.id !== presetId);
      if (remainingPresets.length > 0) {
        setCurrentPresetId(remainingPresets[0].id);
      }
    }
    setHasUnsavedChanges(true);
  }, [presets, currentPresetId]);

  const applyPreset = useCallback((presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      createBackup(); // Create backup before applying preset
      setTasks(preset.tasks.map(task => ({ ...task, completed: false })));
      setCurrentPresetId(presetId);
      setHasUnsavedChanges(true);
    }
  }, [presets, createBackup]);

  // Save all changes to localStorage
  const saveChanges = useCallback(() => {
    localStorage.setItem("currentDayTasks", JSON.stringify(tasks));
    localStorage.setItem("scheduledEvents", JSON.stringify(scheduledEvents));
    localStorage.setItem("dayPlannerPresets", JSON.stringify(presets));
    localStorage.setItem("currentPresetId", currentPresetId);
    localStorage.setItem("lastResetDate", new Date().toISOString().split('T')[0]);
    setHasUnsavedChanges(false);
  }, [tasks, scheduledEvents, presets, currentPresetId]);

  // Discard all unsaved changes
  const discardChanges = useCallback(() => {
    setTasks(initialTasks);
    setScheduledEvents(initialEvents);
    setPresets(initialPresets);
    setCurrentPresetId(initialPresetId);
    setHasUnsavedChanges(false);
  }, [initialTasks, initialEvents, initialPresets, initialPresetId]);

  // Export routine data
  const exportRoutine = useCallback(() => {
    const routineData = {
      tasks,
      scheduledEvents,
      presets,
      currentPresetId,
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(routineData, null, 2);
  }, [tasks, scheduledEvents, presets, currentPresetId]);

  // Import routine data
  const importRoutine = useCallback((routineDataJson: string) => {
    try {
      const routineData = JSON.parse(routineDataJson);
      createBackup(); // Create backup before importing
      setTasks(routineData.tasks || []);
      setScheduledEvents(routineData.scheduledEvents || []);
      setPresets(routineData.presets || []);
      setCurrentPresetId(routineData.currentPresetId || "default");
      setHasUnsavedChanges(true);
      return true;
    } catch (error) {
      console.error("Error importing routine data:", error);
      return false;
    }
  }, [createBackup]);

  return {
    // State
    tasks,
    scheduledEvents,
    presets,
    currentPresetId,
    hasUnsavedChanges,
    backupHistory,

    // Task management
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,

    // Event management
    addEvent,
    updateEvent,
    deleteEvent,

    // Preset management
    createPreset,
    updatePreset,
    deletePreset,
    applyPreset,

    // State management
    saveChanges,
    discardChanges,
    createBackup,
    restoreFromBackup,

    // Import/Export
    exportRoutine,
    importRoutine,
  };
};