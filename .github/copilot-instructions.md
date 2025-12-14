# Autism Buddy Planner - AI Agent Development Guide

## Project Overview

**Mission**: Creating autism-friendly daily routine management through predictable, customizable, sensory-friendly interfaces.

This is a React 18 + TypeScript + Vite application using shadcn/ui components, designed specifically for the autism community with accessibility-first principles. The project uses **Bun** as package manager and maintains a sophisticated multi-agent configuration system.

## Technology Stack & Architecture

- **Frontend**: React 18.3.1 + TypeScript + Vite (with React-SWC)
- **UI Framework**: shadcn/ui + Radix UI primitives + Tailwind CSS
- **State**: React hooks + localStorage (intentionally simple, no external state library)
- **Build**: Vite with `@` alias pointing to `src/`
- **Package Manager**: Bun (not npm/yarn)
- **Branch**: `Tauri-Wrap` (preparing for desktop app conversion)

## Key Development Patterns

### Component Architecture
```tsx
// Standard pattern: Functional components with TypeScript interfaces
interface TaskProps {
  id: string;
  title: string;
  icon: string;
  time: string;
  completed: boolean;
}

export const TaskComponent = ({ id, title, icon, time, completed }: TaskProps) => {
  // Component logic using React hooks
}
```

### Local Storage Pattern
```tsx
// Daily reset functionality - critical pattern used throughout
const [tasks, setTasks] = useState<Task[]>(() => {
  const savedDate = localStorage.getItem("lastResetDate") || "";
  const today = new Date().toISOString().split('T')[0];
  
  if (savedDate !== today) {
    // Reset to preset tasks for new day
    return defaultTasks.map(t => ({ ...t, completed: false }));
  }
  
  // Load saved tasks for current day
  const savedTasks = localStorage.getItem("currentDayTasks");
  return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
});
```

### shadcn/ui Integration
- Components are in `src/components/ui/` - these are shadcn generated, don't modify directly
- Use `components.json` for shadcn configuration
- Custom components use shadcn primitives: `<Card>`, `<Button>`, `<Dialog>`, etc.

## Multi-Agent Framework System

**CRITICAL**: This project uses a sophisticated agent orchestration system in `Agent-Config/` with mandatory routing protocols.

### Agent System Usage Protocol

#### **MANDATORY ORCHESTRATOR-FIRST WORKFLOW**
```markdown
⚠️ BEFORE ANY DEVELOPMENT WORK:
1. ALWAYS consult `Agent-Config/orchestrator.md` FIRST
2. Get task routing, workflow coordination, and current project context
3. Identify required specialist agents and collaboration patterns
4. Follow prescribed multi-agent workflows
```

#### **Agent Configuration Integration Pattern**
All specialist agents follow this integration pattern:
```markdown
> **⚠️ MANDATORY ORCHESTRATOR ROUTING**: Before executing any work from this specialist config, 
> **ALWAYS consult `agent-config/orchestrator.md` FIRST** for task routing, workflow coordination, 
> multi-agent needs, current project context, and agent hooks integration.
```

### Core Agent Ecosystem

#### **Central Coordination**
- **`orchestrator.md`** - Primary workflow coordinator and agent manager
  - Routes all tasks to appropriate specialists
  - Manages multi-agent collaboration workflows
  - Ensures autism community needs guide all technical decisions

#### **Autism-Focused Specialists**
- **`autism-support-specialist.md`** - Primary autism community advocate
  - **Role**: Community needs assessment and advocacy
  - **Current Focus**: Leading accessibility enhancement requirements
  - **Collaboration**: Partners with accessibility & UX specialists

- **`accessibility-specialist.md`** - WCAG compliance + autism-specific accessibility
  - **Role**: Technical accessibility implementation beyond standard compliance
  - **Current Focus**: WCAG 2.1 AA+ with autism-specific enhancements
  - **Collaboration**: Translates community needs into technical requirements

- **`ux-ui-specialist.md`** - Sensory-friendly visual design specialist
  - **Role**: Visual design with shadcn/ui integration for autism needs
  - **Current Focus**: Visual accessibility enhancement implementation
  - **Collaboration**: Design implementation guided by autism community needs

#### **Technical Specialists**
- **`react-typescript-specialist.md`** - Primary React/TypeScript implementation
  - **Role**: Autism-friendly React component development with TypeScript
  - **Current Focus**: Implementing accessibility enhancements in components
  - **Collaboration**: Guided by autism support specialist requirements

- **`frontend-architecture-specialist.md`** - React architecture planning
  - **Role**: Scalable architecture for autism community long-term needs
  - **Current Focus**: Architecture support for accessibility infrastructure

### Agent Hooks Integration System

**AUTOMATIC INTEGRATION**: All agents automatically integrate with the hooks system (`Agent-Config/agent-hooks.md`):

