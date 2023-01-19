import { Select, SelectProps } from "@chakra-ui/react";
import WrapperInput from "./wrapper";

type SelectInputProps = SelectProps & {
    errorMessage?: string;
    errors?: boolean;
    label?: string;
};

export default function SelectInput({
    errors,
    errorMessage,
    label,
    ...rest
}: SelectInputProps): JSX.Element {
    return (
        <WrapperInput label={label} errors={errors} errorMessage={errorMessage}>
            <Select {...rest} />
        </WrapperInput>
    );
}
