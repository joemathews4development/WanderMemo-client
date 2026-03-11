import { Box, CircularProgress, Typography } from "@mui/material";

function LoadingScreen({ text = "Loading...", fullPage = false }) {
  return (
    <Box sx={{
        minHeight: fullPage ? "100vh" : "60vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 2, p: 4
      }}
    >
      <CircularProgress size={48} />
      <Typography variant="body1" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}

export default LoadingScreen;