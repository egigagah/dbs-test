import { DataDefs } from "@components/index";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface FormDatasType {
    data: DataDefs[] | never[];
}
// Define the initial state using that type
const initialState: FormDatasType = {
    data: [],
};

export const formSlice = createSlice({
    name: "forms",
    initialState,
    reducers: {
        submitForm: (state, { payload }) => {
            state.data = [...state.data, payload];
        },
    },
});

export const { submitForm } = formSlice.actions;
export const getFormsData = (state: RootState): FormDatasType => state.forms;
export default formSlice.reducer;
