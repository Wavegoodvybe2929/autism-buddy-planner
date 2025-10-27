import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  icon: string;
  time: string;
  completed: boolean;
}

interface RoutineCardProps {
  task: Task;
  onToggle: () => void;
}

export const RoutineCard = ({ task, onToggle }: RoutineCardProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative bg-card border-2 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 active:scale-95",
        "shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-ring/50",
        task.completed 
          ? "border-success bg-success/5" 
          : "border-border hover:border-primary/50"
      )}
    >
      {/* Completion Indicator */}
      <div 
        className={cn(
          "absolute top-4 right-4 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          task.completed 
            ? "bg-success border-success" 
            : "bg-muted border-border"
        )}
      >
        {task.completed && (
          <Check className="h-5 w-5 text-success-foreground" strokeWidth={3} />
        )}
      </div>

      {/* Icon */}
      <div className="text-5xl mb-4">{task.icon}</div>

      {/* Task Info */}
      <div className="space-y-2 pr-10">
        <h3 className={cn(
          "text-lg font-semibold transition-all",
          task.completed 
            ? "text-muted-foreground line-through" 
            : "text-card-foreground"
        )}>
          {task.title}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">{task.time}</p>
      </div>
    </button>
  );
};
