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

#### **Hook Categories & Integration**
```typescript
// Four core hook categories automatically integrate with all agents:

// 1. Lifecycle Hooks - Manage complete task lifecycle
interface LifecycleHooks {
  beforeTaskStart: (context: TaskContext) => Promise<void>;
  onTaskProgress: (context: TaskContext, progress: ProgressInfo) => Promise<void>;
  afterTaskComplete: (context: TaskContext, result: TaskResult) => Promise<void>;
}

// 2. Quality Assurance Hooks - Ensure autism community standards
interface QualityAssuranceHooks {
  validateTaskRequirements: (context: TaskContext) => Promise<ValidationResult>;
  validateAutismCommunityAlignment: (context: TaskContext) => Promise<CommunityAlignmentResult>;
  validateAccessibilityCompliance: (context: TaskContext) => Promise<AccessibilityValidationResult>;
}

// 3. Collaboration Hooks - Facilitate seamless agent coordination
interface CollaborationHooks {
  requestAgentCollaboration: (context: TaskContext) => Promise<CollaborationResponse>;
  facilitateAgentHandoff: (context: TaskContext) => Promise<HandoffResult>;
  resolveAgentConflicts: (context: TaskContext) => Promise<ConflictResolution>;
}

// 4. Autism Community Advocacy Hooks - Prioritize autism community needs
interface AutismAdvocacyHooks {
  assessCommunityImpact: (context: TaskContext) => Promise<CommunityImpactAssessment>;
  validateSensoryConsiderations: (context: TaskContext) => Promise<SensoryValidationResult>;
  protectRoutineStability: (context: TaskContext) => Promise<RoutineStabilityResult>;
}
```

#### **TaskContext Structure for Community-Centered Development**
```typescript
interface TaskContext {
  taskId: string;
  agentType: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  autismCommunityImpact: 'low' | 'medium' | 'high' | 'critical';
  collaboratingAgents: string[];
  userContext: AutismUserContext;
}

interface AutismUserContext {
  sensoryPreferences: SensoryPreferences;
  routineImportance: 'low' | 'medium' | 'high' | 'critical';
  accessibilityNeeds: AccessibilityNeeds[];
  currentRoutineState: RoutineState;
}
```

## **Project Memory System**

**CRITICAL**: The `Project-Memory/` folder contains the complete project state, context, and historical decisions that inform all development work.

### **Mandatory Project Memory Consultation**

#### **Project Memory Integration Workflow**
```markdown
⚠️ BEFORE ANY DEVELOPMENT WORK:
1. Check `Project-Memory/project-overview.md` for current status and priorities
2. Review `Project-Memory/technical-architecture.md` for implementation constraints
3. Consult `Project-Memory/autism-community-design.md` for community requirements
4. Reference `Project-Memory/development-history.md` for context and decisions
5. Verify dependencies in `Project-Memory/dependencies-analysis.md`
```

### **Project Memory File Structure & Usage**

#### **Core Project Context**
- **`project-overview.md`** - **Current project status and mission**
  - **Usage**: Start here for any new work - contains current phase, completion status, priorities
  - **Key Info**: Feature completion status, development phases, community goals
  - **Current Status**: Phase 3.1 Complete (Tauri icon preparation), accessibility enhancement in progress

- **`technical-architecture.md`** - **Technology stack and implementation patterns**
  - **Usage**: Reference for all technical decisions and implementation approaches
  - **Key Info**: React/TypeScript patterns, component architecture, state management, Tauri desktop integration
  - **Critical Details**: Bun package manager usage, shadcn/ui integration, localStorage patterns

#### **Community-Centered Development Context**
- **`autism-community-design.md`** - **Autism community requirements and design principles**
  - **Usage**: All feature work must align with autism community needs documented here
  - **Key Info**: Sensory considerations, routine support requirements, accessibility standards
  - **Validation**: Every UI change must consider sensory impact and routine preservation

