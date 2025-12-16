import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarPlus } from "lucide-react";
import { EmojiPicker } from "./EmojiPicker";
import { ScheduledEventDialogProps } from "@/types";

export const ScheduledEventDialog = ({ onAddEvent }: ScheduledEventDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("📅");
  const [time, setTime] = useState("12:00");
  const [period, setPeriod] = useState("AM");
  const [date, setDate] = useState("");
  const [isTBD, setIsTBD] = useState(false);
  const [isTimeTBD, setIsTimeTBD] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const formattedTime = isTimeTBD ? undefined : `${time} ${period}`;
    
    onAddEvent({
      title: title.trim(),
      icon: selectedEmoji,
      time: formattedTime,
      date: isTBD ? undefined : date || undefined,
      isTBD: isTBD,
      isTimeTBD: isTimeTBD,
    });

    // Reset form
    setTitle("");
    setSelectedEmoji("📅");
    setTime("12:00");
    setPeriod("AM");
    setDate("");
    setIsTBD(false);
    setIsTimeTBD(false);
    setOpen(false);
  };

  const handleTBDChange = (checked: boolean) => {
    setIsTBD(checked);
    if (checked) {
      setDate(""); // Clear date when TBD is selected
    }
  };

  const handleTimeTBDChange = (checked: boolean) => {
    setIsTimeTBD(checked);
    if (checked) {
      setTime("12:00"); // Reset to default when TBD is selected
      setPeriod("AM");
    }
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
      <DialogContent 
        className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule Future Event</DialogTitle>
          <div id="dialog-description" className="text-sm text-muted-foreground mt-2">
            Create a scheduled event with or without a specific date. All fields except date are required.
          </div>
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
          <div className="space-y-3">
            <Label className="text-base font-semibold" id="date-section-label">Date</Label>
            
            {/* TBD Checkbox with Enhanced Accessibility */}
            <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
              <Checkbox
                id="tbd-checkbox"
                checked={isTBD}
                onCheckedChange={handleTBDChange}
                className="w-5 h-5 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-describedby="tbd-description"
              />
              <div className="flex-1">
                <Label 
                  htmlFor="tbd-checkbox" 
                  className="text-sm font-medium leading-none cursor-pointer hover:text-primary transition-colors"
                >
                  Date to be determined (TBD)
                </Label>
                <div 
                  id="tbd-description" 
                  className="text-xs text-muted-foreground mt-1"
                >
                  Check this if you want to schedule the event without selecting a specific date
                </div>
              </div>
            </div>

            {/* Conditional Date Input with ARIA Live Region */}
            <div 
              role="region" 
              aria-labelledby="date-section-label"
              aria-live="polite"
              className="transition-all duration-300 ease-in-out"
            >
              {!isTBD && (
                <div className="space-y-2">
                  <Label htmlFor="date-input" className="text-sm font-medium">
                    Select specific date
                  </Label>
                  <Input
                    id="date-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    className="text-base h-12 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    required={!isTBD}
                    aria-label={`Select event date. Minimum date is ${today}`}
                    aria-describedby="date-help"
                  />
                  <div id="date-help" className="text-xs text-muted-foreground">
                    Choose a date for your scheduled event (today or later)
                  </div>
                </div>
              )}
              
              {isTBD && (
                <div 
                  className="p-3 bg-muted/30 rounded-md border-l-4 border-amber-400 transition-all duration-300 ease-in-out"
                  role="status"
                  aria-label="TBD event notice"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-0.5" aria-hidden="true">📅</span>
                    <div>
                      <div className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        Event marked as TBD
                      </div>
                      <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                        This event will be scheduled when the date is determined
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold" id="time-section-label">Time</Label>
            
            {/* TBD Time Checkbox with Enhanced Accessibility */}
            <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
              <Checkbox
                id="time-tbd-checkbox"
                checked={isTimeTBD}
                onCheckedChange={handleTimeTBDChange}
                className="w-5 h-5 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-describedby="time-tbd-description"
              />
              <div className="flex-1">
                <Label 
                  htmlFor="time-tbd-checkbox" 
                  className="text-sm font-medium leading-none cursor-pointer hover:text-primary transition-colors"
                >
                  Time to be determined (TBD)
                </Label>
                <div 
                  id="time-tbd-description" 
                  className="text-xs text-muted-foreground mt-1"
                >
                  Check this if the event time is not yet determined
                </div>
              </div>
            </div>

            {/* Conditional Time Input with ARIA Live Region */}
            <div 
              role="region" 
              aria-labelledby="time-section-label"
              aria-live="polite"
              className="transition-all duration-300 ease-in-out"
            >
              {!isTimeTBD && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Select specific time</Label>
                  <div className="flex gap-2" role="group">
                    <div className="flex-1">
                      <Label htmlFor="time-input" className="sr-only">Hour and minute</Label>
                      <Input
                        id="time-input"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="text-base h-12 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-describedby="time-help"
                      />
                    </div>
                    <div>
                      <Label htmlFor="period-select" className="sr-only">AM or PM</Label>
                      <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger 
                          id="period-select"
                          className="w-24 h-12 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          aria-label="Select AM or PM"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div id="time-help" className="text-xs text-muted-foreground">
                    Set the time for your event (24-hour format will be converted to 12-hour)
                  </div>
                </div>
              )}
              
              {isTimeTBD && (
                <div 
                  className="p-3 bg-muted/30 rounded-md border-l-4 border-blue-400 transition-all duration-300 ease-in-out"
                  role="status"
                  aria-label="TBD time notice"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-0.5" aria-hidden="true">🕐</span>
                    <div>
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Time marked as TBD
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                        This event will be scheduled when the time is determined
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button with Enhanced Accessibility */}
          <div className="pt-2">
            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-12 text-base focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
              disabled={!title.trim()}
              aria-describedby="submit-help"
            >
              {(isTBD && isTimeTBD) ? 'Schedule Completely TBD Event' : 
               isTBD ? 'Schedule Date TBD Event' : 
               isTimeTBD ? 'Schedule Time TBD Event' : 
               'Schedule Event'}
            </Button>
            <div id="submit-help" className="text-xs text-muted-foreground mt-2 text-center">
              {!title.trim() 
                ? 'Please enter an event name to continue' 
                : (isTBD && isTimeTBD)
                  ? 'Create event with neither date nor time specified'
                  : isTBD 
                    ? 'Create event with time but no specific date'
                    : isTimeTBD
                      ? 'Create event with date but no specific time'
                      : 'Create event with specific date and time'
              }
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
