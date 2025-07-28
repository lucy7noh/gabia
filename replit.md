# Replit.md

## Overview

This is a mystical fortune-telling application called "솜라고동" that combines modern React frontend with Express.js backend. The app allows users to ask questions and receive mystical answers from a pre-defined list of 200+ Korean responses, resembling a magical conch shell experience. It features beautiful crystal ball animations, mystical purple UI theme, and includes image generation capabilities for sharing answers and creating talismans.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Animations**: Framer Motion for smooth animations and transitions
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: In-memory storage with MemStorage implementation
- **Response System**: Pre-defined list of 200+ mystical Korean answers with random selection
- **Daily Fortune**: Date-based deterministic fortune selection from curated list
- **Session Management**: In-memory storage for Q&A pairs
- **Development**: Hot reload with Vite integration

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Answers Table**: Stores questions, AI-generated answers, timestamps, and optional user associations
- **Database Migrations**: Managed through Drizzle Kit

### Core Features
1. **Question Submission**: Users can ask questions through a mystical interface
2. **Random Answer Generation**: System selects from 200+ pre-defined mystical Korean answers
3. **Answer Storage**: All Q&A pairs are saved with timestamps in memory
4. **Instant Fortune**: Creative fortune generation with randomized components
5. **Image Generation**: Canvas-based image creation for answer sharing and talisman creation
6. **Answer Sharing**: SNS sharing and image download functionality

### UI Components
- **Crystal Ball**: 3D-styled mystical orb with realistic reflections, base, and multi-layered smoke/particle effects
- **Question Form**: Glass-morphism input form with validation and animation triggers
- **Answer Display**: Formatted display with image generation, SNS sharing, and talisman creation buttons
- **Floating Particles**: Background animation for mystical atmosphere
- **Instant Fortune**: Single feature for creative real-time fortune generation

## Data Flow

1. **User Input**: Questions submitted through the QuestionForm component
2. **API Processing**: Express server validates input and selects random answer from pre-defined list
3. **Answer Generation**: System randomly selects from 200+ mystical Korean responses with simulated delay
4. **Data Storage**: Q&A pairs stored in memory via MemStorage implementation
5. **Response Delivery**: Formatted answers returned to frontend with crystal ball animations
6. **Image Generation**: Canvas-based image creation for sharing and talisman features

## External Dependencies

### Core Dependencies
- **In-Memory Storage**: MemStorage implementation for fast Q&A storage
- **Canvas API**: Browser-native image generation for sharing and talismans
- **TanStack Query**: Server state management and caching
- **Framer Motion**: Animation library for smooth transitions and particle effects

### UI Dependencies
- **shadcn/ui**: Pre-built accessible components
- **Radix UI**: Primitive components for complex UI patterns
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reload**: Integrated Vite middleware for seamless development
- **Environment Variables**: OpenAI API key and database URL configuration

### Production Build
- **Frontend**: Vite builds optimized React bundle
- **Backend**: esbuild compiles Express server to single file
- **Database**: Drizzle migrations ensure schema consistency
- **Static Assets**: Served through Express with proper caching

### Database Management
- **Schema Changes**: Managed through Drizzle Kit migrations
- **Connection**: Environment-based DATABASE_URL configuration
- **Scalability**: Serverless PostgreSQL allows automatic scaling

### Key Environment Variables
- `NODE_ENV`: Environment mode (development/production)

## Recent Changes (July 2025)

### Major Updates
- **Removed OpenAI Dependency**: Replaced AI-generated responses with curated list of 200+ mystical Korean answers
- **Enhanced Crystal Ball**: Upgraded from simple orb to realistic 3D crystal ball with base and star decoration
- **Advanced Smoke Effects**: Multi-layered purple smoke with particles, wisps, and sparkling effects
- **Image Generation Features**: Added Canvas-based image creation for answer sharing and talisman generation
- **UI Simplification**: Reduced to single "Instant Fortune" feature, removed daily fortune and saved answers tabs
- **Improved Animations**: Enhanced shake, glow, smoke, and explosion sequences for more dramatic effect

### Technical Improvements
- **Memory Storage**: Simplified storage using in-memory MemStorage for faster performance
- **Answer Curation**: Hand-selected 200+ mystical Korean responses covering various life situations
- **Fortune Generation**: Creative instant fortune system combining random elements (time + subject + prediction)
- **Canvas Integration**: Browser-native image generation without external dependencies
- **Mobile Optimization**: Responsive design improvements for crystal ball and animations

### User Experience
- **Faster Response Time**: Eliminated API calls for instant answer delivery
- **Visual Appeal**: More realistic crystal ball appearance with proper lighting and reflections  
- **Share Functions**: Direct image download and SNS sharing capabilities
- **Talisman Creation**: Custom talisman image generation with traditional Korean design elements

The application is designed to be easily deployable on platforms like Replit, with all necessary configuration files and a clear separation between development and production environments.