import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab'
import { Box, Card, CardContent, Chip, ImageList, ImageListItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MemoryDetailsModal from './MemoryDetailsModalComponent'

function TripTimeline({ memories, reloadData }) {
    const [open, setOpen] = useState(false)
    const [selectedMemory, setSelectedMemory] = useState(null)

    return (
        <>
            <Timeline position="alternate">
                {memories.map((item, index) => {
                    const memory = item._doc
                    return (
                        <TimelineItem key={memory._id} onClick={() => {
                            setSelectedMemory(memory)
                            setOpen(true)
                            }}>
                            <TimelineOppositeContent color='text.secondary'>{memory.date}</TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color='primary' />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3, width: "100%" }}>
                                    {memory.medias?.length > 0 && (
                                        <Box sx={{ position: "relative" }}>
                                            <ImageList cols={memory.medias.length >= 3 ? 3 : memory.medias.length} gap={4}>
                                                {memory.medias.map((img, index) => (
                                                    <ImageListItem key={index}>
                                                        <img src={img} alt={memory.title} loading="lazy"
                                                            style={{
                                                                width: "100%", maxWidth: "100%", maxHeight: "100%",
                                                                objectFit: "cover", borderRadius: "8px"
                                                            }}
                                                        />
                                                    </ImageListItem>
                                                ))}
                                            </ImageList>
                                            <Box
                                                sx={{
                                                    position: "absolute", bottom: 0, left: 0, right: 0, p: 2,
                                                    background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))"
                                                }}
                                            >
                                                <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
                                                    {memory.title}
                                                </Typography>
                                            </Box>
                                            <Chip label={memory.type} size="small"
                                                sx={{ position: "absolute", top: 12, right: 12, background: "white" }}
                                            />
                                        </Box>
                                    )}
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary" mb={2}>
                                            {memory.caption}
                                        </Typography>
                                        <Box
                                            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                                        >
                                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                                {item.reactions &&
                                                    Object.entries(item.reactions).map(([emoji, count]) => (
                                                        <Chip key={emoji} label={`${emoji} ${count}`} size="small" variant="outlined" />
                                                    ))}

                                                {item.commentCount > 0 && (
                                                    <Chip label={`💬 ${item.commentCount}`} size="small" variant="outlined" />
                                                )}
                                            </Box>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(memory.date).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </TimelineContent>
                        </TimelineItem>


                    )
                })}
            </Timeline>

            <MemoryDetailsModal 
                isNew={false} open={open} onClose={() => setOpen(false)} memory={selectedMemory}  
                reloadData={reloadData} disableRestoreFocus mode={"edit"}
            />
        </>

    )
}

export default TripTimeline