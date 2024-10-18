import { Badge, Box, Button, Flex, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, useColorModeValue, useDisclosure, VStack } from "@chakra-ui/react";
import { BsCreditCardFill } from "react-icons/bs";
import { FaCalendarAlt, FaHome, FaIdCard, FaPhoneAlt, FaUser } from "react-icons/fa";
import useTenant from "../hooks/useTenant";
import StatusUpdater from "./StatusUpdater";
import TenantDetailSketelton from "./TenantDetailSketelton";

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
                bg="#FF6B6B"
                type="button"
                onClick={onOpen}
                fontWeight='bold'
                backgroundColor='transparent'
                fontSize={{ base: 12, md: 14 }}
                _hover={{ backgroundColor: 'transparent' }}
                color={useColorModeValue('#FF6B6B', '#FF8E8E')}>
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
                    w={{ base: '95%', md: '100%' }}>

                    <Flex
                        gap={5}
                        alignItems='center'
                        h={{ base: 12, lg: 14 }}
                        bg={useColorModeValue('#f2f3f6', '#282828')}>

                        <Text
                            ml={{ base: 3, lg: 6 }}
                            fontWeight='semibold'>Tenant Details:</Text>

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

                            {/* Status Updater Component */}
                            <StatusUpdater tenantId={tenant._id} />

                        </Flex>
                    </Flex>

                    <ModalCloseButton mt={{ base: 0, lg: 1 }} />

                    <ModalBody>

                        <VStack
                            py={5}
                            spacing={3}
                            align="start"
                            fontSize={{ base: 'sm', lg: 16 }}>

                            <Flex
                                gap={4}
                                alignItems='center'
                                justifyContent='center'
                            >
                                <FaUser size='1em' />

                                <Text fontWeight="bold" w={{ base: 16, lg: 20 }}>
                                    Name:
                                </Text>

                                <Text
                                    fontWeight='semibold'
                                    fontSize={{ base: 14, lg: 16 }}>
                                    {tenant.tenantName || <TenantDetailSketelton />}
                                </Text>

                            </Flex>
                            <Flex alignItems='center' gap={4}>

                                <FaPhoneAlt size='1em' />

                                <Text fontWeight="bold" w={{ base: 16, lg: 20 }}>
                                    Phone:
                                </Text>
                                <Text>
                                    {tenant?.phone
                                        ? `0${tenant.phone}`
                                        : <TenantDetailSketelton />}
                                </Text>
                            </Flex>

                            <Flex alignItems='center' gap={4}>
                                <FaUser size='1em' />
                                <Text fontWeight="bold" w={{ base: 16, lg: 20 }}>
                                    Members:
                                </Text>
                                <Text>{tenant?.members || <TenantDetailSketelton />}</Text>
                            </Flex>

                            <Flex alignItems='center' gap={4}>
                                <FaIdCard size='1em' />
                                <Text fontWeight="bold" w={{ base: 16, lg: 20 }}>
                                    ID Card:
                                </Text>
                                <Text>{tenant.idNumber
                                    ? `${String(tenant.idNumber).slice(0, 5)}-${String(tenant.idNumber).slice(5, 12)}-${String(tenant.idNumber).slice(12)}`
                                    : <TenantDetailSketelton />}
                                </Text>
                            </Flex>

                            <Flex alignItems='center' gap={4}>
                                <BsCreditCardFill size='1em' />
                                <Text fontWeight="bold" w={{ base: 16, lg: 20 }}>
                                    Rent:
                                </Text>
                                {tenant.rentDecided
                                    ? <Flex gap={2}>
                                        <Text fontWeight='semibold' opacity='50%'>Rs.</Text>
                                        <Text>{tenant.rentDecided || 0}</Text>
                                    </Flex>
                                    : <TenantDetailSketelton />}
                            </Flex>

                            <Flex alignItems='center' gap={4}>
                                <FaCalendarAlt size='1em' />
                                <Text fontWeight="bold" w={{ base: 16, lg: 20 }}>
                                    Date:
                                </Text>
                                <Text>
                                    {tenant?.date
                                        ? new Date(tenant.date).toLocaleDateString()
                                        : <TenantDetailSketelton />}
                                </Text>
                            </Flex>

                            <Flex
                                gap={5}
                                alignItems='center'>
                                <Flex
                                    gap={4}
                                    alignItems='center'>
                                    <FaHome size='1em' />
                                    <Text
                                        fontWeight="bold"
                                        w={{ base: 16, lg: 20 }}>
                                        Address:
                                    </Text>
                                </Flex>
                                <Text
                                    ml={-1}
                                    w={{ base: '50%', sm: '70%', md: '80%', lg: '61%' }}>
                                    {tenant.address || <TenantDetailSketelton />}
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
                                borderColor={useColorModeValue('#f2f3f6', 'gray.600')}>
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