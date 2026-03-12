import { Box, Typography, Grid, Card, CardContent, Button, Stack, Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import { keyframes } from "@mui/system"

const floatAnimation = keyframes`
0% { transform: translateY(0px); }
50% { transform: translateY(-8px); }
100% { transform: translateY(0px); }
`

function AboutPage() {


  const techStacks = [
    { tech: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { tech: "Material UI", image: "https://mui.com/static/logo.png" },
    { tech: "Vite", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
    { tech: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { tech: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { tech: "Mongoose", image: "https://cdn.worldvectorlogo.com/logos/mongoose-1.svg" },
    { tech: "Axios", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" },
    { tech: "Cloudinary", image: "https://cdn.worldvectorlogo.com/logos/cloudinary-2.svg" },
    { tech: "ChatGPT (OpenAI)", image: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
    { tech: "React Leaflet", image: "https://react-leaflet.js.org/img/logo.svg" },
    { tech: "Stripe", image: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg" }
  ]

  const featureComponent = (icon, title, description) => {
    return (
      <Grid xs={12} md={4}>
        <Card sx={{ textAlign: "center", p: 3 }}>
          <Typography fontSize={50}>{icon}</Typography>
          <Typography variant="h6" mt={2}>{title}</Typography>
          <Typography color="text.secondary">{description}</Typography>
        </Card>
      </Grid>
    )
  }

  return (
    <Box>
      {/* HERO SECTION */}
      <Box sx={{ py: 10, px: 3, textAlign: "center", position: "relative", overflow: "hidden" }} >
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h3" fontWeight={700}>WanderMemo</Typography>
          <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
            Capture memories. Explore journeys. Plan adventures.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Button component={Link} to="/" variant="contained" color="secondary">
              Explore Trips
            </Button>
            <Button component={Link} to="/feeds" variant="contained" color="secondary">
              See memories shared by others
            </Button>
          </Stack>
        </Box>
      </Box>
      {/* FEATURE ICONS */}
      <Box sx={{ py: 8, px: 3, bgcolor: "primary.main" }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
          Features Designed for Travelers
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {featureComponent("📸", "Travel Memories", "Capture and organize your travel moments with photos and stories.")}
          {featureComponent("🌍", "Interactive Maps", "Visualize your journeys and see your travel footprint worldwide.")}
          {featureComponent(
            "❤️", "Social Travel Feed", 
            "See memories from travelers you follow. React with emojis and leave comments on their adventures."
          )}
          {featureComponent(
            "🖼️", "High Quality Photo Memories", 
            "Upload stunning high-resolution travel photos and share them with your followers or the public."
          )}
          {featureComponent(
            "⭐", "Premium Explorer", 
            "Upgrade to premium to search WanderMemo travelers and follow their journeys around the world."
          )}
          {featureComponent("🤖", "AI Trip Planner", "Let AI generate personalized travel itineraries in seconds.")}
        </Grid>
      </Box>
      {/* AI TRIP PLANNER BANNER */}
      <Box sx={{ py: 8, textAlign: "center"}}>
        <Typography variant="h4" fontWeight={700}>🤖 Plan Your Next Adventure with AI</Typography>
        <Typography sx={{ mt: 2 }}>
          Tell WanderMemo your travel preferences and let AI build the perfect itinerary.
        </Typography>
        <Button component={Link} to="/ai-trip-planner" variant="contained" size="large" sx={{ mt: 4 }}>
          Start Planning
        </Button>
      </Box>
      {/* TECH STACK */}
      <Box sx={{ py: 8, textAlign: "center", bgcolor: "primary.main" }}>
        <Typography variant="h4" fontWeight={700} mb={6}>
          Built with Modern Technologies
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {techStacks.map((tech) => (
            <Grid xs={6} md={2} key={tech.tech}>
              <Card sx={{ textAlign: "center", p: 2, animation: `${floatAnimation} 4s ease-in-out infinite` }}>
                <CardContent>
                  <Box component="img" src={tech.image} alt={tech.tech} sx={{ height: 60, objectFit: "contain" }}/>
                  <Typography mt={2}> {tech.tech}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* CREATOR SECTION */}
      <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={4} alignItems="center">
          <Grid xs={12} md={4} textAlign="center">
            <Avatar sx={{ width: 140, height: 140, fontSize: 60, margin: "auto" }}>👨‍💻</Avatar>
            <Typography variant="h5" fontWeight={700} mt={2}>Ben Joe Mathews</Typography>
          </Grid>
          <Grid xs={12} md={8}>
            <Typography variant="h4" fontWeight={700}>About the Creator</Typography>
            <Typography color="text.secondary" mt={3}>
              WanderMemo was created with a passion for travel and storytelling.
              The goal is to help travelers capture meaningful memories while also
              discovering new destinations through shared experiences.
            </Typography>
            <Typography color="text.secondary" mt={2}>
              Built using modern web technologies and AI-powered tools,
              WanderMemo combines travel journaling, social sharing,
              and intelligent trip planning into one platform.
            </Typography>
            <Stack direction="row" spacing={2} mt={3}>
              <Button variant="outlined" href="https://www.linkedin.com">
                🌐 LinkedIn
              </Button>
              <Button variant="outlined" href="https://github.com">
                🐙 GitHub
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default AboutPage