# Portfolio Website Setup Instructions

## 🚀 Quick Start

Your personal portfolio website is ready! Follow these steps to get it running:

### Step 1: Database Setup

1. **Open your Supabase Dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Run the Database Setup Script**
   - Navigate to the SQL Editor in your Supabase dashboard
   - Copy the contents of `database-setup.sql` file
   - Paste it into the SQL Editor
   - Click "Run" to execute the script

This will create four tables:
- `visitors` - Stores visitor information and timestamps
- `about` - Stores your about section content (including resume URL)
- `projects` - Stores your project portfolio (with categories)
- `messages` - Stores contact form messages

   **Note**: If you've already created tables before, the script will safely add any missing columns (resume_url, category) without affecting your existing data.

### Step 2: Verify Database

After running the script, verify that all tables were created:
1. Go to the "Table Editor" in Supabase
2. You should see: `visitors`, `about`, `projects`, and `messages` tables
3. The tables should have sample data (optional, for testing)

### Step 3: Start Using the Application

1. **Landing Page**
   - When you first visit the app, you'll see a landing page
   - Choose "Owner" or "Visitor" to continue

2. **Owner Login**
   - Name: `Om Maurya`
   - Password: `04092001@Om`
   - Owner has full edit permissions

3. **Visitor Access**
   - Enter your name
   - Enter your occupation/relation (e.g., "Recruiter", "Friend")
   - Visitor information is automatically tracked

## 📖 Features

### For Everyone (Owner + Visitors)

✅ **Home Page**
- View visitor statistics and analytics
- Beautiful charts showing visit trends
- Recent visitor list

✅ **About Me Page**
- Watch introduction video
- Read about Om Maurya
- View tools and technologies
- Download resume

✅ **Projects Page**
- Browse all projects
- Filter projects by tools/technologies
- View project details, live demos, and source code

✅ **Contact Page**
- Contact information (email, phone, LinkedIn, GitHub)
- Send messages via contact form

### For Owner Only

🔐 **Edit Capabilities**
- Update About section (video, description, tools)
- Add, edit, and delete projects
- View all visitor analytics
- Manage content dynamically

## 🎨 Customization

### Update Your Information

1. **Owner Credentials** (in `/utils/auth.ts`)
   ```typescript
   export const OWNER_CREDENTIALS = {
     name: 'Your Name',
     password: 'YourPassword'
   };
   ```

2. **Contact Information** (in `/pages/ContactPage.tsx`)
   - Update email, phone, LinkedIn, GitHub URLs
   - Add or remove contact methods

3. **About Section**
   - Login as owner
   - Go to About page
   - Click "Edit" button
   - Update video URL, description, and tools

4. **Add Projects**
   - Login as owner
   - Go to Projects page
   - Click "Add Project"
   - Fill in project details

## 🗄️ Database Schema

### visitors
- `id` - Auto-incrementing primary key
- `name` - Visitor's name
- `relation` - Visitor's occupation/relation
- `visit_time` - Timestamp in IST (auto-generated)

### about
- `id` - Auto-incrementing primary key
- `video_url` - YouTube/Vimeo embed URL
- `description` - About me text
- `tools` - JSON array of tools/technologies
- `resume_url` - URL to your resume

### projects
- `id` - Auto-incrementing primary key
- `title` - Project title
- `description` - Project description
- `image_url` - Project thumbnail URL
- `live_link` - Live demo URL
- `source_code_link` - GitHub/source code URL
- `tools` - JSON array of tools used
- `category` - Project category (e.g., "Web Development", "Mobile App")

### messages
- `id` - Auto-incrementing primary key
- `name` - Sender's name
- `email` - Sender's email
- `message` - Message content
- `timestamp` - Timestamp in IST (auto-generated)

## 🔒 Security Notes

⚠️ **Important**: This is a prototype/demo application. For production use:
- Implement proper authentication using Supabase Auth
- Add proper Row Level Security (RLS) policies
- Secure owner credentials using environment variables
- Add rate limiting for form submissions
- Validate and sanitize all user inputs

## 📊 Visitor Tracking

All visitor data is stored with IST (Indian Standard Time) timestamps.
The application automatically:
- Records visitor name and relation
- Tracks visit date and time
- Generates analytics and charts
- Shows recent visitor activity

## 🎯 Tech Stack

- **Frontend**: React + TypeScript
- **Routing**: React Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🐛 Troubleshooting

**Issue**: Tables not appearing in Supabase
- **Solution**: Re-run the `database-setup.sql` script

**Issue**: Can't login as owner
- **Solution**: Verify credentials match those in `/utils/auth.ts`

**Issue**: Visitor data not saving
- **Solution**: Check Supabase connection and table policies

**Issue**: Charts not displaying
- **Solution**: Ensure you have visitor data in the database

## 📝 Next Steps

1. Run the database setup script
2. Login and test all features
3. Customize content with your information
4. Add your real projects
5. Update contact information
6. Share your portfolio!

Enjoy your new portfolio website! 🎉