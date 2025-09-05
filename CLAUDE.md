# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based CV/Resume presentation application built with Vite, TypeScript, and shadcn/ui components. The application creates an interactive slide-based presentation format for displaying professional CV information.

## Current State (Post-Optimization)

- **Cleaned codebase**: Reduced from 80+ to ~15 essential files
- **8 presentation slides** with professional content
- **Clean mode** for distraction-free viewing
- **Responsive design** with Tailwind CSS
- **PDF export** capability via Playwright

## Core Commands

```bash
# Development
npm run dev        # Start development server (Vite) on http://localhost:5173

# Building
npm run build      # Production build
npm run build:dev  # Development build

# Quality checks
npm run lint       # Run ESLint

# Preview production build
npm run preview    # Preview built application
```

## Architecture

### Application Structure

The app follows a presentation-based architecture with:

1. **Slide System**: Individual CV sections as slides (`src/components/slides/`)
   - Navigation controlled via keyboard (arrow keys, space, Home/End) or UI buttons
   - Each slide is a self-contained component

2. **State Management**: 
   - `DevModeContext` provides global content management and editing capabilities
   - Content is persisted to localStorage for data retention
   - Supports import/export of CV data as JSON

3. **Component Organization**:
   - `/components/ui/` - shadcn/ui base components (pre-built, rarely need modification)
   - `/components/slides/` - Individual presentation slides
   - `/components/` - App-specific components (CVPresentation, EditableText, etc.)

### Key Features

- **Dev Mode**: Toggle editing capabilities for real-time content updates
- **Clean Mode**: Hide all UI controls for distraction-free presentation
- **Interactive Publications**: Special component for displaying and managing publication lists
- **Responsive Design**: Mobile-aware with `use-mobile` hook

### Data Flow

1. Content stored in `DevModeContext` with default values from `lib/publications-data.ts`
2. Components consume context via `useDevMode()` hook
3. Editable components update context which persists to localStorage
4. Export/import functionality allows data portability

## Important Patterns

- All slides should extend from a consistent container pattern using `SlideContainer`
- Editable fields use `EditableText` or `EditableSelect` components
- Navigation state managed in parent `CVPresentation` component
- Dev toolbar provides content management (import/export/reset)

## Tech Stack Reference

- **Build**: Vite 5.4
- **Framework**: React 18.3 with TypeScript 5.8
- **Routing**: React Router DOM 6.30
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 3.4 with tailwindcss-animate
- **State**: React Context API
- **Forms**: React Hook Form with Zod validation