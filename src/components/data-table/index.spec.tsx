import { render } from "@test";
import { DataTable } from ".";
import "@testing-library/jest-dom";
import { ColumnDefs, DataDefs } from "..";

describe("DataTable component testing", () => {
    const columnScheme: ColumnDefs[] = [
        {
            column: "Name",
            target: "name",
        },
        {
            column: "eKTP",
            target: "ktp",
        },
        {
            column: "Address",
            target: "address",
        },
        {
            column: "Date of Birth",
            target: "dob",
            customColumn: (data) => <>{data}</>,
        },
        {
            column: "Job",
            target: "job",
        },
        {
            column: "Phone Number",
            target: "phone",
        },
        {
            column: "Family",
            target: "family",
        },
    ];

    const mockData: DataDefs[] = [
        {
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
        },
    ];

    it("render with data and should be renders without crashing", () => {
        const { getByTestId, queryByText } = render(
            <div>
                <DataTable data={mockData} columnDefs={columnScheme} />
            </div>,
        );

        expect(getByTestId("data-table").parentElement).toBeTruthy();
        expect(queryByText("232323232323")).toBeInTheDocument();
        expect(getByTestId("data-row").childElementCount).toBe(mockData.length);
        expect(getByTestId("data-col").childElementCount).toBe(
            columnScheme.length,
        );
    });
});
