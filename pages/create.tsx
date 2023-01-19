import { Button, Flex, HStack, Stack, Text, Textarea } from "@chakra-ui/react";
import {
    TextInput,
    WrapperInput,
    PhoneInput,
    FamilyInput,
    DataDefs,
} from "@components";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useFormRedux } from "@hooks";
import * as Yup from "yup";
import moment from "moment";

const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    ktp: Yup.string()
        .matches(/[0-9]/, "KTP is not valid")
        .length(16, "KTP must be 16 chars")
        .required("KTP is Required"),
    dob: Yup.date()
        .max(new Date(), "Date Of Birth should be lower than today")
        .required("Date Of Birth is Required"),
    job: Yup.string().required("Job is Required"),
    address: Yup.string().required("Address is Required"),
    phone: Yup.array()
        .of(Yup.string().required("Phone Number is Not Valid"))
        .min(1, "Phone Number is Required")
        .required("Phone Number is Required"),
    family: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required("Name is Required"),
                dob: Yup.date()
                    .max(new Date(), "Date Of Birth should be lower than today")
                    .required("Date Of Birth is Required"),
                relation: Yup.string().required("Relationship is Required"),
            }),
        )
        .required("Family Member is Required"),
});

const App: React.FC = () => {
    const router = useRouter();
    const { submitFormData } = useFormRedux();

    return (
        <Flex py={[8, 10]} px={[6, 8, 16]}>
            <Formik
                initialValues={{
                    name: "",
                    address: "",
                    dob: "",
                    job: "",
                    ktp: "",
                    phone: [""],
                    family: [{ name: "", dob: "", relation: "brother" }],
                }}
                onSubmit={(d: DataDefs) => {
                    submitFormData(d);
                    router.replace("/");
                }}
                validationSchema={formSchema}
                validateOnChange={true}
            >
                {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    handleBlur,
                    handleChange,
                    handleReset,
                    handleSubmit,
                }) => (
                    <form
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                        style={{ width: "100%" }}
                    >
                        <Stack as={Flex} flex={1} gap={[8, 4, 8]}>
                            <Text
                                fontSize={["lg", "xl", "2xl"]}
                                fontWeight="bold"
                                mb={0}
                            >
                                Create Form
                            </Text>
                            <Stack
                                direction={["column", "row"]}
                                w="full"
                                alignItems="flex-start"
                                gap={8}
                            >
                                <Stack as={Flex} flex={1} w="full">
                                    <TextInput
                                        errors={!!touched.name && !!errors.name}
                                        errorMessage={errors.name}
                                        label="Name"
                                        name="name"
                                        placeholder="Fullname"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <WrapperInput
                                        label="Address"
                                        errors={
                                            touched.address && !!errors.address
                                        }
                                        errorMessage={errors.address}
                                    >
                                        <Textarea
                                            name="address"
                                            placeholder="Full Address"
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </WrapperInput>
                                    <TextInput
                                        errors={touched.ktp && !!errors.ktp}
                                        errorMessage={errors.ktp}
                                        label="eKTP"
                                        name="ktp"
                                        placeholder="KTP Number"
                                        value={values.ktp}
                                        onKeyPress={(e) => {
                                            if (
                                                !/[0-9]/.test(e.key) &&
                                                e.key !== "Enter"
                                            ) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={handleChange}
                                        maxLength={16}
                                        onBlur={handleBlur}
                                    />
                                    <TextInput
                                        errors={touched.job && !!errors.job}
                                        errorMessage={errors.job}
                                        placeholder="Current Job"
                                        label="Job"
                                        name="job"
                                        value={values.job}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextInput
                                        errors={touched.dob && !!errors.dob}
                                        errorMessage={errors.dob}
                                        label="Date of Birth"
                                        placeholder="Date of Birth"
                                        name="dob"
                                        value={values.dob}
                                        type="date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        max={moment().format("YYYY-MM-DD")}
                                    />
                                </Stack>

                                <Stack as={Flex} flex={1} w="full">
                                    <PhoneInput
                                        errors={errors.phone}
                                        value={values.phone}
                                        touched={touched}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Stack>
                            </Stack>
                            <FamilyInput
                                errors={errors.family}
                                value={values.family}
                                touched={touched}
                                onChange={setFieldValue}
                                onBlur={handleBlur}
                            />
                            <HStack justifyContent="flex-end">
                                <Button
                                    type="button"
                                    onClick={() => router.replace("/")}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" colorScheme="telegram">
                                    Submit
                                </Button>
                            </HStack>
                        </Stack>
                    </form>
                )}
            </Formik>
        </Flex>
    );
};

export default App;
