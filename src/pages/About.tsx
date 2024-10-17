import {
  Box,
  Heading,
  Text,

  SimpleGrid,
  Avatar,
  AvatarBadge,
  Button,
  Card,
  CardHeader,
  CardBody,
  Icon,
} from "@chakra-ui/react";
import { MdHome, MdPeople, MdDescription, MdAttachMoney } from "react-icons/md";

export default function About() {
  const teamMembers = [
    { name: "Najaf", role: "CEO & Co-founder" },
    { name: "Zain Ali", role: "CTO & Co-founder" },
  ];

  return (
    <Box maxW="container.md" mx="auto" px={4} py={8}>
      {/* Main Title */}
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        About Rentalify
      </Heading>

      {/* Mission Card */}
      <Card mb={8}>
        <CardBody>
          <Text mb={4}>
            Rentalify is a cutting-edge property management platform designed
            to simplify the lives of landlords and property managers. Founded
            in 2023, our mission is to streamline the rental process, making it
            more efficient and less stressful for everyone involved.
          </Text>
          <Text>
            Our team of experienced real estate professionals and tech experts
            have come together to create a solution that addresses the
            real-world challenges faced by property managers every day.
          </Text>
        </CardBody>
      </Card>

      {/* Core Features Section */}
      <Heading as="h2" size="lg" mb={4}>
        Our Core Features
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
        {/* Property Management */}
        <Card>
          <CardHeader>
            <Heading size="md" display="flex" alignItems="center">
              <Icon as={MdHome} mr={2} />
              Property Management
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>Easily manage all your properties in one centralized dashboard.</Text>
          </CardBody>
        </Card>

        {/* Tenant Screening */}
        <Card>
          <CardHeader>
            <Heading size="md" display="flex" alignItems="center">
              <Icon as={MdPeople} mr={2} />
              Tenant Screening
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>Streamlined tenant application and screening process.</Text>
          </CardBody>
        </Card>

        {/* Document Management */}
        <Card>
          <CardHeader>
            <Heading size="md" display="flex" alignItems="center">
              <Icon as={MdDescription} mr={2} />
              Document Management
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>Securely store and manage all your important documents online.</Text>
          </CardBody>
        </Card>

        {/* Financial Tracking */}
        <Card>
          <CardHeader>
            <Heading size="md" display="flex" alignItems="center">
              <Icon as={MdAttachMoney} mr={2} />
              Financial Tracking
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>Keep track of rent payments, expenses, and generate financial reports.</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Team Section */}
      <Heading as="h2" size="lg" mb={4}>
        Our Team
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mb={8}>
        {teamMembers.map((member, index) => (
          <Card key={index}>
            <CardBody textAlign="center">
              <Avatar size="xl" mb={4}>
                <AvatarBadge boxSize="1.25em" bg="gray.300">
                  <Text>{member.name[0]}</Text>
                </AvatarBadge>
              </Avatar>
              <Heading size="md">{member.name}</Heading>
              <Text fontSize="sm" color="gray.500">{member.role}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Commitment Section */}
      <Card mb={8}>
        <CardBody>
          <Heading size="lg" mb={4}>
            Our Commitment
          </Heading>
          <Text mb={4}>
            At Rentalify, we're committed to continually improving our platform
            based on user feedback and industry trends. We believe in providing
            top-notch customer support and ensuring that our users have the best
            possible experience with our software.
          </Text>
          <Text>
            Whether you're managing a single property or a large portfolio,
            Rentalify is here to make your job easier and more efficient. Join
            us in revolutionizing the world of property management!
          </Text>
        </CardBody>
      </Card>

      {/* Get Started Button */}
      <Box textAlign="center">
        <Button
          size="lg"
          bg="#FF6B6B"
          colorScheme='red'
          _hover={{ bg: "#FF8E8E" }}
          color="white">
          Get Started with Rentalify
        </Button>
      </Box>
    </Box>
  );
}
