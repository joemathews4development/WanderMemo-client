import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import Logo from "../assets/navbar_logo.png"

function LoginPage() {

    const textfieldStyle = { width: "60%", minWidth: 250, alignSelf: "center" }
    return (
        <Box
            sx={{
                display: "flex", justifyContent: "center", alignItems: "center",
                px: 2, background: "linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)", minHeight: {
                    xs: "calc(100vh - 56px)",
                    sm: "calc(100vh - 64px)"
                }
            }}
        >
            <Card sx={{ width: "80%", p: 2, mx: 8, borderRadius: 4, boxShadow: 6 }}>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        <Box component="img" src={Logo} alt="WanderMemo" sx={{ width: "100%" }} />
                    </Box>
                    <Typography variant='h5' align='center' fontWeight={600} mb={3}>
                        Login to WanderMemo
                    </Typography>
                    <Stack spacing={2}>
                        <TextField label="Email" type='email' sx={textfieldStyle} variant='outlined'/>
                        <TextField label="Password" type='password' sx={textfieldStyle} variant='outlined'/>
                        <Button variant='contained' size='large' sx={{
                            ...textfieldStyle, mt: 1, py: 2, borderRadius: 3, fontWeight: 600
                        }}>
                            Login
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default LoginPage