import {
  Dialog, Box, Typography, IconButton, TextField, Button, Grid,
  CircularProgress, MenuItem, DialogTitle, DialogContent, DialogActions,
  FormControl,
  InputLabel,
  Select
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import UploadIcon from "@mui/icons-material/Upload";
import { useContext, useEffect, useState } from "react"
import { MEMORY_TYPES as memoryTypes, VISIBILITIES as visibilities } from "./Constants"
import service from "../services/config.services"
import { ToastContext } from "../context/toast.context"
import CitySelector from "./CitySelector"

function MemoryDetailsModal({ open, onClose, memory, reloadData, trip, mode }) {

  const [form, setForm] = useState({
    title: "",
    caption: "",
    type: "",
    date: "",
    city: null,
    medias: [],
    cost: "",
    visibility: ""
  })

  const { showToast } = useContext(ToastContext)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (mode === "edit" && memory) {
      setForm({
        title: memory.title || "",
        caption: memory.caption || "",
        type: memory.type || "",
        date: memory.date?.slice(0, 10) || "",
        city: memory.city || null,
        medias: memory.medias || [],
        cost: memory.cost || "",
        visibility: memory.visibility || ""
      });
    }
  }, [memory, mode]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async () => {
    console.log(form)
    mode === "create" ? createMemory() : saveMemory()
  }

  const saveMemory = async () => {
    try {
      form.city = form.city._id
      await service.put(`/memories/${memory._id}`, form)
      reloadData()
      onClose()
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
      await service.post(`/memories`, form)
      reloadData()
      onClose()
      showToast("Created new memory successfully", "success")
    } catch (error) {
      console.log(error)
      showToast(error.response.data.errorMessage, "error")
    }
  }

  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }
    setIsUploading(true); // to start the loading animation
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await service.post("/upload/", uploadData)
      setForm(prev => ({
        ...prev,
        medias: [...prev.medias, response.data.imageUrl]
      }))
      console.log(memory.medias)
      console.log(form.medias)
    } catch (error) {
      console.log(error)
      showToast(error.response.data.errorMessage, "error")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl" disableRestoreFocus>
      <DialogTitle>{mode === "create" ? "Create Memory" : "Edit Memory"}</DialogTitle>
      <DialogContent>
        <Typography variant="h6" mb={2}> Images </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 2 }}>
          {form.medias.map((img, i) => (
            <Box key={i} sx={{ position: "relative" }}>
              <img src={img} alt=""
                style={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 8 }}
              />
              <IconButton
                size="small" sx={{ position: "absolute", top: 5, right: 5, background: "rgba(0,0,0,0.6)", color: "white" }}
                onClick={() => setForm(prev => ({ ...prev, medias: prev.medias.filter((_, index) => index !== i) }))}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Box sx={{ my: 2 }}>
          <Button variant="outlined" component="label" startIcon={<UploadIcon />} disabled={isUploading}>
            Upload Image
            <input type="file" hidden name="image" onChange={handleFileUpload} />
          </Button>

          {/* Uploading indicator */}
          {isUploading && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 1 }}>
              <CircularProgress size={20} />
              <Typography variant="body2">
                Uploading image...
              </Typography>
            </Box>
          )}
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Title" name="title" value={form.title} onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Caption" name="caption" value={form.caption} onChange={handleChange}
              multiline rows={3} fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CitySelector value={form.city} onChange={(city) => {
              setForm({
                ...form,
                city: city
              })
            }}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TextField
              label="Date" name="date" type="date" value={form.date} onChange={handleChange}
              fullWidth InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TextField label="Cost" name="cost" value={form.cost}
              onChange={handleChange} fullWidth
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label" id="type" name="type"
                value={form.type} label="Type" onChange={handleChange}
              >
                {memoryTypes.map((mType) => (
                  <MenuItem key={mType} value={mType}>
                    {mType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="visibility-label">Visibility</InputLabel>
              <Select
                labelId="visibility-label" id="visibility" name="visibility"
                value={form.visibility} label="Visibility" onChange={handleChange}
              >
                {visibilities.map((visibility) => (
                  <MenuItem key={visibility} value={visibility}>
                    {visibility}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === "create" ? "Create Memory" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MemoryDetailsModal