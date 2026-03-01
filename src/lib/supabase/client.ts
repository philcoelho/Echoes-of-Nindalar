import { createClient } from "@supabase/supabase-js";
import { readPublicEnv } from "@/lib/env";

export function createSupabaseBrowserClient() {
	const env = readPublicEnv(import.meta.env);

	return createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, {
		auth: {
			persistSession: true,
			autoRefreshToken: true,
		},
	});
}
