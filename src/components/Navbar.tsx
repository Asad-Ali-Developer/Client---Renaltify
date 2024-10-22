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
    useColorMode,
    DrawerFooter,
    DrawerHeader,
    Icon,
} from "@chakra-ui/react";
import CustomSwitch from "./CustomSwitch";
import { useAuth } from "../store/authToken";
import { LuMenu } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate();

    const { isLoggedIn, LogoutUser, authenticatedUser } = useAuth();

    const { colorMode } = useColorMode()

    const handleLogout = () => {
        LogoutUser();
        navigate('/login'); // Redirect after logout
    };

    return (
        <>
            <Card
                w='100%'
                as="header"
                zIndex="10"
                pos="fixed"
                display='flex'
                borderRadius={0}
                backdropFilter="blur(10px)"
                justifyContent='space-between'
                px={{ base: 6, sm: 10, md: 10, lg: 16, xl:40 }}
                bg={colorMode === 'dark'
                    ? "rgba(26, 26, 26, 0.8)"
                    : "rgba(255, 255, 255, 0.8)"}
            >
                <HStack
                    h={16}
                    width='100%'
                    display='flex'
                    fontWeight='medium'
                    background='transparent'
                    justifyContent='space-between'
                >

                    <Flex alignItems='center' gap={4}>
                        {isLoggedIn &&
                            <Show below='lg'>
                                <Box onClick={onOpen}>
                                    <LuMenu size={20} />
                                </Box>
                            </Show>
                        }

                        <Link to='/'>
                            <Flex alignItems='center' gap={1}>
                                <FaBuilding size='1em' color="#FF6B6B" />
                                <Text fontSize={{ base: 18, md: 20, lg: 20 }}
                                    fontWeight='semibold'>
                                    Rentalify
                                </Text>
                            </Flex>
                        </Link>
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

                                <List
                                    gap={10}
                                    fontSize='18px'
                                    display='flex'
                                    alignItems='center'
                                    fontWeight='medium'>
                                    <ListItem
                                        transition='ease-in-out'
                                        transitionDuration='0.3s'
                                        _hover={{ color: '#FF6B6B' }}>
                                        <NavLink to='/'>
                                            <Text>
                                                Home
                                            </Text>
                                        </NavLink>
                                    </ListItem>

                                    {isLoggedIn &&
                                        <ListItem
                                            transitionDuration='0.3s'
                                            _hover={{ color: '#FF6B6B' }}>
                                            <NavLink to='/tenants'>
                                                <Text>
                                                    Tenants
                                                </Text>
                                            </NavLink>
                                        </ListItem>
                                    }

                                    <ListItem
                                        transitionDuration='0.3s'
                                        _hover={{ color: '#FF6B6B' }}>
                                        <NavLink to='/about'>
                                            <Text>
                                                About Us
                                            </Text>
                                        </NavLink>
                                    </ListItem>

                                    {!isLoggedIn &&
                                        <Flex gap={5}>
                                            <Button
                                                type="button"
                                                color="#e05757"
                                                variant='outline'
                                                borderColor="#e05757"
                                                _hover={{ bg: "#e05757", color: "white" }}
                                            >
                                                <Link to='/login'>Login</Link>
                                            </Button>

                                            <Button
                                                bg="#e05757"
                                                color="white"
                                                type="button"
                                                _hover={{ bg: "#FF6B6B" }}
                                            >
                                                <Link to='/register'>Register</Link>
                                            </Button>
                                        </Flex>
                                    }

                                </List>

                            </Show>

                        </Box>

                        {!isLoggedIn &&
                            <Show below='lg'>
                                <Box onClick={onOpen}>
                                    <LuMenu size={20} />
                                </Box>
                            </Show>
                        }

                        {isLoggedIn &&

                            <Menu>

                                <MenuButton>

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
                                        <Flex
                                            px={4}
                                            pb={2}
                                            alignItems='center'
                                            justifyContent='space-between'>
                                            <Text>Dark Mode:</Text>
                                            <CustomSwitch />
                                        </Flex>


                                        <MenuGroup>
                                            {isLoggedIn &&

                                                <VStack mt={2}>
                                                    <Button
                                                        w='90%'
                                                        onClick={handleLogout}>
                                                        Logout
                                                    </Button>
                                                </VStack>
                                            }
                                        </MenuGroup>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>
                        }
                    </HStack>

                </HStack>
            </Card>


            {/* This is for mobile */}

            <HStack
                display='flex'
                gap={{ base: 4, lg: 5 }}>


                <Drawer
                    isOpen={isOpen}
                    onClose={onClose}
                    placement={isLoggedIn ? 'left' : 'right'}>

                    <DrawerOverlay />

                    <DrawerContent>

                        {!isLoggedIn &&
                            <DrawerCloseButton mt={3} mr={64} />
                        }

                        {isLoggedIn &&
                            <DrawerCloseButton m={3} />
                        }

                        <DrawerBody py={28}>

                            <DrawerHeader
                                mb={10}
                                mt={-10}
                                gap={2}
                                display='flex'
                                alignItems='center'
                                justifyContent='center'>
                                <Icon as={FaBuilding} h={5} w={5} color="#FF6B6B" />
                                <Text>Rentalify</Text>
                            </DrawerHeader>

                            <List
                                gap={10}
                                w={'100%'}
                                fontSize={24}
                                display='flex'
                                alignItems='center'
                                flexDirection='column'>

                                <ListItem
                                    transition='ease-in-out'
                                    onClick={() => onClose()}
                                    transitionDuration='0.3s'
                                    _hover={{ color: '#FF6B6B' }}>
                                    <NavLink to='/'>
                                        <Text>
                                            Home
                                        </Text>
                                    </NavLink>
                                </ListItem>

                                {isLoggedIn &&
                                    <ListItem
                                        onClick={() => onClose()}
                                        transitionDuration='0.3s'
                                        _hover={{ color: '#FF6B6B' }}>
                                        <NavLink to='/tenants'>
                                            <Text>
                                                Tenants
                                            </Text>
                                        </NavLink>
                                    </ListItem>
                                }

                                <ListItem
                                    onClick={() => onClose()}
                                    transitionDuration='0.3s'
                                    _hover={{ color: '#FF6B6B' }}>
                                    <NavLink to='/about'>
                                        <Text>
                                            About Us
                                        </Text>
                                    </NavLink>
                                </ListItem>
                            </List>

                            <Box
                                mt={44}
                                textAlign='center'>
                                Revolutionize Your <br />
                                <Text
                                    ml={1}
                                    as="span"
                                    fontSize='lg'
                                    fontWeight='semibold'
                                    color="#FF6B6B">
                                    Property Management
                                </Text>
                            </Box>

                        </DrawerBody>

                        {!isLoggedIn &&
                            <DrawerFooter>
                                <Flex gap={2} w='100%' px={1}>
                                    <Button
                                        w='100%'
                                        type="button"
                                        color="#e05757"
                                        variant='outline'
                                        borderColor="#e05757"
                                        onClick={() => onClose()}
                                        _hover={{ bg: "#e05757", color: "white" }}>
                                        <Link to='/login'>Login</Link>
                                    </Button>

                                    <Button
                                        w='100%'
                                        bg="#e05757"
                                        color="white"
                                        type="button"
                                        _hover={{ bg: "#FF6B6B" }}
                                        onClick={() => onClose()}>
                                        <Link to='/register'>Register</Link>
                                    </Button>
                                </Flex>
                            </DrawerFooter>
                        }

                    </DrawerContent>
                </Drawer>

            </HStack>
        </>
    )
};

export default Navbar;
