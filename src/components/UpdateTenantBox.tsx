import {
    Button,
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
    Text,
    Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
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
    }),
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
    const { uploadImage, isLoading, setIsLoading, ImageURL } = useUploadImage();
    const id = tenantId || "";
    const { mutate } = useUpdateTenant();
    const [loading, setLoading] = useState(false)

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<tenantData>({
        resolver: zodResolver(tenantSchema),
        defaultValues: {
            members: tenant?.members.toString() || '1',
            rentDecided: tenant?.rentDecided.toString() || '1000',
            date: tenant?.date || new Date().toISOString().split("T")[0],
            isActive: tenant?.isActive || false,
            IdFileLink: tenant?.IdFileLink || "",
            idNumber: tenant?.idNumber || "",
            tenantName: tenant?.tenantName || "",
            phone: `0${tenant?.phone.toString()}` || "",
            AnotherPhone: `0${tenant?.AnotherPhone.toString()}` || "",
            address: tenant?.address || "",
        },
    });


    const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setIsLoading(true);

            try {
                await uploadImage(file);
                if (ImageURL) {
                    console.log(ImageURL);
                    setValue("IdFileLink", ImageURL);
                    setIsLoading(false);
                }
            } catch (error) {
                toast.error("Not uploaded!");
                setIsLoading(false);
                console.log(error);
            }
        }
    };

    const onSubmit = async (data: tenantData) => {
        if (!ImageURL) {
            toast.error("Not uploaded!");
            return;
        }

        try {
            const updatedData: Tenant = {
                _id: id,
                tenantName: data.tenantName,
                phone: Number(data.phone),
                AnotherPhone: Number(data.AnotherPhone),
                members: Number(data.members),
                address: data.address,
                rentDecided: data.rentDecided,
                date: tenant?.date
                    ? new Date(tenant?.date).toLocaleDateString()
                    : new Date().toISOString().split("T")[0],
                idNumber: data.idNumber,
                IdFileLink: data.IdFileLink || ImageURL,
                isActive: data.isActive || false,
                QrCode: "",
            };

            if (id) {
                setLoading(true)
                mutate({
                    id: id,
                    updatedData: updatedData,
                }, {
                    onSuccess: () => {
                        toast.success("Tenant updated successfully");
                        onCloseUpdater();
                        setLoading(false)
                    },
                    onError: () => {
                        toast.error("Not Updated yet!");
                        setLoading(false)
                    }
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Not Updated yet!");
        }
    };

    return (
        <>
            <Modal
                isCentered
                onClose={onCloseUpdater}
                isOpen={isOpenUdater}
                blockScrollOnMount={false}
            >
                <ModalOverlay />
                <ModalContent
                    mx="auto"
                    // fontSize={{ base: 12, md: 14 }}
                    ml={{ base: 6, sm: 9, md: 'auto' }}
                    maxW={{ base: "90%", md: "500px" }} w="95%">
                    <ModalHeader>Update Tenant</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl>
                                <FormLabel
                                fontSize={{ base: 14, md: 16 }}>Tenant Name</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <FaUser />
                                    </InputLeftElement>
                                    <Input {...register("tenantName")}
                                    fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Enter tenant name" />
                                </InputGroup>
                                <Text color="red.500">{errors.tenantName?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                fontSize={{ base: 14, md: 16 }}>Phone</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <FaPhoneAlt />
                                    </InputLeftElement>
                                    <Input {...register("phone")}
                                    fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Enter phone" />
                                </InputGroup>
                                <Text color="red.500">{errors.phone?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                fontSize={{ base: 14, md: 16 }}>Another Phone</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <FaPhoneAlt />
                                    </InputLeftElement>
                                    <Input {...register("AnotherPhone")}
                                    fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Enter another phone" />
                                </InputGroup>
                                <Text color="red.500">{errors.AnotherPhone?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                fontSize={{ base: 14, md: 16 }}>Members</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <BsFillPeopleFill />
                                    </InputLeftElement>
                                    <Input {...register("members")}
                                    fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Total members" />
                                </InputGroup>
                                <Text color="red.500">{errors.members?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                fontSize={{ base: 14, md: 16 }}>Rent Decided</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>Rs.</InputLeftElement>
                                    <Input {...register("rentDecided")}
                                    fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Rent amount" />
                                </InputGroup>
                                <Text color="red.500">{errors.rentDecided?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                fontSize={{ base: 14, md: 16 }}>Shifting Date</FormLabel>
                                <Input {...register("date")}
                                fontSize={{ base: 14, md: 16 }}
                                    variant='filled' type="date" placeholder="Shifting Date" />
                                <Text color="red.500">{errors.date?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                fontSize={{ base: 14, md: 16 }}>ID Number</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <RiIdCardFill />
                                    </InputLeftElement>
                                    <Input {...register("idNumber")}
                                        fontSize={{ base: 14, md: 16 }}
                                        variant='filled' placeholder="Enter ID number" />
                                </InputGroup>
                                <Text color="red.500">{errors.idNumber?.message}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                fontSize={{ base: 14, md: 16 }}>ID File</FormLabel>
                                <Input
                                    type="file"
                                    className="FileInputStyling"
                                    fontSize={{ base: 14, md: 16 }}
                                    variant='filled' onChange={handleFileInput} />
                                {isLoading && <Text>Uploading Image...</Text>}
                            </FormControl>
                        </SimpleGrid>

                        <FormControl mt={4}>
                            <FormLabel
                            fontSize={{ base: 14, md: 16 }}>Address</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <FaLocationDot />
                                </InputLeftElement>
                                <Textarea
                                    px={8}
                                    resize='none'
                                    variant='filled'
                                    {...register("address")}
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
                            disabled={loading}
                            colorScheme="blue"
                            onClick={handleSubmit(onSubmit)}>
                            {loading ? "Updating..." : "Update"}
                        </Button>
                        <Button onClick={onCloseUpdater}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateTenantBox;
