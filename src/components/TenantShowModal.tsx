import { Badge, Box, Flex, Image, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, useColorModeValue, useDisclosure, VStack } from "@chakra-ui/react"
import useTenant from "../hooks/useTenant";
import { FaCalendarAlt, FaChevronDown, FaHome, FaIdCard, FaPhoneAlt, FaUser } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";

interface Props {
    tenantId: string,
    isOpen: boolean,
    onClose: () => void
}

const TenantShowModal = ({ tenantId }: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { tenant, isLoading } = useTenant(tenantId);

    return (
        <>

            <Box as="button" onClick={onOpen}>
                < FaChevronDown size='0.8em' />
            </Box>

            <Modal
                isCentered
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount={false}>

                <ModalOverlay />

                <ModalContent
                    overflow='hidden'
                    position='relative'
                    w={{ base: '90%', md: '100%', lg: '100%' }}>

                    <Box position='absolute'
                        top={{ base: 16, lg: 20 }}
                        right={{ base: 2, lg: 6 }}
                        zIndex='1'>
                        {isLoading
                            ? <Spinner size='sm' />
                            : <Image w={20} h={20} src={tenant.QrCode} />
                        }
                    </Box>

                    <Flex
                        gap={8}
                        alignItems='center'
                        bg={useColorModeValue('#f2f3f6', '#282828')}>

                        <Flex
                            h={14}
                            gap={6}
                            alignItems='center'
                            justifyContent='center'
                            ml={{ base: 5, lg: 8 }}>

                            <FaUser size='0.8em' />
                            <Text
                                ml={-2}
                                fontSize={{ base: 'lg', lg: 'xl' }}>
                                {tenant.tenantName || 'Tenant...'}
                            </Text>

                        </Flex>

                        <Badge
                            px={1}
                            variant='solid'
                            colorScheme={tenant.isActive ? 'green' : 'red'}>

                            <Text fontSize={{ base: 10, md: 11, lg: 10 }}>
                                {tenant.isActive ? 'Active' : 'Inactive'}
                            </Text>
                        </Badge>
                    </Flex>

                    <ModalCloseButton mt={1} />

                    <ModalBody>

                        <VStack
                            py={5}
                            spacing={3}
                            align="start"
                            fontSize={{ base: 'sm', lg: 16 }}>

                            <Flex alignItems='center' gap={5}>

                                <FaPhoneAlt size='0.8em' />

                                <Text fontWeight="bold">
                                    Phone:
                                </Text>
                                <Text>
                                    {tenant?.phone ? `0${tenant.phone}` : 'N/A'}
                                </Text>
                            </Flex>

                            <Flex alignItems='center' gap={5}>
                                <FaUser size='0.8em' />
                                <Text fontWeight="bold">
                                    Members:
                                </Text>
                                <Text>{tenant?.members || 0}</Text>
                            </Flex>

                            <Flex alignItems='center' gap={5}>
                                <FaIdCard size='0.8em' />
                                <Text fontWeight="bold">
                                    Rent:
                                </Text>
                                <Text>{tenant.idNumber
                                    ? `${String(tenant.idNumber).slice(0, 5)}-${String(tenant.idNumber).slice(5, 12)}-${String(tenant.idNumber).slice(12)}`
                                    : 'N/A'}
                                </Text>
                            </Flex>

                            <Flex alignItems='center' gap={5}>
                                <BsCreditCardFill size='0.8em' />
                                <Text fontWeight="bold">
                                    Rent:
                                </Text>
                                <Flex gap={2}>
                                    <Text fontWeight='semibold' opacity='50%'>Rs.</Text>
                                    <Text>{tenant.rentDecided || 0}</Text>
                                </Flex>
                            </Flex>

                            <Flex alignItems='center' gap={5}>
                                <FaCalendarAlt size='0.8em' />
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
                                    <FaHome size='0.8em' />
                                    <Text fontWeight="bold">
                                        Address:
                                    </Text>
                                </Flex>
                                <Text>{tenant.address || 'N/A'}
                                </Text>
                            </Flex>

                            <Box
                                mt={4}
                                borderRadius={5}
                                overflow='hidden'
                                position='relative'
                                border={isLoading ? '' : '2px solid'}
                                borderColor={useColorModeValue('#f2f3f6', '#282828')}>
                                {
                                    isLoading
                                        ? <Spinner size='sm' />
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