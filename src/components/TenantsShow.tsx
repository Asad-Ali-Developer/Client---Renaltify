import { Card, Flex, useColorModeValue, Text, Box } from "@chakra-ui/react";
import { Tenant } from "../hooks/useAllTenants";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

import { useState } from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import TenantShowModal from "./TenantShowModal";

interface Props {
    tenants: Tenant[];
}

const TenantsShow = ({ tenants }: Props) => {

    const [activeTenantId, setActiveTenantId] = useState<string | null>(null)

    return (
        <>
            {tenants.map((tenant) => (
                <Card
                    px={{ base: 3, lg: 5 }}
                    display='flex'
                    key={tenant._id}
                    overflow='hidden'
                    borderLeft='5px solid'
                    borderLeftColor='green'
                    justifyContent='space-between'
                    fontSize={{ base: 12, lg: 16 }}
                    gap={{ base: 2, sm: 0, lg: 0 }}
                    bg={useColorModeValue('white', '')}
                    py={{ base: 2, sm: 3, md: 4, lg: 5 }}
                    flexDirection={{ base: 'row', sm: 'row' }}
                    borderColor={tenant.isActive
                        ? useColorModeValue('green.300', 'green.500')
                        : useColorModeValue('red.300', 'red.500')}>

                    <Flex
                        pt={2}
                        gap={14}
                        alignItems='center'
                        justifyContent={{ base: 'space-evenly', md: 'space-between' }}>

                        <Flex
                            gap={2}
                            alignItems='center'
                            w={{ base: '60px', sm: 'auto', lg: '80px' }}>
                            <FaUser size={12} />
                            <Text fontWeight='semibold'>{tenant.tenantName}</Text>
                        </Flex>

                        <Flex
                            gap={2}
                            alignItems='center'>
                            <FaPhoneAlt size={12} />
                            <Text fontWeight='semibold'>{`0${tenant.phone}`}</Text>
                        </Flex>


                    </Flex>

                    <Flex gap={1} alignItems='center' justifyContent='center'>

                        <Flex gap={{ base: 3, lg: 5 }}>
                            <Box cursor='pointer' className="rounded-full flex justify-center items-center">
                                <FiEdit size='1em' />
                            </Box>

                            <Box className="rounded-full cursor-pointer flex justify-center items-center">
                                <RiDeleteBinLine size='1em' />
                            </Box>

                            <Box
                                className="rounded-full cursor-pointer flex justify-center items-center"
                                onClick={() => setActiveTenantId(tenant._id)}>

                                <TenantShowModal
                                    isOpen={true}
                                    tenantId={activeTenantId === tenant._id ? tenant._id : ''}
                                    onClose={() => setActiveTenantId(null)} />

                            </Box>
                        </Flex>
                    </Flex>
                </Card>

                // {/* <AccordionPanel
                //     mt={2}
                //     border={0}
                //     w='100%'
                //     p={0}>
                //     {activeTenantId === tenant._id && <ShowTenant tenantId={tenant._id} />} */}

            ))}
        </>
    );
}

export default TenantsShow;
