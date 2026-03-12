import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

function FollowRequests({ requests, updateRequest }) {
    console.log(requests)
    if (requests.length === 0) {
        return(
        <Typography variant="h5" sx={{textAlign:"center", my:4}}>There are no pending requests</Typography>
        )
    }  
    return (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3}}>
            <Typography variant='h6' fontWeight={600} mb={2}>Pending Follow Requests</Typography>
            <Stack spacing={2}>
                {requests.map((request) => {
                    return (
                        <Box key={request._id} sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                            <Avatar src={request.follower.profileImage}/>
                            <Typography>{request.follower.firstName} {request.follower.lastName}</Typography>
                        </Box>
                        <Box sx={{display: "flex", gap: 1}} >
                            <Button variant='contained' size='small' onClick={() => updateRequest("Accepted", request._id)}>Accept</Button>
                            <Button variant='outlined' size='small' color='error' onClick={() => updateRequest("Rejected", request._id)}>Reject</Button>
                        </Box>
                    </Box>
                    )
                })}
            </Stack>
        </Paper>
    )
}

export default FollowRequests