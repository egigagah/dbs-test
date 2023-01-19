import { render } from "@test";
import { Footer } from "./index";

describe("Footer component testing", () => {
    it("renders without crashing", () => {
        const { container, getByTestId } = render(<Footer />);

        expect(container).toBeTruthy();
        expect(getByTestId("copyright")).toHaveTextContent(
            "Egi Gagah Brilliant © 2023",
        );
        expect(getByTestId("icons-container").children).toHaveLength(5);
    });
});
