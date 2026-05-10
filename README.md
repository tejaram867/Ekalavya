# 🎓 Ekalavya - Learning Management System

<div align="center">

![Ekalavya Logo](public/Logo.jpeg)

**Empowering Every Student. Everywhere.**

A next-generation learning management platform designed for Class 6-12 and undergraduate students across India, featuring scholarship discovery, skill-based mentoring, peer collaboration, and academic resources.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[Live Demo](#) • [Documentation](documentation/) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Ekalavya is a comprehensive Learning Management System that optimizes the student experience through:

- **Scholarship Hub**: Discover and apply for hand-picked scholarship opportunities
- **Elite Mentoring**: Connect with industry experts for skill-based guidance
- **Peer Connect**: Collaborate with peers through study groups and knowledge sharing
- **Academic Library**: Access curated research papers, study guides, and resources
- **Mastery Calibration**: Track proficiency metrics across core disciplines

### Why Ekalavya?

- 🎯 **Personalized Learning**: AI-driven recommendations based on your profile
- 🔒 **Secure & Private**: Built on Supabase with enterprise-grade security
- 📱 **Progressive Web App**: Works offline and installs like a native app
- 🎨 **Modern UI**: Glassmorphic design with smooth animations
- 🚀 **Performance First**: Vanilla JavaScript for lightning-fast load times

---

## ✨ Features

### 🎓 Scholarship Management
- Browse curated scholarship opportunities
- Advanced search and filtering
- Application tracking with status updates
- Verification badges (Verified, In Progress, Not Verified)
- Deadline reminders and notifications

### 👨‍🏫 Skill-Based Mentoring
- Book 1-on-1 sessions with industry mentors
- Browse by specialty (Frontend, Data Analysis, ML, UI/UX, etc.)
- Session ratings and reviews
- Real-time availability tracking
- Mentor verification badges

### 🤝 Peer Connect
- Join study groups and communities
- Host or attend peer learning sessions
- Live session indicators
- Community discovery by interest
- Collaborative learning tools

### 📚 Digital Library
- Curated academic resources
- Search by topic, subject, or writer
- Filter by academic level (Class 6-12, Undergraduate, Postgraduate)
- Animated dropdown with custom categories
- Contribution system for sharing notes

### 📊 Personal Dashboard
- **Mastery Calibration**: Visual proficiency tracking across 5 core skills
  - Reading, Solving, Revision, Coding, Teaching
  - Interactive radar chart comparing your profile vs mentor benchmarks
  - Dynamic circular progress indicator with skill selector
- Growth score and streak tracking
- Application and session management
- Profile customization with avatar generator

### 🎨 UI/UX Features
- Glassmorphic design aesthetic
- Smooth page transitions
- Responsive layout (mobile-first)
- Dark theme optimized
- Lucide icon integration
- Activity dropdown notifications
- Custom fluid dropdown components

---

## 🛠 Tech Stack

### Frontend
- **Core**: Vanilla JavaScript (ES6+ Modules)
- **Routing**: Custom Client-Side Router
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide Icons
- **PWA**: Service Worker for offline support

### Backend
- **Authentication**: Supabase Auth (Email/Password, Google OAuth)
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime subscriptions

### Development
- **Version Control**: Git
- **Code Quality**: ESLint ready
- **Browser Support**: Modern browsers (ES6+)

---

## 📁 Project Structure

```
ekalavya/
├── frontend/              # HTML pages
│   ├── index.html        # Landing page
│   ├── dashboard.html    # User dashboard
│   ├── scholarships.html # Scholarship hub
│   ├── mentors.html      # Mentoring hub
│   ├── community.html    # Peer connect
│   ├── library.html      # Digital library
│   ├── portfolio.html    # User portfolio
│   ├── profile.html      # Profile management
│   └── admin.html        # Admin panel
│
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── style.css # Global styles
│   │
│   ├── components/       # Reusable components
│   │   └── FluidDropdown.js
│   │
│   ├── core/            # Core functionality
│   │   ├── router.js    # Client-side routing
│   │   ├── store.js     # State management
│   │   ├── i18n.js      # Internationalization
│   │   └── supabase.js  # Supabase client
│   │
│   ├── services/        # API services
│   │   ├── api.js       # Data fetching
│   │   ├── auth.js      # Authentication
│   │   └── notifications.js
│   │
│   ├── views/           # View components
│   │   ├── HomeView.js
│   │   ├── DashboardView.js
│   │   ├── ScholarshipView.js
│   │   ├── MentorView.js
│   │   ├── CommunityView.js
│   │   ├── LibraryView.js
│   │   ├── PortfolioView.js
│   │   ├── ProfileView.js
│   │   └── AdminView.js
│   │
│   ├── modules/         # Feature modules
│   │   ├── boot.js      # App initialization
│   │   ├── renderers.js # UI renderers
│   │   ├── portfolio.js # Portfolio logic
│   │   └── recommendations.js
│   │
│   ├── pages/           # Page entry points
│   │   ├── index.js
│   │   ├── dashboard.js
│   │   └── ...
│   │
│   └── main.js          # Main entry point
│
├── public/              # Static assets
│   └── Logo.jpeg
│
├── documentation/       # Project docs
│   ├── requirements.md
│   ├── design.md
│   └── tasks.md
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)
- Basic knowledge of HTML, CSS, and JavaScript
- Supabase account (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dharshan-2307/Learning_Management_System.git
   cd Learning_Management_System
   ```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Update `src/core/supabase.js` with your credentials:
     ```javascript
     const supabaseUrl = 'YOUR_SUPABASE_URL'
     const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
     ```

3. **Set up the database**
   - Run the SQL schema from `documentation/` (if available)
   - Or create tables manually:
     - `users`
     - `scholarships`
     - `scholarship_applications`
     - `mentoring_sessions`
     - `session_enrollments`
     - `communities`
     - `community_members`
     - `library_assets`

4. **Start a local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

5. **Open in browser**
   ```
   http://localhost:8000/frontend/index.html
   ```

---

## ⚙️ Configuration

### Supabase Setup

1. **Authentication Providers**
   - Enable Email/Password authentication
   - Configure Google OAuth (optional)
   - Set up email templates

2. **Database Tables**
   Required tables with Row Level Security (RLS):
   - `users` - User profiles and stats
   - `scholarships` - Scholarship listings
   - `scholarship_applications` - Application tracking
   - `mentoring_sessions` - Mentor sessions
   - `session_enrollments` - Session bookings
   - `communities` - Community groups
   - `community_members` - Membership tracking
   - `library_assets` - Academic resources

3. **Storage Buckets**
   - `avatars` - User profile pictures
   - `documents` - Uploaded resources

### Environment Variables

Create `src/core/supabase.js` with:
```javascript
export const supabaseUrl = 'https://your-project.supabase.co'
export const supabaseKey = 'your-anon-key'
```

### Tailwind Configuration

Tailwind is loaded via CDN with custom configuration in each HTML file:
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'ekalavya-gold': '#f4c430',
        'ekalavya-black': '#000000',
        'ekalavya-black-dark': '#0a0a0a',
        'ekalavya-slate': '#94a3b8',
      }
    }
  }
}
```

---

## 📖 Usage

### For Students

1. **Sign Up / Login**
   - Create account with email or Google
   - Complete your profile
   - Set academic level and interests

2. **Explore Scholarships**
   - Browse curated opportunities
   - Filter by deadline, amount, or category
   - Apply directly through the platform

3. **Book Mentoring Sessions**
   - Find mentors by specialty
   - Check availability and ratings
   - Book 1-on-1 sessions

4. **Join Communities**
   - Discover study groups
   - Participate in peer sessions
   - Share knowledge and resources

5. **Track Progress**
   - View mastery calibration metrics
   - Monitor growth score and streak
   - Analyze skill distribution

### For Mentors

1. **Register as Mentor**
   - Complete mentor profile
   - Set availability and rates
   - Add specialties and experience

2. **Manage Sessions**
   - View booking requests
   - Schedule sessions
   - Track student progress

### For Admins

1. **Access Admin Panel**
   - Run `window.makeAdmin()` in console (dev only)
   - Navigate to `/frontend/admin.html`

2. **Manage Content**
   - Approve scholarships
   - Verify mentors
   - Moderate communities

---

## 🎨 Customization

### Theming

Edit `src/assets/styles/style.css` to customize:
- Color scheme
- Typography
- Spacing
- Animations

### Components

Create new components in `src/components/`:
```javascript
export class MyComponent {
  constructor(containerId, options) {
    // Component logic
  }
}
```

### Views

Add new views in `src/views/`:
```javascript
export const MyView = {
  render: () => `<!-- HTML template -->`,
  init: async () => {
    // Initialization logic
  }
}
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Use ES6+ features
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure responsive design

---

## 🐛 Known Issues

- Service Worker disabled in development (to prevent caching issues)
- Some features require Supabase backend setup
- PWA installation requires HTTPS in production

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Dharshan** - *Initial work* - [GitHub](https://github.com/Dharshan-2307)

---

## 🙏 Acknowledgments

- Tailwind CSS for utility-first styling
- Lucide Icons for beautiful iconography
- Supabase for backend infrastructure
- DiceBear for avatar generation
- All contributors and supporters

---

## 📞 Support

For support, email hello@ekalavya.edu or join our community discussions.

---

<div align="center">

**Made with ❤️ for scholars everywhere**

[⬆ Back to Top](#-ekalavya---learning-management-system)

</div>
