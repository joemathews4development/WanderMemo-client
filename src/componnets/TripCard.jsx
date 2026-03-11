import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function TripCard({ trip }) {
    console.log("over here", trip)
    const navigate = useNavigate()
    return (
        <Card
            onClick={() => navigate(`/trips/${trip._id}`)}
            sx={{
                borderRadius: 3, overflow: "hidden", transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 6 }
            }}
        >
            <CardMedia component="img" height="160" image={
                trip.image ||
                "https://picsum.photos/1200/600"
            } />
            <CardContent>
                <Typography variant='h6'>{trip.title}</Typography>
                <Typography variant="body2" color="text.secondary">{trip.description}</Typography>
            </CardContent>
        </Card>
    )
}

export default TripCard