# Autism Buddy Planner

> **Creating technology that adapts to autism spectrum needs, not the other way around.**

A React/TypeScript web and desktop application designed to provide autism-friendly daily routine management through visual, structured, and calming interfaces. Built with accessibility-first principles and neurodiversity-affirming design.

## 🎯 Project Mission

Autism Buddy Planner serves the autism community's unique needs for predictable, customizable daily planning tools that reduce anxiety and support routine adherence. Our technology adapts to users rather than requiring users to adapt to technology constraints.

## ✨ Key Features

### 🗓️ Daily Routine Management
- **Time-Based Organization**: Morning, Afternoon, and Evening task sections
- **Visual Task Cards**: Large emoji icons with clear, accessible typography  
- **Task Completion Tracking**: Visual feedback for completed tasks
- **Daily Reset Logic**: Automatic daily routine refresh functionality

### 📋 Preset Systems
- **Routine Templates**: Pre-configured task sets for common daily routines
- **Customizable Presets**: User-defined routine templates for personalization
- **Quick Application**: One-click preset application to current day

### 📅 Scheduled Events
- **Event Management**: Time-specific event scheduling and tracking
- **Integration**: Seamless integration with daily task workflow
- **Visual Indicators**: Clear event representation within daily view

### ♿ Autism-Specific Design
- **Sensory-Friendly Interface**: Reduced visual clutter and calming color schemes
- **Predictable Navigation**: Consistent UI patterns and interaction models
- **Customization Options**: Flexible interface adaptation to individual preferences
- **Routine Preservation**: Design choices that support established routines

## 🚀 Technology Stack

### Frontend
- **React 18.3.1** - Modern functional components with hooks
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Fast development and optimized production builds

### UI Framework & Styling
- **shadcn/ui** - Comprehensive, accessible component library
- **Tailwind CSS** - Utility-first styling with autism-friendly customization
- **Radix UI** - Accessibility-first component foundations
- **Lucide React** - Consistent iconography system

### Desktop App (✅ Production Ready)
- **Tauri v2.9.6** - Cross-platform desktop framework with Rust backend
- **Custom Branding** - Autism-friendly app icon and visual identity
- **Security Implementation** - Local-only data storage, minimal permissions
- **Performance Optimized** - Rust build optimizations for fast, reliable performance

### Development Tools
- **Bun** - Fast package manager and runtime (use `bun`, not npm/yarn)
- **ESLint** - Code quality and consistency
- **Agent Framework** - 11 specialist AI agents for coordinated development

## 💻 Development Setup

### Prerequisites
- **Bun** (latest version)
- **Rust** (for desktop app development)
- **VS Code** (recommended with rust-analyzer extension)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd autism-buddy-planner

# Install dependencies (use Bun, not npm/yarn)
bun install

# Start development server
bun run dev
```

### Available Commands

```bash
# Web Development
bun run dev          # Start web development server (http://localhost:8080)
bun run build        # Build for production
bun run preview      # Preview production build
bun run lint         # Run ESLint

# Desktop App Development
bun run tauri:dev    # Start desktop app in development mode
bun run tauri:build  # Build desktop app for production
```

## 📊 Development Status

### ✅ Completed (December 2025)
- **Core Features**: Daily planner, task management, presets, scheduled events
- **UI Framework**: Complete shadcn/ui + Tailwind CSS implementation
- **Data Management**: Local storage with daily reset functionality
- **Desktop App**: Production-ready Tauri integration with custom branding
- **Agent Framework**: 11 specialist agents for coordinated development
- **Security**: Comprehensive privacy-focused security implementation

### 🔄 In Progress
- **Accessibility Enhancement**: WCAG 2.1 AA+ implementation with autism-specific features
- **Testing Infrastructure**: Comprehensive test suite with accessibility scenarios

### 📅 Upcoming
- **Documentation**: User guides and technical documentation
- **Performance Optimization**: Anxiety-reducing performance enhancements

## 🎨 Design Principles

### Technology Adapts to Users
- Flexible interface customization options
- Multiple interaction modalities  
- Individual sensory preference accommodation
- Preserved user autonomy and control

### Neurodiversity-Affirming
- Autism-specific feature development
- Community input integration in design decisions
- Strength-based interface design
- Individual preference prioritization

### Routine Support
- Consistent navigation and interaction models
- Routine preservation during updates
- Predictable interface behavior
- Stable visual and functional patterns

## 🤝 AI Agent Framework

This project uses a sophisticated 11-agent specialist system coordinated by a central orchestrator:

### Core Development Agents
- **React/TypeScript Specialist** - Primary implementation
- **Debug Specialist** - Problem resolution and troubleshooting  
- **Test Specialist** - Testing strategy and implementation
- **Documentation Specialist** - Technical and user documentation

### Autism-Focused Specialists  
- **Autism Support Specialist** - Community advocacy and requirements
- **Accessibility Specialist** - WCAG compliance and assistive technology
- **UX/UI Specialist** - Visual design and user experience
- **Frontend Architecture Specialist** - Scalable architecture planning

### Quality & Performance
- **Performance Engineering Specialist** - Optimization and smooth UX
- **Component Quality Specialist** - shadcn/ui integration consistency
- **Security Reviewer** - Data privacy and local storage security

All development follows **orchestrator-first** coordination through `Agent-Config/orchestrator.md`.

## 📁 Project Structure

```
autism-buddy-planner/
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks  
│   ├── lib/                # Utility functions
│   └── pages/              # Page components
├── src-tauri/              # Desktop app backend (Rust)
├── Agent-Config/           # AI agent coordination system
├── Project-Memory/         # Project context and history
├── Project-Documentation/  # Technical documentation
└── public/                # Static assets
```

## 🔒 Security & Privacy

- **Local-Only Data Storage** - No external data transmission
- **Minimal Permissions** - Desktop app uses capabilities-based security
- **Content Security Policy** - Comprehensive CSP implementation
- **Privacy-First Design** - Autism community data protection

## 📚 Documentation

- **Agent Framework**: See `Agent-Config/` for development coordination system
- **Project Memory**: See `Project-Memory/` for project context and decisions
- **Security Implementation**: See `Project-Documentation/TAURI_SECURITY_IMPLEMENTATION.md`

## 🌟 Community-Centered Development

This project prioritizes autism community needs in all development decisions. Features are developed through community input, accessibility-first design, and neurodiversity-affirming principles.

**Contributing**: All contributions are coordinated through the agent framework system to ensure autism community benefit and accessibility compliance.

## 📄 License

This project is dedicated to serving the autism community with open, accessible technology.
