import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useRoutineManagement } from "@/hooks/useRoutineManagement";
import { AddTaskDialog } from "./AddTaskDialog";
import { ScheduledEventDialog } from "./ScheduledEventDialog";
import { ScheduledEventsManager } from "./ScheduledEventsManager";
import { EmojiPicker } from "./EmojiPicker";
import { 
  Settings, 
  Save, 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  History,
  Plus,
  Trash2,
  Edit3,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { Task, ScheduledEvent, Preset } from "@/types";

interface RoutineEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialTasks: Task[];
  initialEvents: ScheduledEvent[];
  initialPresets: Preset[];
  initialPresetId: string;
  onSave: (
    tasks: Task[], 
    events: ScheduledEvent[], 
    presets: Preset[], 
    presetId: string
  ) => void;
}

export const RoutineEditor = ({ 
  isOpen, 
  onClose, 
  initialTasks, 
  initialEvents, 
  initialPresets, 
  initialPresetId, 
  onSave 
}: RoutineEditorProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("tasks");
  const [newPresetName, setNewPresetName] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showBackupHistory, setShowBackupHistory] = useState(false);

  const {
    tasks,
    scheduledEvents,
    presets,
    currentPresetId,
    hasUnsavedChanges,
    backupHistory,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
    addEvent,
    updateEvent,
    deleteEvent,
    createPreset,
    updatePreset,
    deletePreset,
    applyPreset,
    saveChanges,
    discardChanges,
    createBackup,
    restoreFromBackup,
    exportRoutine,
    importRoutine,
  } = useRoutineManagement(initialTasks, initialEvents, initialPresets, initialPresetId);

  // Create wrapper functions to adapt signatures for existing components
  const handleAddTask = useCallback((taskData: { title: string; icon: string; time: string; period: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      icon: taskData.icon,
      time: taskData.time,
      completed: false,
    };
    addTask(newTask);
  }, [addTask]);

  const handleUpdateEvent = useCallback((updatedEvent: ScheduledEvent) => {
    updateEvent(updatedEvent.id, updatedEvent);
  }, [updateEvent]);

  // Handle save and close
  const handleSave = useCallback(() => {
    saveChanges();
    onSave(tasks, scheduledEvents, presets, currentPresetId);
    toast({
      title: "Routine Saved Successfully! ✅",
      description: "Your daily routine changes have been saved.",
      duration: 3000,
    });
    onClose();
  }, [tasks, scheduledEvents, presets, currentPresetId, saveChanges, onSave, toast, onClose]);

  // Handle close with unsaved changes warning
  const handleClose = useCallback(() => {
    if (hasUnsavedChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to close without saving?")) {
        discardChanges();
        onClose();
      }
    } else {
      onClose();
    }
  }, [hasUnsavedChanges, discardChanges, onClose]);

  // Export routine to file
  const handleExport = useCallback(() => {
    try {
      const routineData = exportRoutine();
      const blob = new Blob([routineData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `routine-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Routine Exported! 📄",
        description: "Your routine has been downloaded as a backup file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed ❌",
        description: "There was an error exporting your routine.",
        variant: "destructive",
      });
    }
  }, [exportRoutine, toast]);

  // Import routine from file
  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = importRoutine(content);
        if (success) {
          toast({
            title: "Routine Imported! 📥",
            description: "Your routine has been successfully imported.",
          });
        } else {
          throw new Error("Invalid routine file format");
        }
      } catch (error) {
        toast({
          title: "Import Failed ❌",
          description: "There was an error importing the routine file.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    event.target.value = ""; // Reset input
  }, [importRoutine, toast]);

  // Create new preset from current tasks
  const handleCreatePreset = useCallback(() => {
    if (!newPresetName.trim()) {
      toast({
        title: "Preset Name Required",
        description: "Please enter a name for your preset.",
        variant: "destructive",
      });
      return;
    }

    createPreset(newPresetName.trim());
    setNewPresetName("");
    toast({
      title: "Preset Created! ✨",
      description: `Preset "${newPresetName}" has been created.`,
    });
  }, [newPresetName, createPreset, toast]);

  // Move task up/down in order
  const moveTask = useCallback((taskIndex: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? taskIndex - 1 : taskIndex + 1;
    if (newIndex >= 0 && newIndex < tasks.length) {
      reorderTasks(taskIndex, newIndex);
    }
  }, [tasks.length, reorderTasks]);

  // Group tasks by time period
  const groupedTasks = {
    morning: tasks.filter(task => {
      const hour = parseInt(task.time.split(':')[0]);
      const isPM = task.time.includes('PM');
      const hour24 = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour;
      return hour24 >= 5 && hour24 < 12;
    }),
    afternoon: tasks.filter(task => {
      const hour = parseInt(task.time.split(':')[0]);
      const isPM = task.time.includes('PM');
      const hour24 = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour;
      return hour24 >= 12 && hour24 < 18;
    }),
    evening: tasks.filter(task => {
      const hour = parseInt(task.time.split(':')[0]);
      const isPM = task.time.includes('PM');
      const hour24 = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour;
      return hour24 >= 18 || hour24 < 5;
    }),
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        {/* Header with save/close controls */}
        <DialogHeader className="flex-shrink-0 border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                Edit My Daily Routine
              </DialogTitle>
              <DialogDescription className="mt-2">
                Manage your daily tasks, scheduled events, and routine presets all in one place.
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {hasUnsavedChanges && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Unsaved Changes
                </Badge>
              )}
              <Button variant="outline" onClick={discardChanges} disabled={!hasUnsavedChanges}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Main content area with tabs */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
              <TabsTrigger value="tasks" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Daily Tasks ({tasks.length})
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Scheduled Events ({scheduledEvents.length})
              </TabsTrigger>
              <TabsTrigger value="presets" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Routine Presets ({presets.length})
              </TabsTrigger>
            </TabsList>

            {/* Tasks Management Tab */}
            <TabsContent value="tasks" className="flex-1 mt-6 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Daily Tasks Management</h3>
                  <AddTaskDialog onAddTask={handleAddTask} />
                </div>
                
                <ScrollArea className="flex-1">
                  <div className="space-y-6">
                    {/* Morning Tasks */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          🌅 Morning Tasks ({groupedTasks.morning.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {groupedTasks.morning.map((task, index) => (
                            <div key={task.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border">
                              <span className="text-2xl">{task.icon}</span>
                              <div className="flex-1">
                                <div className="font-medium">{task.title}</div>
                                <div className="text-sm text-muted-foreground">{task.time}</div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveTask(tasks.indexOf(task), 'up')}
                                  disabled={index === 0}
                                  title="Move up"
                                >
                                  <ChevronUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveTask(tasks.indexOf(task), 'down')}
                                  disabled={index === groupedTasks.morning.length - 1}
                                  title="Move down"
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingTask(task)}
                                  title="Edit task"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteTask(task.id)}
                                  title="Delete task"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Afternoon Tasks */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          🌇 Afternoon Tasks ({groupedTasks.afternoon.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {groupedTasks.afternoon.map((task, index) => (
                            <div key={task.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border">
                              <span className="text-2xl">{task.icon}</span>
                              <div className="flex-1">
                                <div className="font-medium">{task.title}</div>
                                <div className="text-sm text-muted-foreground">{task.time}</div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveTask(tasks.indexOf(task), 'up')}
                                  disabled={index === 0}
                                  title="Move up"
                                >
                                  <ChevronUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveTask(tasks.indexOf(task), 'down')}
                                  disabled={index === groupedTasks.afternoon.length - 1}
                                  title="Move down"
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingTask(task)}
                                  title="Edit task"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteTask(task.id)}
                                  title="Delete task"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Evening Tasks */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          🌙 Evening Tasks ({groupedTasks.evening.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {groupedTasks.evening.map((task, index) => (
                            <div key={task.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border">
                              <span className="text-2xl">{task.icon}</span>
                              <div className="flex-1">
                                <div className="font-medium">{task.title}</div>
                                <div className="text-sm text-muted-foreground">{task.time}</div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveTask(tasks.indexOf(task), 'up')}
                                  disabled={index === 0}
                                  title="Move up"
                                >
                                  <ChevronUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveTask(tasks.indexOf(task), 'down')}
                                  disabled={index === groupedTasks.evening.length - 1}
                                  title="Move down"
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingTask(task)}
                                  title="Edit task"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteTask(task.id)}
                                  title="Delete task"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Events Management Tab */}
            <TabsContent value="events" className="flex-1 mt-6 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Scheduled Events Management</h3>
                  <ScheduledEventDialog onAddEvent={addEvent} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <ScheduledEventsManager
                    events={scheduledEvents}
                    onUpdateEvent={handleUpdateEvent}
                    onDeleteEvent={deleteEvent}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Presets Management Tab */}
            <TabsContent value="presets" className="flex-1 mt-6 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Routine Presets Management</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setShowBackupHistory(!showBackupHistory)}>
                      <History className="h-4 w-4 mr-2" />
                      History ({backupHistory.length})
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      style={{ display: "none" }}
                      id="import-routine"
                    />
                    <Button variant="outline" onClick={() => document.getElementById("import-routine")?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                    <Button variant="outline" onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="space-y-6">
                    {/* Create New Preset */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Create New Preset</CardTitle>
                        <CardDescription>
                          Save your current daily tasks as a reusable preset template.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label htmlFor="preset-name">Preset Name</Label>
                            <Input
                              id="preset-name"
                              placeholder="Enter preset name..."
                              value={newPresetName}
                              onChange={(e) => setNewPresetName(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleCreatePreset()}
                            />
                          </div>
                          <Button onClick={handleCreatePreset} disabled={!newPresetName.trim()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Preset
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Existing Presets */}
                    <div className="space-y-4">
                      {presets.map((preset) => (
                        <Card key={preset.id} className={preset.id === currentPresetId ? "ring-2 ring-primary" : ""}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-base flex items-center gap-2">
                                  {preset.name}
                                  {preset.id === currentPresetId && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Active
                                    </Badge>
                                  )}
                                </CardTitle>
                                <CardDescription>
                                  {preset.tasks.length} task{preset.tasks.length !== 1 ? "s" : ""} in this preset
                                </CardDescription>
                              </div>
                              <div className="flex items-center gap-1">
                                {preset.id !== currentPresetId && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => applyPreset(preset.id)}
                                  >
                                    Apply Preset
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deletePreset(preset.id)}
                                  disabled={presets.length <= 1}
                                  title="Delete preset"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="text-sm text-muted-foreground space-y-1">
                              {preset.tasks.slice(0, 3).map((task) => (
                                <div key={task.id} className="flex items-center gap-2">
                                  <span>{task.icon}</span>
                                  <span>{task.title}</span>
                                  <span className="text-xs">at {task.time}</span>
                                </div>
                              ))}
                              {preset.tasks.length > 3 && (
                                <div className="text-xs italic">
                                  ...and {preset.tasks.length - 3} more task{preset.tasks.length - 3 !== 1 ? "s" : ""}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Backup History */}
                    {showBackupHistory && backupHistory.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <History className="h-4 w-4" />
                            Backup History
                          </CardTitle>
                          <CardDescription>
                            Restore your routine from a previous state.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {backupHistory.slice(-5).reverse().map((backup, index) => (
                              <div key={backup.timestamp} className="flex items-center justify-between p-2 bg-background/50 rounded border">
                                <div className="text-sm">
                                  {new Date(backup.timestamp).toLocaleString()}
                                  <div className="text-xs text-muted-foreground">
                                    {backup.state.tasks.length} tasks, {backup.state.scheduledEvents.length} events
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => restoreFromBackup(backup)}
                                >
                                  Restore
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer with helpful information */}
        <div className="flex-shrink-0 border-t pt-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              💡 <strong>Tip:</strong> All changes are temporary until you click "Save Changes". 
              Your routine will automatically back up when you make changes, and you can restore from recent backups.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
};