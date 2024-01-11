
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://vvtettewjpflnjubybkk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2dGV0dGV3anBmbG5qdWJ5YmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNzk2ODcsImV4cCI6MjAxOTY1NTY4N30.3MTVjA0pK-9iMZkBoxy7CbNSoUHVj4-hXdH5tOT5KZE'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase