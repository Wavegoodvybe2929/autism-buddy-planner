import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarClock, Pencil, Trash2, X, Check } from "lucide-react";
import { EmojiPicker } from "./EmojiPicker";

interface ScheduledEvent {
  id: string;
  title: string;
  icon: string;
  time: string;
  date: string;
}

interface ScheduledEventsManagerProps {
  events: ScheduledEvent[];
  onUpdateEvent: (event: ScheduledEvent) => void;
  onDeleteEvent: (id: string) => void;
}

export const ScheduledEventsManager = ({ events, onUpdateEvent, onDeleteEvent }: ScheduledEventsManagerProps) => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ScheduledEvent | null>(null);

  const startEditing = (event: ScheduledEvent) => {
    setEditingId(event.id);
    setEditForm({ ...event });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (editForm) {
      onUpdateEvent(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", { 
      weekday: "short", 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg" 
          className="gap-2 shadow-md relative"
        >
          <CalendarClock className="h-5 w-5" />
          View Events
          {events.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {events.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Scheduled Events</DialogTitle>
        </DialogHeader>
        
        {events.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CalendarClock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No scheduled events</p>
            <p className="text-sm">Events you schedule will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="border border-border rounded-lg p-4 bg-card"
              >
                {editingId === event.id && editForm ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Icon</Label>
                      <EmojiPicker 
                        selectedEmoji={editForm.icon} 
                        onSelectEmoji={(emoji) => setEditForm({ ...editForm, icon: emoji })} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Event Name</Label>
                      <Input
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="h-10"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Date</Label>
                        <Input
                          type="date"
                          value={editForm.date}
                          min={today}
                          onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Time</Label>
                        <div className="flex gap-2">
                          <Input
                            type="time"
                            value={editForm.time.split(" ")[0]}
                            onChange={(e) => {
                              const period = editForm.time.split(" ")[1] || "AM";
                              setEditForm({ ...editForm, time: `${e.target.value} ${period}` });
                            }}
                            className="flex-1 h-10"
                          />
                          <Select 
                            value={editForm.time.split(" ")[1] || "AM"} 
                            onValueChange={(period) => {
                              const timeValue = editForm.time.split(" ")[0];
                              setEditForm({ ...editForm, time: `${timeValue} ${period}` });
                            }}
                          >
                            <SelectTrigger className="w-20 h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AM">AM</SelectItem>
                              <SelectItem value="PM">PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm" onClick={cancelEditing}>
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={saveEdit}>
                        <Check className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{event.icon}</span>
                      <div>
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(event.date)} at {event.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => startEditing(event)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDeleteEvent(event.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
