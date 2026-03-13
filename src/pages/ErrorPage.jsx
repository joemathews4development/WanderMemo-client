import { Box, Typography, Button, Stack } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { Link } from "react-router-dom"

function ErrorPage() {
  return (
    <Box sx={{
        minHeight: "80vh", display: "flex", justifyContent: "center",
        alignItems: "center", px: 2, textAlign: "center"
      }}
    >
      <Stack spacing={3} alignItems="center">
        <ErrorOutlineIcon sx={{ fontSize: 90, color: "error.main" }}/>
        <Typography variant="h2" fontWeight={700}>
          404
        </Typography>
        <Typography variant="h5" fontWeight={500}>
          Page Not Found
        </Typography>
        <Typography color="text.secondary" maxWidth={400}>
          Sorry, the page you are looking for does not exist or has been moved.
        </Typography>
        <Button component={Link} to="/" variant="contained" size="large">
          Go Back Home
        </Button>
      </Stack>
    </Box>
  )
}

export default ErrorPage