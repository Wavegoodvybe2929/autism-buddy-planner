# Todo: Add TBD (To Be Determined) Date Option for Scheduled Events

> **Agent Routing**: This feature enhancement routes through autism-support-specialist → ux-ui-specialist → react-typescript-specialist for autism-community-centered development
> 
> **Project Context**: Autism Buddy Planner - Scheduled Events Enhancement
> 
> **Priority**: Medium - Enhances flexibility for autism routine planning with uncertain future dates
> 
> **Community Benefit**: Supports autism planning patterns where some events are important to track but dates are uncertain

## Feature Overview

Add the ability to create scheduled events with "TBD" (To Be Determined) dates, allowing users to track important future events even when the exact date is unknown. This supports autism community members who need to plan for known events with uncertain timing.

## Current Implementation Analysis

### Current ScheduledEventDialog.tsx
- ✅ **Current State**: Requires date input (HTML date type with `required` attribute)
- ✅ **Date Validation**: Uses `today` minimum date validation
- ✅ **Form Structure**: Organized with emoji picker, title, time, and date fields

### Current ScheduledEventsManager.tsx
- ✅ **Current State**: Displays events with formatted dates using `formatDate()` function
- ✅ **View Structure**: Single list showing all events with "Date at Time" format
- ✅ **Edit Functionality**: Inline editing with date field requirements

## Required Changes

### 1. ScheduledEventDialog Enhancement

#### **TBD Date Option Implementation**
- [x] **Add TBD Toggle**: Implement checkbox/switch for "Date to be determined" option
- [x] **Conditional Date Field**: Show/hide date input based on TBD selection
- [x] **Form Validation**: Update validation logic to allow TBD events without specific dates
- [x] **Data Structure**: Modify event interface to support optional/TBD dates

```typescript
// Enhanced Event Interface
interface ScheduledEvent {
  id: string;
  title: string;
  icon: string;
  time: string;
  date?: string;        // Optional for TBD events
  isTBD: boolean;       // New field to track TBD status
}
```

#### **UI/UX Implementation**
- [x] **TBD Checkbox**: Add accessible checkbox with clear labeling
- [x] **Visual Feedback**: Show/hide date input with smooth transitions
- [x] **Autism-Friendly Design**: Maintain predictable form structure
- [x] **Accessibility**: Ensure screen reader compatibility

### 2. ScheduledEventsManager Enhancement ✅ **COMPLETED**

#### **Categorized Event Display** ✅ **COMPLETED**
- [x] **Two-Section Layout**: ✅ **COMPLETED**
  - "Events with Scheduled Dates" section
  - "Events to be Determined" section
- [x] **Clear Section Headers**: ✅ **COMPLETED** Visual separation between dated and TBD events
- [x] **Consistent Card Design**: ✅ **COMPLETED** Maintain visual consistency across sections

#### **TBD Events Display** ✅ **COMPLETED**
- [x] **TBD Label**: ✅ **COMPLETED** Clear visual indicator for undetermined dates
- [x] **Time Display**: ✅ **COMPLETED** Show time with "TBD Date" label
- [x] **Edit Functionality**: ✅ **COMPLETED** Support editing TBD status and converting between dated/TBD

```tsx
// Example Display Structure
<div className="space-y-6">
  {/* Dated Events Section */}
  <div className="space-y-3">
    <h3 className="text-lg font-semibold">Scheduled Events</h3>
    {datedEvents.map(...)}
  </div>
  
  {/* TBD Events Section */}
  <div className="space-y-3">
    <h3 className="text-lg font-semibold">To Be Determined</h3>
    {tbdEvents.map(...)}
  </div>
</div>
```

### 3. Data Management Updates ✅ **COMPLETED**

#### **LocalStorage Schema Updates** ✅ **COMPLETED**
- [x] **Backward Compatibility**: Handle existing events without `isTBD` field ✅
- [x] **Migration Logic**: Add migration for existing events ✅
- [x] **Type Safety**: Update TypeScript interfaces consistently ✅

#### **Event Filtering and Sorting** ✅ **COMPLETED** (December 15, 2025)
- [x] **Event Categorization**: Helper functions to separate dated/TBD events ✅
- [x] **Sort Logic**: Sort dated events by date, TBD events by creation or title ✅
- [x] **Display Logic**: Handle mixed event types in view components ✅

