import { Card, Flex, useColorModeValue, Text, Box, useDisclosure } from "@chakra-ui/react";
import { Tenant } from "../hooks/useAllTenants";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import TenantShowModal from "./TenantShowModal";
import TenantDeleteBox from "./TenantDeleteBox";

interface Props {
    tenants: Tenant[];
}

const TenantsShow = ({ tenants }: Props) => {

    const [activeTenantId, setActiveTenantId] = useState<string | null>(null);
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
                    borderLeft="5px solid"
                    borderLeftColor="green"
                    py={{ base: 3, lg: 3 }}
                    px={{ base: 1, sm: 3, lg: 5 }}
                    justifyContent="space-between"
                    fontSize={{ base: 14, lg: 16 }}
                    gap={{ base: 2, sm: 0, lg: 0 }}
                    bg={useColorModeValue("white", "")}
                    borderColor={
                        tenant.isActive
                            ? useColorModeValue("green.300", "green.500")
                            : useColorModeValue("red.300", "red.500")
                    }
                >
                    <Flex
                        alignItems="center"
                        gap={{ base: 1, sm: 12, lg: 14 }}
                        justifyContent={{ base: "space-evenly", md: "space-between" }}
                    >
                        <Flex gap={2} alignItems="center" w={{ base: "70px", sm: "60px", lg: "90px" }}>
                            <FaUser size="14" />
                            <Text fontWeight="semibold" fontSize={{ base: 12, sm: 14, lg: 16 }}>
                                {tenant.tenantName}
                            </Text>
                        </Flex>

                        <Flex gap={2} alignItems="center">
                            <FaPhoneAlt size={14} />
                            <Text fontWeight="semibold" fontSize={{ base: 12, sm: 14, lg: 16 }}>
                                {`0${tenant.phone}`}
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex gap={1} alignItems="center" justifyContent="center">
                        <Flex gap={{ base: 3, lg: 5 }}>
                            <Box cursor="pointer" className="rounded-full flex justify-center items-center">
                                <FiEdit color="green" size="1em" />
                            </Box>

                            <Box
                                onClick={() => {
                                    setActiveTenantId(tenant._id);
                                    setActiveTenantName(tenant.tenantName)
                                    onOpen(); // Open delete confirmation modal
                                }}
                                className="rounded-full cursor-pointer flex justify-center items-center">
                                <RiDeleteBinLine color="red" size="1em" />
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
