import React, { useState } from 'react'
import { Card, CardBody,Box, Stack, Heading, Divider, Text, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


const basic = {
  display: 'flex',
  flexDirection: 'colum',
  justifyContent: "space-between",
  alignItems: "center",
}


const cardStyle = {
  mt: "1rem",
  cursor: "pointer"
}

const UserCard = ({ SearchData }) => {
  const navigate = useNavigate()

  const handleCardbtn = (res) => {
      navigate(`/dashboard/brewery/${res.id}`)
  }


  return (

    <>
      {SearchData && SearchData.map((res) => {
        return <Card maxW='xs' sx={cardStyle} key={res.id} onClick={()=>handleCardbtn(res)}>
          <CardBody>
            <Stack mt='6' spacing='3' sx={basic} p="0rem" m="0rem">
              <Heading size='sm' fontFamily='cursive'>{res.name}</Heading>
            </Stack>
          </CardBody>

          <Divider />

          <Box >
            <Box sx={basic} p="0.5rem">
              <Text fontSize='xs' as='b'>Brewery Address:</Text>
              <Text fontSize='xs'>{res.address_1}</Text>
            </Box>

            <Box sx={basic} p="0.5rem">
              <Text fontSize='xs' as='b'>Phone number:</Text>
              <Text fontSize='xs'>{res.phone}</Text>
            </Box>

            <Box sx={basic} p="0.5rem">
              <Text fontSize='xs' as='b'>Website URL:</Text>
              {res.website_url ? <Link href={res.website_url} isExternal>Link</Link> : <Text fontSize='xs'>Not Available</Text>}
            </Box>

            <Box sx={basic} p="0.5rem">
              <Text fontSize='xs' as='b'>City:</Text>
              <Text fontSize='xs'>{res.city}</Text>
            </Box>
            <Box sx={basic} p="0.5rem">
              <Text fontSize='xs' as='b'>State:</Text>
              <Text fontSize='xs'>{res.state}</Text>
            </Box>

          </Box>
        </Card>
      })
      }
    </>

  )
}

export default UserCard

