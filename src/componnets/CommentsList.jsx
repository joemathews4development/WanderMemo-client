import React, { useContext, useEffect, useState } from 'react'
import service from '../services/config.services'
import LoadingScreen from './LoadinScreen'
import { Avatar, Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete"
import { ToastContext } from '../context/toast.context'
import { AuthContext } from '../context/auth.context'

function CommentsList({ memoryId, loadMemory }) {

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    const [loading, setLoading] = useState(true)

    const { showToast } = useContext(ToastContext)

    const { loggedInUser } = useContext(AuthContext)

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
            loadMemory()
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

    const deleteComment = async (commentId) => {
        try {
            await service.delete(`/comments/${commentId}`)
            showToast("Deleted comment successfully", "success")
            loadMemory()
            fetchComments()
        } catch (error) {
            console.log(error)
            showToast("Deleting comment failed", "error")
        }
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
                        <Box key={comment._id} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
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
                            {comment.user._id === loggedInUser._id && (
                                <IconButton
                                    size="small"
                                    onClick={() => deleteComment(comment._id)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                    )
                })}
            </Stack>
            {addCommentComponent()}
        </Box>
    )
}

export default CommentsList