#### **Development Continuity**
- **`development-history.md`** - **Project evolution and significant milestones**
  - **Usage**: Understand why decisions were made and avoid repeating resolved issues
  - **Key Info**: Feature evolution, technical decisions, community feedback integration
  - **Context**: Provides background for current architecture and approach choices

- **`dependencies-analysis.md`** - **Package dependencies and technical constraints**
  - **Usage**: Reference before adding new dependencies or making package changes
  - **Key Info**: Current packages, version constraints, autism-friendly dependency choices
  - **Constraints**: Bun-first approach, accessibility-focused package selection

#### **Agent System Context**
- **`agent-framework-summary.md`** - **Agent system implementation and workflows**
  - **Usage**: Understand how agent coordination works and integration patterns
  - **Key Info**: Agent collaboration patterns, workflow implementation, community validation integration
  - **Integration**: How project memory and agent config systems work together

### **Project Memory Usage Patterns**

#### **For New Feature Development**
1. **Project Overview**: Verify feature aligns with current phase priorities
2. **Autism Community Design**: Ensure feature serves autism community needs
3. **Technical Architecture**: Follow established patterns and constraints
4. **Development History**: Learn from similar feature implementations

#### **For Bug Fixes and Issues**
1. **Development History**: Check if similar issues have been resolved before
2. **Technical Architecture**: Understand current implementation patterns
3. **Dependencies Analysis**: Verify if issue relates to package versions or constraints

#### **For Architecture Changes**
1. **Technical Architecture**: Understand current approach and reasoning
2. **Project Overview**: Ensure changes align with project goals and phase priorities
3. **Autism Community Design**: Validate changes don't disrupt autism-friendly principles
4. **Agent Framework**: Coordinate architectural changes through appropriate specialist agents

## **Comprehensive Agent System Usage Guide**

### **Complete Agent Ecosystem Overview**

The Autism Buddy Planner uses a sophisticated 11-agent specialist system coordinated by a central orchestrator. Each agent has specific expertise while maintaining autism community focus.

#### **Central Coordination (ALWAYS START HERE)**
- **`orchestrator.md`** - **PRIMARY ENTRY POINT FOR ALL WORK**
  - **Role**: Central routing, workflow coordination, agent management
  - **Usage**: MANDATORY first consultation for any development work
  - **Provides**: Task routing decisions, agent collaboration patterns, current project priorities
  - **Critical Function**: Ensures autism community needs guide all technical decisions

#### **Core Development Specialists**
- **`react-typescript-specialist.md`** - **Primary React/TypeScript implementation**
  - **Expertise**: Autism-friendly React component development, TypeScript reliability
  - **Current Focus**: Implementing accessibility enhancements in components
  - **Usage**: All React component work, TypeScript interface design, hooks implementation
  - **Collaboration**: Works with autism-support-specialist for community requirements

- **`debug-specialist.md`** - **Problem resolution and troubleshooting**
  - **Expertise**: Autism-sensitive debugging that preserves user routines
  - **Current Focus**: Supporting accessibility enhancement debugging
  - **Usage**: Bug investigation, error resolution, performance troubleshooting
  - **Special Consideration**: Ensures fixes don't disrupt established user routines

- **`test-specialist.md`** - **Testing strategy and comprehensive validation**
  - **Expertise**: Accessibility-first testing with autism community scenarios
  - **Current Focus**: Building testing infrastructure for accessibility features
  - **Usage**: Test planning, implementation, validation strategies
  - **Community Focus**: Tests must include autism community use cases

- **`documentation-specialist.md`** - **Technical and user documentation**
  - **Expertise**: Autism-friendly documentation with visual communication
  - **Current Focus**: Preparing accessibility feature documentation
  - **Usage**: Technical docs, user guides, API documentation
  - **Approach**: Clear, visual documentation that serves autism community needs

