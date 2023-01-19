import { Button, HStack, IconButton, Stack } from "@chakra-ui/react";
import { TextInput, WrapperInput } from "@components";
import { FieldArray } from "formik";
import { AiFillDelete } from "react-icons/ai";
import { ChangeEvent, FocusEvent } from "react";

type PhoneInputProps = {
    value: any[];
    onChange: (e: ChangeEvent<any>) => void;
    touched: any;
    onBlur: (e: FocusEvent<any, Element>) => void;
    errors: any;
};

export default function PhoneInput({
    value,
    onChange,
    touched,
    onBlur,
    errors,
}: PhoneInputProps): JSX.Element {
    return (
        <FieldArray
            name="phone"
            render={({ remove, push }) => (
                <WrapperInput label="Phone">
                    <Stack w="full">
                        {value.map((item, idx) => (
                            <HStack
                                key={`phone-${idx}`}
                                alignItems="flex-start"
                            >
                                <TextInput
                                    data-testid={`phone-input-array`}
                                    name={`phone.${idx}`}
                                    placeholder="Phone Number"
                                    value={item}
                                    onKeyPress={(e) => {
                                        if (
                                            !/[0-9]/.test(e.key) &&
                                            e.key !== "Enter"
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={onChange}
                                    errors={
                                        !!touched.phone?.[idx] &&
                                        !!errors?.[idx]
                                    }
                                    errorMessage={errors && errors?.[idx]}
                                    onBlur={onBlur}
                                />
                                {value.length > 1 && (
                                    <IconButton
                                        aria-label="delete"
                                        data-testid="delete-btn"
                                        variant="ghost"
                                        colorScheme="red"
                                        icon={<AiFillDelete size={18} />}
                                        onClick={() => remove(idx)}
                                    />
                                )}
                            </HStack>
                        ))}
                        <HStack justifyContent="center">
                            <Button
                                type="button"
                                onClick={() => push("")}
                                data-testid="add-phone-btn"
                                variant="outline"
                                colorScheme="telegram"
                            >
                                Add Phone
                            </Button>
                        </HStack>
                    </Stack>
                </WrapperInput>
            )}
        />
    );
}
