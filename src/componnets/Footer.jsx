import { Box, Container, Typography } from "@mui/material"

function Footer() {
  return (
    <Box component="footer" sx={{
        py: 2, textAlign: "center", 
        boxShadow: 1, bgcolor: "primary.main", color: "primary.contrastText"
      }}
    >
      <Container>
        {/* Tagline */}
        <Typography variant="body2" mb={1}>
          Capture memories. Explore journeys. Plan adventures with WanderMemo.
        </Typography>
        {/* Copyright */}
        <Typography variant="caption">
          © {new Date().getFullYear()} WanderMemo
        </Typography>

      </Container>
    </Box>
  )
}

export default Footer