#### **Autism-Focused Domain Specialists (Community Voice)**
- **`autism-support-specialist.md`** - **Autism community advocacy and requirements**
  - **Expertise**: Direct autism community voice in all development decisions
  - **Current Focus**: Leading accessibility enhancement requirements gathering
  - **Usage**: Community needs assessment, accessibility requirements, user advocacy
  - **Authority**: Final say on autism community impact and benefit

- **`accessibility-specialist.md`** - **WCAG compliance and assistive technology support**
  - **Expertise**: Enhanced accessibility beyond standard compliance for autism needs
  - **Current Focus**: Implementing WCAG 2.1 AA+ with autism-specific enhancements
  - **Usage**: Accessibility audits, WCAG implementation, assistive technology support
  - **Standards**: WCAG 2.1 AA+ plus autism-specific accessibility requirements

- **`ux-ui-specialist.md`** - **Visual design and autism-friendly user experience**
  - **Expertise**: Sensory-friendly visual design with shadcn/ui integration
  - **Current Focus**: Visual accessibility enhancement implementation
  - **Usage**: UI design, visual hierarchy, sensory-friendly interface design
  - **Integration**: Works within shadcn/ui system while adding autism-friendly adaptations

- **`frontend-architecture-specialist.md`** - **Scalable React architecture planning**
  - **Expertise**: Autism-centered architecture for long-term community needs
  - **Current Focus**: Architecture support for accessibility feature infrastructure
  - **Usage**: Architecture decisions, scalability planning, technical strategy
  - **Focus**: Long-term architecture that serves growing autism community needs

#### **Quality and Performance Specialists**
- **`performance-engineering-specialist.md`** - **Optimization and smooth user experience**
  - **Expertise**: Anxiety-reducing performance optimization for autism community
  - **Current Focus**: Performance optimization during accessibility enhancement
  - **Usage**: Performance audits, optimization strategies, anxiety reduction through performance
  - **Principle**: Fast, reliable performance reduces anxiety for autism users

### **Agent Collaboration Decision Framework**

#### **Task Complexity Assessment**
```markdown
**Simple Tasks (1-2 agents)**:
- Single component modifications
- Bug fixes in existing code  
- Documentation updates
- Simple styling changes

**Medium Tasks (2-3 agents)**:
- New component development
- Accessibility enhancements
- Feature modifications
- Cross-component integrations

**Complex Tasks (3+ agents)**:
- New feature development
- Architecture changes
- Major accessibility implementations
- System-wide modifications
```

#### **Agent Selection Matrix**
```markdown
| Task Type | Primary Agent | Required Partners | Quality Validators |
|-----------|---------------|-------------------|-------------------|
| React Component Development | react-typescript-specialist | autism-support-specialist | ux-ui-specialist, accessibility-specialist |
| UI/Visual Changes | ux-ui-specialist | autism-support-specialist | accessibility-specialist |
| Accessibility Implementation | accessibility-specialist | autism-support-specialist | ux-ui-specialist |
| Bug Investigation | debug-specialist | [domain-specialist] | autism-support-specialist |
| Architecture Planning | frontend-architecture-specialist | autism-support-specialist | react-typescript-specialist |
| Testing Implementation | test-specialist | autism-support-specialist | accessibility-specialist |
| Performance Optimization | performance-engineering-specialist | autism-support-specialist | react-typescript-specialist |
| Documentation Creation | documentation-specialist | autism-support-specialist | ux-ui-specialist |
```

#### **Mandatory Collaboration Patterns**
```markdown
**ALWAYS Required Collaborations**:
- Any user-facing change → MUST include autism-support-specialist
- Any UI modification → MUST include accessibility-specialist  
- Any new component → MUST include ux-ui-specialist for design consistency
- Any React code → MUST include react-typescript-specialist for technical validation

**Community-Centered Quality Gates**:
- All features → autism-support-specialist approval required
- All UI changes → sensory impact assessment required
- All interactions → routine stability validation required
- All performance changes → anxiety impact assessment required
```

