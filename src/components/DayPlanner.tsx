import { useState, useEffect } from "react";
import { RoutineCard } from "./RoutineCard";
import { AddTaskDialog } from "./AddTaskDialog";
import { PresetSelector } from "./PresetSelector";
import { ScheduledEventDialog } from "./ScheduledEventDialog";
import { ScheduledEventsManager } from "./ScheduledEventsManager";
import { RoutineEditor } from "./RoutineEditor";
import { Button } from "@/components/ui/button";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Sun, Sunset, Moon, Clock, Calendar, Settings } from "lucide-react";
import { Task, ScheduledEvent, Preset } from "@/types";
import { getEventsForDate, getEventCounts } from "@/lib/eventUtils";

const defaultTasks: Task[] = [
  { id: "1", title: "Wake up and stretch", icon: "🌅", time: "7:00 AM", completed: false },
  { id: "2", title: "Brush teeth", icon: "🪥", time: "7:15 AM", completed: false },
  { id: "3", title: "Hydrate", icon: "💧", time: "7:30 AM", completed: false },
  { id: "4", title: "Feed cats", icon: "🐱", time: "7:45 AM", completed: false },
  { id: "5", title: "Breakfast", icon: "🍳", time: "8:00 AM", completed: false },
  { id: "6", title: "Work out", icon: "💪", time: "8:30 AM", completed: false },
  { id: "7", title: "Play with cats", icon: "🐈", time: "9:30 AM", completed: false },
  { id: "8", title: "Get ready for work", icon: "👔", time: "10:00 AM", completed: false },
  { id: "9", title: "Go to work", icon: "💼", time: "10:30 AM", completed: false },
  { id: "10", title: "Lunch break", icon: "🥗", time: "12:00 PM", completed: false },
  { id: "11", title: "Drive home", icon: "🚗", time: "5:00 PM", completed: false },
  { id: "12", title: "Feed cats again", icon: "🐱", time: "5:30 PM", completed: false },
  { id: "13", title: "Free time", icon: "🎮", time: "6:00 PM", completed: false },
  { id: "14", title: "Dinner", icon: "🍽️", time: "7:00 PM", completed: false },
  { id: "15", title: "Relax in bed", icon: "🛏️", time: "8:30 PM", completed: false },
  { id: "16", title: "Go to sleep", icon: "🌙", time: "9:30 PM", completed: false },
];

const initialPresets: Preset[] = [
  { id: "default", name: "My Main Routine", tasks: defaultTasks },
];

