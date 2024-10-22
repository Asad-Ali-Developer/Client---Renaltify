import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Spinner,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiIdCardFill } from "react-icons/ri";
import useUploadImage from "../hooks/useUploadImage";
import { toast } from "react-toastify";
import { Tenant } from "../hooks/useAllTenants";
import useUpdateTenant from "../hooks/useUpdateTenant";

const tenantSchema = z.object({
    tenantName: z.string().min(3, { message: "Name must be at least 3 characters" }),
    phone: z.string().length(11, { message: "Phone number must be 11 characters" }),
    AnotherPhone: z.string().length(11, { message: "Phone number must be 11 characters" }),
    members: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Members must be a number",
    }).optional(),
    address: z.string().min(10, { message: "Address must be at least 10 characters" }),
    rentDecided: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Rent must be a number",
    }),
    idNumber: z.string().min(4, { message: "Id number must be at least 4 characters" }),
    IdFileLink: z.string().optional(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Please provide a valid date",
    }),
    isActive: z.boolean().optional(),
});

type tenantData = z.infer<typeof tenantSchema>;

interface Props {
    tenantId: string | "";
    isOpenUdater: boolean;
    onCloseUpdater: () => void;
    tenant: Tenant | null;
}

const UpdateTenantBox = ({ tenantId, isOpenUdater, onCloseUpdater, tenant }: Props) => {
    const id = tenantId || "";
    const { mutate } = useUpdateTenant();
    const { uploadImage } = useUploadImage();
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    console.log(tenant);

    useEffect(() => {

    }, [tenant, tenantId])


    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<tenantData>({
        resolver: zodResolver(tenantSchema),
        defaultValues: {
            tenantName: "",
            phone: "",
            AnotherPhone: "",
            members: "",
            address: "",
            rentDecided: "",
            idNumber: "",
            IdFileLink: "",
            date: "",
            isActive: false
        }
    });

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    
    const onSubmit = async (data: tenantData) => {
        // When tenant prop changes, reset the form with the new tenant data
        useEffect(() => {
            if (tenant) {
                reset({
                    tenantName: tenant.tenantName || "",
                    phone: tenant.phone ? String(tenant.phone) : "",
                    AnotherPhone: tenant.AnotherPhone ? String(tenant.AnotherPhone) : "",
                    members: tenant.members ? String(tenant.members) : "",
                    address: tenant.address || "",
                    rentDecided: tenant.rentDecided || "",
                    idNumber: tenant.idNumber || "",
                    IdFileLink: tenant.IdFileLink || "",
                    date: tenant.date || "",
                    isActive: tenant.isActive || false,
                });
            }
        }, [tenant, reset]); // Reset the form every time tenant data is updated


        try {
            let imageUrl = data.IdFileLink; // Default to existing URL if no new file

            if (selectedFile) {
                setImageUploading(true); // Set loading for image upload
                try {
                    imageUrl = await uploadImage(selectedFile);
                    setValue("IdFileLink", imageUrl); // Set image URL in form data
                } catch (error) {
                    console.error("Error uploading image:", error);
                    toast.error("Error uploading image!");
                    return;
                } finally {
                    setImageUploading(false); // Stop image loading state
                }
            }

            // Prepare updated tenant data
            const updatedData: Tenant = {
                _id: id,
                tenantName: data.tenantName,
                phone: Number(data.phone),
                AnotherPhone: Number(data.AnotherPhone),
                members: Number(data.members),
                address: data.address,
                rentDecided: data.rentDecided || '', // Convert rentDecided to number
                date: new Date(data.date).toISOString() || "", // Convert to ISO string
                idNumber: data.idNumber,
                IdFileLink: imageUrl || "",
                isActive: data.isActive || false,
                QrCode: tenant?.QrCode || '',
            };

            if (id) {
                setLoading(true); // Set loading for form submission

                mutate(
                    { id: id, updatedData: updatedData },
                    {
                        onSuccess: () => {
                            toast.success("Tenant updated successfully");
                            reset();
                            onCloseUpdater();
                            setLoading(false);
                        },
                        onError: () => {
                            toast.error("Not Updated yet!");
                            setLoading(false);
                        },
                    }
                );
            }
        } catch (error) {
            console.log(error);
            toast.error("Not Updated yet!");
        } finally {
            setLoading(false);
            reset();
        }
    };

    return (
        <>
            <Modal
                isCentered
                isOpen={isOpenUdater}
                onClose={onCloseUpdater}
                blockScrollOnMount={false}
                motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent
                    mx="auto"
                    ml={{ base: 6, sm: 9, md: 'auto' }}
                    maxW={{ base: "90%", md: "500px" }} w="95%">
                    <ModalHeader>Updating Tenant: </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl>
                                <FormLabel fontSize={{ base: 14, md: 16 }}>Tenant Name</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <FaUser />
                                    </InputLeftElement>
                                    <Input {...register("tenantName")}
                                        focusBorderColor="#e05757"
                                        fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Enter tenant name" />
                                </InputGroup>
                                <Text color="red.500">{errors.tenantName?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={{ base: 14, md: 16 }}>Phone</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <FaPhoneAlt />
                                    </InputLeftElement>
                                    <Input {...register("phone")}
                                        focusBorderColor="#e05757"
                                        fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Enter phone" />
                                </InputGroup>
                                <Text color="red.500">{errors.phone?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={{ base: 14, md: 16 }}>Another Phone</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <FaPhoneAlt />
                                    </InputLeftElement>
                                    <Input
                                        {...register("AnotherPhone")}
                                        focusBorderColor="#e05757"
                                        fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Enter another phone" />
                                </InputGroup>
                                <Text color="red.500">{errors.AnotherPhone?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={{ base: 14, md: 16 }}>Members</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <BsFillPeopleFill />
                                    </InputLeftElement>
                                    <Input {...register("members")}
                                        focusBorderColor="#e05757"
                                        fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Total members" />
                                </InputGroup>
                                <Text color="red.500">{errors.members?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={{ base: 14, md: 16 }}>Rent Decided</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>Rs.</InputLeftElement>
                                    <Input {...register("rentDecided")}
                                        focusBorderColor="#e05757"
                                        fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Rent amount" />
                                </InputGroup>
                                <Text color="red.500">{errors.rentDecided?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={{ base: 14, md: 16 }}>Shifting Date</FormLabel>
                                <Input {...register("date")}
                                    focusBorderColor="#e05757"
                                    fontSize={{ base: 14, md: 16 }}
                                    variant='filled' type="date" placeholder="Shifting Date" />
                                <Text color="red.500">{errors.date?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={{ base: 14, md: 16 }}>ID Number</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <RiIdCardFill />
                                    </InputLeftElement>
                                    <Input {...register("idNumber")}
                                        focusBorderColor="#e05757"
                                        fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Enter ID number" />
                                </InputGroup>
                                <Text color="red.500">{errors.idNumber?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={{ base: 14, md: 16 }}>ID File</FormLabel>
                                <Input
                                    type="file"
                                    className="FileInputStyling"
                                    fontSize={{ base: 14, md: 16 }}
                                    variant='filled' onChange={handleFileInput} />
                            </FormControl>
                        </SimpleGrid>

                        <FormControl mt={4}>
                            <FormLabel fontSize={{ base: 14, md: 16 }}>Address</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <FaLocationDot />
                                </InputLeftElement>
                                <Textarea
                                    {...register("address")}
                                    px={8}
                                    resize='none'
                                    variant='filled'
                                    focusBorderColor="#e05757"
                                    placeholder="Enter address"
                                    fontSize={{ base: 14, md: 16 }}
                                />
                            </InputGroup>
                            <Text color="red.500">{errors.address?.message}</Text>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            mr={3}
                            bg="#e05757"
                            type="submit"
                            color="white"
                            disabled={loading}
                            _hover={{ bg: "#FF6B6B" }}
                            onClick={handleSubmit(onSubmit)}>
                            {loading || imageUploading
                                ? imageUploading
                                    ? <Flex alignItems='center'>
                                        <Spinner size='sm' />
                                        <Text ml={2}>Uploading Image</Text>
                                    </Flex>
                                    : <Flex alignItems='center'>
                                        <Spinner size='sm' />
                                        <Text ml={2}>Uploading Data</Text>
                                    </Flex>
                                : "Update"}
                        </Button>
                        <Button onClick={onCloseUpdater}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateTenantBox;