### **Practical Agent Usage Workflows**

#### **New Feature Development Workflow**
```markdown
1. **Orchestrator Consultation** (`orchestrator.md`)
   - Get task routing and agent assignments
   - Understand current project priorities
   - Identify required collaborations

2. **Community Requirements** (`autism-support-specialist.md`)
   - Define autism community needs
   - Establish acceptance criteria
   - Set community benefit goals

3. **Technical Implementation** 
   - Primary: `react-typescript-specialist.md` for React work
   - Support: `frontend-architecture-specialist.md` for architecture
   - Design: `ux-ui-specialist.md` for visual implementation

4. **Accessibility Integration** (`accessibility-specialist.md`)
   - WCAG compliance validation
   - Assistive technology support
   - Autism-specific accessibility enhancements

5. **Quality Validation**
   - `test-specialist.md` for comprehensive testing
   - `performance-engineering-specialist.md` for performance impact
   - Community impact validation through autism-support-specialist

6. **Documentation** (`documentation-specialist.md`)
   - Technical documentation updates
   - User guide enhancements
   - Accessibility feature documentation
```

#### **Bug Resolution Workflow**
```markdown
1. **Orchestrator Routing** (`orchestrator.md`)
   - Assess bug impact on autism community
   - Assign primary debugging agent
   - Coordinate emergency protocols if needed

2. **Problem Investigation** (`debug-specialist.md`)
   - Root cause analysis
   - Impact assessment on user routines
   - Resolution strategy development

3. **Domain Specialist Consultation**
   - Relevant technical specialist for implementation
   - `autism-support-specialist.md` for community impact
   - `accessibility-specialist.md` if accessibility-related

4. **Resolution Implementation**
   - Technical fix by appropriate specialist
   - Community impact validation
   - Routine stability preservation

5. **Quality Assurance**
   - Fix validation and testing
   - Performance impact assessment
   - Community benefit confirmation
```

#### **Accessibility Enhancement Workflow (Current Phase)**
```markdown
1. **Community Leadership** (`autism-support-specialist.md`)
   - Define accessibility enhancement requirements
   - Prioritize community benefit areas
   - Set autism-specific enhancement goals

2. **Technical Accessibility** (`accessibility-specialist.md`)
   - WCAG 2.1 AA+ implementation
   - Assistive technology optimization
   - Autism-specific accessibility features

3. **Visual Enhancement** (`ux-ui-specialist.md`)
   - Visual accessibility improvements
   - Sensory-friendly design enhancements
   - shadcn/ui integration for accessibility

4. **Implementation** (`react-typescript-specialist.md`)
   - Component accessibility enhancements
   - TypeScript accessibility interfaces
   - React accessibility patterns

5. **Quality Validation**
   - Accessibility testing and validation
   - Performance impact assessment
   - Community benefit measurement
```

### **Agent Integration Best Practices**

#### **Effective Agent Coordination**
- **Start with Orchestrator**: Never bypass the orchestrator for any development work
- **Include Community Voice**: autism-support-specialist must be involved in all user-facing changes
- **Validate Accessibility**: All UI changes require accessibility specialist review
- **Preserve Routines**: All changes must consider impact on established user routines
- **Quality Gates**: Use specialist validation as quality checkpoints, not afterthoughts

#### **Communication Patterns**
- **Clear Requirements**: Provide detailed context about autism community needs
- **Collaborative Decision-Making**: Include relevant specialists in decision processes
- **Continuous Validation**: Regular check-ins with community and accessibility specialists
- **Documentation**: Keep comprehensive records for future agent coordination

### **Current Phase Coordination (December 2025)**

#### **🎯 Active Priority: Accessibility Enhancement Implementation**

