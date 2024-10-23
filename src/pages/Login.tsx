import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import useLogin from "../hooks/useLogin";
import { useState } from "react";


const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export type formDataLogin = z.infer<typeof schema>

const Login = () => {

  const navigate = useNavigate()

  const { mutate } = useLogin()

  const [loginLoading, setLoginLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formDataLogin>({
    resolver: zodResolver(schema)
  })


  const onSubmit = async (data: formDataLogin) => {
    console.log(data);

    try {

      setLoginLoading(true);
      mutate(
        data,
        {
          onSuccess: () => {
            toast.success('Login Successfully')
            setLoginLoading(false);
            setTimeout(() => {
              navigate('/')
            }, 1000)
          },

          onError: () => {
            toast.error('Login Error')
            setLoginLoading(false);
          }
        })

    } catch (error) {
      console.log(error);
      setLoginLoading(false);
    }
  }


  return (
    <Box
      mt={14}
      display="flex"
      alignItems="center"
      backgroundSize='cover'
      justifyContent="center"
      backgroundPosition='center'
      backgroundImage='https://images.pexels.com/photos/1853542/pexels-photo-1853542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      minH={{ base: "90vh", lg: "92vh" }}>

      <Card
        w="full"
        maxW="md"
        shadow="lg"
        rounded="lg"
        bg='transparent'
        backdropBlur={40}
        p={{ base: 6, sm: 8 }}
        mx={{ base: 2, lg: 4 }}
        backdropFilter='blur(50px)'
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
            bg="#FF6B6B"
            type="submit"
            color="white"
            colorScheme='red'
            disabled={loginLoading}
            _hover={{ bg: "#FF8E8E" }}>
            {loginLoading
              ? <Spinner size='sm' />
              : 'Login'}
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
