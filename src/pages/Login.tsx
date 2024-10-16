import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  HStack,
  InputGroup,
  InputLeftElement,
  Card,
} from "@chakra-ui/react";

import { z } from "zod";
import { toast } from "react-toastify";
import { apiClientOK } from "../services/apiClient";
import { MdEmail } from "react-icons/md";
import { useAuth } from "../store/authToken";
import { ChangeEvent, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";


const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})


type formData = z.infer<typeof schema>


const Login = () => {

  const navigate = useNavigate()

  const { storeTokenInLS } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formData>({
    resolver: zodResolver(schema)
  })


  const [user, setUser] = useState<formData>({
    email: "",
    password: "",
  })


  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }


  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    const response = await fetch(`${apiClientOK}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      credentials: 'include'
    })

    console.log(response);


    const res_data = await response.json();

    storeTokenInLS(res_data.token)


    if (response.ok) {
      toast.success("Login Successful!")
      setUser({
        email: "",
        password: ""
      })

      navigate('/')

    } else {
      toast.error('Invalid credentials!')
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
            Login
          </Heading>
          <Text color="gray.400" mt={2}>
            Login your account to manage your tenants.
          </Text>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={4}>

            {/* This field is for email */}
            <Box>
              <label
                htmlFor="email">
                Email</label>
              <InputGroup>
                <InputLeftElement>
                  <MdEmail color='gray.300' />
                </InputLeftElement>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  variant='filled'
                  colorScheme="red"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="m@example.com"
                  focusBorderColor="#e05757"
                  fontSize={{ base: 14, md: 16 }}
                />
              </InputGroup>
              <Text color='red'>{errors.email?.message}</Text>
            </Box>
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
                focusBorderColor="#e05757"
                fontSize={{ base: 14, md: 16 }}
              />
            </InputGroup>
            <Text color='red'>{errors.password?.message}</Text>
          </Box>

          {/* This field or button is for the submission for the Registeration Form */}
          <Button
            mt={6}
            w="full"
            size="lg"
            type="submit"
            bg="#FF6B6B"
            colorScheme='red'
            _hover={{ bg: "#FF8E8E" }}
            color="white">
            Login
          </Button>
        </form>


        <HStack
          mt={6}
          alignItems='center'
          justifyContent='center'>

          <Text
            fontSize="sm"
            textAlign="center">
            Or register for a new account?{" "}
          </Text>

          <Text color="#FF6B6B" fontWeight="medium">
            <NavLink to='/register'>
              Register
            </NavLink>
          </Text>

        </HStack>

      </Card>
    </Box>
  );
};

export default Login;;
