import React, { useState } from 'react'
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Heading,
} from '@chakra-ui/react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import { ErrorToast, SuccessToast } from '../../Toast/Toast'



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


const Login = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()
  const [reg, setreg] = useState(false)
  const [loginLoading, setloginLoading] = useState(false)
  const [logininput, setlogininput] = useState({ email: "", password: "" })

  const LoginAPI = async (body) => {

    try {
      axios.defaults.withCredentials = true
      const res = await axios.post('http://localhost:3000/user/login', body)
      return res
    } catch (err) {
      if (err.response.status === 400) {
        ErrorToast(err.response.data.message)
        setloginLoading(false)
      } else {
        ErrorToast(err.message)
        setloginLoading(false)
      }

    }

  }

  const handleBtnClick = () => {
    setreg(true)
    setTimeout(() => {
      navigate('/register')
    }, 1000)

  }

  const handleLogin = () => {
    const { email, password } = logininput;
    setloginLoading(true)

    if (email) {
      if (password) {
        LoginAPI({ email, password }).then((res) => {

          if (res.status === 200) {
            SuccessToast("Success Login")
            setTimeout(() => {
              navigate('/dashboard')
            }, 1000)
          }
        }).catch((err) => {
          ErrorToast(err.response.data.message)
          setloginLoading(false)
        })
      } else {
        ErrorToast("Please enter password")
        setloginLoading(false)
      }
    } else {
      ErrorToast("Please enter email")
      setloginLoading(false)
    }
  }

  //-------------------------------------------------
  const handleInput = (e) => {
    const { name, value } = e.target;
    setlogininput((data) => ({ ...data, [name]: value }))

  }
  //-------------------------------------------------


  return (

    <Box className='container' >
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

      <Box p='10' rounded='md' bg='white' w="30rem" >
        <Heading sx={basic} size='lg'>Login</Heading>

        <Input placeholder='Enter the email'
          width="100%"
          focusBorderColor='#3fbfbf'
          name='email'
          onChange={handleInput}
        />

        <InputGroup mt='1rem' size='md'>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            focusBorderColor='#3fbfbf'
            name='password'
            onChange={handleInput}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Box sx={basicCSS}>

          <Button
            isLoading={loginLoading ? 'isLoading' : ""}
            loadingText='Loading'
            colorScheme='teal'
            variant='outline'
            spinnerPlacement='start'
            color="#3fbfbf"
            sx={{ _hover: { bg: "#3fbfbf", color: "black", border: "none" } }}
            onClick={handleLogin}

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
            onClick={handleBtnClick}
          >
            Register
          </Button>


        </Box>

      </Box>
    </Box>


  )
}

export default Login