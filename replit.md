# Wedding Website - Sara & Devid

## Overview

This is a full-stack wedding website for Sara & Devid's wedding celebration in Lisbon, Portugal on June 26, 2026. The application provides guests with comprehensive information about the wedding events, allows them to contribute to the couple's honeymoon in Japan, and features a multi-language interface supporting English, Italian, and Spanish.

The website is built as a modern single-page application with a RESTful API backend, featuring sections for pre-wedding activities, the wedding day schedule, post-wedding events, and a honeymoon contribution system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**: The application uses React 18 with Vite as the build tool and development server. Client-side routing is handled by Wouter, a lightweight alternative to React Router. The application follows a single-page application (SPA) architecture with smooth scroll navigation between sections.

**UI Component Library**: The frontend leverages shadcn/ui (New York variant) built on top of Radix UI primitives. This provides accessible, customizable components styled with Tailwind CSS. The design system uses CSS variables for theming and supports both light and dark modes through next-themes.

**State Management**: React Query (TanStack Query) manages server state and API interactions. The query client is configured with optimistic caching strategies (staleTime: Infinity) to minimize unnecessary refetches. Local UI state is managed through React hooks and context providers.

**Internationalization**: A custom context-based i18n solution supports three languages (English, Italian, Spanish). The LanguageProvider wraps the application and provides translation functions throughout the component tree. This lightweight approach was chosen over heavier i18n libraries for simplicity.

**Animation & UX**: Framer Motion provides scroll-based animations and transitions. Components use the useInView hook to trigger animations as sections enter the viewport, creating an engaging scrolling experience.

**Form Management**: React Hook Form with Zod validation handles form state and validation for the honeymoon contribution system. The @hookform/resolvers package integrates Zod schemas with form validation.

### Backend Architecture

**Server Framework**: Express.js serves as the HTTP server framework, running in both development and production environments. The server handles API routes, serves static assets in production, and integrates with Vite's dev server in development.

**Development Workflow**: In development mode, Vite's middleware mode is used to enable hot module replacement (HMR) and serve the frontend through the Express server. The setupVite function creates a Vite dev server that runs alongside Express, providing a unified development experience.

**API Design**: RESTful API endpoints follow conventional HTTP methods and status codes. The API provides three main endpoints for honeymoon contributions:
- GET /api/contributions - Retrieve all contributions
- GET /api/contributions/total - Get total contribution amount
- POST /api/contributions - Create a new contribution

**Request/Response Handling**: Express middleware logs all API requests with timing information. JSON request bodies are parsed using express.json(), and responses are formatted consistently. Error handling middleware catches and formats errors with appropriate HTTP status codes.

**Data Validation**: Zod schemas defined in the shared schema file validate incoming request data. The validation happens at the route handler level, with validation errors returning 400 status codes with detailed error information.

### Data Storage Solutions

**Database**: The application uses PostgreSQL as the primary database, accessed through the Neon serverless driver (@neondatabase/serverless). This provides a connection-pooled, low-latency database solution suitable for serverless and edge environments.

**ORM**: Drizzle ORM manages database schema and queries. The schema is defined in TypeScript using Drizzle's PostgreSQL table definitions, providing type safety throughout the application. Drizzle Kit handles migrations with the schema located at shared/schema.ts and migrations output to ./migrations.

**Schema Design**: Two main tables exist:
- users: Stores user authentication data (id, username, password)
- contributions: Tracks honeymoon contributions (id, name, amount, message, giftType, paymentMethod, createdAt)

**Storage Abstraction**: An IStorage interface defines the data access contract, with two implementations:
- MemStorage: In-memory storage for development/testing
- Database storage: PostgreSQL implementation (production)

This abstraction allows the application to run without a database during initial development while maintaining the same API contract.

**Type Safety**: Drizzle-Zod generates Zod validation schemas from Drizzle table definitions, ensuring consistency between database schema, validation logic, and TypeScript types. Insert and select types are inferred from the schema definitions.

### External Dependencies

**Email Service**: SendGrid (@sendgrid/mail) is integrated for sending email notifications, particularly for RSVP confirmations. The RSVP dialog component simulates sending emails to dgeris@icloud.com with guest information.

**UI Dependencies**: The application relies heavily on Radix UI primitives for accessible component foundations. These include dialog, dropdown, popover, toast, accordion, and many other interactive components. Class-variance-authority (CVA) provides a type-safe way to define component variants.

**Date Handling**: date-fns library manages date formatting and manipulation throughout the application, chosen for its tree-shakeable, functional approach compared to alternatives like Moment.js.

**Icons**: React Icons (react-icons) provides access to Font Awesome and other icon sets used throughout the UI. Lucide React offers additional modern icon options used primarily in UI components.

**Styling**: Tailwind CSS handles all styling with a custom configuration extending the default theme. The configuration defines custom colors, border radii, and other design tokens. PostCSS processes the styles with Tailwind and Autoprefixer plugins.

**Build Tools**: 
- Vite: Development server and production bundler for the frontend
- esbuild: Bundles the backend server code for production deployment
- tsx: Executes TypeScript directly in development mode
- TypeScript: Provides type checking across the entire application

**Session Management**: connect-pg-simple provides PostgreSQL-backed session storage, though authentication implementation appears to be in progress based on the schema but not yet fully integrated.

### Deployment Considerations

**Production Build**: The build script compiles both frontend (via Vite) and backend (via esbuild) into the dist directory. The frontend assets are placed in dist/public, while the backend bundle is at dist/index.js.

**Environment Variables**: DATABASE_URL is required for database connectivity. The drizzle.config.ts throws an error if this variable is missing, ensuring proper configuration before database operations.

**Static Asset Serving**: In production, Express serves the built frontend from dist/public after API route handlers have been registered, ensuring API routes take precedence over static files.

**Replit Integration**: The application includes Replit-specific integrations including error overlays, cartographer plugin (development only), and development banners. These enhance the Replit IDE experience without affecting standalone deployments.