import { useState } from "react";
import { RoutineCard } from "./RoutineCard";
import { AddTaskDialog } from "./AddTaskDialog";
import { Sun, Sunset, Moon } from "lucide-react";

interface Task {
  id: string;
  title: string;
  icon: string;
  time: string;
  completed: boolean;
}

const initialTasks: Task[] = [
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

export const DayPlanner = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground">My Daily Plan</h1>
            <AddTaskDialog onAddTask={addTask} />
          </div>
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
    </div>
  );
};
