import { render } from "@test";
import { SimpleModal } from ".";
import "@testing-library/jest-dom";
import { DataDefs } from "..";

describe("Modals component testing", () => {
    const mockData: DataDefs = {
        address: "address",
        dob: "1-10-2000",
        family: [
            {
                dob: "1-1-2000",
                name: "name 1",
                relation: "brother",
            },
        ],
        job: "karyawan",
        ktp: "232323232323",
        name: "test 1",
        phone: ["08281728712"],
    };
    const onClose = jest.fn();

    it("modal is open, should be renders without crashing", () => {
        const { getByTestId, queryByText } = render(
            <div>
                <SimpleModal isOpen={true} onClose={onClose} data={mockData} />
            </div>,
        );

        expect(getByTestId("modal-detail").parentElement).toBeTruthy();
        expect(
            queryByText("232323232323", { exact: false }),
        ).toBeInTheDocument();
        expect(getByTestId("data-families").childElementCount).toBe(1);
    });

    it("modal is close, shouldnt be rendered", () => {
        const { queryByTestId } = render(
            <div>
                <SimpleModal isOpen={false} onClose={onClose} data={mockData} />
            </div>,
        );

        expect(queryByTestId("modal-detail")).not.toBeInTheDocument();
    });
});
