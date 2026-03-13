import { Box, Button, Card, CardContent, Link, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from "react-router-dom"
import Logo from "../assets/navbar_logo.png"
import { useContext, useState } from 'react'
import { AuthContext } from '../context/auth.context'
import service from '../services/config.services'
import { useNavigate } from 'react-router-dom'
import { ToastContext } from '../context/toast.context'

function LoginPage() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { setIsLoggedIn, setLoggedInUser } = useContext(AuthContext)
    const { showToast } = useContext(ToastContext)


    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = async (e) => {
        const body = { email, password }
        try {
            const response = await service.post(`/auth/login`, body)
            localStorage.setItem("authToken", response.data.authToken)
            setIsLoggedIn(true)
            setLoggedInUser(response.data.payload)
            navigate("/")
            showToast("Login successful!", "success")
        } catch (error) {
            if (error.response.status === 400) {
                showToast(error.response.data.errorMessage, "error")
            } else {
                console.log(error)
                showToast(`Login failed: ${error}`, "error")
            }
        }
    }

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
                        <TextField label="Email" type='email' value={email} onChange={handleEmailChange} sx={textfieldStyle} variant='outlined' />
                        <TextField label="Password" type='password' value={password} onChange={handlePasswordChange} sx={textfieldStyle} variant='outlined' />
                        <Button variant='contained' size='large' onClick={handleLogin} sx={{
                            ...textfieldStyle, mt: 1, py: 2, borderRadius: 3, fontWeight: 600
                        }}>
                            Login
                        </Button>
                        <Typography variant="h6" align="center" fontWeight={300} mb={3}>
                            New to WanderMemo? Create your account{" "}
                            <Link component={RouterLink} to="/signup" underline="hover" sx={{ fontWeight: 600 }}>
                                here
                            </Link>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default LoginPage