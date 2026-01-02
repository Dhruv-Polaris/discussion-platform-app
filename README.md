# Discussion Platform App

A modern, Reddit-like community discussion platform built with the latest web technologies. Users can create topics, share posts, engage in threaded discussions, and discover trending content in a secure and responsive environment.

![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Future Improvements](#-future-improvements)

---

## ✨ Features

- **Topic & Post Management**: Create specific discussion topics and publish posts within them.
- **Threaded Comments**: Engage in deep discussions with nested comment threads.
- **Authentication**: Secure Sign-up and Sign-in functionality using NextAuth.js.
- **Top Posts Feed**: Automatically ranks posts based on engagement (comment count) on the homepage.
- **Search Functionality**: Quickly find specific topics or posts using the integrated search bar.
- **Responsive Design**: Fully optimized UI that looks great on mobile, tablet, and desktop.
- **Dark Mode Support**: Seamless toggle between light and dark themes.
- **Pagination**: "Load More" functionality to efficiently browse through large lists of posts.
- **Moderation**: Users can securely delete their own posts.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Database
- **Runtime**: Node.js
- **Server Actions**: Next.js Server Actions for mutations (POST/DELETE).
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: SQLite (Development) / Compatible with PostgreSQL or MySQL for production.
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)

---

## 🏗 Project Architecture

This application follows a **Server Component** heavy architecture to maximize performance and SEO.

1.  **Data Fetching**:
    -   **Reads**: Performed directly in Server Components using `src/lib/query` helper functions. This avoids unnecessary API endpoints for internal data.
    -   **Writes**: Handled via **Server Actions** (`src/actions`) to ensure type safety and secure execution on the server.
2.  **Authentication**:
    -   Session management is handled by NextAuth v5, utilizing GitHub (or other providers) and persisting user data in the SQLite database via Prisma Adapter.
3.  **UI/UX**:
    -   Client Components are used strictly for interactivity (forms, buttons, theme toggles) to keep the bundle size small.

---

## 📂 Folder Structure

Here is a quick overview of the top-level directory structure:

```
src/
├── actions/          # Server Actions (Mutations: create, edit, delete)
├── app/              # App Router (Pages, Layouts, API routes)
│   ├── api/          # Backend API routes (Auth handlers)
│   ├── topics/       # Topic-specific routes
│   └── page.tsx      # Landing page
├── components/       # Reusable UI components (Buttons, Inputs, Forms)
├── lib/              # Utility functions
│   └── query/        # Database read logic (Separated from actions)
├── auth.ts           # NextAuth configuration
prisma/
└── schema.prisma     # Database schema definition
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Dhruv-Polaris/discussion-platform-app.git
cd discussion-platform-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# NextAuth Configuration
AUTH_SECRET="your-super-secret-key"

# GitHub Provider (if using GitHub Auth)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Database Connection (SQLite default)
DATABASE_URL="file:./dev.db"
```

### 4. Database Setup

Initialize the SQLite database using Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔮 Future Improvements

- [ ] Add image upload support for posts.
- [ ] Implement user profiles with post history.
- [ ] Add real-time notifications for comments.
- [ ] Migrate from SQLite to PostgreSQL for production deployment.
- [ ] Add sorting options (Newest, Oldest, Top) for topic feeds.

---

## 📄 License

This project is licensed under the MIT License.