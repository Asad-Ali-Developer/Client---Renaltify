import { Badge, Box, Button, Flex, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, useColorModeValue, useDisclosure, VStack } from "@chakra-ui/react";
import { BsCreditCardFill } from "react-icons/bs";
import { FaCalendarAlt, FaHome, FaIdCard, FaPhoneAlt, FaUser } from "react-icons/fa";
import useTenant from "../hooks/useTenant";
import StatusUpdater from "./StatusUpdater";

interface Props {
    tenantId: string,
    isOpen: boolean,
    onClose: () => void
}

const TenantShowModal = ({ tenantId }: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { tenant, isLoading } = useTenant(tenantId);

    console.log(tenantId);
    

    return (
        <>

            <Button
                px={0}
                type="button"
                onClick={onOpen}
                bg="#FF6B6B"
                // colorScheme='red'
                // _hover={{ bg: "#FF8E8E" }}
                // color="white"
                fontWeight='semibold'
                backgroundColor='transparent'
                fontSize={{ base: 12, md: 14 }}
                _hover={{ backgroundColor: 'transparent' }}
                color={useColorModeValue('#FF6B6B', '#FF8E8E')}
                >
                View
            </Button>

            <Modal
                isCentered
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount={false}
                motionPreset='slideInBottom'>

                <ModalOverlay />

                <ModalContent
                    overflow='hidden'
                    w={{ base: '90%', md: '100%', lg: '100%' }}>

                    <Flex
                        gap={8}
                        alignItems='center'
                        bg={useColorModeValue('#f2f3f6', '#282828')}>

                        <Flex
                            gap={6}
                            alignItems='center'
                            justifyContent='center'
                            ml={{ base: 5, lg: 8 }}
                            h={{ base: 12, lg: 14 }}>

                            <FaUser size='1em' />
                            <Text
                                ml={-2}
                                fontSize={{ base: 'lg', lg: 'xl' }}>
                                {tenant.tenantName || 'Tenant...'}
                            </Text>

                        </Flex>

                        <Flex
                            gap={1}
                            alignItems='center'>

                            <Badge
                                px={1}
                                py={0.5}
                                variant='solid'
                                colorScheme={tenant.isActive ? 'green' : 'red'}>
                                <Text fontSize={{ base: 10, md: 11, lg: 12 }}>
                                    {tenant.isActive ? 'Active' : 'Inactive'}
                                </Text>
                            </Badge>

                            <StatusUpdater
                                tenantId={tenant._id} />

                        </Flex>
                    </Flex>

                    <ModalCloseButton mt={{ base: 0, lg: 1 }} />

                    <ModalBody>

                        <VStack
                            py={5}
                            spacing={3}
                            align="start"
                            fontSize={{ base: 'sm', lg: 16 }}>

                            <Flex alignItems='center' gap={5}>

                                <FaPhoneAlt size='1em' />

                                <Text fontWeight="bold">
                                    Phone:
                                </Text>
                                <Text>
                                    {tenant?.phone ? `0${tenant.phone}` : 'N/A'}
                                </Text>
                            </Flex>

                            <Flex alignItems='center' gap={5}>
                                <FaUser size='1em' />
                                <Text fontWeight="bold">
                                    Members:
                                </Text>
                                <Text>{tenant?.members || 0}</Text>
                            </Flex>

                            <Flex alignItems='center' gap={5}>
                                <FaIdCard size='1em' />
                                <Text fontWeight="bold">
                                    ID Card:
                                </Text>
                                <Text>{tenant.idNumber
                                    ? `${String(tenant.idNumber).slice(0, 5)}-${String(tenant.idNumber).slice(5, 12)}-${String(tenant.idNumber).slice(12)}`
                                    : 'N/A'}
                                </Text>
                            </Flex>

                            <Flex alignItems='center' gap={5}>
                                <BsCreditCardFill size='1em' />
                                <Text fontWeight="bold">
                                    Rent:
                                </Text>
                                <Flex gap={2}>
                                    <Text fontWeight='semibold' opacity='50%'>Rs.</Text>
                                    <Text>{tenant.rentDecided || 0}</Text>
                                </Flex>
                            </Flex>

                            <Flex alignItems='center' gap={5}>
                                <FaCalendarAlt size='1em' />
                                <Text fontWeight="bold">
                                    Date:
                                </Text>
                                <Text>
                                    {tenant?.date
                                        ? new Date(tenant.date).toLocaleDateString()
                                        : 'N/A'}
                                </Text>
                            </Flex>

                            <Flex gap={5} alignItems='center'>
                                <Flex gap={5} alignItems='center'>
                                    <FaHome size='1em' />
                                    <Text fontWeight="bold">
                                        Address:
                                    </Text>
                                </Flex>
                                <Text>{tenant.address || 'N/A'}
                                </Text>
                            </Flex>

                            <Box
                                mt={4}
                                mx='auto'
                                borderRadius={5}
                                overflow='hidden'
                                objectFit='cover'
                                position='relative'
                                objectPosition='center center'
                                border={isLoading ? '' : '2px solid'}
                                borderColor={useColorModeValue('#f2f3f6', 'white')}>
                                {
                                    isLoading
                                        ? <Spinner color='blue.500' size='sm' />
                                        : <Img src={tenant.IdFileLink}
                                            alt='N/A' />
                                }
                            </Box>

                        </VStack>

                    </ModalBody>

                </ModalContent>
            </Modal>

        </>
    )
}

export default TenantShowModal