import {
  Box,
  Button,
  Input,
  Heading,
  useColorModeValue,
  HStack,
  InputGroup,
  InputLeftElement,
  Flex,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import imageCompression from 'browser-image-compression';
import { PiUploadSimpleBold } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebaseApp from "../firebaseConfig";
import { apiClientOK } from "../services/apiClient";


const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(11, { message: "Phone number must be at least 11 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  IdFileLink: z.string().optional()
})

type formData = z.infer<typeof schema>

const Register = () => {

  const navigate = useNavigate()
  const [imageUrl, setImageURL] = useState<string>('')

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<formData>({
    resolver: zodResolver(schema)
  })


  const [user, setUser] = useState<formData>({
    username: "",
    email: "",
    phone: "",
    password: "",
    IdFileLink: imageUrl || "",
  })


  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }


  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {

    const fileInput = e.target.files?.[0]

    if (fileInput) {

      const Options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }

      const compressedFile = await imageCompression(fileInput, Options);

      const storage = getStorage(firebaseApp);

      const storageRef = ref(storage, `profiles/${compressedFile.name}`);

      await uploadBytes(storageRef, compressedFile);

      const downloadURL = await getDownloadURL(storageRef);

      setImageURL(downloadURL);

      console.log(downloadURL);

      setValue('IdFileLink', downloadURL)

      setUser(prev => ({ ...prev, IdFileLink: downloadURL }));  // Update local state

    }
  }

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    const response = await fetch(`${apiClientOK}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      credentials: 'include'
    })

    console.log(response);

    if (response.ok) {
      toast.success("Account created successfully")
      setUser({
        username: "",
        email: "",
        phone: "",
        password: "",
        IdFileLink: imageUrl || "",
      })

      navigate('/login')

    } else {
      toast.error('User not registered!')
    }
  }

  return (
    <Box
      bg='gray.900'
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH={{ base: "90vh", lg: "92vh" }}
      bgImage='https://plus.unsplash.com/premium_photo-1664302091622-32248181a4b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>

      <Box
        w="full"
        maxW="md"
        shadow="lg"
        rounded="lg"
        backdropBlur={40}
        p={{ base: 6, sm: 8 }}
        mx={{ base: 2, lg: 4 }}
        bg={useColorModeValue("white", "gray.800")}>

        <Box textAlign="center" mb={6}>
          <Heading size="lg" fontWeight="bold">
            Register
          </Heading>
          <Text color="gray.400" mt={2}>
            Register your account to manage your tenants.
          </Text>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={4}>

            {/* This field is for username */}
            <Box>
              <label htmlFor="username">Username</label>
              <InputGroup>
                <InputLeftElement>
                  <FaUser color='gray.300' />
                </InputLeftElement>
                <Input
                  {...register("username")}
                  id="username"
                  variant='filled'
                  placeholder="John Doe"
                  value={user.username}
                  onChange={handleInput}
                  focusBorderColor="telegram.500"
                />
              </InputGroup>
              <Text color="red">{errors.username?.message}</Text>
            </Box>


            {/* This field is for email */}
            <Box>
              <label htmlFor="email">Email</label>
              <InputGroup>
                <InputLeftElement>
                  <MdEmail color='gray.300' />
                </InputLeftElement>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  variant='filled'
                  value={user.email}
                  onChange={handleInput}
                  placeholder="m@example.com"
                  focusBorderColor="telegram.500"
                />
              </InputGroup>
              <Text color='red'>{errors.email?.message}</Text>
            </Box>
          </Box>

          {/* This field is for phone */}
          <Box mt={4}>
            <label htmlFor="phone">Phone</label>
            <InputGroup>
              <InputLeftElement>
                <FaPhoneAlt color='gray.300' />
              </InputLeftElement>

              <Input
                {...register("phone")}
                id="phone"
                type="number"
                variant='filled'
                value={user.phone}
                placeholder="phone"
                onChange={handleInput}
                focusBorderColor="telegram.500"
              />
            </InputGroup>
            <Text color='red'>{errors.phone?.message}</Text>
          </Box>

          {/* This field is for password */}
          <Box mt={4}>
            <label htmlFor="password">Password</label>
            <InputGroup>
              <InputLeftElement>
                <RiLockPasswordFill />
              </InputLeftElement>
              <Input
                {...register("password")}
                id="password"
                type="password"
                variant='filled'
                value={user.password}
                onChange={handleInput}
                placeholder="Password"
                focusBorderColor="telegram.500"
              />
            </InputGroup>
            <Text color='red'>{errors.password?.message}</Text>
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



          {/* This field or button is for the submission for the Registeration Form */}
          <Button
            mt={6}
            w="full"
            size="lg"
            type="submit"
            colorScheme="telegram">
            Register
          </Button>
        </form>


        <HStack
          mt={6}
          alignItems='center'
          justifyContent='center'>

          <Text
            fontSize="sm"
            textAlign="center">
            Already have an account?{" "}
          </Text>

          <Text color="telegram.400" fontWeight="medium">
            <NavLink to='/login'>
              Log in
            </NavLink>
          </Text>

        </HStack>

      </Box>
    </Box>
  );
};

export default Register;;
