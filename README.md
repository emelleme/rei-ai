
# REI Connect - Real Estate Student Chat Platform

A modern, high-performance React Native chat application built specifically for real estate students, designed to create a focused learning environment where students can collaborate, study together, and access AI-powered assistance.

## 🎯 Application Overview

REI Connect is a native mobile chat platform that eliminates distractions and keeps real estate students locked in on their studies. Built with performance and simplicity in mind, it provides essential communication tools without the frills - just pure focus on learning.

## 🏗️ Technical Architecture

### Frontend Stack
- **React Native** with **Expo** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Native UI Library (RNUI)** - Native-feeling UI components
- **NativeWind** - Tailwind CSS for React Native styling
- **Expo Router** - File-based navigation
- **Zustand** - Lightweight state management
- **React Query** - Server state management

### Backend & Real-time Infrastructure
- **Neon Database** (PostgreSQL) - Persistent data storage
- **Ably** - Real-time messaging and presence
- **Node.js** environment on Replit

### Design System
- **Typography**: Poppins font family (Light, Regular, Medium, SemiBold)
- **Color Scheme**: Minimal black and white with strategic gray accents
- **Spacing**: Consistent 24px page margins, 16px card padding
- **UI Philosophy**: Clean, native iOS/Android feel with zero visual distractions

## 🚀 Core Features

### 1. Main Hall (Global Chat)
- **Purpose**: Central communication hub for all students
- **Features**: 
  - Real-time message broadcasting
  - Clean message bubbles with user attribution
  - Minimal, distraction-free interface
  - Timestamp tracking

### 2. Study Rooms
- **Purpose**: Topic-specific discussion spaces
- **Features**:
  - Create and join specialized chat rooms
  - Room-based message threading
  - Member presence indicators
  - Dynamic room discovery

### 3. AI Assistant
- **Purpose**: 24/7 study companion for real estate concepts
- **Features**:
  - Contextual real estate knowledge base
  - Study guidance and explanations
  - Interactive Q&A format
  - Conversation history

### 4. User Profiles
- **Purpose**: Student identity and progress tracking
- **Features**:
  - Profile customization
  - Study progress indicators
  - Bio and location information
  - Avatar management

## 📱 User Experience

### Navigation
- **Tab-based architecture** with 4 main sections
- **Phosphor Icons** for consistent, thin-weight iconography
- **Native haptic feedback** on interactions
- **Platform-adaptive styling** (iOS/Android)

### Performance Optimizations
- **Zustand** for minimal re-renders
- **React Query** for efficient server state caching
- **FlatList** for optimized message rendering
- **Lazy loading** for chat history

### Real-time Features
- **Live message delivery** via Ably channels
- **Presence detection** showing online users
- **Typing indicators** (planned)
- **Message read receipts** (planned)

## 🗄️ Database Schema

### Users Table
```sql
- id (UUID, Primary Key)
- email (String, Unique)
- name (String)
- avatar_url (String, Optional)
- bio (Text, Optional)
- location (String, Optional)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Chat Rooms Table
```sql
- id (UUID, Primary Key)
- name (String)
- description (Text, Optional)
- type (String) - 'public', 'private', 'study_group'
- created_by (UUID, Foreign Key to Users)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Messages Table
```sql
- id (UUID, Primary Key)
- content (Text)
- user_id (UUID, Foreign Key to Users)
- room_id (UUID, Foreign Key to Chat Rooms, Optional)
- message_type (String) - 'text', 'image', 'file'
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Room Members Table
```sql
- user_id (UUID, Foreign Key to Users)
- room_id (UUID, Foreign Key to Chat Rooms)
- joined_at (Timestamp)
- role (String) - 'member', 'moderator', 'admin'
```

## 🔄 Real-time Architecture

### Ably Integration
- **Chat Channels**: `chat:${roomId}` for message broadcasting
- **Presence Channels**: `presence:${roomId}` for online user tracking
- **Event Types**: 'message', 'user_enter', 'user_leave', 'typing'

### State Management Flow
1. **User Authentication** → Zustand Auth Store
2. **Message Sending** → Ably Publish → Database Write
3. **Message Receiving** → Ably Subscribe → Zustand Chat Store
4. **Presence Updates** → Ably Presence → UI Updates

## 🎨 Design Philosophy

### Minimalist Approach
- **Zero visual clutter** to maintain study focus
- **Monochromatic color scheme** with strategic gray accents
- **Typography hierarchy** using Poppins font weights
- **Generous whitespace** for mental clarity

### Native Feel
- **Platform-specific adaptations** for iOS and Android
- **Native interaction patterns** (swipe, tap, long-press)
- **Haptic feedback** for user actions
- **System font fallbacks** for accessibility

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Environment Variables
```bash
DATABASE_URL=postgresql://neondb_owner:npg_WGuNt9TcX8FC@ep-muddy-glade-a8xuhmv4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require
ABLY_API_KEY=Y-_Gcg.jDZf0A:CPfE7XiFg-VJCODzSXshZX5BqSz6GPuPMwfsatteiDQ
```

### Installation & Running
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run android  # Android emulator
npm run ios      # iOS simulator  
npm run web      # Web browser
```

### Testing on Device
- **Expo Go**: Scan QR code from terminal
- **Development Build**: For full native features
- **Web Preview**: Available at localhost:8081

## 📂 Project Structure

```
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication flow
│   ├── (tabs)/            # Main tab navigation
│   │   ├── rooms/         # Chat rooms section
│   │   ├── index.tsx      # Main Hall
│   │   ├── ai.tsx         # AI Assistant
│   │   └── profile.tsx    # User Profile
│   └── _layout.tsx        # Root layout
├── lib/                   # Core utilities
│   ├── services/          # Database operations
│   ├── ably.ts           # Real-time configuration
│   ├── database.ts       # Database connection
│   └── ui-config.ts      # RNUI configuration
├── store/                 # Zustand state stores
│   ├── auth.ts           # Authentication state
│   └── chat.ts           # Chat state & real-time
├── hooks/                 # Custom React hooks
└── components/            # Reusable UI components
```

## 🎯 Target Users

### Primary Audience
- **Real estate students** preparing for licensing exams
- **Study groups** collaborating on coursework
- **Educators** facilitating student discussions
- **Professional development** learners in real estate

### Use Cases
- **Study session coordination** 
- **Quick concept clarification**
- **Peer-to-peer learning**
- **AI-assisted studying**
- **Progress sharing and motivation**

## 🚀 Deployment

The application is hosted on **Replit** with:
- **Automatic deployments** from the main branch
- **Environment variable management** via Replit Secrets
- **Expo development server** accessible via QR code
- **Web preview** available for quick testing

## 🔮 Future Enhancements

### Short-term Roadmap
- **Message reactions** and emoji responses
- **File sharing** for study materials
- **Voice messages** for complex explanations
- **Message search** and filtering
- **Push notifications** for important updates

### Long-term Vision
- **Study streak tracking** and gamification
- **Integration with exam prep platforms**
- **Mentor matching** system
- **Video call integration** for study sessions
- **Analytics dashboard** for study progress

---

Built with ❤️ for real estate students who are locked in and ready to succeed.
