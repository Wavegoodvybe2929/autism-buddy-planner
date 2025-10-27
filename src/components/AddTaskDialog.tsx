import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { EmojiPicker } from "./EmojiPicker";

interface AddTaskDialogProps {
  onAddTask: (task: { title: string; icon: string; time: string; period: string }) => void;
}

export const AddTaskDialog = ({ onAddTask }: AddTaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("✨");
  const [time, setTime] = useState("12:00");
  const [period, setPeriod] = useState("AM");
  const [timePeriod, setTimePeriod] = useState("morning");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const formattedTime = `${time} ${period}`;
    
    onAddTask({
      title: title.trim(),
      icon: selectedEmoji,
      time: formattedTime,
      period: timePeriod,
    });

    // Reset form
    setTitle("");
    setSelectedEmoji("✨");
    setTime("12:00");
    setPeriod("AM");
    setTimePeriod("morning");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 shadow-md">
          <Plus className="h-5 w-5" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emoji Picker */}
          <div className="space-y-2">
            <Label htmlFor="emoji" className="text-base font-semibold">
              Choose Icon
            </Label>
            <EmojiPicker selectedEmoji={selectedEmoji} onSelectEmoji={setSelectedEmoji} />
          </div>

          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Task Name
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Walk the dog"
              className="text-base h-12"
              required
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Time</Label>
            <div className="flex gap-2">
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 text-base h-12"
              />
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-24 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Period Selection */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">When</Label>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full h-12 text-base">
            Add Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
