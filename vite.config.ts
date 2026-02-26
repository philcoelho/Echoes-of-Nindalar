import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(async () => {
	const plugins = [
		devtools(),
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	];

	try {
		const nitroVitePath: string = "nitro/vite";
		const { nitro } = await import(nitroVitePath);
		plugins.splice(1, 0, nitro({ rollupConfig: { external: [/^@sentry\//] } }));
	} catch {
		// Allow local dev when nitro/vite is temporarily unavailable.
	}

	return { plugins };
});
