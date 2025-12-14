# Technical Architecture Analysis

## Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern functional components with hooks-based state management
- **TypeScript**: Strict type safety and enhanced developer experience
- **Vite**: Fast development server and optimized production builds

### UI Framework & Styling
- **shadcn/ui**: Comprehensive, accessible component library
- **Tailwind CSS**: Utility-first styling with autism-friendly customization
- **Radix UI Primitives**: Accessibility-first component foundations
- **Lucide React**: Consistent iconography system

### State Management & Persistence
- **React Hooks**: useState, useEffect for component state management
- **Local Storage**: Client-side persistence for user data and preferences
- **No External State Library**: Intentionally simple state architecture for reliability

### Development Tools
- **ESLint**: Code quality and consistency enforcement
- **PostCSS**: CSS processing and optimization  
- **Bun v1.3.4**: Package management and runtime optimization (all commands use bun, not npm/yarn)
- **Tauri CLI v2.9.6**: Desktop app development and build tools
- **Rust v1.90.0**: Backend compilation environment for Tauri integration
- **VS Code Extensions**: rust-analyzer for Rust/Tauri development support

### Desktop App Architecture (Tauri Integration - Phase 2 Complete)
- **Tauri v2.9.6**: Cross-platform desktop application framework with Rust backend
- **✅ Complete Phases**:
  - **Phase 1**: Environment Setup - Rust, Tauri CLI, system dependencies verified
  - **✅ Phase 2**: Tauri Project Initialization - Full project integration complete
- **Project Structure**: Complete `src-tauri/` directory with:
  - `tauri.conf.json` - Autism-friendly app configuration with proper metadata
  - `Cargo.toml` - Rust dependencies and project manifest
  - `src/main.rs` & `src/lib.rs` - Rust application entry points
  - Complete multi-platform icon set in `src-tauri/icons/`
  - `.gitignore` updated with Tauri-specific entries
- **Configuration Details**:
  - **App Identity**: "Autism Buddy Planner" with community-focused descriptions
  - **Window Settings**: 1200x800 default, 800x600 minimum, centered, autism-friendly
  - **Build Integration**: Bun + Vite + Tauri workflow with `http://localhost:8080` dev server
  - **Bundle Metadata**: Productivity category with autism community focus
- **Development Workflow**: `bun run dev` + `cargo tauri dev` for desktop app development
- **WebView Integration**: Native webview rendering with React frontend preservation
- **System Integration**: Ready for desktop-native features (system tray, notifications, file system)
- **Icon Assets**: Existing Planner.jpg ready for Phase 3 conversion to platform-specific formats
- **Security Model**: Tauri allowlist configuration for minimal attack surface
- **Target Platforms**: macOS (primary development platform), Windows 10/11, Linux (Ubuntu/Debian)
- **Next Phase**: Phase 3 - Custom App Icon Integration using existing Planner.jpg asset

## Architecture Patterns

### Component Architecture
- **Functional Components**: Consistent React functional component pattern
- **Custom Hooks**: Reusable stateful logic extraction
- **Prop Interfaces**: TypeScript interfaces for component contracts
- **Composition Pattern**: Component composition over inheritance

