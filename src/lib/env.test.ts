import { describe, expect, it } from "vitest";
import { readEnv, readPublicEnv, readServerEnv } from "./env";

describe("env", () => {
	it("throws when all required supabase vars are missing", () => {
		expect(() => readEnv({})).toThrow(
			"Missing required environment variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY",
		);
	});

	it("throws when one required server variable is missing", () => {
		expect(() =>
			readEnv({
				VITE_SUPABASE_URL: "https://example.supabase.co",
				VITE_SUPABASE_ANON_KEY: "anon-key",
			}),
		).toThrow(
			"Missing required environment variables: SUPABASE_SERVICE_ROLE_KEY",
		);
	});

	it("returns server env contract when all required variables exist", () => {
		expect(
			readEnv({
				VITE_SUPABASE_URL: "https://example.supabase.co",
				VITE_SUPABASE_ANON_KEY: "anon-key",
				SUPABASE_SERVICE_ROLE_KEY: "service-role-key",
			}),
		).toEqual({
			VITE_SUPABASE_URL: "https://example.supabase.co",
			VITE_SUPABASE_ANON_KEY: "anon-key",
			SUPABASE_SERVICE_ROLE_KEY: "service-role-key",
		});
	});

	it("throws when one required public variable is missing", () => {
		expect(() =>
			readPublicEnv({
				VITE_SUPABASE_URL: "https://example.supabase.co",
			}),
		).toThrow("Missing required environment variables: VITE_SUPABASE_ANON_KEY");
	});

	it("returns public env contract when required public variables exist", () => {
		expect(
			readPublicEnv({
				VITE_SUPABASE_URL: "https://example.supabase.co",
				VITE_SUPABASE_ANON_KEY: "anon-key",
			}),
		).toEqual({
			VITE_SUPABASE_URL: "https://example.supabase.co",
			VITE_SUPABASE_ANON_KEY: "anon-key",
		});
	});

	it("throws when required server variable is missing", () => {
		expect(() =>
			readServerEnv({
				VITE_SUPABASE_URL: "https://example.supabase.co",
			}),
		).toThrow(
			"Missing required environment variables: SUPABASE_SERVICE_ROLE_KEY",
		);
	});

	it("returns server env contract for server-only consumer", () => {
		expect(
			readServerEnv({
				VITE_SUPABASE_URL: "https://example.supabase.co",
				SUPABASE_SERVICE_ROLE_KEY: "service-role-key",
			}),
		).toEqual({
			VITE_SUPABASE_URL: "https://example.supabase.co",
			SUPABASE_SERVICE_ROLE_KEY: "service-role-key",
		});
	});
});
