import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kvtbxzlpsjcickdyouji.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dGJ4emxwc2pjaWNrZHlvdWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTkzMTEsImV4cCI6MjA2ODE3NTMxMX0.O1tt-_sD6nrD2JmKpImLp5hRSeEbZgaP2jsRNRTK5qg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
