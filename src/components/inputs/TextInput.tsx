import {
    forwardRef,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
} from "@chakra-ui/react";
import WrapperInput from "./wrapper";
import { FaCheck, FaTimes } from "react-icons/fa";

type TextInputProps = InputProps & {
    errorMessage?: string;
    errors?: boolean;
    label?: string;
};

const TextInput = forwardRef<TextInputProps, "input">(
    ({ label, errors, errorMessage, ...rest }, ref) => {
        return (
            <WrapperInput
                label={label}
                errors={errors}
                errorMessage={errorMessage}
            >
                <InputGroup>
                    <Input {...rest} {...ref} />
                    <InputRightElement
                        children={
                            <>
                                {errors && <FaTimes color="red" />}
                                {!errors && !!rest.value && (
                                    <FaCheck color="green" />
                                )}
                            </>
                        }
                    />
                </InputGroup>
            </WrapperInput>
        );
    },
);

export default TextInput;
