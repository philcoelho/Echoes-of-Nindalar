import { createClient } from "@supabase/supabase-js";
import { readEnv } from "@/lib/env";

export function createSupabaseServerClient() {
	if (typeof window !== "undefined") {
		throw new Error("createSupabaseServerClient must run on the server.");
	}

	const env = readEnv(process.env);

	return createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
		},
	});
}
