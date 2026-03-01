import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createSupabaseServerClient } from "./server";

const originalProcessEnv = process.env;
const createClientMock = vi.fn();

vi.mock("@supabase/supabase-js", () => ({
	createClient: (...args: unknown[]) => createClientMock(...args),
}));

function withRequiredServerEnv(): NodeJS.ProcessEnv {
	return {
		...process.env,
		VITE_SUPABASE_URL: "https://example.supabase.co",
		VITE_SUPABASE_ANON_KEY: "anon-key",
		SUPABASE_SERVICE_ROLE_KEY: "service-role-key",
	};
}

describe("createSupabaseServerClient", () => {
	beforeEach(() => {
		createClientMock.mockReset();
		createClientMock.mockReturnValue({ mocked: "client" });
	});

	afterEach(() => {
		delete (globalThis as { document?: Document }).document;
		process.env = originalProcessEnv;
	});

	it("throws in browser-like runtime", () => {
		(globalThis as { document?: Document }).document = {} as Document;
		expect(() => createSupabaseServerClient()).toThrow(
			"createSupabaseServerClient must run on the server.",
		);
	});

	it("returns a configured supabase client in server runtime", () => {
		process.env = withRequiredServerEnv();
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
