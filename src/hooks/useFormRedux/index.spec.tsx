import { store } from "@stores/index";
import { fireEvent, render } from "@test";
import { Provider } from "react-redux";
import { useFormRedux } from ".";

describe("useFormRedux hooks", () => {
    it("selector & dispatch should be run correctly", () => {
        const MockComponent = () => {
            const { data, submitFormData } = useFormRedux();

            return (
                <div data-testid="wrapper-test">
                    {data.data.map((item, idx) => (
                        <div key={idx} data-testid="test">
                            {JSON.stringify(item)}
                        </div>
                    ))}
                    <button
                        data-testid="add-data"
                        onClick={() =>
                            submitFormData({
                                address: "asdasd",
                                dob: "1990-01-01",
                                family: [],
                                job: "karyawan",
                                ktp: "28237827832",
                                name: "user tes",
                                phone: ["083872873"],
                            })
                        }
                    >
                        Add data
                    </button>
                </div>
            );
        };

        const { getByTestId, getAllByTestId } = render(
            <Provider store={store}>
                <MockComponent />
            </Provider>,
        );

        fireEvent.click(getByTestId("add-data"));
        expect(getAllByTestId("test").length).toBe(1);
        fireEvent.click(getByTestId("add-data"));
        expect(getAllByTestId("test").length).toBe(2);
    });
});
