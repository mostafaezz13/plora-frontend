import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://veyqsrkmwywnovdxkwhg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleXFzcmttd3l3bm92ZHhrd2hnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQxNzgxNSwiZXhwIjoyMDY4OTkzODE1fQ.zngKUO2YoI0GxrQKFAbx02Ydj3VXp5k4MehlGuxgYSo";

export const supabase = createClient(supabaseUrl, supabaseKey);
