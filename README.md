# Oral Roberts University (ORU) Portal

A modern React-based web application serving as the student and administrative portal for Oral Roberts University. Developed with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Admissions Portal**: Prospective students can view admission requirements, start an application, and upload necessary credentials.
- **Application Tracking**: Applicants can track their admission status, view next steps, and manage uploaded documents in real-time.
- **Admin Dashboard**: Administrative workflows including:
  - Application Management (Review, Approve, Reject, Admit)
  - Broadcast/Announcements publishing (News, Events, Seminars)
  - Inbound Support Inbox
- **Responsive Design**: Fast, responsive, and mobile-friendly interface styled with Tailwind CSS.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate into the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server natively:
```bash
npm run dev
```

The application will be available at standard local dev server ports (e.g., `http://localhost:3000`).

### Build for Production

Compile a production-ready application bundle into the `dist/` folder:
```bash
npm run build
```

## Structure

- `/src/components/`: Modular React components for each section (Admissions, TrackApplication, AdminPortal, HomeSection, etc.).
- `/src/api.ts`: API integration layer for communicating with the backend.
- `/src/types.ts`: Shared TypeScript interfaces and enums for safe type checking.
- `/src/index.css`: Global styling and Tailwind directives.

## Environment Variables

For full functionality alongside the backend API endpoints, ensure the application environment includes the variables documented in `.env.example` (if applicable).
