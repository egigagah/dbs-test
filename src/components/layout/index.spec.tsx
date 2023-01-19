import { render } from "@test";

import Layout from "./index";

describe("Header component testing", () => {
    const { getByTestId } = render(<Layout />);

    const container = getByTestId("layout");

    it("renders without crashing", () => {
        expect(container.parentElement).toBeTruthy();
    });

    it("renders successfuly next.js logo", () => {
        expect(container.childElementCount).toBeGreaterThan(1);
    });
});
