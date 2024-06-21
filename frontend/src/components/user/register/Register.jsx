import React, { useState } from 'react'
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Heading,
} from '@chakra-ui/react'
import '../login/login.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { ErrorToast, SuccessToast } from '../../Toast/Toast';
import axios from 'axios';


const basicCSS = {
  display: 'flex',
  gap: '1rem',
  mt: "1rem",
  justifyContent: 'center',
  alignItems: 'center'
}
const basic = {
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: "1rem"
}

const Register = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()
  const [reg, setreg] = useState(false)
  const [load, setload] = useState(false)

  const [signupInput, setsignupInput] = useState({ firstName: "", lastName: "", email: "", password: "" })


  const SignupAPI = async (body) => {
    const res = await axios.post('http://localhost:3000/user/signup', body)
    return res
  }

  //-----------------------------------------------------
  const handleSignupInput = (e) => {
    const { name, value } = e.target
    setsignupInput((data) => ({ ...data, [name]: value }))
  }

  //-----------------------------------------------------

  const handleBtnRegister = () => {
    const { firstName, lastName, email, password } = signupInput
    setreg(true)
    if (firstName) {
      if (lastName) {
        if (email && email.includes('@') && email.at(-1) !== '@' && email.at(0) !== '@') {
          if (password) {
            SignupAPI({ firstName, lastName, email, password }).then((res) => {
              if (res.status === 201) {
                SuccessToast("Success Register")
                setTimeout(() => {
                  navigate('/')
                }, 1000)
              }
            }).catch((err) => {
              ErrorToast(err.response.data.message)
            })
          } else {
            ErrorToast("Please enter password")
            setreg(false)
          }
        } else {
          ErrorToast("Please enter valid email")
          setreg(false)
        }
      } else {
        ErrorToast("Please enter LastName")
        setreg(false)
      }
    } else {
      ErrorToast("Please enter FirstName")
      setreg(false)
    }
  }


  const handleBtnlogin = () => {
    setload(true)
    const reg = setTimeout(() => {
      navigate('/')
    }, 1000)
    return () => {
      clearInterval(reg)
    }
  }


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Box className='container' >

        <Box p='10' rounded='md' bg='white' w="30rem" >
          <Heading sx={basic} size='lg'>Register</Heading>

          <Input placeholder='First Name' width="100%" focusBorderColor='#3fbfbf' onChange={handleSignupInput} name="firstName" />
          <Input placeholder='Last Name' width="100%" focusBorderColor='#3fbfbf' mt="1rem" onChange={handleSignupInput} name="lastName" />
          <Input Type='email' placeholder='Email' width="100%" focusBorderColor='#3fbfbf' mt="1rem" onChange={handleSignupInput} name="email" />

          <InputGroup mt='1rem' size='md'>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
              focusBorderColor='#3fbfbf'
              name="password"
              onChange={handleSignupInput}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Box sx={basicCSS}>

            <Button
              isLoading={load ? 'isLoading' : ""}
              loadingText='Loading'
              colorScheme='teal'
              variant='outline'
              spinnerPlacement='start'
              color="#3fbfbf"
              sx={{ _hover: { bg: "#3fbfbf", color: "black", border: "none" } }}

              onClick={handleBtnlogin}
            >
              Login
            </Button>

            <Button
              isLoading={reg ? 'isLoading' : ""}
              loadingText='Loading'
              colorScheme='teal'
              variant='outline'
              spinnerPlacement='start'
              color="#3fbfbf"
              sx={{ _hover: { bg: "#3fbfbf", color: "black", border: "none" } }}
              onClick={handleBtnRegister}
            >
              Register
            </Button>


          </Box>

        </Box>
      </Box>
    </>
  )
}

export default Register