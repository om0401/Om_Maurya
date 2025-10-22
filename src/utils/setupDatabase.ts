import { createClient } from './supabase/client';

const supabase = createClient();

export async function setupDatabase() {
  try {
    console.log('Setting up database tables...');

    // Create visitors table
    const { error: visitorsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS visitors (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          relation TEXT NOT NULL,
          visit_time TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'Asia/Kolkata')
        );
      `
    });

    if (visitorsError && !visitorsError.message.includes('does not exist')) {
      console.error('Error creating visitors table:', visitorsError);
    }

    // Create about table
    const { error: aboutError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS about (
          id SERIAL PRIMARY KEY,
          video_url TEXT,
          description TEXT,
          tools JSONB DEFAULT '[]'::jsonb
        );
      `
    });

    if (aboutError && !aboutError.message.includes('does not exist')) {
      console.error('Error creating about table:', aboutError);
    }

    // Create projects table
    const { error: projectsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          image_url TEXT,
          live_link TEXT,
          source_code_link TEXT,
          tools JSONB DEFAULT '[]'::jsonb
        );
      `
    });

    if (projectsError && !projectsError.message.includes('does not exist')) {
      console.error('Error creating projects table:', projectsError);
    }

    // Create messages table
    const { error: messagesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS messages (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          timestamp TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'Asia/Kolkata')
        );
      `
    });

    if (messagesError && !messagesError.message.includes('does not exist')) {
      console.error('Error creating messages table:', messagesError);
    }

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}
