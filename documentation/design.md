# Design Document: Ekalavya Learning Management System

## Overview
Ekalavya is a premium, full-stack web application designed to empower students through a centralized scholarship hub, skill-based mentoring, and peer-to-peer learning. It utilizes a **Vanilla JavaScript** frontend built with **Vite** and a **Supabase** backend. 

**Architectural Shift**: The platform has evolved from a single-page landing site to a **Modular Multi-View SPA**. This architecture uses a custom client-side router to swap feature modules into the main content area, providing a fast, app-like experience while keeping the landing page clean and professional.

---

## Architecture

```mermaid
graph TD
    subgraph Client (SPA Shell)
        A["Shell (index.html)"]
        R["Router (router.js)"]
        V["Views (src/views/*.js)"]
        B["Custom Store (State)"]
        C["Supabase JS Client"]
    end

    subgraph Backend (Supabase)
        E["Supabase Auth"]
        F["PostgreSQL (Relational DB)"]
        G["Supabase Storage"]
    end

    A --> R
    R -- Swaps Content --> V
    V <--> B
    V <--> C
    C -- Auth --> E
    C -- Queries --> F
```

### Component Responsibilities

| Component | Responsibility |
|---|---|
| **SPA Shell** | Persistent layout (Navbar, Footer, Background Orbs) and the `<main id="app-view">` mount point. |
| **Router** | Maps URL paths/hashes to specific View Modules. Handles navigation without page reloads. |
| **View Modules** | Logic and templates for specific pages (e.g., `ScholarshipView.js`). |
| **Custom Store** | Shared state across views (Auth status, User profile, Global settings). |
| **Supabase Client** | Data fetching for all views (Scholarships, Mentors, Library). |

---

## Page Structure & Flow

### 1. Home (Landing Page)
- **Purpose**: Conversion and onboarding.
- **Sections**: 
    - Hero (Value Prop)
    - Feature Summaries (Brief overview of what Ekalavya offers)
    - Team Carousel (Consistency & Community)
    - Call-to-Action (Join Now)

### 2. Scholarship Hub (`/scholarships`)
- **Purpose**: Browsing and filtered matching.
- **Components**: 
    - Search & Filter bar
    - Scholarship Grid (Verified/Matched tags)
    - Detail Side-pane

### 3. Mentoring Hub (`/mentors`)
- **Purpose**: Live session discovery and booking.
- **Components**: 
    - Session Calendar/List
    - Mentor Profile Cards
    - Enrollment progress indicators

### 4. Peer Connect (`/community`)
- **Purpose**: Social interaction and shared learning.
- **Components**: 
    - Active Group Chat feeds
    - Project Boards
    - Learn/Teach toggle

### 5. Academic Library (`/library`)
- **Purpose**: Resource management and offline access.
- **Components**: 
    - Document tree/grid
    - Category filters
    - Download/Offline status indicators

---

## Data Models (Consolidated)

*Refer to the SQL schema in previous iterations for table definitions (users, scholarships, mentoring_sessions, library_assets).*

---

## UI/UX Design tokens

| Token | Value |
|---|---|
| **Primary Theme** | Glassmorphism (Backdrop-filter: blur(25px)) |
| **Color: Ekalavya Black** | `#000000` (Main background) |
| **Color: Gold Gradient** | `linear-gradient(135deg, #f4c430 0%, #d4a017 100%)` |
| **Transitions** | Smooth view swaps (Fade & Slide) |
| **Navigation** | Persistent Pill-shaped Header |
