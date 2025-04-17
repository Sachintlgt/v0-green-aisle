# Green Aisle - Sustainable Wedding Planning Platform

Green Aisle is a web application that connects couples to share and reuse wedding elements, reducing waste and costs while creating beautiful celebrations.

## Backend Architecture

This project uses Supabase as the backend service, providing:

- User authentication
- Database storage
- Row-level security
- Real-time subscriptions
- Storage for images and files

## Database Schema

The database consists of the following tables:

- **profiles**: Extended user information
- **weddings**: Wedding details for couples
- **venues**: Wedding venue information
- **tented_venue_bookings**: Bookings for tented venues
- **tent_packages**: Packages available for tented venues
- **vendors**: Vendor profiles and information
- **vendor_bookings**: Vendor availability and bookings
- **floral_arrangements**: Floral arrangements available for reuse
- **mood_boards**: Inspiration boards created by users
- **mood_board_items**: Items within mood boards
- **shared_resources**: Resources shared between users
- **transactions**: Financial transactions between users
- **notifications**: User notifications

## Authentication

The application uses Supabase Auth for user authentication, supporting:

- Email/password authentication
- Password reset
- Session management
- Protected routes

## API Structure

The application uses custom hooks to interact with the Supabase API:

- **useAuth**: Authentication management
- **useProfile**: User profile management
- **useWedding**: Wedding details management
- **useTentedVenues**: Tented venue management
- **useMoodBoards**: Mood board management
- **useVendors**: Vendor management
- **useFloralArrangements**: Floral arrangement management
- **useSharedResources**: Shared resource management
- **useTransactions**: Transaction management
- **useNotifications**: Notification management

## Security

The application implements row-level security (RLS) policies to ensure data access control:

- Users can only access their own data
- Public data is accessible to all users
- Shared data is accessible to the involved parties

## Real-time Features

The application uses Supabase Realtime for real-time updates:

- Real-time notifications
- Real-time updates to shared resources
- Real-time updates to mood boards

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account

### Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
\`\`\`

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

### Database Setup

1. Create a new Supabase project
2. Run the SQL script in `supabase/schema.sql` to set up the database schema and RLS policies

## Deployment

The application can be deployed to Vercel:

1. Connect your GitHub repository to Vercel
2. Set the environment variables in the Vercel dashboard
3. Deploy the application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
