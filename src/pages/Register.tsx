import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { PiUploadSimpleBold } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import useUploadImage from "../hooks/useUploadImage";
import useRegister from "../hooks/useRegister";
import { toast } from "react-toastify";


const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(11, { message: "Phone number must be at least 11 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  IdFileLink: z.string().optional()
})

export type formData = z.infer<typeof schema>

const Register = () => {

  const navigate = useNavigate();

  const { mutate } = useRegister();

  const { uploadImage } = useUploadImage()

  const [imageUploading, setImageUploading] = useState(false);

  const [registerLoading, setRegisterLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<formData>({
    resolver: zodResolver(schema)
  })


  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {

    const fileInput = e.target.files?.[0]

    if (fileInput) {
      setImageFile(fileInput)
    }
  }


  const onSubmit = async (data: formData) => {
    console.log(data);

    try {

      let imageUrl = data.IdFileLink

      if (imageFile) {
        setImageUploading(true)
        try {
          imageUrl = await uploadImage(imageFile)
          setValue('IdFileLink', imageUrl);
          setImageUploading(false)
          console.log(imageUrl);

        } catch (error) {
          console.log(error);
          return;

        } finally {
          setImageUploading(false)
        }
      }

      try {
        setRegisterLoading(true)

        mutate(
          { ...data, IdFileLink: imageUrl },
          {
            onSuccess: () => {
              toast.success('Registered successfully')
              setRegisterLoading(false)

              setTimeout(() => {
                navigate('/')
              }, 2000)

            },

            onError: () => {
              toast.error('Error registering')
              setRegisterLoading(false)
            }

          })

      } catch (error) {
        console.log(error);
        setRegisterLoading(false)
        toast.error('Error registering')
      }

    } catch (error) {
      console.log(error);
      toast.error('Not registered')
    }

  }



  return (
    <Box
      mt={14}
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH={{ base: "90vh", lg: "92vh" }}>

      <Card
        w="full"
        maxW="md"
        shadow="lg"
        rounded="lg"
        backdropBlur={40}
        p={{ base: 6, sm: 8 }}
        mx={{ base: 2, lg: 4 }}
        fontSize={{ base: 14, md: 16 }}>

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
                  focusBorderColor="#e05757"
                  fontSize={{ base: 14, md: 16 }}
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
                  focusBorderColor="#e05757"
                  placeholder="m@example.com"
                  fontSize={{ base: 14, md: 16 }}
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
                placeholder="phone"
                focusBorderColor="#e05757"
                fontSize={{ base: 14, md: 16 }}
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
                placeholder="Password"
                focusBorderColor="#e05757"
                fontSize={{ base: 14, md: 16 }}
              />
            </InputGroup>
            <Text color='red'>{errors.password?.message}</Text>
          </Box>

          <Box my={4}>
            <Flex alignItems='center' gap={1}>
              <Text fontSize={{ base: 'sm', md: 'md' }}> ID File </Text>
              <PiUploadSimpleBold />
            </Flex>

            <Input
              type="file"
              id="IdCardFile"
              variant='filled'
              onChange={handleFileInput}
              focusBorderColor="#e05757"
              className="FileInputStyling"
              fontSize={{ base: 14, md: 16 }}
            />
            <Text color="red.500">{errors.IdFileLink?.message}</Text>
          </Box>



          {/* This field or button is for the submission for the Registeration Form */}
          <Button
            mt={6}
            w="full"
            size="lg"
            bg="#e05757"
            color="white"
            type="submit"
            _hover={{ bg: "#FF6B6B" }}
            disabled={imageUploading || registerLoading}>
            {imageUploading || registerLoading
              ? imageUploading
                ? <Flex gap={1.5} alignItems='center'>
                  <Spinner size='sm' />
                  <Text>Uploading Image</Text>
                </Flex>
                : <Flex gap={1.5} alignItems='center'>
                  <Spinner size='sm' />
                  <Text>Registering</Text>
                </Flex>

              : 'Register'
            }
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

          <Text color="#FF6B6B" fontWeight="medium">
            <NavLink to='/login'>
              Log in
            </NavLink>
          </Text>

        </HStack>

      </Card>
    </Box>
  );
};

export default Register;;
