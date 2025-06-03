# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Darkei Elyahou is a comprehensive platform for managing requests and forms for the Darkei Elyahou charitable association. It allows beneficiaries to submit aid requests and administrators to manage them efficiently.

## Technical Stack

### Frontend
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Form Validation**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Session-based with Express Session

## Repository Structure

The project is organized into two main directories:

- `frontend/`: Next.js application
  - `app/`: Pages and routes using Next.js App Router
  - `components/`: Reusable UI components
  - `lib/`: Utilities and configurations
  - `public/`: Static files (images, videos)

- `backend/`: Express API
  - `src/`: Source files
    - `controllers/`: Business logic
    - `middleware/`: Express middleware
    - `routes/`: API routes
  - `prisma/`: Database schema and migrations

## Common Commands

### Frontend Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

### Backend Development

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev

# Start production server
npm run start
```

## Database

The application uses PostgreSQL with Prisma ORM. The main data models include:

- `FormRequest`: Stores all form submissions with their status and metadata
- `AdminUser`: Stores administrator information

To visualize and manage the database during development:

```bash
# Open Prisma Studio
cd backend
npx prisma studio
```

## Deployment

The project uses GitHub Actions for automatic deployment to a VPS. The deployment workflow:

1. Pulls the latest code from the main branch
2. Installs dependencies for both frontend and backend
3. Runs Prisma generate for the backend
4. Builds the frontend
5. Uses PM2 to manage the Node.js processes

Configuration is managed through an `ecosystem.config.js` file (based on the template in the repo).

## Environment Variables

To run the project locally, create appropriate `.env` files:

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
SESSION_SECRET="a_long_random_secret_string"
FRONTEND_URL="http://localhost:3000"
SENDGRID_API_KEY=your_sendgrid_api_key
ALLOWED_ORIGINS="http://localhost:3000"
```

## Key Features

- Form submission system with various form types (social aid, loans, etc.)
- Admin dashboard for managing form requests
- Authentication system for administrators
- Email notifications using SendGrid