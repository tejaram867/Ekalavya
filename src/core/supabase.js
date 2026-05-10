import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://kaqbvfwqvkkgqxjhtmql.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthcWJ2ZndxdmtrZ3F4amh0bXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NDM3NzUsImV4cCI6MjA4OTExOTc3NX0.iLBeoC7p6OLXwxbJkQkh9HvkZ0y0XgSPyDcQziYDs9o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
