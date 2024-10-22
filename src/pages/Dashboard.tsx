import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Card,
  CardHeader,
  CardBody,
  Select,
  Avatar,
} from "@chakra-ui/react";
import {
  FaBell,
  FaHome,
  FaUsers,
  FaDollarSign,
  FaComments,
  FaCalendar,
  FaFileAlt,
  FaCog,
  FaPlus,
  FaBars,
} from "react-icons/fa";

const RentalifyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sidebarItems = [
    { icon: FaHome, label: "Overview", id: "overview" },
    { icon: FaUsers, label: "Tenants", id: "tenants" },
    { icon: FaHome, label: "Properties", id: "properties" },
    { icon: FaDollarSign, label: "Fare Reports", id: "fare-reports" },
    { icon: FaComments, label: "Chat", id: "chat" },
    { icon: FaCalendar, label: "Calendar", id: "calendar" },
    { icon: FaFileAlt, label: "Documents", id: "documents" },
    { icon: FaCog, label: "Settings", id: "settings" },
  ];

  const SidebarItem = ({ icon: Icon, label, onClick, isActive }: { icon: React.ElementType; label: string; onClick: () => void; isActive: boolean; }) => (
    <Button
      variant={isActive ? "solid" : "ghost"}
      leftIcon={<Icon />}
      justifyContent="flex-start"
      onClick={onClick}
      width="100%"
    >
      {label}
    </Button>
  );

  const OverviewCard = ({ title, value, icon: Icon, description }: { title: string; value: string; icon: React.ElementType; description: string; }) => (
    <Card>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="md">{title}</Heading>
          <Icon />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize="2xl" fontWeight="bold">{value}</Text>
        <Text fontSize="sm" color="gray.500">{description}</Text>
      </CardBody>
    </Card>
  );

  const RecentActivities = () => (
    <Card>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="md">Recent Activities</Heading>
          <Button leftIcon={<FaPlus />} colorScheme="teal">Add New</Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          {[...Array(5)].map((_, i) => (
            <Flex key={i} justify="space-between" align="center" py={2}>
              <Avatar src={`/avatars/0${i + 1}.png`} />
              <Text fontSize="sm" fontWeight="bold">Olivia Martin</Text>
              <Text fontSize="sm" color="gray.500">{i % 2 === 0 ? "Paid rent for Apt 3B" : "Submitted maintenance request"}</Text>
              <Text fontSize="sm" fontWeight="bold">{i % 2 === 0 ? "+$1,999.00" : "Pending"}</Text>
            </Flex>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );

  const ManageTenants = () => (
    <Card>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="md">Manage Tenants</Heading>
          <Button leftIcon={<FaPlus />} colorScheme="teal">Add New Tenant</Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex justify="space-between" align="center" mb={4}>
          <Input placeholder="Search tenants..." width={{ base: "100px", md: "300px" }} mr={4} />
        </Flex>
        <Stack spacing={2}>
          {[...Array(10)].map((_, i) => (
            <Flex key={i} justify="space-between" align="center" py={2}>
              <Avatar src={`/avatars/0${i + 1}.png`} />
              <Text fontSize="sm" fontWeight="bold">Tenant {i + 1}</Text>
              <Text fontSize="sm" color="gray.500">Apt {String.fromCharCode(65 + i)}</Text>
              <Button variant="outline" size="sm">View Details</Button>
            </Flex>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );

  const ManageProperties = () => (
    <Card>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="md">Manage Properties</Heading>
          <Button leftIcon={<FaPlus />} colorScheme="teal">Add New Property</Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex justify="space-between" align="center" mb={4}>
          <Input placeholder="Search properties..." width={{ base: "100px", md: "300px" }} mr={4} />
        </Flex>
        <Stack spacing={2}>
          {[...Array(7)].map((_, i) => (
            <Flex key={i} justify="space-between" align="center" py={2}>
              <Text fontSize="sm" fontWeight="bold">Property {i + 1}</Text>
              <Text fontSize="sm" color="gray.500">{5 + i} units</Text>
              <Button variant="outline" size="sm">Manage</Button>
            </Flex>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );

  const FareReports = () => (
    <Card>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="md">Monthly Fare Reports</Heading>
          <Flex align="center">
            <Select width="180px" mr={2}>
              <option value="current">Current Month</option>
              <option value="previous">Previous Month</option>
            </Select>
            <Button leftIcon={<FaPlus />} colorScheme="teal">Generate Report</Button>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          {[...Array(5)].map((_, i) => (
            <Flex key={i} justify="space-between" align="center" py={2}>
              <Text fontSize="sm">Report {i + 1}</Text>
              <Text fontSize="sm" fontWeight="bold">${Math.random() * 1000}</Text>
            </Flex>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );

  return (
    <Flex height="100vh" bg="gray.50">
      {/* Sidebar */}
      <Box
        width={{ base: "full", md: "250px" }}
        bg="white"
        borderRightWidth="1px"
        display={{ base: isOpen ? "block" : "none", md: "block" }}
      >
        <Flex align="center" justify="space-between" p={4} borderBottomWidth="1px">
          <Text fontSize="xl" fontWeight="bold">Rentalify</Text>
          <IconButton icon={<FaBars />} onClick={onOpen} display={{ base: "inline-flex", md: "none" }} aria-label={""} />
        </Flex>
        <Stack spacing={2} p={4}>
          {sidebarItems.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </Stack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">Dashboard</Heading>
          <Flex align="center">
            <Input placeholder="Search..." width={{ base: "100px", md: "300px" }} mr={4} />
            <IconButton icon={<FaBell />} aria-label={""} />
            <Avatar src="/avatars/01.png" />
          </Flex>
        </Flex>

        {/* Content Area */}
        <Box height="calc(100vh - 120px)" overflowY="auto">
          {activeTab === "overview" && (
            <Stack spacing={4}>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Overview</Heading>
                <Button leftIcon={<FaPlus />} colorScheme="teal">Add New</Button>
              </Flex>
              <Stack direction="row" spacing={4}>
                <OverviewCard title="Total Tenants" value="120" icon={FaUsers} description="Total number of tenants." />
                <OverviewCard title="Total Properties" value="75" icon={FaHome} description="Total number of properties." />
                <OverviewCard title="Monthly Revenue" value="$20,000" icon={FaDollarSign} description="Revenue for the current month." />
                <OverviewCard title="Pending Requests" value="5" icon={FaComments} description="Total pending requests." />
              </Stack>
              <RecentActivities />
            </Stack>
          )}
          {activeTab === "tenants" && <ManageTenants />}
          {activeTab === "properties" && <ManageProperties />}
          {activeTab === "fare-reports" && <FareReports />}
        </Box>
      </Box>

      {/* Mobile Sidebar Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Rentalify</DrawerHeader>
          <DrawerBody>
            <Stack spacing={2}>
              {sidebarItems.map(item => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeTab === item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                />
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default RentalifyDashboard;