**Project Status Overview**:
- **Core Features**: ✅ Complete - Daily planner, task management, presets, scheduled events
- **Tauri Desktop Integration**: ✅ Phase 3.1 Complete - Icon design and preparation ready
- **Accessibility Enhancement**: 🔄 **CURRENT FOCUS** - WCAG 2.1 AA+ with autism-specific features
- **Testing Infrastructure**: 🔄 In Development - Accessibility-focused testing framework  
- **Documentation**: 📅 Next Phase - Community-friendly guides and technical documentation

**Lead Agent Coordination for Current Phase**:
1. **`autism-support-specialist.md`** - Community requirements leadership and advocacy
2. **`accessibility-specialist.md`** - Technical accessibility implementation (WCAG 2.1 AA+)  
3. **`ux-ui-specialist.md`** - Visual accessibility enhancement and sensory-friendly design
4. **`react-typescript-specialist.md`** - Component accessibility implementation

**Active Collaboration Pattern**:
```
Community Needs Assessment → Technical Requirements → Design Implementation → Code Development
(autism-support) → (accessibility) → (ux-ui) → (react-typescript)
```

**Current Phase Quality Gates**:
- **Community Benefit Validation**: All accessibility work must demonstrate clear autism community benefit
- **Sensory Impact Assessment**: Every UI change evaluated for sensory friendliness
- **WCAG Compliance Plus**: Standard accessibility plus autism-specific enhancements
- **Routine Preservation**: Accessibility improvements must not disrupt established user routines
- **Performance Impact**: Accessibility features must maintain anxiety-reducing fast performance

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
- `Agent-Config/orchestrator.md` - **START HERE ALWAYS** - Primary workflow coordinator
- `Agent-Config/agent-intersection-matrix.md` - Complete ecosystem overview and collaboration patterns
- `Agent-Config/agent-hooks.md` - Automatic integration system and lifecycle management
- `Agent-Config/AGENT_CONFIG_FRAMEWORK_GUIDE.md` - Framework adaptation and usage guide

### **Project Memory Reference Files**
- `Project-Memory/project-overview.md` - Current project status, features, and development phases
- `Project-Memory/technical-architecture.md` - Technology stack, patterns, and component analysis
- `Project-Memory/autism-community-design.md` - Autism community requirements and design principles
- `Project-Memory/development-history.md` - Project evolution and significant milestones
- `Project-Memory/dependencies-analysis.md` - Package dependencies and technical constraints
- `Project-Memory/agent-framework-summary.md` - Agent system implementation and workflows

## Common Gotchas

- **Package manager**: Always use `bun`, not `npm` or `yarn`
- **Agent coordination**: All work must route through `orchestrator.md` first - no independent agent work
- **Daily reset logic**: Essential - tasks must reset to preset at midnight for autism routine consistency
- **shadcn/ui updates**: Use `bunx shadcn@latest add [component]` to add components
- **Multi-agent workflows**: Complex features require coordination between multiple specialist agents
- **Accessibility-first**: All UI changes must consider autism community needs and sensory sensitivities
- **Hooks integration**: Agent hooks system automatically manages lifecycle, quality, and coordination
- **Community validation**: All development includes autism community impact assessment
- **Project memory consultation**: Always check current project status and constraints before starting work
- **Agent intersection patterns**: Use agent-intersection-matrix.md to understand collaboration requirements
- **Mandatory orchestrator routing**: No agent works independently - all tasks route through orchestrator first
- **Autism community authority**: autism-support-specialist has final authority on community benefit and impact
- **Quality gate enforcement**: Each specialist provides validation checkpoints, not optional reviews
- **Context preservation**: Agent hooks system maintains task context throughout entire workflow
- **Documentation requirements**: All significant changes require documentation specialist involvement

## Local Development Setup

```bash
git clone <repo-url>
cd autism-buddy-planner
bun install
bun run dev  # http://localhost:8080
```

The app will automatically load with default daily routine tasks and reset daily for consistent user experience.