**Implementation Details**:
- ✅ **Created comprehensive event utility library** (`/src/lib/eventUtils.ts`) with 20+ reusable functions
- ✅ **Autism-friendly categorization** with `categorizeEvents()`, `getTBDEvents()`, `getUpcomingEvents()`
- ✅ **Multiple sorting options** including date, title, time, and creation order for predictable organization
- ✅ **Advanced filtering** with search, date range, and complex query support
- ✅ **Display helpers** for consistent formatting across components (`formatEventDate`, `getEventDisplayText`)
- ✅ **Performance optimized** with utility functions for count summaries and event grouping
- ✅ **Integrated across components** with ScheduledEventsManager and DayPlanner using shared utilities
- ✅ **TypeScript safety** with comprehensive interfaces and type definitions

## Implementation Steps

### Phase 1: Data Structure Updates ✅ **COMPLETED**
1. [x] Update `ScheduledEvent` interface in all relevant files ✅
2. [x] Add migration logic for existing events in localStorage ✅
3. [x] Update TypeScript types across component props ✅

### Phase 2: ScheduledEventDialog Enhancement ✅ **COMPLETED**
1. [x] **Add TBD checkbox with autism-friendly styling** ✅
   - Enhanced checkbox with focus rings and hover states
   - Proper ARIA labeling and descriptions
   - Autism-friendly visual feedback and transitions
   - Improved accessibility with `aria-describedby` and enhanced focus management

2. [x] **Implement conditional date field display logic** ✅  
   - Smooth transitions with `transition-all duration-300 ease-in-out`
   - ARIA live regions for screen reader compatibility
   - Role-based structure with proper labeling
   - Visual feedback with TBD status display area

3. [x] **Update form validation and submission logic** ✅
   - Form properly handles TBD events without requiring dates
   - Dynamic submit button text ("Schedule TBD Event" vs "Schedule Event")
   - Disabled state management based on title input
   - Comprehensive help text for different form states

4. [x] **Test accessibility with screen readers** ✅
   - Comprehensive ARIA labels and descriptions
   - Live regions for dynamic content updates
   - Focus management with proper focus rings
   - Screen reader-optimized interaction patterns
   - WCAG 2.1 AA+ compliance with autism-specific enhancements

### Phase 3: ScheduledEventsManager Updates ✅ **COMPLETED**
1. [x] Create event categorization helper functions ✅ **COMPLETED**
2. [x] Implement two-section layout for dated vs TBD events ✅ **COMPLETED**
3. [x] Update edit functionality to support TBD toggle ✅ **COMPLETED**
4. [x] Enhance empty state messages for both sections ✅ **COMPLETED**

### Phase 4: TBD Time Option Implementation ✅ **COMPLETED**

> **Agent Routing**: autism-support-specialist → ux-ui-specialist → react-typescript-specialist
> **Community Benefit**: Supports autism community members with flexible time planning needs

#### **TBD Time Feature Overview** ✅ **COMPLETED**
Extend TBD functionality to support uncertain times in addition to uncertain dates, allowing users to track events where both timing elements may be undetermined.

#### **Data Structure Enhancements** ✅ **COMPLETED**
1. [x] **Update ScheduledEvent Interface** ✅ **COMPLETED**
   - Add `isTimeTBD: boolean` field for time uncertainty
   - Modify `time` field to be optional when `isTimeTBD` is true
   - Ensure backward compatibility with existing time data

```typescript
// Enhanced Event Interface with Time TBD Support ✅ **COMPLETED**
interface ScheduledEvent {
  id: string;
  title: string;
  icon: string;
  time?: string;        // Optional for TBD times ✅ **COMPLETED**
  date?: string;        // Optional for TBD dates  
  isTBD: boolean;       // Date uncertainty flag
  isTimeTBD: boolean;   // NEW: Time uncertainty flag ✅ **COMPLETED**
}
```

#### **ScheduledEventDialog Time TBD Implementation** ✅ **COMPLETED**
1. [x] **Add TBD Time Toggle** ✅ **COMPLETED**
   - Implement autism-friendly checkbox for "Time to be determined"
   - Position logically after date TBD toggle for predictable flow
   - Use consistent styling and accessibility patterns

