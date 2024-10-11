import { Text, Image, Button, Box, Flex, Container, VStack, Heading, HStack, Divider, useColorModeValue, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import rent from '../assets/rent.svg'
import features from '../assets/tenant.jpg'
import review from '../assets/reviews.jpg'
import { useAuth } from "../store/authToken"
// import bg from '../assets/bg.jpg'
// const gradient = 'linear-gradient(90deg, rgba(7,4,37,1) 0%, rgba(10,6,60,1) 60%, rgba(4,4,29,1) 100%)'

const Home = () => {

  const { authenticatedUser } = useAuth()
  const { colorMode } = useColorMode()

  return (
    <>

      <Box as="main" flex="1" >

        <Box as="section" h={{ base: "auto", md: "95vh" }} w="full" py={{ base: 12, md: 24, lg: 32, xl: 48 }}>

          <Container maxW="container.xl" >

            <Flex

              gap={12}
              backdropBlur={40}
              alignItems="center"
              direction={{ base: "column", lg: "row" }}>

              <VStack align="start" spacing={4}>
                <VStack align="start" spacing={2}>

                  {authenticatedUser &&
                    <Flex
                      gap={2}
                      fontSize={20}
                      justifyContent='center'>
                      <Text>Hey, </Text>
                      <Text fontWeight='bold'
                        color={colorMode === 'dark' ? 'red.300' : 'red.500'}>
                        {authenticatedUser?.username}</Text>
                    </Flex>
                  }

                  <Heading
                    as="h1"
                    size={{ base: "xl", sm: "2xl", xl: "3xl" }}
                    fontWeight="bold"
                    letterSpacing="tight"
                  >
                    Streamline Your Tenant Data Management
                  </Heading>
                  <Text maxW="600px" color="gray.500" fontSize={{ md: "xl" }}>
                    Our tenant data record application helps you effortlessly manage your rental properties, track rent
                    payments, and generate comprehensive reports.
                  </Text>
                </VStack>
                <HStack spacing={2} flexDirection={{ base: "column", sm: 'row', md: 'row', lg: "row" }} w='100%'>

                  {!authenticatedUser &&
                    <Button
                      px={8}
                      size="lg"
                      as={Link}
                      shadow="md"
                      height="10"
                      fontSize="sm"
                      to="/register"
                      colorScheme="telegram"
                      fontWeight="semibold"
                      w={{ base: "full", sm: "auto", md: "auto", lg: "auto" }}>
                      Get Started
                    </Button>
                  }

                  {authenticatedUser &&
                    <Button
                      px={8}
                      size="lg"
                      as={Link}
                      shadow="md"
                      height="10"
                      fontSize="sm"
                      colorScheme="telegram"
                      fontWeight="semibold"
                      to="/tenants/add_tenant"
                      w={{ base: "full", sm: "auto", md: "auto", lg: "auto" }}>
                      Add Tenant
                    </Button>
                  }

                  <Button
                    px={8}
                    size="lg"
                    as={Link}
                    shadow="sm"
                    to="/about"
                    height="10"
                    fontSize="sm"
                    variant="outline"
                    colorScheme="telegram"
                    fontWeight="semibold"
                    w={{ base: "full", sm: "auto", md: "auto", lg: "auto" }}>
                    Learn More
                  </Button>
                </HStack>
              </VStack>
              <Image
                src={rent}
                alt="Hero"
                width="full"
                height="auto"
                maxW={{ base: "full", lg: "400px" }}
                rounded="xl"
                objectFit="cover"
                objectPosition="center"
              />
            </Flex>
          </Container>
        </Box>

        <Box as="section" w="full" py={{ base: 12, md: 24, lg: 32 }}
          bg={useColorModeValue('#f2f3f6', '#282828')}>
          <Container maxW="container.xl">
            <VStack align="center" spacing={4} textAlign="center">
              <VStack spacing={2}>
                <Text mb={3} bg={useColorModeValue('gray.100', '#2f2f2f')} px={3} py={1} rounded="lg" fontSize="sm">
                  Key Features
                </Text>
                <Heading as="h2" size={{ base: "2xl", sm: "3xl" }} fontWeight="bold" letterSpacing="tight">
                  Manage Your Rental Properties with Ease
                </Heading>
                <Text
                  maxW="900px"
                  color="gray.500"
                  lineHeight="relaxed"
                  fontSize={{ base: "lg", md: "xl", lg: "base", xl: "xl" }}
                >
                  Our tenant data record application provides a comprehensive solution to streamline your rental
                  property management, from tenant onboarding to rent tracking and reporting.
                </Text>
              </VStack>
            </VStack>

            <Flex direction={{ base: "column", lg: "row" }} gap={12} py={12} align="center">
              <Image
                src={features}
                alt="Feature"
                width="full"
                height="auto"
                maxW={{ base: "full", lg: "400px" }}
                rounded="xl"
                objectFit="cover"
                objectPosition="center"
              />
              <VStack align="start" spacing={4}>
                <VStack spacing={2} align="start">
                  <Heading as="h3" size="lg" fontWeight="bold">
                    Tenant Management
                  </Heading>
                  <Text color="gray.500">
                    Easily onboard new tenants, track their information, and manage their leases.
                  </Text>
                </VStack>
                <VStack spacing={2} align="start">
                  <Heading as="h3" size="lg" fontWeight="bold">
                    Rent Tracking
                  </Heading>
                  <Text color="gray.500">Stay on top of rent payments with automated tracking and reminders.</Text>
                </VStack>
                <VStack spacing={2} align="start">
                  <Heading as="h3" size="lg" fontWeight="bold">
                    Comprehensive Reporting
                  </Heading>
                  <Text color="gray.500">
                    Generate detailed reports on your rental properties, tenants, and finances.
                  </Text>
                </VStack>
              </VStack>
            </Flex>
          </Container>
        </Box>

        <Box as="section" w="full" py={{ base: 12, md: 24, lg: 32 }}>
          <Container maxW="container.xl">
            <VStack align="center" spacing={4} textAlign="center">
              <VStack spacing={2}>
                <Text
                  bg={useColorModeValue("#f2f3f6", "#2f2f2f")}
                  mb={2} px={3} py={1} rounded="lg" fontSize="sm">
                  Testimonials
                </Text>
                <Heading as="h2" size={{ base: "2xl", sm: "3xl" }} fontWeight="bold" letterSpacing="tight">
                  What Our Customers Say
                </Heading>
                <Text
                  maxW="900px"
                  color="gray.500"
                  fontSize={{ base: "lg", md: "xl", lg: "base", xl: "xl" }}
                  lineHeight="relaxed"
                >
                  Hear from our satisfied customers about how our tenant data record application has transformed their
                  rental property management.
                </Text>
              </VStack>
            </VStack>
            <Flex direction={{ base: "column", lg: "row" }} gap={12} py={12} align="center">
              <VStack align="start" spacing={4}>
                <VStack spacing={1} align="start">
                  <Text fontSize="xl" fontWeight="bold">
                    "Streamlined my entire rental process!"
                  </Text>
                  <Text color="gray.500">
                    "I've been using the Tenant Data Record app for over a year now, and it has completely transformed
                    my rental property management. The intuitive interface and comprehensive features make it a breeze
                    to onboard new tenants, track rent payments, and generate detailed reports. Highly recommended!"
                  </Text>
                  <Text fontSize="sm" fontWeight="medium" color="gray.500">
                    - Sarah, Landlord
                  </Text>
                </VStack>
                <Divider />
                <VStack spacing={1} align="start">
                  <Text fontSize="xl" fontWeight="bold">
                    "Effortless rent tracking!"
                  </Text>
                  <Text color="gray.500">
                    "The rent tracking feature alone is worth the investment. I no longer worry about late payments or
                    lost records. The automated reminders have helped me stay organized and on top of my rental
                    finances."
                  </Text>
                  <Text fontSize="sm" fontWeight="medium" color="gray.500">
                    - Mike, Property Manager
                  </Text>
                </VStack>
              </VStack>
              <Image
                src={review}
                alt="Testimonial"
                width="full"
                height="auto"
                maxW={{ base: "full", lg: "400px" }}
                rounded="xl"
                objectFit="cover"
                objectPosition="center"
              />
            </Flex>
          </Container>
        </Box>
      </Box>

      <Box as="footer" w="full" py={8} bg="gray.900" color="gray.100">
        <Container maxW="container.xl">
          <Flex direction={{ base: "column", lg: "row" }} justify="space-between" align="center">
            <Text fontSize="sm">© 2024 Tenant Data Record. All rights reserved.</Text>
            <HStack spacing={4}>
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms of Service</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

    </>
  )
}

export default Home