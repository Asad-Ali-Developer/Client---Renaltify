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
// import useDeleteTenant from "../hooks/useDeleteTenant";
// import useTenantStatusUpdater from "../hooks/useTenantStatusUpdator";



const Tenants = () => {

  document.title = "Tenant Data | Dashboard"

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const { activeTenants, totalTenants, tenants, isLoading, inactiveTenants } = useContext(TenantsContext)

  console.log(`Active tenants: ${activeTenants}, TotalTenants: ${totalTenants}`);

  // // This hook is for deleting a tenant
  // const delTenant = useDeleteTenant();

  // // This hook is for updating the status of a tenant
  // const updateTenantStatus = useTenantStatusUpdater();


  // const [setSelectedTenant] = useState<Tenant | null>(null);




  // // This function is for deleting a tenant
  // const deleteTenant = () => {

  //   const _id = selectedTenant?._id || ''

  //   if (selectedTenant?._id) {
  //     delTenant.mutate(
  //       _id,
  //       {
  //         onSuccess: () => {
  //           toast.success('Tenant deleted successfully')
  //           onClose()
  //           setSelectedTenant(null)
  //         },

  //         onError: () => {
  //           toast.error('Not deleted tenant')
  //         }
  //       }
  //     )
  //   }
  // }


  // const openDeleteDialog = (tenant: Tenant) => {
  //   setSelectedTenant(tenant);
  //   console.log(tenant);
  //   onOpen();
  // };


  // // Function for Toggle Status
  // const toggleStatus = async (tenant: Tenant, newStatus: boolean) => {

  //   // Only proceed if the status is actually changing
  //   if (tenant.isActive !== newStatus) {

  //     updateTenantStatus.mutate(

  //       // In this we are sending data to the hook => {tenantId, newUpdatedStatus}
  //       { _id: tenant._id, newStatus: newStatus },

  //       // After success or failure shows the message or notification
  //       {
  //         onSuccess: () => {
  //           toast.success('Tenant status updated!')
  //         },
  //         onError: () => {
  //           toast.error('Tenant status not updated!')
  //         }
  //       }
  //     )
  //   }


  //   // try {
  //   //   const response = await fetch(`${apiClientOK}/api/update-tenant/${tenant._id}`, {
  //   //     method: "PATCH",
  //   //     headers: {
  //   //       'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
  //   //       'Content-Type': 'application/json'
  //   //     },
  //   //     body: JSON.stringify({ isActive: newStatus }),
  //   //     credentials: 'include'
  //   //   })

  //   //   if (response.ok) {
  //   //     toast.success('Tenant status changed!')
  //   //   }
  //   //   else {
  //   //     toast.error('Tenant status not changed!')
  //   //   }

  //   // } catch (error) {
  //   //   console.log(error);
  //   // }

  // }



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
              <Button size={{ base: 'sm', md: 'md' }}>Add Tenant</Button>
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
