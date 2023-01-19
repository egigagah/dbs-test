import { Button, Divider, HStack, IconButton, Stack } from "@chakra-ui/react";
import { SelectInput, TextInput, WrapperInput } from "@components";
import { FieldArray } from "formik";
import { AiFillDelete } from "react-icons/ai";
import { ChangeEvent, FocusEvent } from "react";
import moment from "moment";

type FamilyInputProps = {
    value: any[];
    onChange: (d: string, e: ChangeEvent<any> | string, c?: boolean) => void;
    touched: any;
    onBlur: (e: FocusEvent<any, Element>) => void;
    errors: any;
};

export default function FamilyInput({
    value,
    onChange,
    touched,
    onBlur,
    errors,
}: FamilyInputProps): JSX.Element {
    return (
        <FieldArray
            name="family"
            render={({ push, remove }) => (
                <WrapperInput label={`Family Member (${value.length})`}>
                    <Divider />
                    <Stack spacing={4} py={4}>
                        {value.map((item, idx) => (
                            <HStack
                                key={`family-${idx}`}
                                data-testid={`family-input-wrapper`}
                            >
                                <Stack direction={["column", "row"]} w="full">
                                    <TextInput
                                        label="Name"
                                        placeholder="Fullname"
                                        name={`family[${idx}].name`}
                                        value={item.name}
                                        onChange={(d) =>
                                            onChange(
                                                `family[${idx}].name`,
                                                d.target.value,
                                                true,
                                            )
                                        }
                                        data-testid="family-name-input"
                                        onBlur={onBlur}
                                        errors={
                                            !!touched?.family?.[idx]?.name &&
                                            !!errors?.[idx]?.name
                                        }
                                        errorMessage={
                                            errors && errors?.[idx]?.name
                                        }
                                    />
                                    <TextInput
                                        label="Date of Birth"
                                        name={`family[${idx}].dob`}
                                        data-testid="family-dob-input"
                                        value={item.dob}
                                        type="date"
                                        max={moment().format("YYYY-MM-DD")}
                                        onChange={(d) =>
                                            onChange(
                                                `family[${idx}].dob`,
                                                d.target.value,
                                                true,
                                            )
                                        }
                                        onBlur={onBlur}
                                        errors={
                                            !!touched?.family?.[idx]?.dob &&
                                            !!errors?.[idx]?.dob
                                        }
                                        errorMessage={
                                            errors && errors?.[idx]?.dob
                                        }
                                    />
                                    <SelectInput
                                        label="Relationship Status"
                                        data-testid="family-relation-input"
                                        name={`family[${idx}].relation`}
                                        value={item.relation}
                                        onChange={(d) =>
                                            onChange(
                                                `family[${idx}].relation`,
                                                d.target.value,
                                                true,
                                            )
                                        }
                                        onBlur={onBlur}
                                    >
                                        {[
                                            "brother",
                                            "sister",
                                            "parent",
                                            "child",
                                        ].map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </SelectInput>
                                </Stack>
                                {value.length > 1 && (
                                    <IconButton
                                        aria-label="delete-family"
                                        data-testid="delete-family-btn"
                                        variant="ghost"
                                        colorScheme="red"
                                        icon={<AiFillDelete />}
                                        onClick={() => remove(idx)}
                                        w="max"
                                    />
                                )}
                            </HStack>
                        ))}
                        <HStack justifyContent="center">
                            <Button
                                type="button"
                                onClick={() =>
                                    push({
                                        name: "",
                                        dob: "",
                                        relation: "brother",
                                    })
                                }
                                data-testid="add-family-btn"
                                variant="outline"
                                colorScheme="telegram"
                            >
                                Add Family Member
                            </Button>
                        </HStack>
                    </Stack>
                </WrapperInput>
            )}
        />
    );
}
