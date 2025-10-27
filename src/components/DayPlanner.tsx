import { useState } from "react";
import { RoutineCard } from "./RoutineCard";
import { Sun, Sunset, Moon } from "lucide-react";

interface Task {
  id: string;
  title: string;
  icon: string;
  time: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: "1", title: "Wake Up & Stretch", icon: "🌅", time: "7:00 AM", completed: false },
  { id: "2", title: "Brush Teeth", icon: "🪥", time: "7:15 AM", completed: false },
  { id: "3", title: "Eat Breakfast", icon: "🍳", time: "7:30 AM", completed: false },
  { id: "4", title: "Get Dressed", icon: "👕", time: "8:00 AM", completed: false },
  { id: "5", title: "School/Work Time", icon: "📚", time: "9:00 AM", completed: false },
  { id: "6", title: "Lunch Break", icon: "🥗", time: "12:00 PM", completed: false },
  { id: "7", title: "Afternoon Activity", icon: "🎨", time: "2:00 PM", completed: false },
  { id: "8", title: "Free Time", icon: "🎮", time: "4:00 PM", completed: false },
  { id: "9", title: "Dinner Time", icon: "🍽️", time: "6:00 PM", completed: false },
  { id: "10", title: "Evening Routine", icon: "🛁", time: "7:30 PM", completed: false },
  { id: "11", title: "Bedtime Story", icon: "📖", time: "8:30 PM", completed: false },
  { id: "12", title: "Sleep", icon: "🌙", time: "9:00 PM", completed: false },
];

export const DayPlanner = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const morningTasks = tasks.filter((_, idx) => idx < 4);
  const afternoonTasks = tasks.filter((_, idx) => idx >= 4 && idx < 8);
  const eveningTasks = tasks.filter((_, idx) => idx >= 8);

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Daily Plan</h1>
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
