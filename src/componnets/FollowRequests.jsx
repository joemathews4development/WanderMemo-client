import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

function FollowRequests({ requests, onAccept, onReject }) {
    if (!requests?.length) return null
    return (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3}}>
            <Typography variant='h6' fontWeight={600} mb={2}>Pending Follow Requests</Typography>
            <Stack spacing={2}>
                {requests.map((request) => {
                    <Box key={request._id} sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                            <Avatar src={request.follower.profileImage}/>
                            <Typography>{request.follower.firstName} {request.follower.lastName}</Typography>
                        </Box>
                        <Box sx={{display: "flex", gap: 1}} >
                            <Button variant='contained' size='small' onClick={onAccept}></Button>
                            <Button variant='outlined' size='small' color='error' onClick={onReject}></Button>
                        </Box>
                    </Box>
                })}
            </Stack>
        </Paper>
    )
}

export default FollowRequests