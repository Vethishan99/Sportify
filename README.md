# 🏆 Sportify - Football Match Tracker

A cross-platform mobile application built with React Native and Expo for tracking football matches, scores, and favorites.

## 📱 Features

### ✅ Core Features (Assignment Requirements)

- **User Authentication**

  - Login and Registration with form validation using Yup
  - Secure token storage with AsyncStorage
  - Demo credentials: `username: emilys`, `password: emilyspass`

- **Navigation**

  - Expo Router for file-based routing
  - Bottom Tab Navigation (Home, Favorites, Profile)
  - Stack Navigation for match details

- **Home Screen**

  - Dynamic list of football matches from TheSportsDB API
  - Match cards with images, titles, leagues, and status
  - Pull-to-refresh functionality
  - Real-time match data

- **Match Interaction**

  - Tap match card to view detailed information
  - Redux Toolkit for state management
  - Detailed match screen with scores, teams, and info

- **Favorites**

  - Add/remove matches to favorites
  - Persistent storage with AsyncStorage
  - Dedicated favorites screen

- **Styling & UI**
  - Clean and consistent design
  - Feather Icons throughout the app
  - Responsive design for various screen sizes

### 🎁 Bonus Features

- **Dark Mode Toggle**
  - System-wide theme switching
  - Persistent theme preference
  - Smooth theme transitions

## 🛠 Tech Stack

- **Framework**: React Native with Expo (SDK 54)
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: Redux Toolkit
- **Storage**: AsyncStorage
- **Validation**: Yup
- **HTTP Client**: Axios
- **Icons**: Feather Icons (@expo/vector-icons)

## 📡 APIs Used

- **TheSportsDB API**: Football match data, teams, and leagues
- **DummyJSON**: User authentication (demo)

## 📂 Project Structure

```
sportify/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Home screen
│   │   ├── favorites.tsx        # Favorites screen
│   │   ├── profile.tsx          # Profile screen
│   │   └── _layout.tsx          # Tabs layout
│   ├── auth/                     # Authentication screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── match/
│   │   └── [id].tsx             # Match details (dynamic route)
│   ├── _layout.tsx              # Root layout
│   └── index.tsx                # Entry point
├── src/
│   ├── components/              # Reusable components
│   │   ├── MatchCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorMessage.tsx
│   ├── redux/                   # Redux store & slices
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── matchesSlice.ts
│   │   │   └── favoritesSlice.ts
│   │   ├── store.ts
│   │   └── hooks.ts
│   ├── services/                # API services
│   │   ├── apiClient.ts
│   │   ├── authService.ts
│   │   └── sportsService.ts
│   ├── contexts/                # React contexts
│   │   └── ThemeContext.tsx
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   ├── utils/                   # Utility functions
│   │   ├── storage.ts
│   │   ├── validation.ts
│   │   └── helpers.ts
│   └── constants/               # Constants & config
│       ├── theme.ts
│       └── api.ts
├── assets/                      # Images and static files
├── package.json
├── tsconfig.json
└── app.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/KovinthKrishna/Sportify.git
cd Sportify
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm start
```

4. Run on your preferred platform:

```bash
# iOS
pnpm ios

# Android
pnpm android

# Web
pnpm web
```

## 🔐 Demo Credentials

For testing the login functionality, use these credentials:

- **Username**: `emilys`
- **Password**: `emilyspass`

Or create a new account using the registration screen.

## 🎨 Features Showcase

### Authentication

- ✅ Form validation with Yup
- ✅ Secure token storage
- ✅ Auto-login on app restart
- ✅ Error handling

### Home Screen

- ✅ Fetches matches from multiple leagues
- ✅ Match cards with rich information
- ✅ Pull-to-refresh
- ✅ Loading states
- ✅ Empty states

### Match Details

- ✅ Full match information
- ✅ Team names and scores
- ✅ Match status (Upcoming/Completed)
- ✅ League and season info
- ✅ Add to favorites

### Favorites

- ✅ Persistent storage
- ✅ Quick access to saved matches
- ✅ Remove from favorites
- ✅ Empty state when no favorites

### Profile

- ✅ User information display
- ✅ Dark mode toggle
- ✅ Statistics
- ✅ Logout functionality

### Dark Mode

- ✅ System-wide theme
- ✅ Persistent preference
- ✅ Smooth transitions
- ✅ Consistent color scheme

## 🏗 Best Practices Implemented

- ✅ **Feature-based commits**: Each feature committed separately
- ✅ **Proper validations**: Form validation using Yup schemas
- ✅ **Decoupled code**: Separation of concerns (services, components, redux)
- ✅ **Testable code**: Pure functions and isolated logic
- ✅ **Reusable components**: DRY principle
- ✅ **Industry standards**: TypeScript, Redux Toolkit, proper file structure
- ✅ **Error handling**: Try-catch blocks and error states
- ✅ **Loading states**: User feedback for async operations
- ✅ **Responsive design**: Works on various screen sizes

## 📝 Requirements Checklist

- [x] User registration and login flow
- [x] React Hooks for form data and validation
- [x] Navigation on successful login
- [x] Display logged-in user's name
- [x] Expo Router navigation
- [x] Bottom Tab navigation
- [x] Dynamic item list from API
- [x] Item cards with image, title, and status
- [x] Details screen on item tap
- [x] Redux Toolkit state management
- [x] Favorites functionality
- [x] Persistent favorites storage
- [x] Consistent styling
- [x] Feather Icons
- [x] Responsive design
- [x] Dark mode toggle (Bonus)
- [x] Feature-based commits
- [x] Proper validations
- [x] Decoupled, testable code
- [x] Best practices & standards
