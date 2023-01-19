import React, { useMemo, useState } from "react";
import {
    Flex,
    Stack,
    Text,
    HStack,
    Button,
    Badge,
    useDisclosure,
} from "@chakra-ui/react";
import { ColumnDefs, DataDefs, DataTable, SimpleModal } from "@components";
import moment from "moment";
import { useRouter } from "next/router";
import { useFormRedux } from "@hooks";

const Home: React.FC = () => {
    const { data } = useFormRedux();
    const [dataSelected, setDataSelected] = useState<DataDefs | undefined>();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const router = useRouter();

    function onDataSelected(d: DataDefs) {
        setDataSelected(d);
        onOpen();
    }

    const columnScheme: ColumnDefs[] = useMemo(() => {
        return [
            {
                column: "Name",
                target: "name",
            },
            {
                column: "eKTP",
                target: "ktp",
            },
            {
                column: "Address",
                target: "address",
                customColumn: (data) => (
                    <Text whiteSpace="pre-line">{data}</Text>
                ),
            },
            {
                column: "Date of Birth",
                target: "dob",
                customColumn: (data) => (
                    <>{moment(data, "YYYY-MM-DD").format("D-MMM-YYYY")}</>
                ),
            },
            {
                column: "Job",
                target: "job",
            },
            {
                column: "Phone Number",
                target: "phone",
                customColumn: (data) => {
                    return (
                        <HStack spacing={2}>
                            {Array.isArray(data) &&
                                data.map((chldItem: string, idx: number) => (
                                    <Badge key={idx}>{chldItem}</Badge>
                                ))}
                        </HStack>
                    );
                },
            },
            {
                column: "Family",
                target: "family",
                customColumn: (data, row) => {
                    return (
                        <Button
                            size="xs"
                            variant="outline"
                            colorScheme="telegram"
                            onClick={() => onDataSelected(row)}
                            disabled={data.length < 1}
                        >{`Show (${data.length || 0})`}</Button>
                    );
                },
            },
        ];
    }, []);

    return (
        <Flex
            flex={1}
            direction="column"
            minH="90vh"
            py={[8, 10]}
            px={[6, 8, 16]}
        >
            <Stack as={Flex} flex={1} w="full">
                <HStack justifyContent="space-between">
                    <Text
                        fontSize={["lg", "xl", "2xl"]}
                        fontWeight="bold"
                        mb={0}
                    >
                        List Users
                    </Text>
                    <Button
                        colorScheme="telegram"
                        onClick={() => router.push("/create")}
                        size="sm"
                    >
                        Create New User
                    </Button>
                </HStack>
                <DataTable columnDefs={columnScheme} data={data.data} />
                {dataSelected && (
                    <SimpleModal
                        isOpen={isOpen}
                        onClose={onClose}
                        data={dataSelected}
                    />
                )}
            </Stack>
        </Flex>
    );
};

export default Home;
