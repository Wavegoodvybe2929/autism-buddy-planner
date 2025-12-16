import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarClock, Pencil, Trash2, X, Check, Calendar, Clock } from "lucide-react";
import { EmojiPicker } from "./EmojiPicker";
import { ScheduledEvent, ScheduledEventsManagerProps } from "@/types";
import { categorizeEvents, formatEventTime, getEnhancedEventDisplayText } from "@/lib/eventUtils";

export const ScheduledEventsManager = ({ events, onUpdateEvent, onDeleteEvent }: ScheduledEventsManagerProps) => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ScheduledEvent | null>(null);

  const startEditing = (event: ScheduledEvent) => {
    setEditingId(event.id);
    // Ensure backward compatibility by setting default values for new fields
    setEditForm({ 
      ...event,
      isTimeTBD: event.isTimeTBD ?? false
    });
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

  const handleTimeTBDChange = (checked: boolean) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        isTimeTBD: checked,
        time: checked ? undefined : editForm.time
      });
    }
  };

  // Use enhanced categorization for time TBD support
  const { 
    datedEvents, 
    timeTBDEvents, 
    dateTBDEvents, 
    completelyTBDEvents 
  } = categorizeEvents(events);

  const today = new Date().toISOString().split('T')[0];

  const renderEvent = (event: ScheduledEvent, categoryClass: string = "") => {
    return (
      <div 
        key={event.id} 
        className={`border rounded-lg p-4 bg-card hover:bg-accent/20 transition-colors ${categoryClass}`}
      >
        {editingId === event.id && editForm ? (
          <div className="space-y-4">
            {/* Icon Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Icon</Label>
              <EmojiPicker 
                selectedEmoji={editForm.icon} 
                onSelectEmoji={(emoji) => setEditForm({ ...editForm, icon: emoji })} 
              />
            </div>

            {/* Event Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Event Name</Label>
              <Input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="h-10"
              />
            </div>

            {/* Date TBD Toggle */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`isTBD-edit-${editForm.id}`}
                  checked={editForm.isTBD}
                  onCheckedChange={(checked) => setEditForm({ 
                    ...editForm, 
                    isTBD: !!checked,
                    date: checked ? undefined : editForm.date
                  })}
                  className="h-5 w-5"
                />
                <Label 
                  htmlFor={`isTBD-edit-${editForm.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  Date to be determined
                </Label>
              </div>

              {/* Time TBD Toggle */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`isTimeTBD-edit-${editForm.id}`}
                  checked={editForm.isTimeTBD ?? false}
                  onCheckedChange={handleTimeTBDChange}
                  className="h-5 w-5"
                />
                <Label 
                  htmlFor={`isTimeTBD-edit-${editForm.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  Time to be determined
                </Label>
              </div>

              {/* Date and Time Fields */}
              <div className="grid grid-cols-2 gap-3">
                {/* Date Field */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date</Label>
                  <Input
                    type="date"
                    value={editForm.isTBD ? "" : (editForm.date || "")}
                    min={today}
                    onChange={(e) => setEditForm({ 
                      ...editForm, 
                      date: e.target.value,
                      isTBD: !e.target.value
                    })}
                    className="h-10"
                    disabled={editForm.isTBD}
                  />
                </div>

                {/* Time Field */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Time</Label>
                  {!(editForm.isTimeTBD ?? false) ? (
                    <div className="flex gap-2">
                      <Input
                        type="time"
                        value={editForm.time?.split(" ")[0] || "12:00"}
                        onChange={(e) => {
                          const period = editForm.time?.split(" ")[1] || "AM";
                          setEditForm({ ...editForm, time: `${e.target.value} ${period}` });
                        }}
                        className="h-10"
                      />
                      <Select 
                        value={editForm.time?.split(" ")[1] || "AM"} 
                        onValueChange={(value) => {
                          const time = editForm.time?.split(" ")[0] || "12:00";
                          setEditForm({ ...editForm, time: `${time} ${value}` });
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
                  ) : (
                    <div className="h-10 flex items-center px-3 border border-border rounded bg-muted text-muted-foreground">
                      Time TBD
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
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
                <h4 className="font-semibold text-foreground">{event.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {getEnhancedEventDisplayText(event)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => startEditing(event)}
                className="h-8 w-8"
                aria-label={`Edit ${event.title}`}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onDeleteEvent(event.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
                aria-label={`Delete ${event.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEventSection = (
    title: string, 
    icon: React.ReactNode, 
    events: ScheduledEvent[], 
    headerClass: string = "",
    categoryClass: string = ""
  ) => {
    if (events.length === 0) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          {icon}
          <h3 className={`text-lg font-semibold text-foreground ${headerClass}`}>{title}</h3>
          <span className={`text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${headerClass}`}>
            {events.length}
          </span>
        </div>
        <div className="space-y-3">
          {events.map((event) => renderEvent(event, categoryClass))}
        </div>
      </div>
    );
  };

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
          <div className="space-y-6">
            {/* Scheduled Events Section */}
            {renderEventSection(
              "Scheduled Events",
              <Calendar className="h-5 w-5 text-primary" />,
              datedEvents,
              "bg-primary text-primary-foreground",
              "border-border"
            )}

            {/* Time TBD Events Section */}
            {renderEventSection(
              "Time TBD",
              <Clock className="h-5 w-5 text-blue-600" />,
              timeTBDEvents,
              "bg-blue-100 text-blue-800",
              "border-blue-200 bg-blue-50/30 hover:bg-blue-50/50"
            )}

            {/* Date TBD Events Section */}
            {renderEventSection(
              "Date TBD", 
              <Calendar className="h-5 w-5 text-amber-600" />,
              dateTBDEvents,
              "bg-amber-100 text-amber-800",
              "border-amber-200 bg-amber-50/30 hover:bg-amber-50/50"
            )}

            {/* Completely TBD Events Section */}
            {renderEventSection(
              "Completely TBD",
              <Clock className="h-5 w-5 text-gray-500" />,
              completelyTBDEvents,
              "bg-gray-100 text-gray-700",
              "border-dashed border-gray-300 bg-gray-50/30 hover:bg-gray-50/50"
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
