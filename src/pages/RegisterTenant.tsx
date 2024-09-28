import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Heading, Input, InputGroup, InputLeftElement, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { GoArrowUpRight } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authToken";
import z from "zod";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebaseApp from "../firebaseConfig";
import imageCompression from 'browser-image-compression';
import { toast } from "react-toastify";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiIdCardFill } from "react-icons/ri";
import { PiUploadSimpleBold } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";


const tenantSchema = z.object({
    tenantName: z.string().min(3, { message: "Name must be at least 3 characters" }),
    phone: z.string().length(11, { message: "Phone number must be 11 characters" }),
    AnotherPhone: z.string().length(11, { message: "Phone number must be 11 characters" }),
    members: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Members must be a number",
    }),
    address: z.string().min(10, { message: "Address must be at least 10 characters" }),
    rentDecided: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Rent must be a number",
    }),
    idNumber: z.string().min(4, { message: "Id number must be at least 4 characters" }),
    IdFileLink: z.string().optional(), // Ensure it's a string
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Please provide a valid date",
    }),
    isActive: z.boolean().optional(),
});

type tenantData = z.infer<typeof tenantSchema>;

const RegisterTenant = () => {
    document.title = "Add Tenant";

    const navigate = useNavigate()

    const [imageURL, setImageURL] = useState<string>('');
    const { authenticatedUser } = useAuth();

    const [tenant, setTenant] = useState<tenantData>({
        tenantName: "",
        phone: "",
        AnotherPhone: "",
        members: "1",  // Treat as string for form handling
        address: "",
        rentDecided: "1000",  // Treat as string for form handling
        idNumber: "",
        IdFileLink: imageURL || "",
        date: new Date().toISOString().split("T")[0],  // Initialize with the current date in YYYY-MM-DD format
        isActive: false
    });

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm<tenantData>({
        resolver: zodResolver(tenantSchema)
    });



    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();

        // console.log(e);


        setTenant({
            ...tenant,
            [e.target.name]: e.target.value
        });
    };

    const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const fileInput = e.target.files?.[0];
        if (fileInput) {
            try {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1024,
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(fileInput, options);

                const storage = getStorage(firebaseApp);
                const storageRef = ref(storage, `images/${compressedFile.name}`);
                await uploadBytes(storageRef, compressedFile);

                const downloadURL = await getDownloadURL(storageRef);
                setImageURL(downloadURL);

                // URL Of the Uploaded Image
                // console.log(downloadURL);


                setValue('IdFileLink', downloadURL); // Ensure this updates the form state

            } catch (error) {
                console.error('Error processing image:', error);
            }
        }
    };


    const onSubmit = async (data: FieldValues) => {
        console.log(data);

        try {
            const response = await fetch(
                `http://localhost:4000/api/add-tenant/${authenticatedUser?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('serverToken')}`
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            const res_data = await response.json();

            console.log('API response:', res_data);


            if (response.ok) {
                toast.success('Tenant added successfully!')
                console.log('Tenant added successfully!');
                navigate('/tenants');
            }
            else {
                toast.error('Error adding tenant. Please try again later.')
            }

        } catch (error) {
            console.error('Error adding tenant:', error);
        }
    };

    return (

        <Box
            mx="auto"
            px={{ base: "3", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
            maxW={{ base: "3xl", md: '5xl', lg: "7xl" }}>

            <Card
                border='1px solid'
                borderColor={useColorModeValue('gray.300', 'gray.500')}>
                <CardHeader>
                    <Flex
                        gap={4}
                        alignItems='center'
                        flexDirection={{ base: "column", md: "row" }}>
                        <Heading size="md">Add New Tenant</Heading>
                        <NavLink to="/tenants">
                            <Flex
                                gap={1}
                                fontSize='small'
                                alignItems='center'
                                fontWeight='semibold'
                                color={useColorModeValue('blue.500', 'blue.300')}>
                                <Text>Go to All tenants</Text>
                                <GoArrowUpRight />
                            </Flex>
                        </NavLink>
                    </Flex>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <CardBody>

                        <Grid
                            gap={6}
                            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
                            <Box>
                                <Box mb={4}>
                                    <Text fontSize={{ base: 'sm', md: 'md' }}>Name</Text>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <FaUser />
                                        </InputLeftElement>
                                        <Input
                                            {...register("tenantName")}
                                            variant='filled'
                                            value={tenant.tenantName}
                                            onChange={handleInput}
                                            placeholder="Enter tenant name"
                                        />
                                    </InputGroup>
                                    <Text color="red.500">{errors.tenantName?.message}</Text>
                                </Box>

                                <Box mb={4}>
                                    <Text fontSize={{ base: 'sm', md: 'md' }}>Phone</Text>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <FaPhoneAlt />
                                        </InputLeftElement>
                                        <Input
                                            {...register('phone')}
                                            type="tel"
                                            variant='filled'
                                            value={tenant.phone}
                                            onChange={handleInput}
                                            placeholder="Enter phone"
                                        />
                                    </InputGroup>
                                    <Text color="red.500">{errors.phone?.message}</Text>
                                </Box>
                                <Box mb={4}>
                                    <Text fontSize={{ base: 'sm', md: 'md' }}>Another Phone</Text>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <FaPhoneAlt />
                                        </InputLeftElement>
                                        <Input
                                            {...register('AnotherPhone')}
                                            type="tel"
                                            variant='filled'
                                            onChange={handleInput}
                                            value={tenant.AnotherPhone}
                                            placeholder="Enter another phone"
                                        />
                                    </InputGroup>
                                    <Text color="red.500">{errors.AnotherPhone?.message}</Text>
                                </Box>

                                <Box mb={4}>
                                    <Text fontSize={{ base: 'sm', md: 'md' }}>Address</Text>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <FaLocationDot />
                                        </InputLeftElement>
                                        <Textarea
                                            {...register('address')}
                                            variant='filled'
                                            pl={10}
                                            value={tenant.address}
                                            onChange={handleInput}
                                            placeholder="Enter address"
                                            h={{ base: 'auto', lg: 32 }}
                                        />
                                        <Text color="red.500">{errors.address?.message}</Text>
                                    </InputGroup>
                                </Box>
                            </Box>

                            <Box>
                                <Box mb={4}>
                                    <Text fontSize={{ base: 'sm', md: 'md' }}>Members</Text>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <BsFillPeopleFill />
                                        </InputLeftElement>
                                        <Input
                                            type="tel"
                                            {...register('members')}
                                            variant='filled'
                                            onChange={handleInput}
                                            value={tenant.members}
                                            placeholder="Total members"
                                        />
                                    </InputGroup>
                                    <Text color="red.500">{errors.members?.message}</Text>
                                </Box>

                                <Box mb={4}>
                                    <Text fontSize={{ base: 'sm', md: 'md' }}>Rent decided</Text>
                                    <InputGroup>
                                        <InputLeftElement fontWeight='bold'>
                                            Rs.
                                        </InputLeftElement>
                                        <Input
                                            {...register('rentDecided')}
                                            type="number"
                                            variant='filled'
                                            onChange={handleInput}
                                            value={tenant.rentDecided}
                                            placeholder="Rent decided"
                                        />
                                        <Text color="red.500">{errors.rentDecided?.message}</Text>
                                    </InputGroup>
                                </Box>

                                <Box mb={4}>
                                    <Text fontSize={{ base: 'sm', md: 'md' }}>Shifting Date</Text>
                                    <Input
                                        {...register('date')}
                                        type="date"
                                        variant='filled'
                                        value={tenant.date}
                                        onChange={handleInput}
                                        placeholder="Shifting Date"
                                    />
                                    <Text color="red.500">{errors.date?.message}</Text>
                                </Box>

                                <Box mb={4}>
                                    <Text fontSize={{ base: 'sm', md: 'md' }}>ID Number</Text>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <RiIdCardFill />
                                        </InputLeftElement>
                                        <Input
                                            {...register('idNumber')}
                                            variant='filled'
                                            onChange={handleInput}
                                            value={tenant.idNumber}
                                            placeholder="Enter ID number"
                                        />
                                    </InputGroup>
                                    <Text color="red.500">{errors.idNumber?.message}</Text>
                                </Box>

                                <Box mb={4}>
                                    <Flex alignItems='center' gap={1}>
                                        <Text fontSize={{ base: 'sm', md: 'md' }}> ID File </Text>
                                        <PiUploadSimpleBold />
                                    </Flex>

                                    <Input
                                        type="file"
                                        id="IdCardFile"
                                        variant='filled'
                                        onChange={handleFileInput}
                                        className="FileInputStyling"
                                    />
                                    <Text color="red.500">{errors.IdFileLink?.message}</Text>
                                </Box>
                            </Box>
                        </Grid>
                    </CardBody>


                    <CardFooter>
                        <Button
                            type="submit"
                            variant='solid'
                            colorScheme="telegram"
                            w={{ base: '100%', sm: 'auto' }}>
                            Add Tenant
                        </Button>
                    </CardFooter>

                </form>
            </Card>
        </Box>
    );
};

export default RegisterTenant;
