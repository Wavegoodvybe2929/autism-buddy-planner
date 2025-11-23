import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  icon: string;
  time: string;
  completed: boolean;
}

interface Preset {
  id: string;
  name: string;
  tasks: Task[];
}

interface PresetSelectorProps {
  presets: Preset[];
  currentPresetId: string;
  currentTasks: Task[];
  onSelectPreset: (presetId: string) => void;
  onCreatePreset: (name: string, tasks: Task[]) => void;
}

export const PresetSelector = ({
  presets,
  currentPresetId,
  currentTasks,
  onSelectPreset,
  onCreatePreset,
}: PresetSelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");

  const handleCreatePreset = () => {
    if (!newPresetName.trim()) {
      toast.error("Please enter a preset name");
      return;
    }

    onCreatePreset(newPresetName, currentTasks);
    setNewPresetName("");
    setIsDialogOpen(false);
    toast.success(`Preset "${newPresetName}" created!`);
  };

  return (
    <div className="flex items-center gap-3">
      <Select value={currentPresetId} onValueChange={onSelectPreset}>
        <SelectTrigger className="w-[200px] bg-card border-border">
          <SelectValue placeholder="Select preset" />
        </SelectTrigger>
        <SelectContent>
          {presets.map((preset) => (
            <SelectItem key={preset.id} value={preset.id}>
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Save className="h-4 w-4" />
            Save as Preset
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Current Routine as Preset</DialogTitle>
            <DialogDescription>
              Create a new preset with your current tasks and schedule
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="preset-name">Preset Name</Label>
              <Input
                id="preset-name"
                placeholder="e.g., Weekday Routine, Weekend Plan"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreatePreset();
                  }
                }}
              />
            </div>
            <Button onClick={handleCreatePreset} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create Preset
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