- **Lifecycle Management**: Automated task initiation → progress tracking → completion
- **Quality Assurance**: Built-in validation for autism community standards
- **Cross-Agent Coordination**: Seamless collaboration and handoffs
- **Community-Centered Validation**: Autism impact assessment in all workflows

### Current Phase Coordination (December 2025)

**Active Priority**: 🎯 **Accessibility Enhancement Implementation**

**Lead Agent Workflow**:
1. `autism-support-specialist.md` - Community requirements leadership
2. `accessibility-specialist.md` - Technical accessibility implementation  
3. `ux-ui-specialist.md` - Visual accessibility enhancement
4. `react-typescript-specialist.md` - Component implementation

**Agent Collaboration Pattern for Current Phase**:
```
Community Needs Assessment → Technical Requirements → Design Implementation → Code Development
(autism-support) → (accessibility) → (ux-ui) → (react-typescript)
```

## Essential Commands

```bash
# Use Bun, not npm/yarn
bun install              # Install dependencies
bun run dev             # Start development server (port 8080)
bun run build           # Production build
bun run lint            # ESLint check
```

## Autism-Specific Design Requirements

### Sensory-Friendly Patterns
- **Large touch targets** (min 44px) for motor challenges
- **High contrast** and **clear visual hierarchy**
- **Consistent emoji icons** for tasks (🌅, 🪥, 💧, etc.)
- **Predictable navigation** - avoid sudden changes or animations
- **Time-based organization**: Morning/Afternoon/Evening sections

### Critical Accessibility Features
- **Visual completion feedback** for task completion
- **Daily reset functionality** to support routine consistency
- **Preset system** for routine templates
- **Scheduled events** integration with daily tasks

### Current Focus Areas
- Enhancing keyboard navigation
- Screen reader optimization
- Customizable color themes
- Anxiety-reducing interaction patterns

## Key Files & Components

### Core Components
- `src/components/DayPlanner.tsx` - Main daily routine interface
- `src/components/RoutineCard.tsx` - Individual task display
- `src/components/PresetSelector.tsx` - Routine template management
- `src/components/ScheduledEventDialog.tsx` - Event scheduling

### Data Models
```tsx
interface Task {
  id: string;
  title: string;
  icon: string;      // Emoji character
  time: string;      // "7:00 AM" format
  completed: boolean;
  isScheduledEvent?: boolean;
}
```

### Custom Hooks
- `src/hooks/useCurrentTime.ts` - Real-time date/time formatting
- `src/hooks/use-toast.ts` - Toast notification system

## Development Workflow

### **Agent-First Development Process**
1. **Start with Orchestrator**: Always check `Agent-Config/orchestrator.md` for current priorities and routing
2. **Identify Required Agents**: Use agent intersection matrix to determine collaboration needs
3. **Follow Agent Protocols**: Each specialist has specific integration patterns and requirements
4. **Use Agent Hooks**: Automatic lifecycle management, quality assurance, and coordination
5. **Community-Centered Validation**: All work includes autism community impact assessment

### **Standard Development Steps**
1. **Agent Coordination**: Route through orchestrator for task assignment
2. **Use Bun Commands**: All package operations use `bun`, not npm/yarn  
3. **Test Accessibility**: Primary concern, not secondary - use autism community scenarios
4. **Maintain Daily Reset Logic**: Critical for autism routine support consistency
5. **Follow Local Storage Patterns**: Established patterns in `DayPlanner.tsx`
6. **Validate with Specialists**: Quality gates through appropriate agent configurations

### **Agent Configuration Reference Files**
- `Agent-Config/agent-intersection-matrix.md` - Complete ecosystem overview and collaboration patterns
- `Agent-Config/agent-hooks.md` - Automatic integration system and lifecycle management
- `Agent-Config/AGENT_CONFIG_FRAMEWORK_GUIDE.md` - Framework adaptation and usage guide

## Common Gotchas

- **Package manager**: Always use `bun`, not `npm` or `yarn`
- **Agent coordination**: All work must route through `orchestrator.md` first - no independent agent work
- **Daily reset logic**: Essential - tasks must reset to preset at midnight for autism routine consistency
- **shadcn/ui updates**: Use `bunx shadcn@latest add [component]` to add components
- **Multi-agent workflows**: Complex features require coordination between multiple specialist agents
- **Accessibility-first**: All UI changes must consider autism community needs and sensory sensitivities
- **Hooks integration**: Agent hooks system automatically manages lifecycle, quality, and coordination
- **Community validation**: All development includes autism community impact assessment

## Local Development Setup

```bash
git clone <repo-url>
cd autism-buddy-planner
bun install
bun run dev  # http://localhost:8080
```

The app will automatically load with default daily routine tasks and reset daily for consistent user experience.