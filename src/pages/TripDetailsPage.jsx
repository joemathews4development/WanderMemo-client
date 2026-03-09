import React, { useEffect, useState } from 'react'
import TripHeaderComponent from '../componnets/TripHeaderComponent'
import service from '../services/config.services'
import { Box, CircularProgress, Typography } from '@mui/material'
import TravelMap from '../componnets/TravelMap'
import TripTimeline from '../componnets/TripTimeline'
import MemoryGrid from '../componnets/MemoryGrid'
import { useParams } from 'react-router-dom'

function TripDetailsPage() {

    const [trip, setTrip] = useState(null)
    const [memories, setMemories] = useState(null)

    const params = useParams()

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            const [tripResponse, memoriesResponse] = await Promise.all([
                service.get(`/trips/${params.tripId}`),
                service.get(`/memories/${params.tripId}/trip`)
            ])
            setTrip(tripResponse.data)
            setMemories(memoriesResponse.data)
        } catch (error) {
            console.log(error)
        }
    }

    if (!trip || !memories) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        <Box sx={{ p: 4 }}>
            <TripHeaderComponent trip={trip} />
            <Box sx={{ my: 4 }}><TravelMap trips={[trip]} /></Box>
            <Typography variant="h5" fontWeight={600} my={2} textAlign="center">Memory Timeline</Typography>
            <TripTimeline memories={memories} />
        </Box>
    )
}

export default TripDetailsPage