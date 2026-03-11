import React, { useContext, useEffect, useState } from 'react'
import service from '../services/config.services'
import LoadingScreen from './LoadinScreen'
import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { ToastContext } from '../context/toast.context'

function CommentsList({ memoryId }) {

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    const [loading, setLoading] = useState(true)

    const { showToast } = useContext(ToastContext)

    useEffect(() => {
        fetchComments()
    }, [])

    const fetchComments = async () => {
        try {
            setLoading(true)
            const response = await service.get(`/comments/${memoryId}`)
            setComments(response.data)
        } catch (error) {
            console.log(error)
            showToast("fetching comments failed", "error")
        } finally {
            setLoading(false)
        }
    }

    const addComment = async () => {
        try {
            await service.post(`/comments/memories/${memoryId}`, { content: newComment })
            showToast("Added comment successfully", "success")
            setNewComment("")
            fetchComments()
        } catch (error) {
            console.log(error)
            showToast("Adding comment failed", "error")
        }
    }

    const addCommentComponent = () => {
        return (
            <Box sx={{ display: "flex", gap: 2 }}>
                <TextField 
                    placeholder="Write a comment..." value={newComment} size="small"
                    onChange={(e) => setNewComment(e.target.value)} fullWidth
                />
                <Button variant="contained" onClick={addComment}>
                    Post
                </Button>
            </Box>
        )
    }

    if (loading) {
        return <LoadingScreen text='Loading Comments...' fullPage />
    }

    if (comments.length === 0) {
        return (
            <>
            <Typography variant="h5" sx={{ textAlign: "center", my: 4 }}>There are no comments</Typography>
            {addCommentComponent()}
            </>
        )
    }

    return (
        <Box>
            <Stack spacing={2} sx={{ mb: 3 }}>
                {comments.map((comment) => {
                    return (
                        <Box key={comment._id} sx={{ display: "flex", gap: 2 }}>
                            <Avatar src={comment.user.profileImage}>
                                {comment.user.firstName?.[0]}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2">
                                    {comment.user.firstName} {comment.user.lastName}
                                </Typography>
                                <Typography variant="body2">
                                    {comment.content}
                                </Typography>
                            </Box>
                        </Box>
                    )
                })}
            </Stack>
            {addCommentComponent()}
        </Box>
    )
}

export default CommentsList