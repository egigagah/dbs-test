import { render } from "@test";

import { Header } from "./index";

describe("Header component testing", () => {
    it("renders without crashing", () => {
        const { getByTestId } = render(<Header />);

        const container = getByTestId("header");
        expect(container.parentElement).toBeTruthy();
        expect(container.firstChild).toBeDefined();
    });
});
