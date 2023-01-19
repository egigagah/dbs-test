import {
    Flex,
    Stack,
    Text,
    HStack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";
import moment from "moment";
import { DataDefs, FamilyDatas } from "..";

type SimpleModalProps = {
    onClose: () => void;
    isOpen: boolean;
    data: DataDefs;
};

export function SimpleModal({ isOpen, onClose, data }: SimpleModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Family Member of NIK {data.ktp}:</ModalHeader>
                <ModalBody data-testid="modal-detail">
                    <Stack gap={4} data-testid="data-families">
                        {data.family.map((item, idx) => (
                            <HStack key={idx} alignItems="flex-start" gap={4}>
                                <Text fontSize="2xl" fontWeight="bold">
                                    {idx + 1}.
                                </Text>
                                <Stack w="full">
                                    <Details
                                        title="Name:"
                                        value={item.name as string}
                                    />
                                    <Details
                                        title="Date of Birth:"
                                        value={
                                            moment(
                                                item.dob,
                                                "DD-MM-YYYY",
                                            ).format("D-MMM-YYYY") as string
                                        }
                                    />
                                    <Details
                                        title="Relationship Status:"
                                        value={item.relation as string}
                                    />
                                </Stack>
                            </HStack>
                        ))}
                    </Stack>
                </ModalBody>
                <ModalFooter as={Flex} alignItems="center" justifyContent="end">
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

function Details({ value, title }: { value: string | number; title: string }) {
    return (
        <HStack>
            <Text mb="0" fontWeight="bold">
                {title}
            </Text>
            <Text mb="0">{value}</Text>
        </HStack>
    );
}