export const DayPlanner = () => {
  const { formattedDate, formattedTime, dateKey } = useCurrentTime();
  
  const [presets, setPresets] = useState<Preset[]>(() => {
    const saved = localStorage.getItem("dayPlannerPresets");
    return saved ? JSON.parse(saved) : initialPresets;
  });

  const [currentPresetId, setCurrentPresetId] = useState<string>(() => {
    const saved = localStorage.getItem("currentPresetId");
    return saved || "default";
  });

  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>(() => {
    const saved = localStorage.getItem("scheduledEvents");
    if (saved) {
      try {
        const parsedEvents = JSON.parse(saved) as Record<string, unknown>[];
        // Migration logic: Add isTBD and isTimeTBD fields to existing events that don't have them
        // This ensures backward compatibility with events created before TBD feature
        return parsedEvents.map((event) => ({
          id: event.id as string,
          title: event.title as string,
          icon: event.icon as string,
          time: event.time as string | undefined, // Allow undefined for time TBD events
          // If isTBD field doesn't exist, determine based on date field
          isTBD: event.isTBD !== undefined 
            ? event.isTBD as boolean
            : !event.date, // TBD if no date field exists
          // If isTimeTBD field doesn't exist, default to false for backward compatibility
          isTimeTBD: event.isTimeTBD !== undefined
            ? event.isTimeTBD as boolean
            : false, // Default to false for existing events
          // Ensure date field exists even if undefined
          date: event.date as string | undefined,
        }));
      } catch (error) {
        console.error("Error parsing scheduled events from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  const [isRoutineEditorOpen, setIsRoutineEditorOpen] = useState(false);

  const [lastResetDate, setLastResetDate] = useState<string>(() => {
    return localStorage.getItem("lastResetDate") || "";
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("currentDayTasks");
    const savedDate = localStorage.getItem("lastResetDate") || "";
    const today = new Date().toISOString().split('T')[0];
    
    // If it's a new day, reset to preset tasks
    if (savedDate !== today) {
      const currentPreset = presets.find(p => p.id === currentPresetId);
      return currentPreset ? currentPreset.tasks.map(t => ({ ...t, completed: false })) : defaultTasks.map(t => ({ ...t, completed: false }));
    }
    
    // Otherwise load saved tasks for today
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    
    const currentPreset = presets.find(p => p.id === currentPresetId);
    return currentPreset ? currentPreset.tasks : defaultTasks;
  });

  // Save scheduled events to localStorage
  useEffect(() => {
    localStorage.setItem("scheduledEvents", JSON.stringify(scheduledEvents));
  }, [scheduledEvents]);

  // Save current day tasks to localStorage
  useEffect(() => {
    localStorage.setItem("currentDayTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Daily reset at midnight and inject scheduled events
  useEffect(() => {
    if (dateKey !== lastResetDate) {
      // Reset all tasks to uncompleted from the current preset
      const currentPreset = presets.find(p => p.id === currentPresetId);
      const baseTasks = currentPreset 
        ? currentPreset.tasks.map(t => ({ ...t, completed: false, isScheduledEvent: false }))
        : defaultTasks.map(t => ({ ...t, completed: false }));
      
      // Find scheduled events for today (only dated events, not TBD events)
      const todayEvents = getEventsForDate(scheduledEvents, dateKey, true);
      
      // Convert scheduled events to tasks
      const eventTasks: Task[] = todayEvents.map(event => ({
        id: `event-${event.id}`,
        title: event.title,
        icon: event.icon,
        time: event.time,
        completed: false,
        isScheduledEvent: true,
      }));
      
      // Combine base tasks with today's events
      setTasks([...baseTasks, ...eventTasks]);
      
      // Remove the events that were added (they're now part of today's routine)
      if (todayEvents.length > 0) {
        setScheduledEvents(prev => prev.filter(event => event.date !== dateKey));
      }
      
      setLastResetDate(dateKey);
      localStorage.setItem("lastResetDate", dateKey);
    }
  }, [dateKey, lastResetDate, scheduledEvents, presets, currentPresetId]);

  useEffect(() => {
    localStorage.setItem("dayPlannerPresets", JSON.stringify(presets));
  }, [presets]);

  useEffect(() => {
    localStorage.setItem("currentPresetId", currentPresetId);
  }, [currentPresetId]);

  useEffect(() => {
    setPresets(prevPresets =>
      prevPresets.map(preset =>
        preset.id === currentPresetId
          ? { ...preset, tasks }
          : preset
      )
    );
  }, [tasks, currentPresetId]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (newTask: { title: string; icon: string; time: string; period: string }) => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      icon: newTask.icon,
      time: newTask.time,
      completed: false,
    };
    
    setTasks([...tasks, task]);
  };

  const addScheduledEvent = (event: { title: string; icon: string; time: string; date?: string; isTBD: boolean }) => {
    const newEvent: ScheduledEvent = {
      id: Date.now().toString(),
      ...event,
    };
    setScheduledEvents([...scheduledEvents, newEvent]);
  };

  const updateScheduledEvent = (updatedEvent: ScheduledEvent) => {
    setScheduledEvents(scheduledEvents.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const deleteScheduledEvent = (id: string) => {
    setScheduledEvents(scheduledEvents.filter(event => event.id !== id));
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      setCurrentPresetId(presetId);
      setTasks(preset.tasks);
    }
  };

  const handleCreatePreset = (name: string, currentTasks: Task[]) => {
    const newPreset: Preset = {
      id: Date.now().toString(),
      name,
      tasks: currentTasks.map(task => ({ ...task, completed: false })),
    };
    setPresets([...presets, newPreset]);
  };

  const handleSaveRoutineChanges = (
    newTasks: Task[],
    newEvents: ScheduledEvent[],
    newPresets: Preset[],
    newPresetId: string
  ) => {
    setTasks(newTasks);
    setScheduledEvents(newEvents);
    setPresets(newPresets);
    setCurrentPresetId(newPresetId);
  };

  // Filter tasks by time
  const getMorningTasks = () => {
    return tasks.filter((task) => {
      const hour = parseInt(task.time.split(':')[0]);
      const isPM = task.time.includes('PM');
      const hour24 = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour;
      return hour24 >= 5 && hour24 < 12;
    });
  };

  const getAfternoonTasks = () => {
    return tasks.filter((task) => {
      const hour = parseInt(task.time.split(':')[0]);
      const isPM = task.time.includes('PM');
      const hour24 = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour;
      return hour24 >= 12 && hour24 < 18;
    });
  };

  const getEveningTasks = () => {
    return tasks.filter((task) => {
      const hour = parseInt(task.time.split(':')[0]);
      const isPM = task.time.includes('PM');
      const hour24 = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour;
      return hour24 >= 18 || hour24 < 5;
    });
  };

  const morningTasks = getMorningTasks();
  const afternoonTasks = getAfternoonTasks();
  const eveningTasks = getEveningTasks();

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Daily Plan</h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-mono">{formattedTime}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <PresetSelector
                presets={presets}
                currentPresetId={currentPresetId}
                currentTasks={tasks}
                onSelectPreset={handleSelectPreset}
                onCreatePreset={handleCreatePreset}
              />
              <Button 
                onClick={() => setIsRoutineEditorOpen(true)}
                className="flex items-center gap-2"
                size="default"
              >
                <Settings className="h-4 w-4" />
                Edit Routine
              </Button>
            </div>
          </div>
          
          {/* Upcoming scheduled events indicator */}
          {scheduledEvents.length > 0 && (
            <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              {(() => {
                const eventCounts = getEventCounts(scheduledEvents);
                return (
                  <p className="text-sm text-primary font-medium">
                    📅 {eventCounts.total} upcoming event{eventCounts.total !== 1 ? 's' : ''} scheduled
                    {eventCounts.today > 0 && (
                      <span className="ml-2 text-primary/80">
                        ({eventCounts.today} today)
                      </span>
                    )}
                  </p>
                );
              })()}
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="bg-success h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              {completedCount} of {totalCount} done
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-10">
        {/* Morning Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Sun className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Morning</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {morningTasks.map(task => (
              <RoutineCard 
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
              />
            ))}
          </div>
        </section>

        {/* Afternoon Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-accent/10 p-3 rounded-xl">
              <Sunset className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Afternoon</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {afternoonTasks.map(task => (
              <RoutineCard 
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
              />
            ))}
          </div>
        </section>

        {/* Evening Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-secondary/20 p-3 rounded-xl">
              <Moon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Evening</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {eveningTasks.map(task => (
              <RoutineCard 
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Routine Editor Modal */}
      <RoutineEditor
        isOpen={isRoutineEditorOpen}
        onClose={() => setIsRoutineEditorOpen(false)}
        initialTasks={tasks}
        initialEvents={scheduledEvents}
        initialPresets={presets}
        initialPresetId={currentPresetId}
        onSave={handleSaveRoutineChanges}
      />
    </div>
  );
};
