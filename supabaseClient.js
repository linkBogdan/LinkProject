import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://izuggnwyfwvruntfiwqq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6dWdnbnd5Znd2cnVudGZpd3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxNDc1NjEsImV4cCI6MjAzODcyMzU2MX0.4PxuGUF_n1rGs2X7R9dtuExkKW-oqBeLLNl0ISXuxnE';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;