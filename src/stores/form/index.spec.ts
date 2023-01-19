import formReducer, { submitForm, FormDatasType, getFormsData } from ".";
import { store } from "..";

describe("form reducer", () => {
    const initialState: FormDatasType = {
        data: [
            {
                address: "data test address",
                dob: "1990-03-01",
                family: [],
                job: "Karyawan",
                ktp: "62636475647362512",
                name: "user tes",
                phone: ["08272782"],
            },
        ],
    };
    it("should handle initial state", () => {
        expect(formReducer(undefined, { type: "unknown" })).toEqual({
            data: [],
        });
        expect(getFormsData(store.getState())).toEqual({ data: [] });
    });

    it("should handle submitForm without error", () => {
        const state = formReducer(
            initialState,
            submitForm({
                address: "data test address",
                dob: "1990-03-01",
                family: [],
                job: "Karyawan",
                ktp: "62636475647362512",
                name: "user tes",
                phone: ["08272782"],
            }),
        );
        expect(state.data.length).toEqual(2);
    });
});
