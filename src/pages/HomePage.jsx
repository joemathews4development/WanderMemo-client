import { useContext, useEffect, useState } from 'react'
import service from '../services/config.services'
import { AuthContext } from '../context/auth.context'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import FollowRequests from '../componnets/FollowRequests'
import TravelMap from '../componnets/TravelMap'
import TripList from '../componnets/TripList'

function HomePage() {

  const [trips, setTrips] = useState(null)
  const [followRequests, setFollowRequests] = useState(null)

  const { loggedInUser } = useContext(AuthContext)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
        const [tripsResponse, followRequestsResponse] = await Promise.all([
            service.get(`/trips/${loggedInUser._id}/user`),
            // service.get(`/follows?status=Pending`)
        ])
        console.log(tripsResponse.data)
        const tripsData = tripsResponse.data
        // const followRequestsData = followRequestsResponse.data
        setTrips(tripsData)
        // setTrips(followRequestsData)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <Box sx={{p:4}}>
        <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 6}}>
                <Box sx={{p: 4, borderRadius: 4, background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)", color: "white"}}>
                    <Typography variant='h4' fontWeight={700}> Hello {loggedInUser.firstName} 👋 </Typography>
                    <Typography sx={{ mt: 2 }}> Track your journeys and capture memories. </Typography>
                    <Button 
                      variant='contained' sx={{mt: 3, backgroundColor: "white", color: "#764ba2"}}
                    >
                        Create a new trip
                    </Button>
                </Box>
            </Grid>
            <Grid size={{xs: 12, md: 6}}><FollowRequests requests={followRequests}/></Grid>
            <Grid size={{xs: 12}}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                    <TravelMap trips={trips}/>
                </Paper>
            </Grid>
            <Grid size={{xs: 12}}><TripList trips={trips}/></Grid>
        </Grid>
    </Box>
  )
}

export default HomePage