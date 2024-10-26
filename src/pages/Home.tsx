import { motion } from 'framer-motion';
import { Button, Box, Container, Flex, Text, Heading, Image, HStack, Icon, Input, useColorMode, Grid } from "@chakra-ui/react";
import { AiOutlineTeam, AiOutlineFileText, AiOutlineLoading } from "react-icons/ai"; // Replaced icons
import { FaBuilding } from "react-icons/fa"; // Building icon
import Apartment from '../assets/Apartment-rent-pana-removebg.png';
import { useAuth } from '../store/authToken';
import { Link } from 'react-router-dom';

const ModernLanding = () => {

  const { colorMode } = useColorMode();
  const { isLoggedIn } = useAuth();

  return (
    <Box
      mt={10}
      minH="100vh"
      bg={colorMode === 'dark' ? "#1A1A1A" : "white"}
      color={colorMode === 'dark' ? "white" : "black"}>

      <Box as="main" w='100%'>
        <Box minH="100vh" display="flex" alignItems="center"
          pos="relative" overflow="hidden" w='100%'>
          <Container maxW="container.xl" py={16} display="flex"
            flexDirection={{ base: "column", md: "row" }} alignItems="center"
            w='100%'>

            <motion.div
              style={{ marginBottom: '2rem' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>

              <Heading as="h1" size="2xl" mb={4} lineHeight="tight">
                Revolutionize Your <Text as="span" color="#FF6B6B">Property Management</Text>
              </Heading>
              <Text
                fontSize="xl"
                color={colorMode === 'dark' ? "gray.300" : "gray.600"} mb={6}>
                Streamline your tenant data, automate rent collection, and gain valuable insights with our cutting-edge platform.
              </Text>

              <HStack
                mt={2}
                w="100%"
                spacing={2}
                display="flex"
                flexDirection={{ base: 'column', sm: 'row' }}
                alignItems="center"  // Center-align items in the stack
              >
                {!isLoggedIn && (
                  <Link to="/register" style={{ width: '100%' }}> {/* Full width on small screens */}
                    <Button
                      w={{ base: '100%', sm: 'auto' }} // Full width for base, auto for sm+
                      size="md"
                      bg="#e05757"
                      color="white"
                      type="button"
                      _hover={{ bg: "#FF6B6B" }}
                      zIndex="1"
                    >
                      Register
                    </Button>
                  </Link>
                )}

                {isLoggedIn && (
                  <Box w={{ base: '100%', sm: 'auto' }}>
                    <Link to="/tenants/add_tenant" style={{ width: '100%' }}>
                      <Button
                        w="full"
                        size="md"
                        bg="#e05757"
                        color="white"
                        type="button"
                        _hover={{ bg: "#FF6B6B" }}
                        zIndex="1"
                      >
                        Add Tenant
                      </Button>
                    </Link>
                  </Box>
                )}

                <Link to="/about" style={{ width: '100%' }}>
                  <Button
                    w={{ base: '100%', sm: 'auto' }}  // Full width on small screens
                    size="md"
                    color="#e05757"
                    variant="outline"
                    borderColor="#e05757"
                    _hover={{ bg: "#e05757", color: "white" }}
                    zIndex="1"
                  >
                    Learn More
                  </Button>
                </Link>
              </HStack>

            </motion.div>

            <motion.div
              style={{ flexBasis: "50%" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}>
              <Box position="relative">
                <Box
                  inset="0"
                  opacity="0.3"
                  rounded="full"
                  position="absolute"
                  filter="blur(100px)"
                  bgGradient="linear(to-r, #FF6B6B, #4ECDC4)" />
                <Image
                  src={Apartment}
                  alt="Rentalify Dashboard"
                  w="full"
                  h="auto"
                  backgroundBlendMode='multiply'
                  rounded="lg"
                  boxShadow="2xl" />
              </Box>
            </motion.div>

          </Container>
        </Box>

        {/* Feature Section */}
        <Box py={16} bg={colorMode === 'dark' ? "#222222" : "#F9F9F9"}>
          <Container maxW="container.xl">
            <Heading as="h2" textAlign="center" size="lg" mb={12}>
              Why Choose Rentalify?
            </Heading>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
              {[
                {
                  icon: FaBuilding,
                  title: "Smart Property Management",
                  description: "Manage all your properties effortlessly from one dashboard"
                },
                {
                  icon: AiOutlineTeam,
                  title: "Tenant Insights",
                  description: "Gain valuable insights into your tenants' behavior and preferences"
                },
                {
                  icon: AiOutlineFileText,
                  title: "Automated Documentation",
                  description: "Generate and manage leases and other documents automatically"
                },
                {
                  icon: AiOutlineLoading,
                  title: "Real-time Analytics",
                  description: "Access real-time data and analytics to make informed decisions"
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  style={{ backgroundColor: colorMode === 'dark' ? "#2A2A2A" : "white", padding: "1.5rem", borderRadius: "8px" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}>
                  <Icon as={feature.icon} h={12} w={12} color="#FF6B6B" mb={4} />
                  <Heading as="h3" size="md" mb={2}>{feature.title}</Heading>
                  <Text color={colorMode === 'dark' ? "gray.400" : "gray.600"}>{feature.description}</Text>
                </motion.div>
              ))}
            </Grid>

          </Container>
        </Box>

        {/* Subscription Section */}
        <Box py={16}>
          <Container maxW="container.xl">
            <Heading as="h2" textAlign="center" size="lg" mb={12}>
              Ready to Get Started?
            </Heading>
            <Box maxW="md" mx="auto">
              <HStack spacing={4}>
                <Input
                  variant='filled'
                  focusBorderColor="#e05757"
                  placeholder="Enter your email"
                  bg={colorMode === 'dark' ? "#2A2A2A" : "white"}
                  borderColor={colorMode === 'dark' ? "#3A3A3A" : "gray.300"}
                  color={colorMode === 'dark' ? "white" : "black"} />
                <Button
                  bg="#e05757"
                  color="white"
                  type="button"
                  _hover={{ bg: "#FF6B6B" }}>
                  Subscribe
                </Button>
              </HStack>

            </Box>
          </Container>
        </Box>

      </Box>

      {/* Footer */}
      <Box as="footer" py={8} bg={colorMode === 'dark' ? "#222222" : "#F9F9F9"}>
        <Container maxW="container.xl" display="flex" gap={8} justifyContent="center" alignItems="center">
          <Flex alignItems='center' gap={2} fontWeight='normal'>
            <Text as={'span'}>&copy;</Text>
            <Text fontSize="md" fontWeight="semibold">Rentalify</Text>
          </Flex>
          <HStack spacing={2} fontSize={{ base: 10, md: 14 }}>
            {["Privacy Policy", "Terms of Service", "Contact Us", "FAQ"].map((item) => (
              <Text key={item} color={colorMode === 'dark' ? "gray.400" : "gray.600"} _hover={{ color: "#FF6B6B" }}>{item}</Text>
            ))}
          </HStack>
        </Container>
      </Box>

    </Box>
  );
}

export default ModernLanding;
