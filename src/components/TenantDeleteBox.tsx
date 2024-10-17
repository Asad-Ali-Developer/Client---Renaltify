import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Flex,
    Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import useDeleteTenant from "../hooks/useDeleteTenant";
import { toast } from "react-toastify";

interface Props {
    tenantId: string | null;
    tenantName: string | null;
    isOpen: boolean;
    onClose: () => void;
}

const TenantDeleteBox = ({ tenantId, isOpen, onClose, tenantName }: Props) => {

    const cancelRef = useRef<HTMLButtonElement>(null);

    const _id = tenantId;

    const { mutate } = useDeleteTenant()


    const handleDeleteBtn = async () => {
        if (_id) {
            mutate(_id, {
                onSuccess: () => {
                    toast.success('Tenant deleted successfully')
                },

                onError: () => {
                    toast.error('Not deleted tenant')
                }
            })
            onClose();
        }
    }


    return (
        <AlertDialog
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}>

            <AlertDialogOverlay>

                <AlertDialogContent fontSize={{ base: 14, lg: 16 }}>
                    <AlertDialogHeader>Delete Tenant?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <Flex gap={1}>
                            <Text>Are you sure you want to delete</Text>
                            <Text fontWeight="bold">{tenantName}</Text>?
                        </Flex>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme="red" ml={3}
                            onClick={handleDeleteBtn}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog >
    );
};

export default TenantDeleteBox;