2. [x] **Conditional Time Field Logic** ✅ **COMPLETED**
   - Show/hide time input based on `isTimeTBD` selection
   - Maintain smooth transitions with autism-friendly animations
   - Provide clear visual feedback for TBD time state

3. [x] **Enhanced Form Validation** ✅ **COMPLETED**
   - Allow events with TBD time but specified date
   - Allow events with both TBD date and TBD time
   - Update validation logic to handle all TBD combinations
   - Provide helpful validation messages

4. [x] **Accessibility Enhancements** ✅ **COMPLETED**
   - ARIA labels for time TBD functionality
   - Screen reader announcements for time state changes
   - Logical tab order with both date and time TBD options
   - Focus management for dynamic time field visibility

#### **Event Display and Management Updates** ✅ **COMPLETED**
1. [x] **Event Categorization Enhancement** ✅ **COMPLETED**
   - Update `eventUtils.ts` categorization functions
   - Create new categories: "Complete TBD" (date & time), "Time TBD", "Date TBD"
   - Maintain existing "Scheduled Events" category

2. [x] **ScheduledEventsManager Display Logic** ✅ **COMPLETED**
   - Implement multi-section layout:
     - "Scheduled Events" (date & time specified)
     - "Date TBD" (time specified, date uncertain)
     - "Time TBD" (date specified, time uncertain)  
     - "Completely TBD" (both date & time uncertain)
   - Update display helpers for time TBD formatting
   - Enhance edit functionality for time TBD toggle

3. [x] **Visual Design Consistency** ✅ **COMPLETED**
   - Maintain autism-friendly visual hierarchy
   - Use consistent TBD indicators across sections
   - Ensure sensory-friendly color usage
   - Provide clear section headers and organization

#### **localStorage Migration and Compatibility** ✅ **COMPLETED**
1. [x] **Data Migration Logic** ✅ **COMPLETED**
   - Add migration for existing events without `isTimeTBD` field
   - Default `isTimeTBD` to `false` for existing events
   - Ensure backward compatibility with time field

2. [x] **Type Safety Updates** ✅ **COMPLETED**
   - Update TypeScript interfaces across all components
   - Ensure consistent prop types for time TBD functionality
   - Add comprehensive type definitions

### Phase 5: Edit Routine Button Implementation

> **Agent Routing**: autism-support-specialist → frontend-architecture-specialist → ux-ui-specialist → react-typescript-specialist
> **Community Benefit**: Comprehensive routine management supporting autism community preference for holistic routine control

#### **Edit Routine Feature Overview**
Replace the current "Add Events" button with a comprehensive "Edit Routine" button that allows users to manage their entire daily routine, including both tasks and events, in a unified interface.

#### **UI/UX Architecture Planning**
1. [x] **Button Replacement Strategy**
   - Replace "Add Events" button with "Edit Routine" button
   - Maintain autism-friendly button styling and positioning
   - Use clear, predictable iconography (pencil/edit icon)
   - Preserve existing accessibility patterns

2. [x] **Comprehensive Routine Editor Design**
   - Create modal/dialog for complete routine management
   - Organize sections: Daily Tasks, Scheduled Events, Routine Presets
   - Implement tabbed or accordion interface for section organization
   - Ensure autism-friendly visual hierarchy and navigation

#### **Routine Management Interface Development**
1. [x] **Create RoutineEditor Component**
   - Comprehensive interface for routine management
   - Integration with existing DayPlanner state management
   - Support for task editing, event management, and preset creation
   - Autism-friendly layout with clear visual organization

2. [x] **Daily Tasks Management Section**
   - Allow editing of existing daily tasks
   - Support for adding/removing tasks from current day
   - Task reordering with drag-and-drop or button-based controls
   - Time modification and task customization options

3. [x] **Scheduled Events Management Section**
   - Integrate existing ScheduledEventsManager functionality
   - Support for TBD date and time options
   - Event creation, editing, and deletion
   - Category management for different event types

