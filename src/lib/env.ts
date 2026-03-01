type EnvSource = Record<string, unknown>;

const REQUIRED_ENV_KEYS = [
	"VITE_SUPABASE_URL",
	"VITE_SUPABASE_ANON_KEY",
	"SUPABASE_SERVICE_ROLE_KEY",
] as const;
const REQUIRED_PUBLIC_ENV_KEYS = [
	"VITE_SUPABASE_URL",
	"VITE_SUPABASE_ANON_KEY",
] as const;

type RequiredEnvKey = (typeof REQUIRED_ENV_KEYS)[number];
type RequiredPublicEnvKey = (typeof REQUIRED_PUBLIC_ENV_KEYS)[number];

export type AppEnv = Readonly<Record<RequiredEnvKey, string>>;
export type PublicAppEnv = Readonly<Record<RequiredPublicEnvKey, string>>;

function validateKeys(source: EnvSource, keys: readonly string[]): string[] {
	return keys.filter((key) => {
		const value = source[key];
		return typeof value !== "string" || value.trim().length === 0;
	});
}

function getRequired(source: EnvSource, key: string): string {
	const value = source[key];
	if (typeof value !== "string" || value.trim().length === 0) {
		throw new Error(`Missing required environment variable: ${key}`);
	}

	return value;
}

export function readPublicEnv(source: EnvSource): PublicAppEnv {
	const missingKeys = validateKeys(source, REQUIRED_PUBLIC_ENV_KEYS);

	if (missingKeys.length > 0) {
		throw new Error(
			`Missing required environment variables: ${missingKeys.join(", ")}`,
		);
	}

	return {
		VITE_SUPABASE_URL: getRequired(source, "VITE_SUPABASE_URL"),
		VITE_SUPABASE_ANON_KEY: getRequired(source, "VITE_SUPABASE_ANON_KEY"),
	};
}

export function readEnv(source: EnvSource): AppEnv {
	const missingKeys = validateKeys(source, REQUIRED_ENV_KEYS);

	if (missingKeys.length > 0) {
		throw new Error(
			`Missing required environment variables: ${missingKeys.join(", ")}`,
		);
	}

	return {
		VITE_SUPABASE_URL: getRequired(source, "VITE_SUPABASE_URL"),
		VITE_SUPABASE_ANON_KEY: getRequired(source, "VITE_SUPABASE_ANON_KEY"),
		SUPABASE_SERVICE_ROLE_KEY: getRequired(source, "SUPABASE_SERVICE_ROLE_KEY"),
	};
}
