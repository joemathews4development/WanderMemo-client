import { Box, Button, colors, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import service from '../services/config.services'
import EditTripModal from './EditTripModalComponent'
import MemoryDetailsModal from './MemoryDetailsModalComponent'

function TripHeaderComponent({ trip, loadData }) {

    const [openEditModal, setOpenEditModal] = useState(false)
    const [openAddMemoryModal, setOpenAddMemoryModal] = useState(false)

    const handleSave = async (updatedTrip) => {
        console.log(updatedTrip)
        // Example API call
        try {
            await service.put(`/trips/${trip._id}`, updatedTrip)
        } catch (error) {
            console.log(error)
        }
        setOpen(false)
    }
    return (
        <Box sx={{ p: 4, borderRadius: 4, background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)", color: "white" }}>
            <Typography variant="h4" fontWeight={700}>{trip.title}</Typography>
            <Typography sx={{ mt: 1 }}>{trip.startDate} → {trip.endDate}</Typography>
            <Typography sx={{ mt: 1 }}>Cities: {trip.cities.map(city => city.city).join(", ")}</Typography>
            <Stack direction="row" spacing={2} mt={3}>
                <Button variant="contained" sx={{ backgroundColor: "white", color: "#764ba2" }} onClick={() => setOpenEditModal(true)}>
                    Edit Trip
                </Button>
                <EditTripModal open={openEditModal} onClose={() => setOpenEditModal(false)} trip={trip} onSave={handleSave}/>
                <Button variant="outlined" sx={{ color: "white", borderColor: "white" }} onClick={() => setOpenAddMemoryModal(true)}>
                    Add Memory
                </Button>
                <MemoryDetailsModal 
                    isNew={true} open={openAddMemoryModal} onClose={() => setOpenAddMemoryModal(false)} 
                    onSave={loadData} trip={trip} disableRestoreFocus
                />
            </Stack>
        </Box>
    )
}

export default TripHeaderComponent