import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createSupabaseServerClient } from "./server";

const createClientMock = vi.fn();

vi.mock("@supabase/supabase-js", () => ({
	createClient: (...args: unknown[]) => createClientMock(...args),
}));

describe("createSupabaseServerClient", () => {
	beforeEach(() => {
		createClientMock.mockReset();
		createClientMock.mockReturnValue({ mocked: "client" });
	});

	afterEach(() => {
		vi.unstubAllEnvs();
		vi.unstubAllGlobals();
	});

	it("throws in browser-like runtime", () => {
		vi.stubGlobal("document", {} as Document);
		vi.stubEnv("VITE_SUPABASE_URL", "https://example.supabase.co");
		vi.stubEnv("VITE_SUPABASE_ANON_KEY", "anon-key");
		vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role-key");
		expect(() => createSupabaseServerClient()).toThrow(
			"createSupabaseServerClient must run on the server.",
		);
	});

	it("returns a configured supabase client in server runtime", () => {
		vi.stubEnv("VITE_SUPABASE_URL", "https://example.supabase.co");
		vi.stubEnv("VITE_SUPABASE_ANON_KEY", "anon-key");
		vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role-key");
		const result = createSupabaseServerClient();

		expect(createClientMock).toHaveBeenCalledTimes(1);
		expect(createClientMock).toHaveBeenCalledWith(
			"https://example.supabase.co",
			"service-role-key",
			{
				auth: {
					persistSession: false,
					autoRefreshToken: false,
				},
			},
		);
		expect(result).toEqual({ mocked: "client" });
	});
});
