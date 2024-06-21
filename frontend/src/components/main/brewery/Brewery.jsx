import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { DataAPI } from '../../Toast/APICall';
import {
    Card, CardBody, Box, Stack, Divider, Text, Link, Heading, IconButton, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input
} from '@chakra-ui/react'
import { ErrorToast } from '../../Toast/Toast'
import { ToastContainer } from 'react-toastify';
import { HamburgerIcon } from '@chakra-ui/icons'
import axios from 'axios';

const basic = {
    display: 'flex',
    flexDirection: 'colum',
    justifyContent: "space-between",
    alignItems: "center",
}


const cardStyle = {
    mt: "1rem",
    cursor: "pointer",
    px: "2rem"

}

const boxStyle = {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
}



const Brewery = () => {
    const { id } = useParams()
    const [SingleData, setSingleData] = useState({})
     const navigate=useNavigate()
    useEffect(() => {
        DataAPI(id).then((res) => {
            setSingleData(res.data)
        })
    }, [id])
    const handlelogout = async () => {
        try {
            axios.defaults.withCredentials = true
            const res = await axios.post('http://localhost:3000/user/logout')
            navigate('/')
        } catch (err) {
            ErrorToast(err.message)
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
            
            <Box bg="#dd9b9b" minH='100vh' color="#000" p="2rem" sx={boxStyle}>


                <Card maxW='xs' sx={cardStyle} key={SingleData.id}>
                    <CardBody>
                        <Stack mt='6' spacing='3' sx={basic} p="0rem" m="0rem">
                            <Heading size='sm' fontFamily='cursive'>{SingleData.name}</Heading>
                        </Stack>
                    </CardBody>

                    <Divider />

                    <Box >
                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>Brewery Address:</Text>
                            <Text fontSize='xs'>{SingleData.address_1}</Text>
                        </Box>

                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>Brewery Type:</Text>
                            <Text fontSize='xs'>{SingleData.brewery_type}</Text>
                        </Box>

                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>Phone number:</Text>
                            <Text fontSize='xs'>{SingleData.phone}</Text>
                        </Box>

                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>Website URL:</Text>
                            {SingleData.website_url ? <Link href={SingleData.website_url} isExternal>Link</Link> : <Text fontSize='xs'>Not Available</Text>}
                        </Box>

                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>Longitude:</Text>
                            <Text fontSize='xs'>{SingleData.longitude}</Text>
                        </Box>
                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>Latitude:</Text>
                            <Text fontSize='xs'>{SingleData.latitude}</Text>
                        </Box>
                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>Street:</Text>
                            <Text fontSize='xs'>{SingleData.street}</Text>
                        </Box>
                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>City:</Text>
                            <Text fontSize='xs'>{SingleData.city}</Text>
                        </Box>
                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>State:</Text>
                            <Text fontSize='xs'>{SingleData.state}</Text>
                        </Box>
                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>Country:</Text>
                            <Text fontSize='xs'>{SingleData.country}</Text>
                        </Box>
                        <Box sx={basic} p="0.5rem">
                            <Text fontSize='xs' as='b'>Postal Code:</Text>
                            <Text fontSize='xs'>{SingleData.postal_code}</Text>
                        </Box>

                    </Box>
                </Card>

            </Box>
        </>
    )
}

export default Brewery