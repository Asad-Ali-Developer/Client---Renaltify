import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react";

interface Props {
    tenantId: string,
    isOpen: boolean,
    onClose: () => void
}


const TenantDeleteBox = ({ tenantId }: Props) => {

    const cancelRef = useRef<HTMLButtonElement>(null);
    const { isOpen, onClose } = useDisclosure();

    console.log(tenantId);
    

    return (
        <>

            {/* AlertDialog for Delete Confirmation */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
                motionPreset="slideInBottom">

                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Delete Tenant?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <Flex gap={1}>
                                <Text>Are you sure you want to delete</Text>
                                <Text style={{ fontWeight: "bold" }}>  </Text>?
                            </Flex>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            {/* <Button colorScheme="red" onClick={deleteTenant} ml={3}>
                  Yes
                </Button> */}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </>
    )
}

export default TenantDeleteBox