### File Organization
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── [FeatureComponents] # Application-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and helpers
├── pages/              # Top-level page components
└── main.tsx           # Application entry point
```

### State Management Strategy
- **Local Component State**: useState for component-specific data
- **Shared State**: Props and callback patterns for parent-child communication
- **Persistence Layer**: localStorage for user data persistence
- **No Global State**: Intentionally avoiding complex state management for simplicity

## Core Components Analysis

### DayPlanner.tsx (Primary Component)
**Purpose**: Main application orchestrator managing daily routine state and display  
**Lines of Code**: 370+ lines  
**Key Responsibilities**:
- Daily task state management (tasks, presets, scheduled events)
- Daily reset logic implementation
- Time-based task filtering and organization
- Component composition and data flow coordination

**State Structure**:
```typescript
const [tasks, setTasks] = useState<Task[]>([]);
const [presets, setPresets] = useState<Preset[]>([]);
const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([]);
```

**Key Functions**:
- `handleDailyReset()`: Automatic daily routine refresh logic
- `filterTasksByTime()`: Time-based task organization (Morning/Afternoon/Evening)
- `handleTaskCompletion()`: Task completion state management
- `applyPreset()`: Preset application to current daily routine

### RoutineCard.tsx
**Purpose**: Individual task display with autism-friendly visual design  
**Key Features**:
- Large emoji icons for visual task identification
- Clear typography and visual hierarchy
- Accessible button implementation with aria-pressed
- Completion state visual feedback

### Component Dependencies
- **AddTaskDialog.tsx**: Task creation and editing interface
- **PresetSelector.tsx**: Routine template selection and management
- **ScheduledEventDialog.tsx**: Event scheduling interface
- **ScheduledEventsManager.tsx**: Event management and display
- **EmojiPicker.tsx**: Visual task icon selection

## Technical Quality Standards

### TypeScript Configuration
- **Strict Mode**: Enabled for maximum type safety
- **ESNext Target**: Modern JavaScript features utilization
- **Module Resolution**: Node-style module resolution
- **JSX**: React JSX transformation

### Code Quality Standards
- **ESLint Configuration**: Comprehensive linting rules
- **Type Safety**: Full TypeScript coverage with no 'any' types
- **Component Interfaces**: Explicit prop type definitions
- **Error Boundaries**: Graceful error handling patterns

### Performance Considerations
- **Component Memoization**: Selective React.memo usage for performance
- **Effect Dependencies**: Careful useEffect dependency management
- **Local Storage Optimization**: Efficient data serialization and retrieval
- **Bundle Optimization**: Vite-based build optimization

## Accessibility Architecture

### Current Implementation
- **Semantic HTML**: Proper HTML element usage throughout components
- **ARIA Attributes**: aria-pressed, aria-label implementation in interactive elements
- **Keyboard Navigation**: Focus management and keyboard interaction support
- **Screen Reader Support**: Descriptive text and proper labeling

### Enhancement Phase (Current Development)
- **WCAG 2.1 AA+ Compliance**: Comprehensive accessibility standard adherence
- **Autism-Specific Enhancements**: Sensory-friendly interface accommodations
- **Assistive Technology Support**: Enhanced compatibility with autism-specific tools
- **Custom Accessibility Features**: Beyond-standard accommodations for autism community

## Data Architecture

### Task Data Structure
```typescript
interface Task {
  id: string;
  title: string;
  emoji: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  completed: boolean;
  createdAt: Date;
}
```

### Preset Data Structure
```typescript
interface Preset {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: Date;
}
```

### Scheduled Event Data Structure
```typescript
interface ScheduledEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  completed: boolean;
}
```

### Persistence Strategy
- **Local Storage Keys**: Structured key naming for data organization
- **JSON Serialization**: Consistent data serialization approach
- **Data Validation**: Type checking on data retrieval and storage
- **Migration Support**: Planned data structure evolution support

## Desktop App Architecture - Tauri Integration (December 2025)

### Hybrid Architecture Strategy
**Frontend Layer (React/TypeScript)**: 
- **Preserved Component Architecture**: Maintaining existing autism-friendly component structure
- **Enhanced State Management**: Desktop-specific state handling for window and system integration
- **Improved Data Persistence**: Enhanced localStorage with desktop backup capabilities
- **Desktop-Responsive Design**: UI adaptations for desktop-specific interaction patterns

**Native Layer (Tauri/Rust)**:
- **Window Management**: Native window controls with autism-friendly defaults (consistent positioning, predictable behavior)
- **System Integration**: Respectful system tray and notification integration without overwhelming users
- **File System Access**: Planned import/export functionality for routine backups and sharing
- **Performance Optimization**: Native rendering performance with web UI flexibility

### Desktop-Specific Enhancements
- **Predictable Window Behavior**: Consistent positioning and sizing for routine-dependent users
- **Enhanced Accessibility**: Desktop accessibility API integration beyond web standards
- **Offline-First Capabilities**: Complete independence from internet connectivity
- **System Theme Integration**: Automatic dark/light mode following system preferences
- **Custom Icon Integration**: Autism-friendly app icon design across all platforms

### Build and Distribution Architecture
- **Dual Build Process**: Web build (Vite) → Desktop packaging (Tauri)
- **Cross-Platform Compilation**: Single Rust codebase targeting macOS, Windows, Linux
- **Automated Icon Generation**: Multi-platform icon generation for consistent branding
- **Code Signing Strategy**: Platform-specific signing for trusted distribution
- **Update Mechanism**: Planned auto-update system for desktop app maintenance

### Performance Optimization for Desktop
- **Startup Performance**: Target <3 second cold startup for daily routine accessibility
- **Memory Management**: Efficient resource usage for all-day application sessions
- **Native Performance**: Leveraging Tauri's native performance while maintaining React flexibility
- **Smooth Interactions**: Desktop-optimized animations and transitions reducing anxiety triggers