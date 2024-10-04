import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  TableContainer,
  useColorModeValue,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialog,
  useDisclosure,
  Portal,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Text
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/card";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../store/authToken";
import { toast } from "react-toastify";
import { apiClientOK } from "../services/apiClient";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import useAllTenants, { Tenant } from "../hooks/useAllTenants";
import useDeleteTenant from "../hooks/useDeleteTenant";
import useTenantStatusUpdater from "../hooks/useTenantStatusUpdator";


const Tenants = () => {

  document.title = "Tenant Data | Dashboard"

  const { authenticatedUser } = useAuth();

  const _id = authenticatedUser?._id

  const tenantName = authenticatedUser?.username

  // This hook is for getting all the tenants
  const { tenants, totalTenants, activeTenants } = useAllTenants({ _id, tenantName });

  console.log(`Active tenants: ${activeTenants}, TotalTenants: ${totalTenants}`);

  // This hook is for deleting a tenant
  const delTenant = useDeleteTenant();

  // This hook is for updating the status of a tenant
  const updateTenantStatus = useTenantStatusUpdater();


  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);




  // This function is for deleting a tenant
  const deleteTenant = () => {

    const _id = selectedTenant?._id || ''

    if (selectedTenant?._id) {
      delTenant.mutate(
        _id,
        {
          onSuccess: () => {
            toast.success('Tenant deleted successfully')
            onClose()
            setSelectedTenant(null)
          },

          onError: () => {
            toast.error('Not deleted tenant')
          }
        }
      )
    }
  }


  const openDeleteDialog = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    console.log(tenant);
    onOpen();
  };


  // Function for Toggle Status
  const toggleStatus = async (tenant: Tenant, newStatus: boolean) => {

    // Only proceed if the status is actually changing
    if (tenant.isActive !== newStatus) {

      updateTenantStatus.mutate(

        // In this we are sending data to the hook => {tenantId, newUpdatedStatus}
        { _id: tenant._id, newStatus: newStatus },

        // After success or failure shows the message or notification
        {
          onSuccess: () => {
            toast.success('Tenant status updated!')
          },
          onError: () => {
            toast.error('Tenant status not updated!')
          }
        }
      )
    }


    // try {
    //   const response = await fetch(`${apiClientOK}/api/update-tenant/${tenant._id}`, {
    //     method: "PATCH",
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ isActive: newStatus }),
    //     credentials: 'include'
    //   })

    //   if (response.ok) {
    //     toast.success('Tenant status changed!')
    //   }
    //   else {
    //     toast.error('Tenant status not changed!')
    //   }

    // } catch (error) {
    //   console.log(error);
    // }

  }



  return (
    <Flex direction="column" mt={4} zIndex={-1}>

      <Box mx={{ base: 0, sm: 2, md: 8, lg: 10, xl: 52 }} p={4} flex="1">
        <Card
          borderRadius={14}
          border='1px solid'
          borderColor={useColorModeValue('gray.300', 'gray.500')}>

          <CardHeader>
            <Heading size="md">Dashboard</Heading>
          </CardHeader>

          <CardBody>
            <Flex
              wrap="wrap"
              gap={{ base: 2, lg: 32 }}
              justifyContent={{ base: 'space-between', sm: 'space-between', md: "space-between", lg: 'center' }}
              alignItems="center">

              <Flex direction="row" align="center" gap={4}>
                <Box>Total Tenants</Box>
                <Heading size="lg" color={useColorModeValue('red.500', 'red.300')}>{totalTenants}</Heading>
              </Flex>
              <Flex direction="row" align="center" gap={4}>
                <Box>Active Tenants</Box>
                <Heading size="lg" color={useColorModeValue('green.500', 'green.300')}>{activeTenants}</Heading>
              </Flex>
            </Flex>
          </CardBody>

        </Card>

        <Card
          mt={3}
          py={4}
          borderRadius={14}
          border='1px solid'
          borderColor={useColorModeValue('gray.300', 'gray.500')}>

          <Box>
            <Box
              my={2}
              gap={4}
              display="flex"
              mb={{ base: 6, sm: '3' }}
              justifyContent="space-between"
              px={{ base: 4, sm: 6, md: 8, lg: 12 }}
              flexDirection={{ base: "column", md: "row" }}
              alignItems={{ base: "flex-start", md: "center" }}>

              <Heading size="md">Tenant Records</Heading>

              <Button
                px={2}
                size='sm'
                colorScheme="telegram"
                w={{ base: "full", sm: "auto" }}>
                <Link to='/tenants/add_tenant'>
                  Add Tenant
                </Link>
              </Button>

            </Box>

            <Box
              py={2}
              w='100%'
              mx="auto"
              overflow='auto'
              overflowY={{ lg: 'scroll' }}
              sx={{
                /* Scrollbar styles */
                "&::-webkit-scrollbar": {
                  width: { 'base': '5px', 'lg': '7px' },
                  opacity: { 'base': '0' }  // Width of the scrollbar
                },
                "&::-webkit-scrollbar-track": {
                  background: 'transparent' // Track color
                },
                "&::-webkit-scrollbar-thumb": {
                  background: useColorModeValue("telegram.300", "gray.500"), // Scrollbar thumb color
                  borderRadius: "5px",  // Rounded edges
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  width: "8px",
                  background: useColorModeValue("telegram.400", "gray.600"),  // Color when hovered
                },
              }}
              paddingLeft={3}
              fontSize="small"
              pl={{ base: 4, sm: 6, md: 8, lg: 32 }}
              maxH={{ base: "62vh", lg: "55vh" }}>

              <TableContainer>

                <Table variant="simple" size="sm" w='full'>
                  {/* <TableCaption>All Tenants</TableCaption> */}
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>ID Card</Th>
                      <Th>Phone</Th>
                      <Th>Status</Th>
                      <Th>Rent</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>

                  <Tbody>

                    {/* Add rows as needed */}
                    {tenants?.map((tenant) => (
                      <Tr key={tenant._id} position='relative'>
                        <Td>{tenant.tenantName}</Td>
                        <Td>{tenant.idNumber}</Td>
                        <Td>{tenant.phone}</Td>
                        <Td>
                          <Flex
                            gap={5}
                            mr={{ base: 5, md: 5, lg: 5 }}
                            alignItems='center'
                            position='relative'>
                            <Badge
                              colorScheme={tenant.isActive ? 'green' : 'red'}
                              variant='solid'>
                              {tenant.isActive ? 'Active' : 'Inactive'}
                            </Badge>

                            <Menu>
                              <Box
                                // mr={{ base: 5, md: 5, lg: 5 }}
                                className="p-2 bg-zinc-700/10 rounded-full flex justify-center items-center absolute left-16">
                                <MenuButton>
                                  <FiEdit size='1.2em' />
                                </MenuButton>
                              </Box>

                              <Portal>
                                <MenuList>
                                  <MenuItem
                                    fontWeight='semibold'
                                    color='green.400'
                                    onClick={() => toggleStatus(tenant, true)}>
                                    Active
                                  </MenuItem>
                                  <MenuItem
                                    fontWeight='semibold'
                                    color='red.400'
                                    onClick={() => toggleStatus(tenant, false)}>
                                    Inactive
                                  </MenuItem>
                                </MenuList>
                              </Portal>
                            </Menu>
                          </Flex>

                        </Td>
                        <Td fontWeight='semibold'>{tenant.rentDecided}</Td>
                        <Td>
                          <Flex gap={2} direction={{ base: "row", sm: "row" }}>

                            <Link to={`/tenant/${tenant._id}/view`}>
                              <Box className="p-2 bg-zinc-700/10 rounded-full flex hover:bg-zinc-700/20 justify-center items-center">
                                <IoEyeOutline size='1.2em' />
                              </Box>
                            </Link>

                            <Link to={`/tenant/${tenant._id}/update`}>
                              <Box className="p-2 bg-zinc-700/10 rounded-full hover:bg-zinc-700/20 flex justify-center items-center">
                                <FiEdit size='1.2em' />
                              </Box>
                            </Link>

                            <Box
                              className="bg-zinc-700/10 p-2 rounded-full hover:bg-zinc-700/20 cursor-pointer flex justify-center items-center"
                              onClick={() => openDeleteDialog(tenant)} >
                              <RiDeleteBinLine size='1.2em' />
                            </Box>

                          </Flex>
                        </Td>
                        {/* <Box className="w-[85%] mx-auto bg-red-500 absolute left-0 h-52">
                            ID
                          </Box> */}
                      </Tr>

                    ))


                    }

                  </Tbody>


                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Card>

        {/* AlertDialog for Delete Confirmation */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
          motionPreset="slideInBottom"
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Delete Tenant?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                <Flex gap={1}>
                  <Text>Are you sure you want to delete</Text>
                  <Text style={{ fontWeight: "bold" }}> {selectedTenant?.tenantName} </Text>?
                </Flex>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button colorScheme="red" onClick={deleteTenant} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>


      </Box>
    </Flex>
  );
};

export default Tenants;
