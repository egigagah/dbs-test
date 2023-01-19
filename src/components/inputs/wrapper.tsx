import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Stack,
} from "@chakra-ui/react";

type WrapperInputProps = {
    label?: string;
    children: React.ReactNode;
    errorMessage?: string;
    errors?: boolean;
};

export default function WrapperInput({
    errors,
    label,
    children,
    errorMessage,
}: WrapperInputProps): JSX.Element {
    return (
        <FormControl isInvalid={errors}>
            <FormLabel>{label}</FormLabel>
            <Stack minH="16">
                {children}
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
            </Stack>
        </FormControl>
    );
}