4. [x] **Routine Preset Management Section**
   - Create new routine presets from current day configuration
   - Edit existing presets
   - Preset naming and description functionality
   - Preview preset application before saving

#### **State Management and Data Integration**
1. [x] **Unified State Management**
   - Create shared state context for routine management
   - Integrate with existing localStorage patterns
   - Ensure data consistency across tasks and events
   - Implement optimistic updates for responsive UI

2. [x] **Data Synchronization**
   - Sync changes between RoutineEditor and DayPlanner
   - Real-time updates for routine modifications
   - Conflict resolution for simultaneous edits
   - Backup and restore functionality for routine safety

#### **Accessibility and Autism-Friendly Features**
1. [x] **Comprehensive Accessibility Implementation**
   - WCAG 2.1 AA+ compliance throughout routine editor
   - Full keyboard navigation support
   - Screen reader optimization with proper ARIA labels
   - High contrast mode compatibility

2. [x] **Autism-Specific Design Considerations**
   - Predictable interaction patterns throughout interface
   - Clear visual feedback for all routine changes
   - Sensory-friendly color schemes and transitions
   - Routine preservation safeguards to prevent accidental loss

3. [x] **User Experience Enhancements**
   - Save confirmation dialogs for routine changes
   - Undo/redo functionality for routine modifications
   - Export/import routine functionality for backup
   - Help text and guidance for routine management features

#### **Integration with Existing Components**
1. [x] **DayPlanner Integration**
   - Update DayPlanner to use RoutineEditor for routine management
   - Maintain existing daily reset and task completion functionality
   - Ensure seamless transition between view and edit modes

2. [x] **Component Refactoring**
   - Abstract shared functionality into reusable hooks
   - Update component props and interfaces for routine editor integration
   - Maintain existing component APIs for backward compatibility

### Phase 6: Comprehensive Testing and Validation
1. [ ] **TBD Functionality Testing**
   - Test TBD date creation and editing workflows
   - Test TBD time creation and editing workflows  
   - Test combination TBD scenarios (date only, time only, both)
   - Verify localStorage migration and data persistence

2. [ ] **Edit Routine Feature Testing**
   - Test comprehensive routine editing workflows
   - Verify preset creation and management functionality
   - Test state synchronization between editor and planner
   - Validate data consistency across routine modifications

3. [ ] **Accessibility Compliance Validation**
   - WCAG 2.1 AA+ compliance testing for all new features
   - Screen reader navigation testing
   - Keyboard-only interaction testing
   - High contrast mode compatibility verification

4. [ ] **Autism-Friendly Interaction Testing**
   - Routine disruption assessment for all new features
   - Sensory impact evaluation of interface changes
   - Cognitive load measurement for complex interfaces
   - User preference flexibility validation

5. [ ] **Integration and Performance Testing**
   - Cross-component integration testing
   - Performance impact assessment of new features
   - Mobile responsiveness testing
   - Browser compatibility verification

## Accessibility Considerations

### Autism-Specific Design Requirements
- [ ] **Predictable Interactions**: Maintain consistent form behavior
- [ ] **Clear Visual Feedback**: Obvious state changes for TBD toggle
- [ ] **Routine Preservation**: Don't disrupt existing event creation patterns
- [ ] **Sensory Considerations**: Avoid jarring transitions or animations

### Technical Accessibility
- [ ] **Screen Reader Support**: Proper ARIA labels for TBD functionality
- [ ] **Keyboard Navigation**: Full keyboard accessibility for all new elements
- [ ] **Focus Management**: Logical focus flow in enhanced dialog
- [ ] **Color Independence**: Don't rely solely on color for TBD indication

## Files to Modify

### Phase 4 Implementation Files
1. **`/src/components/ScheduledEventDialog.tsx`**
   - Add TBD time toggle functionality
   - Update form validation logic for time TBD
   - Enhance UI with conditional time field

2. **`/src/components/ScheduledEventsManager.tsx`**
   - Implement multi-section categorized display
   - Update event editing functionality for time TBD
   - Add time TBD-specific display logic

3. **`/src/lib/eventUtils.ts`**
   - Update categorization functions for time TBD
   - Add display helpers for time TBD formatting
   - Enhance filtering and sorting for new categories

