import { createClient } from './supabase/client';

const supabase = createClient();

// Initialize database tables
export async function initializeTables() {
  try {
    // Check if tables exist by querying them
    const { error: visitorsError } = await supabase
      .from('visitors')
      .select('id')
      .limit(1);
    
    const { error: aboutError } = await supabase
      .from('about')
      .select('id')
      .limit(1);
    
    const { error: projectsError } = await supabase
      .from('projects')
      .select('id')
      .limit(1);
    
    const { error: messagesError } = await supabase
      .from('messages')
      .select('id')
      .limit(1);

    // If tables don't exist, we'll create them via SQL
    if (visitorsError || aboutError || projectsError || messagesError) {
      console.log('Some tables need to be created. Please run the setup SQL.');
      // Note: In production, tables should be created via Supabase dashboard or migrations
    }
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
}

// Visitor operations
export async function addVisitor(name: string, relation: string) {
  const { data, error } = await supabase
    .from('visitors')
    .insert([{ name, relation }])
    .select();
  
  if (error) {
    console.error('Error adding visitor:', error);
    throw error;
  }
  return data;
}

export async function getVisitors() {
  const { data, error } = await supabase
    .from('visitors')
    .select('*')
    .order('visit_time', { ascending: false });
  
  if (error) {
    console.error('Error fetching visitors:', error);
    throw error;
  }
  return data || [];
}

// About operations
export async function getAbout() {
  const { data, error } = await supabase
    .from('about')
    .select('*')
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    console.error('Error fetching about:', error);
    return null;
  }
  return data;
}

export async function updateAbout(aboutData: {
  video_url?: string;
  description?: string;
  tools?: string[];
  resume_url?: string;
}) {
  // First check if a record exists
  const existing = await getAbout();
  
  if (existing) {
    const { data, error } = await supabase
      .from('about')
      .update(aboutData)
      .eq('id', existing.id)
      .select();
    
    if (error) {
      console.error('Error updating about:', error);
      throw error;
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from('about')
      .insert([aboutData])
      .select();
    
    if (error) {
      console.error('Error creating about:', error);
      throw error;
    }
    return data;
  }
}

// Project operations
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
  return data || [];
}

export async function addProject(projectData: {
  title: string;
  description: string;
  image_url?: string;
  live_link?: string;
  source_code_link?: string;
  tools?: string[];
  category?: string;
}) {
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select();
  
  if (error) {
    console.error('Error adding project:', error);
    throw error;
  }
  return data;
}

export async function updateProject(id: number, projectData: {
  title?: string;
  description?: string;
  image_url?: string;
  live_link?: string;
  source_code_link?: string;
  tools?: string[];
  category?: string;
}) {
  const { data, error } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }
  return data;
}

export async function deleteProject(id: number) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

// Message operations
export async function addMessage(messageData: {
  name: string;
  email: string;
  message: string;
}) {
  const { data, error } = await supabase
    .from('messages')
    .insert([messageData])
    .select();
  
  if (error) {
    console.error('Error adding message:', error);
    throw error;
  }
  return data;
}

export async function getMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('timestamp', { ascending: false });
  
  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
  return data || [];
}