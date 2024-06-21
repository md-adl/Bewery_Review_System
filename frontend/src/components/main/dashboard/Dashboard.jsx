import {
  Box, Heading, IconButton, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input

} from '@chakra-ui/react'
import { Button} from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import UserCard from '../userCard/UserCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ErrorToast } from '../../Toast/Toast'
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { ByCityData } from '../../Toast/APICall'


const basic = {
  display: 'flex',
  flexDirection: 'colum',
  justifyContent: "center",
  alignItems: "center",
  flexWrap: 'wrap',
  gap:"1rem"


}
const Dashboard = () => {
  const [SearchInput,setSearchInput]=useState('')
  const [SearchData,setSearchData]=useState([])
  const navigate = useNavigate()

  const handlelogout = async () => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post('http://localhost:3000/user/logout')
      navigate('/')
    } catch (err) {
      ErrorToast(err.message)
    }
  }
  useEffect(()=>{
    const token = Cookies.get('token');
    if(!token){
        navigate('/')
    }
},[])


const handleSearchButton=async()=>{
  let data=await ByCityData(SearchInput)
  setSearchData(data)
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
      <Box bg="#dd9b9b" minH='100vh' color="#000" p="2rem">
        
        <Box display='flex' justifyContent='space-between' alignItems='basline' >
          <Heading textAlign='center' mb="1rem" fontFamily='cursive' size='lg'>Dashboard</Heading>
    
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem onClick={handlelogout}>
                Log out
              </MenuItem>
              <MenuItem onClick={() => navigate('/dashboard')}>
                DashBoard
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>


        <Box sx={basic}>
          <Input placeholder='Search' variant='filled' width="25rem" borderRightRadius="0"  focusBorderColor="green.500" onInput={(e)=>setSearchInput(e.target.value)}/>
          <Button colorScheme='green' borderLeftRadius="0" onClick={handleSearchButton}>Search</Button>
        </Box>

        <Box sx={basic}>
            <UserCard SearchData={SearchData}/>
        </Box>

      </Box>
    </>
  )
}

export default Dashboard