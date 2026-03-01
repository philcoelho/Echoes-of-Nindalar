import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HomeShadcnPreview } from "./home-shadcn-preview";

describe("HomeShadcnPreview", () => {
	it("renders shadcn primitives call-to-action", () => {
		const html = renderToStaticMarkup(<HomeShadcnPreview />);

		expect(html).toContain("Begin Adventure");
		expect(html).toContain("Initialize shadcn/ui primitives");
	});
});
