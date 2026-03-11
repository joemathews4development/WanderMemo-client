import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from "@mui/material";
import { MODAL_VIEW_MODES as modes } from "./Constants";

function EditTripModal({ open, onClose, trip, onSave, mode }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    cost: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    if (mode === modes.EDIT && trip) {
      setForm({
        title: trip.title || "",
        description: trip.description || "",
        cost: trip.cost || "",
        startDate: trip.startDate?.slice(0,10) || "",
        endDate: trip.endDate?.slice(0,10) || ""
      });
    }
  }, [trip, mode]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>{mode === modes.CREATE ? "Create Trip" : "Edit Trip"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={{xs: 12}}>
            <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth/>
          </Grid>
          <Grid size={{xs: 12}}>
            <TextField 
              label="Description" name="description" value={form.description}
              onChange={handleChange} multiline rows={3} fullWidth
            />
          </Grid>
          {mode === modes.EDIT && trip && (
            <Grid size={{xs: 12}}>
              <TextField 
                label="Cities" name="cities" value={trip.cities.map(city => city.city).join(", ")}
                disabled={true} onChange={handleChange} fullWidth
              />
            </Grid>
          )}
          <Grid size={{xs: 4}}>
            <TextField 
              label="Start Date" name="startDate" type="date" value={form.startDate}
              onChange={handleChange} fullWidth slotProps={{ inputLabel: { shrink: true } }} 
            />
          </Grid>
          <Grid size={{xs: 4}}>
            <TextField 
              label="End Date" name="endDate" type="date" value={form.endDate}
              onChange={handleChange} fullWidth slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{xs: 4}}>
            <TextField label="Cost" name="cost" value={form.cost} onChange={handleChange} fullWidth/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === modes.CREATE ? "Create Trip" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTripModal;