import {
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    CardMedia,
    Box
} from "@mui/material"

function MemoryFeedCard({ memory }) {

    return (
        <Card sx={{ mb: 3 }}>
            <CardHeader
                avatar={
                    <Avatar src={memory.user.profileImage}>
                        {memory.user.firstName?.[0]}
                    </Avatar>
                }
                title={`${memory.user.firstName} ${memory.user.lastName}`}
                subheader={
                    <Box display="flex" justifyContent="space-between" width="100%">
                        <Typography variant="body2" color="text.secondary">
                            {memory.city?.city}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {new Date(memory.updatedAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                }
            />
            {memory.medias?.length > 0 && (
                <CardMedia component="img" height="400" image={memory.medias[0]} />
            )}
            <CardContent>
                <Typography fontWeight={600}> {memory.title} </Typography>
                <Typography color="text.secondary"> {memory.caption} </Typography>
            </CardContent>
        </Card>
    )
    
}

export default MemoryFeedCard