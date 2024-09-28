import { useEffect, useState } from 'react';
import { Box, Card, CardBody, CardHeader, Heading, Text, VStack, Flex, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Badge, Image } from '@chakra-ui/react';
import { FaPhoneAlt, FaHome, FaUser, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsCreditCardFill } from 'react-icons/bs';

interface Tenant {
  _id: string,
  tenantName: string,
  phone: number,
  AnotherPhone: number,
  members: number,
  address: string,
  rentDecided: string,
  date: string,
  idNumber: string,
  IdFileLink: string,
  isActive: boolean,
  QrCode: string
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};



const ShowTenantDetails = () => {
  const { _id } = useParams<{ _id: string }>();
  const [tenant, setTenant] = useState<Tenant | null>(null);

  const fetchTenant = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/tenant/${_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tenant');
      }

      const data = await response.json();
      setTenant(data.tenant);

      console.log(data.tenant);


    } catch (error) {
      console.error('Error fetching tenant:', error);
    }
  };

  useEffect(() => {
    if (_id) {
      fetchTenant();
    }
  }, [_id]);

  return (
    <Box
      py={4}
      minH="screen"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 2, md: 4 }}>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ width: '100%', maxWidth: '4xl' }}>

        <Card overflow="hidden" shadow="lg" borderRadius="md">
          <CardHeader
            px={{ base: 2.5, sm: 4, md: 7, lg: 10 }}
            display="flex"
            alignItems="center"
            h={{ base: 14, md: 16 }}
            justifyContent="space-between"
            bgGradient="linear(to-r, teal.500, blue.600)">

            <Link to='/tenants'>
              <Flex
                gap={2}
                px={{ base: 1, md: 2 }}
                alignItems='center'
                className='bg-slate-100/10 py-1 rounded-md text-white hover:bg-slate-100/20'>
                <IoArrowBack />
                <Text fontWeight='semibold' display={{ base: 'none', md: 'block' }}>Back</Text>
              </Flex>
            </Link>

            <Heading fontSize={{ base: 'md', lg: '3xl' }} color='white'>Tenant Profile</Heading>
            <Button
              size='sm'
              variant="solid"
              colorScheme="blue"
              fontSize={{ base: 10, sm: 12, md: 14, lg: 16 }}
              fontWeight='bold'
              leftIcon={<FaDownload />}
              onClick={() => {
                if (tenant?.IdFileLink) {
                  const link = document.createElement('a');
                  link.href = tenant.IdFileLink;
                  link.download = 'tenant-id-document';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
            >
              Download ID
            </Button>
          </CardHeader>

          <CardBody>
            <Tabs variant="enclosed">
              <TabList>
                <Tab fontSize={{ base: 13, lg: 16 }}>Overview</Tab>
                <Tab fontSize={{ base: 13, lg: 16 }}>Details</Tab>
                <Tab fontSize={{ base: 13, lg: 16 }}>Document</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Flex
                    gap={10}
                    justifyContent='space-between'
                    flexDirection={{ base: 'column', md : 'row', lg: 'row' }}>
                    <VStack spacing={5} align="start" mt={10}>

                      <Flex alignItems='center' gap={5}>
                        <FaUser />
                        <Heading fontSize={{ base: 'md', lg: 'xl' }}>{tenant?.tenantName}</Heading>

                        <Badge
                          fontSize={{ base: 10, lg: 13 }}
                          colorScheme={tenant?.isActive ? 'green' : 'red'}>
                          {tenant?.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </Flex>

                      <Flex alignItems='center' gap={5}>
                        <Box position='relative'>
                          <Text
                            top={-1.5}
                            right={0}
                            fontSize={10}
                            fontWeight='semibold'
                            position='absolute'>1</Text>
                          <FaPhoneAlt />
                        </Box>
                        <Text fontSize={{ base: 'sm', lg: 'lg' }} fontWeight="bold">
                          Phone:
                        </Text>
                        <Text fontSize={{ base: 'sm', lg: 'lg' }}>
                          {tenant?.phone ? `0${tenant.phone}` : 'N/A'}
                        </Text>
                      </Flex>

                      <Flex alignItems='center' gap={5}>
                        <Flex gap={5}>
                          <Box position='relative'>
                            <Text
                              top={-1.5}
                              right={0}
                              fontSize={10}
                              fontWeight='semibold'
                              position='absolute'>2</Text>
                            <FaPhoneAlt />
                          </Box>
                          <Text fontSize={{ base: 'sm', lg: 'lg' }} fontWeight="bold">
                            Alternative Ph:
                          </Text>
                        </Flex>
                        <Text fontSize={{ base: 'sm', lg: 'lg' }}>
                          {tenant?.AnotherPhone ? `0${tenant.AnotherPhone}` : 'N/A'}
                        </Text>
                      </Flex>

                      <Flex alignItems='center' gap={5}>
                        <FaUser />
                        <Text fontSize={{ base: 'sm', lg: 'lg' }} fontWeight="bold">
                          Members:
                        </Text>
                        <Text>{tenant?.members || '0'}</Text>
                      </Flex>

                    </VStack>
                    <Box
                      mr={{ base: 0, lg: 20 }}
                      w={{ base: '50%', md: '30%', lg: '15%' }}
                      h={{ base: '50%', md: '30%', lg: '15%' }}>
                      <Image src={tenant?.QrCode} borderRadius={20} />
                    </Box>
                  </Flex>
                </TabPanel>

                <TabPanel mt={10}>
                  <VStack spacing={5} align="start">

                    <Flex alignItems='center' gap={5}>
                      <FaCalendarAlt />
                      <Text fontSize={{ base: 'sm', lg: 'lg' }} fontWeight="bold">
                        ID Number:
                      </Text>
                      <Text fontSize={{ base: 'sm', lg: 'lg' }}>
                        {
                          tenant?.idNumber ?
                            `${String(tenant.idNumber).slice(0, 5)}-${String(tenant.idNumber).slice(5, 12)}-${String(tenant.idNumber).slice(12)}`
                            : 'N/A'
                        }
                      </Text>
                    </Flex>


                    <Flex alignItems='center' gap={5}>
                      <BsCreditCardFill />
                      <Text fontSize={{ base: 'sm', lg: 'lg' }} fontWeight="bold">
                        Rent Decided:
                      </Text>
                      <Text fontSize={{ base: 'sm', lg: 'lg' }}>
                        {tenant?.rentDecided || 'N/A'}
                      </Text>
                    </Flex>

                    <Flex alignItems='center' gap={5}>
                      <FaCalendarAlt />
                      <Text fontSize={{ base: 'sm', lg: 'lg' }} fontWeight="bold">
                        Date:
                      </Text>
                      <Text fontSize={{ base: 'sm', lg: 'lg' }}>
                        {tenant?.date ? new Date(tenant.date).toLocaleDateString() : 'Unknown'}
                      </Text>
                    </Flex>

                    <Flex alignItems='center' gap={5} >
                      <Flex gap={5} alignItems='center'>
                        <FaHome />
                        <Text fontSize={{ base: 'sm', lg: 'lg' }} fontWeight="bold">
                          Address:
                        </Text>
                      </Flex>
                      <Text fontSize={{ base: 'sm', lg: 'lg' }}>
                        {tenant?.address || 'N/A'}
                      </Text>
                    </Flex>


                  </VStack>

                </TabPanel>

                <TabPanel>

                  <VStack spacing={4} align="center" mt={10}>
                    <Text fontSize="lg" fontWeight="bold">
                      ID Document
                    </Text>
                    <Box
                      borderRadius="md"
                      overflow="hidden"
                      borderWidth="1px"
                      borderColor="gray.200"
                      p={2}
                      maxW="md"
                      maxH="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <img
                        src={tenant?.IdFileLink}
                        alt="Tenant ID Document"
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        onClick={() => window.open(tenant?.IdFileLink, '_blank')}
                      />
                    </Box>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </motion.div>
    </Box>
  );
};

export default ShowTenantDetails;
