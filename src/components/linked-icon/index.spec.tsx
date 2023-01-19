import { render } from "@test";

import { LinkedIcon } from "./index";
import { RiGithubFill } from "react-icons/ri";

describe("LinkedIcon component testing", () => {
    it("renders passed icon component without crashing", () => {
        const { getByTestId } = render(
            <LinkedIcon
                icon={RiGithubFill}
                href="https://github.com/egigagah"
                target="_blank"
            />,
        );

        const container = getByTestId("linked-icon");
        expect(container).toBeInTheDocument();
        expect(container).toHaveAttribute(
            "href",
            "https://github.com/egigagah",
        );
        expect(container).toHaveAttribute("target", "_blank");
    });
});
