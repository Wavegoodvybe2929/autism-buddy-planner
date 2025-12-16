# Autism Buddy Planner

> **Creating technology that adapts to autism spectrum needs, not the other way around.**

A **production-ready** React/TypeScript web and desktop application designed to provide autism-friendly daily routine management through visual, structured, and calming interfaces. Built with accessibility-first principles and neurodiversity-affirming design.

**🎉 Status: Production Ready** - All core features complete with desktop app distribution ready.

## 🎯 Project Mission

Autism Buddy Planner serves the autism community's unique needs for predictable, customizable daily planning tools that reduce anxiety and support routine adherence. Our technology adapts to users rather than requiring users to adapt to technology constraints.

## ✨ Key Features

### 🗓️ Daily Routine Management
- **Time-Based Organization**: Morning, Afternoon, and Evening task sections with clear visual separation
- **Visual Task Cards**: Large emoji icons with accessible typography and high-contrast design
- **Task Completion Tracking**: Immediate visual feedback with autism-friendly completion indicators
- **Daily Reset Logic**: Automatic daily routine refresh functionality that preserves routine consistency

### 📋 Comprehensive Preset Systems
- **Routine Templates**: Pre-configured task sets for common daily routines with autism community input
- **Customizable Presets**: User-defined routine templates for complete personalization
- **Quick Application**: One-click preset application to current day with smooth transitions
- **Preset Management**: Advanced preset creation, editing, and organization tools

### 📅 Advanced Scheduled Events with TBD Support
- **✅ Complete TBD (To Be Determined) Event Support**: Revolutionary feature for uncertain dates and times
- **Multi-Category Organization**: 
  - **Scheduled Events**: Confirmed date and time
  - **Time TBD**: Known date, uncertain time
  - **Date TBD**: Known event, uncertain date
  - **Completely TBD**: Important events with full uncertainty
- **Event Management**: Comprehensive time-specific event scheduling and tracking
- **Visual Categorization**: Color-coded event sections with autism-friendly visual hierarchy
- **Seamless Integration**: Full integration with daily task workflow
- **Edit Functionality**: Complete TBD toggle support with conditional form fields

### 🛠️ Comprehensive Routine Editor
- **Unified Management**: Single interface for all routine editing through comprehensive modal editor
- **Task Organization**: Visual task management with drag-and-drop and time-based categorization
- **Event Integration**: Complete scheduled events management within routine editor
- **Advanced Preset Tools**: Preset creation, editing, application, and organization
- **Data Safety**: Automatic backup history with restore points and unsaved changes protection
- **Import/Export**: Complete routine data portability for backup and sharing

### ♿ Autism-Specific Design Excellence
- **Sensory-Friendly Interface**: Carefully designed color schemes and reduced visual clutter
- **Predictable Navigation**: Consistent UI patterns and interaction models throughout
- **Customization Options**: Flexible interface adaptation to individual sensory preferences
- **Routine Preservation**: Design choices that support rather than disrupt established routines
- **WCAG 2.1 AA+ Compliance**: Enhanced accessibility with autism-specific considerations

## 🖥️ Desktop App (Production Ready)

### ✅ Fully Functional Desktop Application
- **Cross-Platform Support**: Native desktop apps for macOS, Windows, and Linux
- **Production Distribution**: Ready-to-install .dmg for macOS (4.5MB optimized build)
- **Custom Branding**: Autism-friendly app icon and visual identity throughout
- **Local Data Storage**: Complete privacy with local-only data management
- **Performance Optimized**: Rust backend with anxiety-reducing fast performance

### 🔒 Security & Privacy Excellence
- **Local-Only Storage**: Zero external data transmission for complete privacy
- **Minimal Permissions**: Capabilities-based security with autism community privacy focus
- **Content Security Policy**: Comprehensive CSP implementation
- **Privacy-First Design**: Autism community data protection as primary concern

## 🚀 Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern functional components with hooks-based architecture
- **TypeScript** - Complete type safety and enhanced developer experience
- **Vite** - Lightning-fast development and optimized production builds

