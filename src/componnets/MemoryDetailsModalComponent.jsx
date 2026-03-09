import {
  Dialog,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  ImageList,
  ImageListItem,
  Chip
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import { useState } from "react"

function MemoryDetailsModal({ open, onClose, memory }) {

    const [isEditing, setIsEditing] = useState(false)

  const [images, setImages] = useState(memory.medias)

  const handleEdit = () => {
    setForm(memory)
  setIsEditing(true)
}

const handleCancelEdit = () => {
  setIsEditing(false)
}

  const removeImage = (index) => {
    const updated = [...images]
    updated.splice(index, 1)
    setImages(updated)
  }

  const openCloudinary = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "YOUR_CLOUD_NAME",
        uploadPreset: "YOUR_PRESET",
        multiple: true
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [...prev, result.info.secure_url])
        }
      }
    )
  }

  return (
    <Dialog open={open} maxWidth="md" fullWidth>

      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 10,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee"
        }}
      >
        <Typography variant="h6">Edit Memory</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* SCROLLABLE BODY */}
      <Box
        sx={{
          maxHeight: "70vh",
          overflowY: "auto",
          p: 3
        }}
      >

        {/* IMAGE GALLERY */}
        <Typography variant="h6" mb={2}>
          Images
        </Typography>

        <ImageList cols={3} gap={8}>
          {images.map((img, i) => (
            <ImageListItem key={i} sx={{ position: "relative" }}>
              <img
                src={img}
                alt=""
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 8
                }}
              />

                {isEditing &&(
                    <IconButton
                size="small"
                onClick={() => removeImage(i)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  background: "rgba(0,0,0,0.6)",
                  color: "white"
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
                )}
              
            </ImageListItem>
          ))}
        </ImageList>

        {isEditing && (
            <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={openCloudinary}
        >
          Add Image
        </Button>
        )}

        {/* DETAILS */}
        <Box mt={4}>
          <Typography variant="h6">Details</Typography>

          <TextField
            label="Title"
            fullWidth
            margin="normal"
            defaultValue={memory.title}
            disabled={!isEditing}
          />

          <TextField
            label="Caption"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            defaultValue={memory.caption}
            disabled={!isEditing}
          />

          <TextField
            label="Type"
            fullWidth
            margin="normal"
            defaultValue={memory.type}
            disabled={!isEditing}
          />
        </Box>

        {/* REACTIONS */}
        <Box mt={4}>
          <Typography variant="h6">Reactions</Typography>

          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {Object.entries(memory.reactions || {}).map(([emoji, count]) => (
              <Chip key={emoji} label={`${emoji} ${count}`} />
            ))}
          </Box>
        </Box>

        {/* COMMENTS */}
        <Box mt={4}>
          <Typography variant="h6">Comments</Typography>

          {memory.comments?.map((comment) => (
            <Box
              key={comment._id}
              sx={{
                borderBottom: "1px solid #eee",
                py: 1.5
              }}
            >
              <Typography variant="subtitle2">
                {comment.user?.name}
              </Typography>

              <Typography variant="body2">
                {comment.text}
              </Typography>
            </Box>
          ))}
        </Box>

      </Box>

      {/* FOOTER */}
      <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    gap: 2
  }}
>

  {!isEditing && (
    <Button variant="contained" onClick={handleEdit}>
      Edit
    </Button>
  )}

  {isEditing && (
    <>
      <Button onClick={handleCancelEdit}>
        Cancel
      </Button>

      <Button variant="contained">
        Save Changes
      </Button>
    </>
  )}

</Box>

    </Dialog>
  )
}

export default MemoryDetailsModal