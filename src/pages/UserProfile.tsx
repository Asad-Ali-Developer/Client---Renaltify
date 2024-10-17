import { motion } from 'framer-motion';
import { EnvelopeIcon, IdentificationIcon } from '@heroicons/react/24/solid';
import { Box, Heading, Text, Flex, Link, useColorModeValue, Card, Image, Avatar, Stack } from '@chakra-ui/react';
import { useAuth } from '../store/authToken';
import { useContext } from 'react';
import TenantsContext from '../context/TenantsContext';


const UserProfile = () => {


    const { authenticatedUser } = useAuth()

    const { activeTenants, totalTenants, inactiveTenants } = useContext(TenantsContext)

    const userName = authenticatedUser?.username || '';
    const capitalizeFirstLetterOfUserName = userName?.charAt(0).toUpperCase() + userName?.slice(1);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <Box
            px={4}
            py={{ base: 12, lg: 24 }}>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-4xl mx-auto">

                <Card
                    border='1px solid'
                    borderColor={useColorModeValue('gray.200', 'gray.500')}>
                    <motion.div
                        className="shadow-xl rounded-lg overflow-hidden"
                        variants={itemVariants}>

                        <Box p={{ base: 5, lg: 6 }}>
                            <motion.div
                                className="flex flex-col sm:flex-row items-center"
                                variants={itemVariants}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}>

                                    {authenticatedUser?.IdFileLink &&
                                        <Image
                                            w={24}
                                            h={24}
                                            objectFit="cover"
                                            borderRadius='50%'
                                            objectPosition="center"
                                            src={authenticatedUser.IdFileLink} />
                                    }

                                    {!authenticatedUser?.IdFileLink &&
                                        <Stack direction='row'>
                                            <Avatar
                                                size='lg'
                                                src='https://bit.ly/broken-link' />
                                        </Stack>
                                    }
                                </motion.div>
                                <Box
                                    mt={4}
                                    ml={{ base: 4, lg: 6 }}
                                    textAlign={{ base: 'center', sm: 'left' }}>
                                    <motion.h1
                                        variants={itemVariants}
                                        className="text-2xl font-bold">
                                        {capitalizeFirstLetterOfUserName}
                                    </motion.h1>

                                </Box>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <motion.div
                                    className="flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}>

                                    <EnvelopeIcon className="h-5 w-5" />

                                    <Text
                                        ml={2}
                                        fontSize={{ base: 14, md: 16 }}
                                        color={useColorModeValue('gray.700', 'gray.300')}>
                                        {authenticatedUser?.email}
                                    </Text>
                                </motion.div>

                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center">

                                    <IdentificationIcon className="h-5 w-5" />

                                    <Link
                                        ml={2}
                                        fontSize={{ base: 14, md: 16 }}
                                        href={authenticatedUser?.IdFileLink}
                                        _hover={{ textDecoration: 'underline' }}
                                        color={useColorModeValue('indigo.600', 'indigo.400')}>
                                        View ID File
                                    </Link>

                                </motion.div>

                            </motion.div>
                        </Box>

                        <motion.div variants={itemVariants}>

                            <Box
                                p={6}
                                mt={2}
                                bg={useColorModeValue('gray.50', 'gray.800')}>
                                <Heading
                                    mb={4}
                                    size="md">
                                    Tenant Statistics
                                </Heading>
                                <Flex
                                    // px={2}
                                    gap={2}
                                    align="center"
                                    flexWrap="wrap"
                                    justify="space-between">


                                    <motion.div
                                        className="flex items-center gap-4"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Text>Active Tenants</Text>
                                        <motion.span
                                            className="text-2xl font-bold"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.7 }}>

                                            <Text
                                                color={
                                                    useColorModeValue('green.500', 'green.200')
                                                }>
                                                {activeTenants}
                                            </Text>

                                        </motion.span>
                                    </motion.div>

                                    <motion.div
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-4">

                                        <Text>Inactive Tenants</Text>
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-2xl font-bold"
                                            transition={{ duration: 0.5, delay: 0.7 }}>

                                            <Text
                                                color={
                                                    useColorModeValue('red.500', 'red.200')
                                                }>
                                                {inactiveTenants}
                                            </Text>

                                        </motion.span>
                                    </motion.div>

                                </Flex>
                            </Box>
                            <Flex
                                h={14}
                                w='100%'
                                justifyContent='center'
                                bg={useColorModeValue('gray.50', '#1a202c')}>

                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-4">
                                    <Text
                                        textAlign='center'
                                        fontWeight='semibold'
                                        fontSize={16}>
                                        Total Tenants:
                                    </Text>
                                    <motion.span
                                        className="text-2xl font-bold"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}>
                                        <Text
                                            fontSize={{ base: 28, md: 32 }}
                                            color={useColorModeValue('blue.500', 'blue.200')}>
                                            {totalTenants}
                                        </Text>
                                    </motion.span>
                                </motion.div>
                            </Flex>
                        </motion.div>
                    </motion.div>
                </Card>
            </motion.div>
        </Box>
    );
}

export default UserProfile