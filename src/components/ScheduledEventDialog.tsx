import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarPlus } from "lucide-react";
import { EmojiPicker } from "./EmojiPicker";

interface ScheduledEventDialogProps {
  onAddEvent: (event: { title: string; icon: string; time: string; date: string }) => void;
}

export const ScheduledEventDialog = ({ onAddEvent }: ScheduledEventDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("📅");
  const [time, setTime] = useState("12:00");
  const [period, setPeriod] = useState("AM");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !date) return;

    const formattedTime = `${time} ${period}`;
    
    onAddEvent({
      title: title.trim(),
      icon: selectedEmoji,
      time: formattedTime,
      date: date,
    });

    // Reset form
    setTitle("");
    setSelectedEmoji("📅");
    setTime("12:00");
    setPeriod("AM");
    setDate("");
    setOpen(false);
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2 shadow-md">
          <CalendarPlus className="h-5 w-5" />
          Schedule Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule Future Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emoji Picker */}
          <div className="space-y-2">
            <Label htmlFor="emoji" className="text-base font-semibold">
              Choose Icon
            </Label>
            <EmojiPicker selectedEmoji={selectedEmoji} onSelectEmoji={setSelectedEmoji} />
          </div>

          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Event Name
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Doctor appointment"
              className="text-base h-12"
              required
            />
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
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

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full h-12 text-base">
            Schedule Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
