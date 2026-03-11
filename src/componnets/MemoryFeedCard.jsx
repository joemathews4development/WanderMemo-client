import { Card, CardHeader, Avatar, CardContent, Typography, CardMedia, Box, IconButton, Button, Popover, Dialog, DialogTitle, DialogContent } from "@mui/material"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import service from "../services/config.services"
import { useState } from "react"
import CommentsList from "./CommentsList"

function MemoryFeedCard(props) {
     console.log(props.memory)
    const reactions = ["👍", "❤️", "😂", "😮", "😢", "😡", "🔥"]

    const [memory, setMemory] = useState(props.memory)

    const [anchorEl, setAnchorEl] = useState(null)
    const [openComments, setOpenComments] = useState(false)

    const addReaction = async (memoryId, emoji) => {
        try {
            await service.post(`/reactions/memories/${memory._id}`, {
                emoji: emoji
            })
            loadMemory()
        } catch (error) {
            console.log(error)
        }
    }

    const loadMemory = async () => {
        try {
            const response = await service.get(`/memories/${memory._id}`)
            console.log(response.data)
            setMemory(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(memory.reactions)
    return (
        <Card sx={{ mb: 3 }}>
            <CardHeader
                avatar={
                    <Avatar /*src={memory.user.profileImage}*/>
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
                            {new Date(memory.updatedAt).toLocaleString()}
                        </Typography>
                    </Box>
                }
            />
            {memory.medias?.length > 0 && (
                <CardMedia
                    component="img" image={memory.medias[0]}
                    sx={{ width: "100%", maxHeight: 400, objectFit: "contain" }}
                />
            )}
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button startIcon={<InsertEmoticonIcon />} onClick={(e) => setAnchorEl(e.currentTarget)}>
                    {Object.values(memory.reactions).reduce((sum, value) => sum + value, 0)}
                </Button>
                <Popover
                    open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <Box sx={{ p: 1, display: "flex", gap: 1 }}>
                        {reactions.map((emoji) => (
                            <IconButton key={emoji} onClick={() => {
                                addReaction(memory._id, emoji)
                                setAnchorEl(null)
                            }}
                            >
                                {emoji} {memory.reactions[emoji] || 0}
                            </IconButton>
                        ))}

                    </Box>

                </Popover>
                <Button startIcon={<ChatBubbleOutlineIcon />} onClick={() => setOpenComments(true)}>
                    Comment
                </Button>
                <Dialog open={openComments} onClose={() => setOpenComments(false)} fullWidth maxWidth="lg">
                    <DialogTitle>Comments</DialogTitle>
                    <DialogContent>
                        <CommentsList memoryId={memory._id} />
                    </DialogContent>
                </Dialog>
            </Box>
            <CardContent>
                <Typography fontWeight={600}> {memory.title} </Typography>
                <Typography color="text.secondary"> {memory.caption} </Typography>
            </CardContent>
        </Card>
    )

}

export default MemoryFeedCard