import { useContext, useEffect, useState } from 'react'
import service from '../services/config.services'
import { AuthContext } from '../context/auth.context'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import FollowRequests from '../componnets/FollowRequests'
import TravelMap from '../componnets/TravelMap'
import TripList from '../componnets/TripList'
import { ToastContext } from '../context/toast.context'
import EditTripModal from '../componnets/EditTripModalComponent'
import { MODAL_VIEW_MODES as modes } from '../componnets/Constants'

function HomePage() {

    const [trips, setTrips] = useState(null)
    const [followRequests, setFollowRequests] = useState([])

    const [openEditModal, setOpenEditModal] = useState(false)

    const { showToast } = useContext(ToastContext)

    const { loggedInUser } = useContext(AuthContext)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const [tripsResponse, followRequestsResponse] = await Promise.all([
                service.get(`/trips/${loggedInUser._id}/user`),
                service.get(`/follows?status=Pending`)
            ])
            const tripsData = tripsResponse.data
            const followRequestsData = followRequestsResponse.data
            setTrips(tripsData)
            setFollowRequests(followRequestsData)
        } catch (error) {
            console.log(error)
            showToast(`Loading data failed: ${error}`, "error")
        }
    }

    const loadTrips = async () => {
        try {
            const tripsResponse = await service.get(`/trips/${loggedInUser._id}/user`)
            const tripsData = tripsResponse.data
            setTrips(tripsData)
        } catch (error) {
            console.log(error)
            showToast(`Loading trips failed: ${error}`, "error")
        }
    }

    const loadFollowRequests = async () => {
        try {
            const followRequestsResponse = await service.get(`/follows?status=Pending`)
            const followRequestsData = followRequestsResponse.data
            setFollowRequests(followRequestsData)
        } catch (error) {
            console.log(error)
            showToast(`Loading follow requests failed: ${error}`, "error")
        }
    }

    const createNewTrip = async (newTrip) => {
        try {
            await service.post(`/trips`, newTrip)
            showToast("Created new trip successfully", "success")
            loadTrips()
        } catch (error) {
            console.log(error)
            showToast(error.response.data.errorMessage, "error")
        } finally {
            setOpenEditModal(false)
        }
    }

    const updateFollowRequest = async (updatedStatus, requestId) => {
        try {
            await service.patch(`/follows/${requestId}`, {status: updatedStatus})
            showToast("Updated follow request successfully", "success")
            loadFollowRequests()
        } catch (error) {
            console.log(error)
            showToast(error.response.data.errorMessage, "error")
        }
    }

    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ p: 4, borderRadius: 4, background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)", color: "white" }}>
                        <Typography variant='h4' fontWeight={700}> Hello {loggedInUser.firstName} 👋 </Typography>
                        <Typography sx={{ mt: 2 }}> Track your journeys and capture memories. </Typography>
                        <Button
                            variant='contained' sx={{ mt: 3, backgroundColor: "white", color: "#764ba2" }} 
                            onClick={() => setOpenEditModal(true)}
                        >
                            Create a new trip
                        </Button>
                        <EditTripModal open={openEditModal} onClose={() => setOpenEditModal(false)} onSave={createNewTrip} mode={modes.CREATE}/>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}><FollowRequests requests={followRequests} updateRequest={updateFollowRequest}/></Grid>
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 2, borderRadius: 3 }}>
                        <TravelMap trips={trips} screenMode={"Trips"}/>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12 }}><TripList trips={trips} /></Grid>
            </Grid>
        </Box>
    )
}

export default HomePage