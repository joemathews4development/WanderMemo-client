import {
  Dialog,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  ImageList,
  ImageListItem,
  Chip,
  Grid,
  Select,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import { useContext, useEffect, useState } from "react"
import { MEMORY_TYPES as memoryTypes, VISIBILITIES as visibilities } from "./Constants"
import service from "../services/config.services"
import { ToastContext } from "../context/toast.context"
import CitySelector from "./CitySelector"

function MemoryDetailsModal({ isNew, open, onClose, memory, onSave, trip }) {

  const [isEditing, setIsEditing] = useState(isNew ? true : false)

  const [form, setForm] = useState({
    title: "",
    caption: "",
    type: "",
    date: "",
    city: null,
    cost: "",
    visibility: ""
  })

  const { showToast } = useContext(ToastContext)

  useEffect(() => {
      if (memory?.city) {
        getCity()
      }
  }, [])

  const getCity = async () => {
    try {
        const city = await service.get(`/cities/${memory.city._id}`)
        setForm({
        ...form,
        city: city
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (memory) {
      setForm({
        title: memory.title || "",
        caption: memory.caption || "",
        type: memory.type || "",
        date: memory.date?.slice(0, 10) || "",
        city: memory.city || null,
        cost: memory.cost || "",
        visibility: memory.visibility || ""
      });
    }
  }, [memory]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  const handleEdit = () => {
    //setForm(memory)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    console.log(isNew)
    if (isNew) {
      onClose()
      return
    }
    setForm({
      title: memory.title || "",
      caption: memory.caption || "",
      type: memory.type || "",
      date: memory.date?.slice(0, 10) || "",
      city: memory.city || null,
      cost: memory.cost || "",
      visibility: memory.visibility || ""
    })
    setIsEditing(false)
  }

  const handleSubmit = async () => {
    console.log(form)
    isNew ? createMemory() : saveMemory()
  }

  const saveMemory = async () => {
      try {
        form.city = form.city._id
        await service.put(`/memories/${memory._id}`, form)
        setIsEditing(false)
        onSave()
        showToast("Updated memory successfully", "success")
      } catch (error) {
        console.log(error)
        showToast(error.response.data.errorMessage, "error")
      }
  }

  const createMemory = async () => {
      try {
        form.trip = trip._id
        form.city = form.city._id
        console.log(form)
        await service.post(`/memories`, form)
        onClose()
        onSave()
        showToast("Created new memory successfully", "success")
      } catch (error) {
        console.log(error)
        showToast(error.response.data.errorMessage, "error")
      }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl" disableRestoreFocus>
      <DialogTitle>{isEditing ? "Edit Memory" : "Memory"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Title" name="title" value={form.title} onChange={handleChange}
              fullWidth disabled={!isEditing}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Caption" name="caption" value={form.caption} onChange={handleChange}
              multiline rows={3} fullWidth disabled={!isEditing}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
  <CitySelector
    value={form.city?.city}
    disabled={!isEditing}
    onChange={(city) => {
      console.log("over here", city)
setForm({
        ...form,
        city: city
      })
    }
      
    }
  />
</Grid>
          <Grid size={{ xs: 3 }}>
            <TextField
              label="Date" name="date" type="date" value={form.date} onChange={handleChange}
              fullWidth InputLabelProps={{ shrink: true }} disabled={!isEditing}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TextField label="Cost" name="cost" value={form.cost}
              onChange={handleChange} fullWidth disabled={!isEditing}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TextField 
              id="memory-type" select value={form.type} name="type" label="Type" 
              onChange={handleChange} fullWidth disabled={!isEditing}
            >
              {memoryTypes.map(mType => (<MenuItem key={mType} value={mType}>{mType}</MenuItem>))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TextField
              id="visibility-type" select value={form.visibility} name="visibility" 
              label="Visibility" onChange={handleChange} fullWidth disabled={!isEditing} 
            >
              {visibilities.map(visibility => (<MenuItem key={visibility} value={visibility}>{visibility}</MenuItem>))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {isEditing ? (
          <>
            <Button onClick={handleCancelEdit}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </>
        ) : (<Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>)}
      </DialogActions>
    </Dialog>
  )

  // return (
  //   <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
  //     <Box
  //       sx={{
  //         position: "sticky", top: 0, background: "white", zIndex: 10, p: 2,
  //         display: "flex",
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //         borderBottom: "1px solid #eee"
  //       }}
  //     >
  //       <Typography variant="h6">Edit Memory</Typography>
  //       <IconButton onClick={onClose}>
  //         <CloseIcon />
  //       </IconButton>
  //     </Box>
  //     {/* SCROLLABLE BODY */}
  //     <Box sx={{ maxHeight: "70vh", overflowY: "auto", p: 3 }} >
  //       {/* IMAGE GALLERY */}
  //       <Typography variant="h6" mb={2}> Images </Typography>
  //       <ImageList cols={3} gap={8}>
  //         {images.map((img, i) => (
  //           <ImageListItem key={i} sx={{ position: "relative" }}>
  //             <img src={img} alt=""
  //               style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 8 }}
  //             />
  //             {isEditing && (
  //               <IconButton size="small" onClick={() => removeImage(i)}
  //                 sx={{ position: "absolute", top: 5, right: 5, background: "rgba(0,0,0,0.6)", color: "white" }}
  //               >
  //                 <DeleteIcon fontSize="small" />
  //               </IconButton>
  //             )}
  //           </ImageListItem>
  //         ))}
  //       </ImageList>
  //       {isEditing && (
  //         <Button variant="outlined" sx={{ mt: 2 }} onClick={openCloudinary} >
  //           Add Image
  //         </Button>
  //       )}

  //       {/* DETAILS */}
  //       <Box mt={4}>
  //         <Typography variant="h6">Details</Typography>
  //         <Grid container spacing={2} mt={1}>
  //           <Grid size={{ xs: 12 }}>
  //             <TextField
  //               label="Title" name="title" value={form.title} onChange={handleChange}
  //               fullWidth disabled={!isEditing}
  //             />
  //           </Grid>
  //           <Grid size={{ xs: 12 }}>
  //             <TextField 
  //               label="Caption" name="caption" value={form.caption} onChange={handleChange} 
  //               multiline rows={3} fullWidth disabled={!isEditing} 
  //             />
  //           </Grid>
  //           <Grid size={{ xs: 4 }}>
  //             <Select value={form.type} label="Type" onChange={handleChange} disabled={!isEditing} >
  //               {memoryTypes.map(mType => (<MenuItem key={mType}>{mType}</MenuItem>))}
  //             </Select>
  //           </Grid>
  //           <Grid size={{ xs: 4 }}>
  //             <TextField 
  //               label="Date" name="date" type="date" value={form.date} onChange={handleChange} 
  //               fullWidth  InputLabelProps={{ shrink: true }} disabled={!isEditing} 
  //             />
  //           </Grid>
  //           <Grid size={{ xs: 4 }}>
  //             <TextField label="Cost" name="cost" value={form.cost} 
  //               onChange={handleChange} fullWidth disabled={!isEditing}
  //             />
  //           </Grid>
  //           <Grid size={{ xs: 4 }}>
  //             <Select 
  //               value={form.visibility} label="Visibility" onChange={handleChange} disabled={!isEditing} >
  //               {visibilities.map(visibility => (<MenuItem key={visibility}>{visibility}</MenuItem>))}
  //             </Select>
  //           </Grid>
  //         </Grid>
  //       </Box>

  //       {/* REACTIONS */}
  //       <Box mt={4}>
  //         <Typography variant="h6">Reactions</Typography>

  //         <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
  //           {Object.entries(memory.reactions || {}).map(([emoji, count]) => (
  //             <Chip key={emoji} label={`${emoji} ${count}`} />
  //           ))}
  //         </Box>
  //       </Box>

  //       {/* COMMENTS */}
  //       <Box mt={4}>
  //         <Typography variant="h6">Comments</Typography>

  //         {memory.comments?.map((comment) => (
  //           <Box
  //             key={comment._id}
  //             sx={{
  //               borderBottom: "1px solid #eee",
  //               py: 1.5
  //             }}
  //           >
  //             <Typography variant="subtitle2">
  //               {comment.user?.name}
  //             </Typography>

  //             <Typography variant="body2">
  //               {comment.text}
  //             </Typography>
  //           </Box>
  //         ))}
  //       </Box>

  //     </Box>

  //     {/* FOOTER */}
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "flex-end",
  //         gap: 2
  //       }}
  //     >

  //       {!isEditing && (
  //         <Button variant="contained" onClick={handleEdit}>
  //           Edit
  //         </Button>
  //       )}

  //       {isEditing && (
  //         <>
  //           <Button onClick={handleCancelEdit}>
  //             Cancel
  //           </Button>

  //           <Button variant="contained">
  //             Save Changes
  //           </Button>
  //         </>
  //       )}

  //     </Box>

  //   </Dialog>
  // )
}

export default MemoryDetailsModal