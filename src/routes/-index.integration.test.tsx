import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { App } from "./index";

describe("home route integration", () => {
	it("renders shadcn preview inside the home route", () => {
		const html = renderToStaticMarkup(<App />);

		expect(html).toContain("Initialize shadcn/ui primitives");
		expect(html).toContain("Begin Adventure");
	});
});