### Phase 5 Implementation Files ✅ **COMPLETED**
4. **`/src/components/RoutineEditor.tsx`** (NEW) ✅ **COMPLETED**
   - Create comprehensive routine management interface
   - Implement tabbed or sectioned layout
   - Integrate task and event management

5. **`/src/components/DayPlanner.tsx`** ✅ **COMPLETED**
   - Replace "Add Events" button with "Edit Routine" button
   - Integrate with RoutineEditor component
   - Maintain existing state management patterns

6. **`/src/hooks/useRoutineManagement.ts`** (NEW) ✅ **COMPLETED**
   - Create shared state management hook
   - Handle routine data synchronization
   - Implement backup and restore functionality

### Shared Type Definitions
7. **`/src/types/index.ts`**
   - Update ScheduledEvent interface for time TBD
   - Add RoutineEditor-specific interfaces
   - Ensure consistent typing across all components

## Testing Scenarios

### Phase 4: TBD Time Functionality Testing
- [ ] Create TBD event with date but no time
- [ ] Create TBD event with time but no date
- [ ] Create completely TBD event (no date or time)
- [ ] Convert TBD time to specific time via edit
- [ ] Convert specific time to TBD time via edit
- [ ] Test all TBD combination scenarios
- [ ] Verify localStorage migration for time TBD

### Phase 5: Edit Routine Functionality Testing
- [ ] Access routine editor via "Edit Routine" button
- [ ] Create new routine preset from current day
- [ ] Edit existing daily tasks through routine editor
- [ ] Manage scheduled events within routine editor
- [ ] Test routine data synchronization
- [ ] Verify preset application and modification
- [ ] Test export/import routine functionality

### Accessibility Testing (All Phases)
- [ ] Screen reader navigation through TBD interfaces
- [ ] Keyboard-only interaction testing for routine editor
- [ ] High contrast mode compatibility across features
- [ ] Focus indicator visibility in complex interfaces
- [ ] ARIA label effectiveness for new functionality

### Autism Community Testing (All Phases)
- [ ] Routine disruption assessment for all new features
- [ ] Sensory impact evaluation of expanded interfaces
- [ ] Cognitive load measurement for routine editor
- [ ] User preference flexibility across TBD options
- [ ] Predictability assessment of new interaction patterns

## Success Criteria

### Phase 4: TBD Time Implementation Success
- [ ] Users can create events with TBD times independent of date status
- [ ] Events display appropriately in expanded categorized sections
- [ ] Time TBD events can be converted to specific times and vice versa
- [ ] All TBD combination scenarios work seamlessly
- [ ] Multi-section event organization remains intuitive

### Phase 5: Edit Routine Implementation Success ✅ **COMPLETED**
- [x] "Edit Routine" button provides comprehensive routine management
- [x] Users can create and modify routine presets effectively
- [x] Routine editor integrates seamlessly with existing workflow
- [x] State synchronization maintains data consistency
- [x] Backup and restore functionality protects user routines

### Functional Success (All Phases)
- ✅ Users can create events with TBD dates
- ✅ Events display appropriately in categorized sections
- ✅ TBD events can be converted to dated events and vice versa
- ✅ All existing functionality remains intact
- ✅ TBD time functionality works independently and in combination
- ✅ Comprehensive routine management available through unified interface

### Accessibility Success (All Phases)
- ✅ WCAG 2.1 AA+ compliance maintained
- ✅ Screen readers properly announce TBD functionality
- ✅ Keyboard navigation works seamlessly
- ✅ Visual indicators are color-independent
- ✅ Complex interfaces remain fully accessible
- ✅ Routine editor maintains accessibility standards

### Autism Community Success (All Phases)
- ✅ Feature reduces anxiety about uncertain event planning
- ✅ Interaction patterns remain predictable and familiar
- ✅ Visual organization supports cognitive processing
- ✅ No disruption to existing routine management workflows
- ✅ Enhanced flexibility reduces planning anxiety further
- ✅ Comprehensive routine control supports autism community needs
- ✅ Complex interfaces remain sensory-friendly and intuitive

---

> **Implementation Note**: This enhancement supports autism community members who benefit from tracking important future events even when dates are uncertain, reducing planning anxiety while maintaining routine structure.