import { DataDefs } from "@components/index";
import { FormDatasType, getFormsData, submitForm } from "@stores/form";
import { useAppDispatch, useAppSelector } from "../stores";

type UseFormReduxType = {
    data: FormDatasType;
    submitFormData: (d: DataDefs) => void;
};
export function useFormRedux(): UseFormReduxType {
    const data = useAppSelector(getFormsData);
    const dispatch = useAppDispatch();
    const submitFormData = (d: DataDefs) => {
        dispatch(submitForm(d));
    };
    return { data, submitFormData };
}
