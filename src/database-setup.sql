-- Portfolio Database Setup Script
-- Run this SQL in your Supabase SQL Editor to create all required tables

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  visit_time TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'Asia/Kolkata')
);

-- Create about table
CREATE TABLE IF NOT EXISTS about (
  id SERIAL PRIMARY KEY,
  video_url TEXT,
  description TEXT,
  tools JSONB DEFAULT '[]'::jsonb,
  resume_url TEXT
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  live_link TEXT,
  source_code_link TEXT,
  tools JSONB DEFAULT '[]'::jsonb,
  category TEXT DEFAULT 'Full Stack'
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'Asia/Kolkata')
);

-- Add new columns for existing databases (safe migrations)
-- These will fail silently if the columns already exist
DO $$ 
BEGIN
  -- Add resume_url to about table if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'about' AND column_name = 'resume_url'
  ) THEN
    ALTER TABLE about ADD COLUMN resume_url TEXT;
  END IF;

  -- Add category to projects table if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'category'
  ) THEN
    ALTER TABLE projects ADD COLUMN category TEXT DEFAULT 'Full Stack';
  END IF;
END $$;

-- Insert sample about data (optional)
INSERT INTO about (video_url, description, tools, resume_url)
VALUES (
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'Hello! I''m Om Maurya, a passionate developer and data analyst. I love building web applications and creating data visualizations that help businesses make better decisions.',
  '["Excel", "Power BI", "React", "Node.js", "Python", "SQL"]'::jsonb,
  'https://example.com/resume'
)
ON CONFLICT DO NOTHING;

-- Insert sample project data (optional)
INSERT INTO projects (title, description, image_url, live_link, source_code_link, tools, category)
VALUES (
  'Portfolio Website',
  'A modern, responsive portfolio website built with React and Supabase. Features visitor tracking, dynamic content management, and project showcase.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'https://example.com',
  'https://github.com/example/portfolio',
  '["React", "Supabase", "Tailwind CSS", "TypeScript"]'::jsonb,
  'Full Stack'
),
(
  'Data Dashboard',
  'Interactive data visualization dashboard built with Power BI and Excel. Provides real-time insights into business metrics.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  'https://example.com/dashboard',
  NULL,
  '["Power BI", "Excel", "SQL"]'::jsonb,
  'Data Visualization'
)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read and write access
-- Note: In production, you should implement proper authentication-based policies

-- Visitors table policies
CREATE POLICY "Allow public read access on visitors" ON visitors FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on visitors" ON visitors FOR INSERT WITH CHECK (true);

-- About table policies
CREATE POLICY "Allow public read access on about" ON about FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on about" ON about FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on about" ON about FOR UPDATE USING (true);

-- Projects table policies
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on projects" ON projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access on projects" ON projects FOR DELETE USING (true);

-- Messages table policies
CREATE POLICY "Allow public read access on messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on messages" ON messages FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitors_visit_time ON visitors(visit_time DESC);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp DESC);