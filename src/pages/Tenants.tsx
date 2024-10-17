import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";


import { useContext } from "react";
import { Link } from "react-router-dom";
import TenantSkeleton from "../components/TenantSkeleton";
import TenantsShow from "../components/TenantsShow";
import TenantsContext from "../context/TenantsContext";


const Tenants = () => {

  document.title = "Tenant Data | Dashboard"

  const skeletons = [1, 2, 3, 4, 5, 6]

  const { activeTenants, tenants, isLoading, inactiveTenants } = useContext(TenantsContext)

  // console.log(`Active tenants: ${activeTenants}, TotalTenants: ${totalTenants}`);


  return (
    <Flex direction="column" pt={5} zIndex={-1} bg={useColorModeValue('#f2f3f6', '')}>

      <Box mx={{ base: 0, sm: 2, md: 8, lg: 10, xl: 52 }} p={4} flex="1">
        <Card
          mb={5}
          borderRadius={14}>

          <CardHeader>
            <Heading size="md">Analytics</Heading>
          </CardHeader>

          <CardBody mt={-3}>
            <Flex
              wrap="wrap"
              gap={{ base: 2, lg: 32 }}
              justifyContent={{ base: 'space-between', sm: 'space-between', md: "space-between", lg: 'center' }}
              alignItems="center">

              <Flex direction="row" align="center" gap={4}>
                <Box fontSize={{ base: 14, lg: 16 }}>Active Tenants:</Box>
                <Heading size="xl" color={useColorModeValue('green.500', 'green.300')}>{activeTenants}</Heading>
              </Flex>
              <Flex direction="row" align="center" gap={4}>
                <Box fontSize={{ base: 14, lg: 16 }}>Inactive Tenants:</Box>
                <Heading size="xl" color={useColorModeValue('red.500', 'red.300')}>{inactiveTenants}</Heading>
              </Flex>
            </Flex>
          </CardBody>

        </Card>


        <Box my={5}>

          <Flex justifyContent='space-between' alignItems='center' mb={5}>
            <Heading size='md' ml={2}>All Tenants</Heading>
            <Link to='/tenants/add_tenant'>
              <Button
                bg="#FF6B6B"
                color="white"
                colorScheme='red'
                _hover={{ bg: "#FF8E8E" }}
                size={{ base: 'sm', md: 'md' }}>Add Tenant</Button>
            </Link>
          </Flex>

          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            gap={{ base: 3, sm: 4, md: 4, lg: 7 }}>

            {isLoading
              ? skeletons.map(s => (
                <TenantSkeleton key={s} />
              ))
              :
              <TenantsShow tenants={tenants} />
            }

          </SimpleGrid>
        </Box>

      </Box>
    </Flex>
  );
};

export default Tenants;
