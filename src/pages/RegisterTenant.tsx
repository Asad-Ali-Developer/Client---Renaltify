import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Heading, Input, InputGroup, InputLeftElement, Spinner, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { PiUploadSimpleBold } from "react-icons/pi";
import { RiIdCardFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import useAddTenant from "../hooks/useAddTenant";
import { Tenant } from "../hooks/useAllTenants";
import useUploadImage from "../hooks/useUploadImage";


const tenantSchema = z.object({
    tenantName: z.string().min(3, { message: "Name must be at least 3 characters" }),
    phone: z.string().length(11, { message: "Phone number must be 11 digits" }),
    AnotherPhone: z.string().length(11, { message: "Phone number must be 11 digits" }),
    members: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Members must be a number",
    }),
    address: z.string().min(10, { message: "Address must be at least 10 characters" }),
    rentDecided: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Rent must be a number",
    }),
    idNumber: z.string().min(13, { message: "Id number must be at least 13 digits" }),
    IdFileLink: z.string().optional(), // Ensure it's a string
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Please provide a valid date",
    }),
    isActive: z.boolean().optional(),
});

type tenantData = z.infer<typeof tenantSchema>;

const RegisterTenant = () => {
    document.title = "Add Tenant";
    
    const navigate = useNavigate();

    // To Upload data
    const { mutate } = useAddTenant();

    // To Upload Image
    const { uploadImage } = useUploadImage()

    const [imageFile, setImageFile] = useState<File | null>(null)

    const [imageUploading, setImageUploading] = useState(false)

    const [isUploadingTenant, setIsUploadingTenant] = useState(false)

    document.title = "Add Tenant";

    // Form handling
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<tenantData>({
        resolver: zodResolver(tenantSchema),
        defaultValues: {
            members: "1",
            rentDecided: "1000",
            date: new Date().toISOString().split("T")[0],
        }
    });

    // Image Upload Handler
    const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files?.[0];

        if (fileInput) {
            setImageFile(fileInput)
        }
    };

    const onSubmit = async (data: tenantData) => {
        setIsUploadingTenant(true);
        let imageUrl = data.IdFileLink;
    
        try {
          // Handle image upload if image file is selected
          if (imageFile) {
            setImageUploading(true);
            imageUrl = await uploadImage(imageFile);
            setValue("IdFileLink", imageUrl); // Update form data with the uploaded image URL
            setImageUploading(false);
          }
    
          // Prepare tenant data for submission
          const tenantDataForSubmission: Tenant = {
            _id: "", // Server generates this
            tenantName: data.tenantName,
            phone: Number(data.phone),
            AnotherPhone: Number(data.AnotherPhone),
            members: Number(data.members),
            address: data.address,
            rentDecided: data.rentDecided.toString(),
            date: data.date,
            idNumber: data.idNumber,
            IdFileLink: imageUrl || "",
            isActive: data.isActive || false,
            QrCode: "",
          };
    
          // Submit tenant data after image upload completes
          mutate(tenantDataForSubmission, {
            onSuccess: () => {
              toast.success("Tenant added successfully!");
              setIsUploadingTenant(false);
              setTimeout(() => {
                navigate("/tenants");
              }, 3000);
            },
            onError: () => {
              toast.error("Failed to add tenant");
              setIsUploadingTenant(false);
            },
          });
        } catch (error) {
          console.error("Error adding tenant:", error);
          setIsUploadingTenant(false);
        }
      };


    return (
        <Box
            mt={14}
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
                                color={useColorModeValue('#FF6B6B', '#FF8E8E')}>
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
                                            focusBorderColor="#e05757"
                                            placeholder="Enter tenant name"
                                        />
                                    </InputGroup>
                                    <Text color="red.500" fontSize='sm'>{errors.tenantName?.message}</Text>
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
                                            placeholder="Enter phone"
                                            focusBorderColor="#e05757"
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
                                            focusBorderColor="#e05757"
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
                                            pl={10}
                                            variant='filled'
                                            focusBorderColor="#e05757"
                                            placeholder="Enter address"
                                            h={{ base: 'auto', lg: 32 }}
                                        />
                                    </InputGroup>
                                    <Text color="red.500" fontSize='sm'>{errors.address?.message}</Text>
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
                                            focusBorderColor="#e05757"
                                            placeholder="Total members"
                                        />
                                    </InputGroup>
                                    <Text color="red.500" fontSize='sm'>{errors.members?.message}</Text>
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
                                            focusBorderColor="#e05757"
                                            placeholder="Rent decided"
                                        />
                                        <Text color="red.500" fontSize='sm'>{errors.rentDecided?.message}</Text>
                                    </InputGroup>
                                </Box>

                                <Box mb={4}>
                                    <Text fontSize={{ base: 'sm', md: 'md' }}>Shifting Date</Text>
                                    <Input
                                        {...register('date')}
                                        type="date"
                                        variant='filled'
                                        focusBorderColor="#e05757"
                                        placeholder="Shifting Date"
                                    />
                                    <Text color="red.500" fontSize='sm'>{errors.date?.message}</Text>
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
                                            focusBorderColor="#e05757"
                                            placeholder="Enter ID number"
                                        />
                                    </InputGroup>
                                    <Text color="red.500" fontSize='sm'>{errors.idNumber?.message}</Text>
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
                                    <Text color="red.500" fontSize='sm'>{errors.IdFileLink?.message}</Text>
                                </Box>
                            </Box>
                        </Grid>
                    </CardBody>


                    <CardFooter>
                        <Button
                            bg="#e05757"
                            type="submit"
                            color="white"
                            _hover={{ bg: "#FF6B6B" }}
                            w={{ base: '100%', sm: 'auto' }}
                            disabled={imageUploading || isUploadingTenant}>

                            {imageUploading || isUploadingTenant
                                ? imageUploading
                                    ? <Flex gap={1.5} alignItems='center'>
                                        <Spinner size='sm' />
                                        <Text>Uploading Image</Text>
                                    </Flex>
                                    : <Flex gap={1.5} alignItems='center'>
                                        <Spinner size='sm' />
                                        <Text>Registering Tenant</Text>
                                    </Flex>
                                : 'Regiter Tenant'
                            }
                        </Button>
                    </CardFooter>

                </form>
            </Card>
        </Box>
    );
};

export default RegisterTenant;
