// import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Heading, Input, InputGroup, InputLeftElement, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ChangeEvent, useEffect, useState } from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import { GoArrowUpRight } from "react-icons/go";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// // import { useAuth } from "../store/authToken";
// import z from "zod";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import firebaseApp from "../firebaseConfig";
// import imageCompression from 'browser-image-compression';
// import { toast } from "react-toastify";
// import { FaPhoneAlt, FaUser } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { BsFillPeopleFill } from "react-icons/bs";
// import { RiIdCardFill } from "react-icons/ri";
// import { PiUploadSimpleBold } from "react-icons/pi";
// import { apiClientOK } from "../services/apiClient";

// const tenantSchema = z.object({
//     tenantName: z.string().min(3, { message: "Name must be at least 3 characters" }),
//     phone: z.string().length(11, { message: "Phone number must be 11 characters" }),
//     AnotherPhone: z.string().length(11, { message: "Phone number must be 11 characters" }),
//     members: z.string().refine((val) => !isNaN(Number(val)), {
//         message: "Members must be a number",
//     }),
//     address: z.string().min(10, { message: "Address must be at least 10 characters" }),
//     rentDecided: z.string().refine((val) => !isNaN(Number(val)), {
//         message: "Rent must be a number",
//     }),
//     idNumber: z.string().min(4, { message: "Id number must be at least 4 characters" }),
//     IdFileLink: z.string().optional(), // Ensure it's a string
//     date: z.string().refine((val) => !isNaN(Date.parse(val)), {
//         message: "Please provide a valid date",
//     }),
//     isActive: z.boolean().optional(),
// });

// type tenantData = z.infer<typeof tenantSchema>;

// const UpdateTenantBox = () => {
//     document.title = "Edit Tenant";

//     const navigate = useNavigate()
//     const { _id } = useParams<{ _id: string }>()
//     const [imageURL, setImageURL] = useState<string>('');
//     // const { authenticatedUser } = useAuth();

//     const [tenant, setTenant] = useState<tenantData>({
//         tenantName: "",
//         phone: "",
//         AnotherPhone: "",
//         members: "1",  // Treat as string for form handling
//         address: "",
//         rentDecided: "1000",  // Treat as string for form handling
//         idNumber: "",
//         IdFileLink: imageURL || "",
//         date: new Date().toISOString().split("T")[0],  // Initialize with the current date in YYYY-MM-DD format
//         isActive: false
//     });

//     const {
//         register,
//         setValue,
//         handleSubmit,
//         formState: { errors }
//     } = useForm<tenantData>({
//         resolver: zodResolver(tenantSchema)
//     });

//     return (
//         <>




//         </>
//     )
// }

// export default UpdateTenantBox