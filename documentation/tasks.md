# Tasks: Ekalavya Multi-View Refactoring

## Phase 10: Multi-View SPA Refactoring [✓]

## Phase 15: Workspace Refactoring [✓]
- [✓] **15.1 Directory Structure Setup**
    - [✓] Create `src/core`, `src/services`, `src/modules`, and `src/assets/styles`.
- [✓] **15.2 File Reorganization**
    - [✓] Move core utilities (`supabase.js`, `router.js`, etc.) to `src/core/`.
    - [✓] Move service modules (`auth.js`, `api.js`, etc.) to `src/services/`.
    - [✓] Move UI modules (`renderers.js`, `portfolio.js`, etc.) to `src/modules/`.
    - [✓] Move global styles to `src/assets/styles/`.
- [✓] **15.3 Dependency & Import Fixing**
    - [✓] Update all import paths across all views and modules.
    - [✓] Fix broken dependencies (e.g., exposing `supabase` in `authManager`).
    - [✓] Resolve 500 errors in `LibraryView` caused by dynamic imports.
- [✓] **15.4 Verification & Cleanup**
    - [✓] Verify all core features (Auth, Navigation, Hubs) are functional.
    - [✓] Commit and push changes to GitHub.

- [✓] **10.1 Shell & Router Setup**
    - [✓] Create `index.html` shell: Remove feature sections and add `<main id="app-view"></main>`.
    - [✓] Create `src/router.js`: Implement a simple hash-based or history-based router.
    - [✓] Update Navbar: Ensure all links point to the new routes.
- [✓] **10.2 View Module Implementation**
    - [✓] Create `src/views/HomeView.js`: Move hero and landing elements here.
    - [✓] Create `src/views/ScholarshipView.js`: Move scholarship grid and logic here.
    - [✓] Create `src/views/MentorView.js`: Move mentoring sessions and logic here.
    - [✓] Create `src/views/CommunityView.js`: Move community/peer-connect logic here.
    - [✓] Create `src/views/LibraryView.js`: Move library/resource logic here.
- [✓] **10.3 Integration & State Sharing**
    - [✓] Refactor `main.js`: Initialize the router and handle initial view rendering.
    - [✓] Update `renderers.js`: Adapt rendering functions to target the active view container.
    - [✓] Ensure Auth state persists across view transitions.
- [✓] **10.4 Animations & Polish**
    - [✓] Implement smooth CSS transitions between views.
    - [✓] Fix navigation highlighting (active class) for the new router.
    - [✓] Verify PWA caching for all new view modules.

## Phase 11: Feature Interactivity [✓]
- [✓] **11.1 Enhanced API Utility**
    - [✓] Add writing capabilities (create, update, delete) to `api.js`.
- [✓] **11.2 Portfolio View Migration**
    - [✓] Create `PortfolioView.js` as a standard SPA view.
    - [✓] Update `router.js` to handle dynamic routes (`#/portfolio/:id`).
    - [✓] Update `main.js` to redirect legacy query links to new hash routes.
- [✓] **11.3 Application & Enrollment Logic**
    - [✓] Implement Scholarship Application flow in `ScholarshipView.js`.
    - [✓] Implement Mentoring Enrollment logic in `MentorView.js` (with capacity checks).
    - [✓] Add real-time UI feedback for user actions.

## Phase 12: User Dashboard & Profile [✓]
- [✓] **12.1 Dashboard View Implementation**
    - [✓] Create `DashboardView.js` to display user-specific data.
    - [✓] Add "My Applications" section for scholarships.
    - [✓] Add "My Sessions" section for mentoring.
    - [✓] Add "My Communities" section.
- [✓] **12.2 Integration & Navigation**
    - [✓] Update Navbar: Link the user avatar/score to the new Dashboard.
    - [✓] Implement logout on dashboard vs global.
- [✓] **12.3 Profile Editing**
    - [✓] Allow users to update their bio/role within the dashboard.

## Phase 13: Search & Discovery [✓]
- [✓] **13.1 Scholarship Search**
    - [✓] Add a search input to `ScholarshipView.js`.
    - [✓] Implement client-side filtering logic.
- [✓] **13.2 Library Search**
    - [✓] Add a search input to `LibraryView.js`.
    - [✓] Filter documents by topic or category.

## Phase 14: Community Interactivity [✓]
- [✓] **14.1 Enrollment & Joining**
    - [✓] Implement "Join" logic in `CommunityView.js`.
    - [✓] Guard with authentication.
- [✓] **14.2 Real-time Community Activity**
    - [✓] Add search filtering for groups.
    - [✓] Update dashboard to list joined communities.

## Phase 16: Authentication System [✓]
- [✓] **16.1 Database Setup (Supabase MCP)**
    - [✓] Add `INSERT` RLS policy on `users` table (`auth.uid() = id`).
    - [✓] Create `handle_new_user()` trigger function (auto-creates profile on signup).
    - [✓] Create `on_auth_user_created` trigger on `auth.users`.
- [✓] **16.2 Auth Service Rewrite (`src/services/auth.js`)**
    - [✓] Add `restoreSession()` for session persistence across page reloads.
    - [✓] Improve `onAuthStateChange` handler (SIGNED_IN, TOKEN_REFRESHED, SIGNED_OUT).
    - [✓] Add route guard utilities (`isAuthenticated()`, `getSession()`, `getCurrentUser()`).
    - [✓] Add fallback `upsert` for legacy users without DB trigger profiles.
- [✓] **16.3 Route Protection (`src/core/router.js`)**
    - [✓] Add `protectedRoutes` array (currently: `#/dashboard`).
    - [✓] Implement guard check — unauthenticated users redirected to `#/` with auth modal shown.
- [✓] **16.4 Auth Modal UI Enhancement (`index.html` + `main.js`)**
    - [✓] Add Login/Register mode toggle with dynamic title, subtitle, and button text.
    - [✓] Add "Confirm Password" field (visible only in Register mode).
    - [✓] Add inline error display (`#auth-error`).
    - [✓] Add form validation (email format, password length, password match).
    - [✓] Add loading states during authentication.
    - [✓] Add Enter key submission support.
    - [✓] Separate "Login" and "Join Now" navbar buttons (open modal in correct mode).
    - [✓] Reset form fields and mode when modal is closed.
    - [✓] Fix CSS specificity bug (`.hidden` vs `.modal-input-group` display conflict).
- [✓] **16.5 Session Persistence**
    - [✓] Auth state restored on page reload via `authManager.restoreSession()`.
    - [✓] Auth is initialized before Router to ensure guards fire correctly.
    - [✓] Welcome notification only shown to authenticated users.

