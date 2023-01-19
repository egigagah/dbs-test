import { fireEvent, render } from "@test";
import { Formik } from "formik";
import * as Yup from "yup";

import { TextInput, SelectInput, PhoneInput, FamilyInput } from ".";

describe("TextInput component testing", () => {
    it("renders without crashing", () => {
        const { getByTestId, getByLabelText } = render(
            <TextInput data-testid="text-input" label="Test" name="data" />,
        );

        const el = getByTestId("text-input");
        expect(el.parentElement).toBeTruthy();
        expect(el).toBeInTheDocument();
        expect(el).toHaveAttribute("name", "data");
        expect(getByLabelText("Test")).toBeInTheDocument();
    });

    it("renders with error validation", () => {
        const { getByText } = render(
            <TextInput
                data-testid="text-input"
                errors={true}
                errorMessage="Error"
                label="Test"
                name="data"
            />,
        );

        expect(getByText("Error")).toBeInTheDocument();
    });
});

describe("SelectInput component testing", () => {
    it("renders without crashing", () => {
        const { getByTestId, getByLabelText } = render(
            <SelectInput data-testid="select-input" label="Test" name="data" />,
        );

        const el = getByTestId("select-input");
        expect(el.parentElement).toBeDefined();
        expect(el).toBeInTheDocument();
        expect(el).toHaveAttribute("name", "data");
        expect(getByLabelText("Test")).toBeInTheDocument();
    });
});

describe("PhoneInput component testing", () => {
    const schema = Yup.object().shape({
        phone: Yup.array().of(
            Yup.string().required("Phone Number is Required"),
        ),
    });
    it("renders without crashing", () => {
        const { getByTestId, getAllByTestId, queryByText } = render(
            <Formik
                initialValues={{ phone: [""] }}
                validationSchema={schema}
                onSubmit={jest.fn()}
            >
                {({ errors, values, touched, handleChange, handleBlur }) => (
                    <PhoneInput
                        errors={errors.phone}
                        value={values.phone}
                        touched={touched}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                )}
            </Formik>,
        );

        const el = getByTestId("phone-input-array");
        expect(el).toBeInTheDocument();

        // click add phone
        fireEvent.click(getByTestId("add-phone-btn"));
        fireEvent.click(getByTestId("add-phone-btn"));
        const inputs = getAllByTestId(
            "phone-input-array",
        ) as HTMLInputElement[];
        expect(inputs.length).toBe(3);
        fireEvent.keyPress(inputs[2], { key: "A", code: 65, charCode: 65 });
        expect(inputs[2].value).toBe("");
        fireEvent.blur(inputs[2], { target: { value: "" } });

        // click rmv btn
        fireEvent.click(getAllByTestId("delete-btn")[1]);
        fireEvent.click(getAllByTestId("delete-btn")[1]);
        expect(getAllByTestId("phone-input-array").length).toBe(1);

        const newInputs = getAllByTestId(
            "phone-input-array",
        )[0] as HTMLInputElement;
        fireEvent.change(newInputs, { target: { value: "0000" } });
        expect(newInputs.value).toBe("0000");
        fireEvent.blur(newInputs, { target: { value: "" } });
        fireEvent.keyPress(newInputs, { key: "A", code: 65, charCode: 65 });
        fireEvent.keyPress(newInputs, { key: 1, code: 49, charCode: 49 });
        expect(queryByText("Phone Number is Not Valid")).toBeDefined();
    });
});

describe("FamilyInput component testing", () => {
    const schema = Yup.object().shape({
        family: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().required("Name is Required"),
                    dob: Yup.date()
                        .max(
                            new Date(),
                            "Date Of Birth should be lower than today",
                        )
                        .required("Date Of Birth is Required"),
                    relation: Yup.string().required("Relationship is Required"),
                }),
            )
            .required("Phone is Required"),
    });
    it("renders without crashing", () => {
        const { getByTestId, getAllByTestId, queryByText } = render(
            <Formik
                initialValues={{
                    family: [{ name: "", dob: "", relation: "brother" }],
                }}
                validationSchema={schema}
                onSubmit={jest.fn()}
            >
                {({ errors, values, touched, setFieldValue, handleBlur }) => (
                    <FamilyInput
                        errors={errors.family}
                        value={values.family}
                        touched={touched}
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                    />
                )}
            </Formik>,
        );

        // click add phone
        fireEvent.click(getByTestId("add-family-btn"));
        const inputs = getAllByTestId(
            "family-name-input",
        ) as HTMLInputElement[];
        expect(inputs.length).toBe(2);

        // click rmv btn
        fireEvent.click(getAllByTestId("delete-family-btn")[1]);
        expect(getAllByTestId("family-name-input").length).toBe(1);

        // test name field
        const nameInputs = getAllByTestId(
            "family-name-input",
        )[0] as HTMLInputElement;
        fireEvent.change(nameInputs, { target: { value: "name test" } });
        expect(nameInputs.value).toBe("name test");
        fireEvent.blur(nameInputs, { target: { value: "" } });
        expect(nameInputs.value).toBe("");
        expect(queryByText("Name is Required")).toBeDefined();

        // test dob field
        const dobInputs = getAllByTestId(
            "family-dob-input",
        )[0] as HTMLInputElement;
        fireEvent.change(dobInputs, { target: { value: "1990-01-01" } });
        expect(dobInputs.value).toBe("1990-01-01");
        fireEvent.blur(dobInputs, { target: { value: "" } });
        expect(dobInputs.value).toBe("");
        expect(queryByText("Date Of Birth is Required")).toBeDefined();
        fireEvent.change(dobInputs, { target: { value: "2025-01-01" } });
        expect(
            queryByText("Date Of Birth should be lower than today"),
        ).toBeDefined();

        // test relation field
        const relationInputs = getAllByTestId(
            "family-relation-input",
        )[0] as HTMLInputElement;
        fireEvent.change(relationInputs, { target: { value: "sister" } });
        expect(relationInputs.value).toBe("sister");
        expect(queryByText("Date Of Birth is Required")).toBeDefined();
    });
});
