import { Grid } from '@mui/material'
import React from 'react'
import TripCard from './TripCard'

function TripList({ trips }) {
    if (!trips?.length) return null
    return (
        <Grid container spacing={3}>
            {trips.map((trip) => {
                return(
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={trip._id}>
                        <TripCard trip={trip}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default TripList