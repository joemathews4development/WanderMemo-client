import { Box, Typography, TextField, Button, Grid, Card, CardContent, CircularProgress, Chip, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import service from "../services/config.services"
import { ToastContext } from "../context/toast.context";
import AiThinkingLoader from "../componnets/AIThinkingLoader";

function AITripPlannerPage() {

    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const { showToast } = useContext(ToastContext)

    // debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(inputValue);
        }, 400); // delay

        return () => clearTimeout(timer);
    }, [inputValue]);

    // API call
    useEffect(() => {
        if (!debouncedSearch) return;

        const fetchCities = async () => {
            try {
                const res = await service.get(`/cities?search=${debouncedSearch}`)
                setOptions(res.data);
            } catch (error) {
                console.log(error)
                showToast(`Loading cities failed: ${error}`, "error")
            }

        };

        fetchCities();
    }, [debouncedSearch]);

    const [form, setForm] = useState({
        numberOfDays: "",
        cities: [],
        startDate: "",
        preferences: ""
    })

    const [loading, setLoading] = useState(false)
    const [itenaries, setItenaries] = useState(null)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const generateTrip = async () => {
        try {
            setLoading(true)
            setItenaries(null)
            const cityIds = form.cities.map((city) => city._id)
            const body = {
                numberOfDays: form.numberOfDays,
                cities: cityIds,
                startDate: form.startDate,
                preferences: form.preferences
            }
            const res = await service.post("/trip-planner/AI-generated-content", body)
            if (res.data.errorMessage) {
                showToast(res.data.errorMessage, "error")
            }
            setItenaries(res.data.itenaries)
        } catch (error) {
            console.log(error)
            showToast(error.response.data.errorMessage, "error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ width: "100%", textAlign: "center", mx: "auto", p: 4 }}>
            {/* Page Title */}
            <Typography variant="h4" fontWeight={700} mb={2}>
                🤖 AI Trip Planner
            </Typography>
            <Typography color="text.secondary" mb={4}>
                Let WanderMemo AI create a personalized travel itinerary for you.
                Choose your cities and travel preferences and we'll build the perfect trip.
            </Typography>
            {/* Planner Form */}
            <Card sx={{ width: "100%", mb: 4 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={{xs:12, md:3}}>
                            <TextField
                                label="Number of Days" name="numberOfDays" type="number"
                                value={form.numberOfDays} onChange={handleChange} fullWidth sx={{width: "100%"}}
                            />
                        </Grid>
                        <Grid size={{xs:12, md:3}}>
                            <Autocomplete
                                multiple options={options} getOptionLabel={(option) => `${option.city}, ${option.country}` || ""}
                                value={form.cities} filterOptions={(x) => x} onInputChange={(event, value) => setInputValue(value)}
                                onChange={(e, value) =>
                                    setForm({ ...form, cities: value })
                                }
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            label={option.city}
                                            {...getTagProps({ index })}
                                            key={option._id}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Cities" />
                                )}
                            />
                        </Grid>
                        <Grid size={{xs:12, md:3}}>
                            <TextField
                                label="Start Date" type="date" name="startDate" value={form.startDate}
                                onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid size={{xs:12, md:3}}>
                            <TextField
                                label="Travel Preferences" name="preferences" value={form.preferences}
                                onChange={handleChange} multiline rows={3} fullWidth
                                placeholder="Example: budget friendly, nature, local food..."
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" size="large" onClick={generateTrip}>
                            Generate AI Trip
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            {/* Loading */}
            {loading && (
                <Box sx={{ textAlign: "center", p: 6 }}>
                    <AiThinkingLoader />
                </Box>
            )}
            {/* Itinerary Display */}
            {itenaries && (
                <Box>
                    <Typography variant="h5" fontWeight={600} mb={3}>
                        Your Trip Plan
                    </Typography>
                    <Stack spacing={3}>
                        {itenaries.map((dayPlan) => (
                            <Card key={dayPlan.day}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600}>
                                        Day {dayPlan.day} — {dayPlan.city}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(dayPlan.date).toLocaleDateString()}
                                    </Typography>
                                    <Stack spacing={2} mt={2}>
                                        {dayPlan.activities.map((activity, i) => (
                                            <Box key={i}>
                                                <Typography fontWeight={600}>
                                                    {activity.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {activity.description}
                                                </Typography>
                                                <Stack direction="row" spacing={1} mt={1} sx={{justifyContent:"center"}}>
                                                    <Chip label={activity.type} size="small" />
                                                    {activity.location && (
                                                        <Chip label={activity.location} size="small" variant="outlined" />
                                                    )}
                                                    {activity.estimatedCost && (
                                                        <Chip label={`💰 ${activity.estimatedCost}`} size="small" variant="outlined" />
                                                    )}
                                                </Stack>
                                            </Box>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            )}
        </Box>
    )
}

export default AITripPlannerPage