### UI Framework & Design
- **shadcn/ui** - Comprehensive, accessibility-first component library
- **Tailwind CSS** - Utility-first styling with autism-friendly customization
- **Radix UI Primitives** - Accessibility-first component foundations throughout
- **Lucide React** - Consistent, readable iconography system

### Desktop App Technology
- **Tauri v2.9.6** - Cross-platform desktop framework with Rust v1.90.0 backend
- **Production Build Pipeline** - Complete development and release build verification
- **Custom Icon System** - Multi-platform icon generation for all platforms
- **Security Implementation** - Comprehensive Tauri v2 security with minimal permissions

### State Management & Data
- **React Hooks** - Simple, reliable useState and useEffect patterns
- **Local Storage** - Autism-friendly persistent storage with daily reset logic
- **Custom Hooks** - Specialized hooks for routine management and real-time updates
- **No External Dependencies** - Intentionally simple architecture for maximum reliability

### Development Tools & Workflow
- **Bun v1.3.4** - Fast package management and runtime (all commands use `bun`)
- **ESLint** - Code quality and consistency enforcement
- **11-Agent AI Framework** - Sophisticated agent coordination system for development
- **VS Code Integration** - Complete development environment with rust-analyzer

## 💻 Development & Installation

### Prerequisites
- **Bun** (latest version) - Package manager and runtime
- **Rust v1.90.0+** (for desktop app development)
- **VS Code** (recommended with rust-analyzer extension)

### Quick Start

```bash
# Clone and install
git clone <repository-url>
cd autism-buddy-planner
bun install

# Web development
bun run dev          # Start web app (http://localhost:8080)

# Desktop app development  
bun run tauri:dev    # Start desktop app in development
bun run tauri:build  # Build production desktop app
```

### Available Commands

```bash
# Web Application
bun run dev          # Development server (port 8080)
bun run build        # Production web build
bun run preview      # Preview production build
bun run lint         # Code quality check

# Desktop Application
bun run tauri:dev    # Development desktop app
bun run tauri:build  # Production desktop build (.dmg, .exe, .AppImage)
bun run tauri:icon   # Generate platform-specific icons
```

## 📊 Development Status (December 2025)

### ✅ Production Complete
- **✅ Core Features**: Daily planner, task management, presets, scheduled events
- **✅ TBD Events Feature**: Complete implementation with multi-category support
- **✅ Desktop App**: Production-ready Tauri integration (Phase 6 Complete)
- **✅ Custom Branding**: Complete app icon and visual identity implementation
- **✅ Security Implementation**: Comprehensive privacy-focused security
- **✅ UI Framework**: Complete shadcn/ui + Tailwind CSS implementation
- **✅ Data Management**: Robust localStorage with daily reset functionality
- **✅ Routine Editor**: Comprehensive routine management with backup/restore
- **✅ Agent Framework**: 11 specialist agents for coordinated development

### 🎯 Ready for Distribution
- **✅ Production Build Verified**: Complete testing of development and production builds
- **✅ Desktop Installation**: Successfully tested .dmg installer deployment  
- **✅ Performance Optimized**: Rust optimizations for anxiety-reducing performance
- **✅ Accessibility Excellence**: WCAG 2.1 AA+ with autism-specific enhancements

### 📚 Documentation Complete
- **✅ Agent Framework Documentation**: Complete 11-agent coordination system
- **✅ Project Memory System**: Living documentation of project evolution
- **✅ Security Documentation**: Comprehensive Tauri security implementation
- **✅ Technical Architecture**: Complete technology stack documentation

## 🎨 Design Philosophy

### Technology Adapts to Users
- **Flexible Customization**: Multiple interface adaptation options for individual needs
- **Sensory Accommodation**: Visual and interaction design for sensory preferences
- **User Autonomy**: Complete control over interface behavior and data
- **Predictable Experience**: Consistent patterns that build user confidence

### Neurodiversity-Affirming Design
- **Autism-Centered Development**: Features developed with direct autism community input
- **Strength-Based Interface**: Design that leverages autism strengths and patterns
- **Individual Preference Support**: Interface adapts to users rather than requiring adaptation
- **Community-Driven Decisions**: Design choices guided by autism community advocacy

### Routine Support Excellence
- **Routine Preservation**: Updates and changes designed to maintain established routines
- **Predictable Behavior**: Interface behavior that reduces anxiety through consistency
- **Visual Stability**: Stable visual patterns and layouts users can depend on
- **Change Management**: Careful introduction of new features with routine preservation

## 🤝 AI Agent Development Framework

This project pioneered a sophisticated **11-agent specialist system** coordinated by a central orchestrator:

### Coordination & Management
- **Orchestrator** - Central workflow coordination and project management
- **Documentation Specialist** - Technical and user documentation excellence
- **Debug Specialist** - Autism-sensitive problem resolution and troubleshooting

### Autism-Focused Development
- **Autism Support Specialist** - Community advocacy and requirements leadership
- **Accessibility Specialist** - WCAG 2.1 AA+ compliance with autism-specific features
- **UX/UI Specialist** - Sensory-friendly visual design and user experience

### Technical Implementation  
- **React/TypeScript Specialist** - Primary implementation with autism-friendly patterns
- **Frontend Architecture Specialist** - Scalable architecture for community growth
- **Performance Engineering Specialist** - Anxiety-reducing optimization strategies

### Quality & Integration
- **Test Specialist** - Comprehensive testing with accessibility and autism scenarios  
- **Component Quality Specialist** - shadcn/ui integration and consistency

**Workflow**: All development follows **orchestrator-first** coordination with autism community needs as the primary driver.

## 📁 Project Architecture

```
autism-buddy-planner/
├── src/
│   ├── components/          # React components with autism-friendly patterns
│   │   ├── ui/             # shadcn/ui components (generated, don't edit)
│   │   ├── DayPlanner.tsx  # Main 370+ line orchestrator component
│   │   ├── RoutineEditor.tsx # Comprehensive routine management
│   │   └── ...             # Event management, presets, task cards
│   ├── hooks/              # Custom React hooks for state management
│   ├── lib/                # Utility functions and event management
│   ├── types/              # TypeScript interfaces and type definitions
│   └── pages/              # Page components and routing
├── src-tauri/              # Desktop app Rust backend (production ready)
├── Agent-Config/           # 11-agent AI coordination system
├── Project-Memory/         # Living project documentation and context
├── Project-Documentation/  # Technical documentation and guides
├── Completed-Todos/        # Record of completed development phases
└── public/                # Static assets and icons
```

## 🌟 Community Impact & Recognition

### Autism Community Focus
- **Community-Driven Development**: Every feature developed with autism community input and validation
- **Accessibility Leadership**: Beyond WCAG compliance with autism-specific accessibility innovations
- **Neurodiversity Advocacy**: Technology that affirms and supports neurodivergent patterns
- **Privacy Commitment**: Local-only storage respects autism community privacy concerns

### Technical Innovation
- **Agent-Coordinated Development**: Pioneering multi-agent AI development coordination
- **Desktop-Web Hybrid**: Seamless cross-platform experience with native performance
- **TBD Event Management**: Revolutionary approach to uncertainty in planning tools
- **Autism-Centered Architecture**: Technical decisions guided by community needs

## 📝 Contributing

All development is coordinated through the sophisticated agent framework system to ensure:
- **Autism community benefit** assessment for all changes
- **Accessibility compliance** throughout development process
- **Routine stability** preservation during updates
- **Community advocacy** in all technical decisions

See `Agent-Config/orchestrator.md` for development coordination guidelines.

## 📄 License

This project is dedicated to serving the autism community with open, accessible technology that respects individual needs and promotes neurodiversity acceptance.

---

**Ready for Production Use** - All features complete, tested, and optimized for the autism community.
