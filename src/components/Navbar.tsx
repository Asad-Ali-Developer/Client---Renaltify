import {
    Box,
    Text,
    Card,
    List,
    Show,
    Button,
    HStack,
    ListItem,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    useDisclosure,
    Flex,
    Stack,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuGroup,
    MenuItem,
    MenuDivider,
    WrapItem,
    Image,
    VStack,
} from "@chakra-ui/react";
import CustomSwitch from "./CustomSwitch";
import { useAuth } from "../store/authToken";
import { LuMenu } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const navLinks = [
        { id: 1, path: '/', Item: 'Home' },
        { id: 2, path: '/tenants', Item: 'Tenants' },
        { id: 3, path: '/about', Item: 'About' },
    ];

    const { isLoggedIn, LogoutUser, authenticatedUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        LogoutUser();
        navigate('/login'); // Redirect after logout
    };

    return (
        <>
            <Card w='100%' borderRadius={0}>
                <HStack
                    h={14}
                    width='100%'
                    display='flex'
                    fontWeight='medium'
                    background='transparent'
                    justifyContent='space-between'
                    px={{ base: 6, sm: 10, lg: 20 }}>

                    <Flex alignItems='center' gap={4}>
                        <Show below='lg'>
                            <Box onClick={onOpen}>
                                <LuMenu size={20} />
                            </Box>
                        </Show>
                        <Text
                            color='telegram'
                            fontWeight='semibold'
                            fontSize={{ base: 'xl', md: 'large', lg: 'x-large' }}>

                            <Link to='/'>Rentify</Link>
                        </Text>
                    </Flex>

                    <HStack
                        display='flex'
                        gap={{ base: 5, md: 7, lg: 10 }}>

                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            gap={{ md: 2, lg: 5, xl: 10 }}>

                            <Show above="lg">
                                {navLinks.map(item => (
                                    <List
                                        gap={10}
                                        key={item.id}
                                        display='flex'
                                        fontSize={18} fontWeight='medium'>
                                        <ListItem>
                                            <NavLink to={item.path}>{item.Item}</NavLink>
                                        </ListItem>
                                    </List>
                                ))}
                            </Show>

                        </Box>


                        <Menu>

                            <MenuButton>

                                {!isLoggedIn &&
                                    <Stack direction='row'>
                                        <Avatar
                                            size='sm'
                                            src='https://bit.ly/broken-link' />
                                    </Stack>
                                }

                                {isLoggedIn &&
                                    <WrapItem>
                                        {authenticatedUser?.IdFileLink &&
                                            <Image
                                                w={8}
                                                h={8}
                                                objectFit='cover'
                                                objectPosition='center'
                                                border='2px solid'
                                                borderRadius='50%'
                                                borderColor='gray.500'
                                                src={authenticatedUser?.IdFileLink} />
                                        }

                                        {!authenticatedUser?.IdFileLink &&
                                            <Stack direction='row'>
                                                <Avatar
                                                    size='sm'
                                                    src='https://bit.ly/broken-link' />
                                            </Stack>
                                        }
                                    </WrapItem>
                                }

                            </MenuButton>
                            <MenuList>

                                {isLoggedIn &&
                                    <MenuGroup>
                                        <Link to='/profile'>
                                            <MenuItem>
                                                Profile
                                            </MenuItem>
                                        </Link>
                                    </MenuGroup>
                                }

                                {isLoggedIn && <MenuDivider />}

                                <MenuGroup>
                                    {isLoggedIn &&
                                        <Link to='/tenants'>
                                            <MenuItem>
                                                Tenants
                                            </MenuItem>
                                        </Link>
                                    }


                                    <Flex
                                        px={4}
                                        pb={2}
                                        alignItems='center'
                                        justifyContent='space-between'>
                                        <Text>Dark Mode:</Text>
                                        <CustomSwitch />
                                    </Flex>


                                    <MenuGroup>
                                        {isLoggedIn ?
                                            (
                                                <VStack mt={2}>
                                                    <Button
                                                        w='90%'
                                                        onClick={handleLogout}>
                                                        Logout
                                                    </Button>
                                                </VStack>
                                            ) :
                                            (
                                                <VStack w='full'>

                                                    <Button
                                                        w='90%'
                                                        type="button"
                                                        variant='outline'>
                                                        <Link to='/login'>Login</Link>
                                                    </Button>


                                                    <Button
                                                        w='90%'
                                                        type="button">
                                                        <Link to='/register'>Register</Link>
                                                    </Button>

                                                </VStack>
                                            )}
                                    </MenuGroup>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    </HStack>

                </HStack>
            </Card>


            {/* This is for mobile */}

            <HStack display='flex' gap={{ base: 4, lg: 5 }}>


                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}>

                    <DrawerOverlay />

                    <DrawerContent>

                        <DrawerCloseButton m={3} />

                        <DrawerBody py={28}>

                            <Text fontSize={14} fontWeight='semibold' ml={1} mb={2}>Navigations :</Text>
                            {navLinks.map(item => (

                                <List
                                    gap={10}
                                    w={'100%'}
                                    fontSize={20}
                                    display='flex'
                                    alignItems='center'
                                    key={item.id}
                                    flexDirection='column'>

                                    <ListItem
                                        mb={2}
                                        py={2}
                                        w={'100%'}
                                        onClick={onClose}
                                        borderRadius={10}
                                        textAlign='center'>
                                        <NavLink to={item.path}>{item.Item}</NavLink>
                                    </ListItem>

                                </List>
                            ))}

                        </DrawerBody>

                    </DrawerContent>
                </Drawer>

            </HStack>
        </>
    )
};

export default Navbar;
