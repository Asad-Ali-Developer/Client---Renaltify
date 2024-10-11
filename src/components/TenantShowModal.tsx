import { Badge, Box, Flex, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, VStack } from "@chakra-ui/react"
import useTenant from "../hooks/useTenant";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCalendarAlt, FaHome, FaIdCard, FaPhoneAlt, FaUser } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import ImageSkeleton from "./ImageSkeleton";

interface Props {
    tenantId: string,
    isOpen: boolean,
    onClose: () => void
}

const TenantShowModal = ({ tenantId }: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { tenant, isLoading } = useTenant(tenantId)

    // console.log(tenantId);


    return (
        <>

            {/* <Button >
                View
            </Button> */}

            <Box as="button" onClick={onOpen}>
                <MdOutlineRemoveRedEye size='1em' />
            </Box>

            <Modal
                isCentered
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount={false}>

                <ModalOverlay />

                <ModalContent
                    overflow='hidden'
                    w={{ base: '90%', md: '100%', lg: '100%' }}>

                    <Flex
                        gap={14}
                        alignItems='center'
                        bg={useColorModeValue('#f2f3f6', '#282828')}>

                        <Flex
                            alignItems='center'
                            ml={{ base: 3, lg: 8 }}
                            justifyContent='center'>

                            <FaUser size='0.8em' />
                            <ModalHeader
                                ml={-2}
                                fontSize={{ base: 'lg', lg: 'xl' }}>
                                {tenant.tenantName || 'Tenant...'}
                            </ModalHeader>

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

                    <ModalCloseButton mt={1.5} />

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
                                    ?
                                    `${String(tenant.idNumber).slice(0, 5)}-${String(tenant.idNumber).slice(5, 12)}-${String(tenant.idNumber).slice(12)}`
                                    : 'N/A'}
                                </Text>
                            </Flex>
                            <Flex alignItems='center' gap={5}>
                                <FaHome size='0.8em' />
                                <Text fontWeight="bold">
                                    Address:
                                </Text>
                                <Text>{tenant.address || 'N/A'}
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
                                        : 'Unknown'}
                                </Text>
                            </Flex>

                            <Box
                                mt={4}
                                borderRadius={5}
                                overflow='hidden'
                                border='2px solid'
                                borderColor={useColorModeValue('#f2f3f6', '#282828')}
                            >

                                {isLoading
                                    ? <ImageSkeleton />
                                    : <Img src={tenant.IdFileLink}
                                        alt={tenant.tenantName} />
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