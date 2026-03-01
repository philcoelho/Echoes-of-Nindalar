import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createSupabaseBrowserClient } from "./client";

const createClientMock = vi.fn();

vi.mock("@supabase/supabase-js", () => ({
	createClient: (...args: unknown[]) => createClientMock(...args),
}));

describe("createSupabaseBrowserClient", () => {
	beforeEach(() => {
		createClientMock.mockReset();
		createClientMock.mockReturnValue({ mocked: "browser-client" });
	});

	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("returns a configured browser client", () => {
		vi.stubEnv("VITE_SUPABASE_URL", "https://example.supabase.co");
		vi.stubEnv("VITE_SUPABASE_ANON_KEY", "anon-key");

		const result = createSupabaseBrowserClient();

		expect(createClientMock).toHaveBeenCalledTimes(1);
		expect(createClientMock).toHaveBeenCalledWith(
			"https://example.supabase.co",
			"anon-key",
			{
				auth: {
					persistSession: true,
					autoRefreshToken: true,
				},
			},
		);
		expect(result).toEqual({ mocked: "browser-client" });
	});
});
