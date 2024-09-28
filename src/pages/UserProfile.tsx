import { motion } from 'framer-motion';
import { EnvelopeIcon, IdentificationIcon } from '@heroicons/react/24/solid';
import { Box, Heading, Text, Flex, Link, useColorModeValue, Card, Image, Avatar, Stack } from '@chakra-ui/react';
import { useAuth } from '../store/authToken';


const UserProfile = () => {

    const { authenticatedUser, activeTenants, totalTenants } = useAuth()


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
        <Box py={12} px={4}>
            <motion.div
                className="max-w-4xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Card border='1px solid' borderColor={useColorModeValue('gray.200', 'gray.500')}>
                    <motion.div
                        className="shadow-xl rounded-lg overflow-hidden"
                        variants={itemVariants}>

                        <Box p={{ base: 10, lg: 6 }}>
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
                                    mt={4} ml={{ base: 4, lg: 6 }}
                                    textAlign={{ base: 'center', sm: 'left' }}>
                                    <motion.h1
                                        variants={itemVariants}
                                        className="text-2xl font-bold">
                                        {authenticatedUser?.username}
                                    </motion.h1>

                                </Box>
                            </motion.div>

                            <motion.div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2" variants={itemVariants}>
                                <motion.div
                                    className="flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}>

                                    <EnvelopeIcon className="h-6 w-6" />

                                    <Text ml={2} color={useColorModeValue('gray.700', 'gray.300')}>
                                        {authenticatedUser?.email}
                                    </Text>
                                </motion.div>

                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center">

                                    <IdentificationIcon className="h-6 w-6" />

                                    <Link
                                        href={authenticatedUser?.IdFileLink}
                                        ml={2}
                                        color={useColorModeValue('indigo.600', 'indigo.400')}
                                        _hover={{ textDecoration: 'underline' }}
                                    >
                                        View ID File
                                    </Link>

                                </motion.div>

                            </motion.div>
                        </Box>

                        <motion.div variants={itemVariants}>

                            <Box bg={useColorModeValue('blue.50', 'blue.700')} p={8} mt={5}>
                                <Heading
                                    size="lg"
                                    mb={4}>
                                    Tenant Statistics
                                </Heading>
                                <Flex flexWrap="wrap" gap={4} justify="space-between" align="center">
                                    <motion.div
                                        className="flex items-center gap-4"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Text>Total Tenants</Text>
                                        <motion.span
                                            className="text-2xl font-bold"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}>
                                            <Text color={useColorModeValue('red.500', 'red.200')}>
                                                {totalTenants}
                                            </Text>
                                        </motion.span>
                                    </motion.div>

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
                                </Flex>
                            </Box>
                        </motion.div>
                    </motion.div>
                </Card>
            </motion.div>
        </Box>
    );
}

export default UserProfile