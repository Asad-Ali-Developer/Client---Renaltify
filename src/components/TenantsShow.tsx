import { Card, Flex, useColorModeValue, Text, Box, useDisclosure } from "@chakra-ui/react";
import { Tenant } from "../hooks/useAllTenants";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import TenantShowModal from "./TenantShowModal";
import TenantDeleteBox from "./TenantDeleteBox";
import UpdateTenantBox from "./UpdateTenantBox";

interface Props {
    tenants: Tenant[];
}

const TenantsShow = ({ tenants }: Props) => {

    const [activeTenantId, setActiveTenantId] = useState<string | null>(null);
    const {
        isOpen: isOpenUdater,
        onOpen: onOpenUdater,
        onClose: onCloseUpdater,
    } = useDisclosure(); // Manage modal state

    const { isOpen, onOpen, onClose } = useDisclosure(); // Manage modal state
    const [activeTenantName, setActiveTenantName] = useState<string | null>(null)

    return (
        <>
            {tenants.map((tenant) => (
                <Card
                    display="flex"
                    key={tenant._id}
                    overflow="hidden"
                    flexDirection="row"
                    py={{ base: 2, lg: 3 }}
                    px={{ base: 3, lg: 5 }}
                    justifyContent="space-between"
                    fontSize={{ base: 14, lg: 16 }}
                    gap={{ base: 2, sm: '', lg: '' }}
                    bg={useColorModeValue("white", "")}>

                    <Box
                        top={0}
                        h='100%'
                        left={0}
                        position='absolute'
                        w={{ base: 1, md: 1.5 }}
                        backgroundColor={tenant.isActive
                            ? useColorModeValue("green.300", "green.500")
                            : useColorModeValue("red.300", "red.500")}></Box>

                    <Flex
                        alignItems="left"
                        px={{ base: 2, sm: '' }}
                        gap={{ base: 2, sm: 12, lg: 14 }}
                        flexDirection={{ base: "column", sm: "row" }}
                        justifyContent={{ base: 'left', md: "space-between" }}>

                        <Flex
                            gap={2}
                            alignItems="center"
                            w={{ base: '', sm: "100px", md: '100px', lg: "70px", xl: '120px' }}
                            >

                            <FaUser size="14" />
                            <Text fontWeight="semibold"
                                fontSize={{ base: 14, lg: 16 }}>
                                {tenant.tenantName}
                            </Text>
                        </Flex>

                        <Flex
                            gap={2}
                            alignItems="center">
                            <FaPhoneAlt size={14} />
                            <Text
                                fontWeight="semibold"
                                fontSize={{ base: 14, lg: 16 }}>
                                {`0${tenant.phone}`}
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex
                        gap={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Flex gap={{ base: 3, lg: 5 }}>

                            <Box
                                cursor="pointer"
                                onClick={() => {
                                    setActiveTenantId(tenant._id)
                                    onOpenUdater();
                                }}
                                className="rounded-full flex justify-center items-center">
                                <FiEdit size="1em" />
                            </Box>

                            <UpdateTenantBox
                                tenant={tenant}
                                tenantId={tenant._id}
                                isOpenUdater={isOpenUdater}
                                onCloseUpdater={() => {
                                    setActiveTenantId(null);
                                    onCloseUpdater();
                                }} />


                            <Box
                                mr={-1}
                                onClick={() => {
                                    setActiveTenantId(tenant._id);
                                    setActiveTenantName(tenant.tenantName)
                                    onOpen(); // Open delete confirmation modal
                                }}
                                className="rounded-full cursor-pointer flex justify-center items-center">
                                <RiDeleteBinLine size="1em" />
                            </Box>

                            {/* Modal to confirm tenant deletion */}
                            <TenantDeleteBox
                                isOpen={isOpen}
                                onClose={() => {
                                    setActiveTenantId(null);
                                    onClose(); // Reset and close modal
                                }}
                                tenantId={activeTenantId} // Pass active tenan  t ID
                                tenantName={activeTenantName}
                            />

                            <Box
                                onClick={() => setActiveTenantId(tenant._id)}
                                className="rounded-full cursor-pointer flex justify-center items-center"
                            >
                                <TenantShowModal
                                    isOpen={true}
                                    tenantId={activeTenantId === tenant._id ? tenant._id : ""}
                                    onClose={() => setActiveTenantId(null)}
                                />
                            </Box>
                        </Flex>
                    </Flex>
                </Card>
            ))}
        </>
    );
};

export default TenantsShow;
