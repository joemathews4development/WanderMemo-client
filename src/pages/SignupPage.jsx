import { Alert, Box, Button, Card, CardContent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import Logo from "../assets/navbar_logo.png"
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import service from '../services/config.services'
import { ToastContext } from '../context/toast.context'

function SignupPage() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const { showToast } = useContext(ToastContext)

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value.replace(/\b\w/g, (char) => char.toUpperCase()));
    const handleLastNameChange = (e) => setLastName(e.target.value.replace(/\b\w/g, (char) => char.toUpperCase()));

    const textfieldStyle = { width: "60%", minWidth: 250, alignSelf: "center" }

    const handleSignup = async () => {
        const body = { firstName, lastName, email, password }
        try {
            const response = await service.post(`auth/signup`, body)
            console.log(response)
            navigate("/login")
            showToast("Successfully created account. Please Login", "success")
        } catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                showToast(error.response.data.errorMessage, "error")
            } else {
                console.log(error)
            }
        }
    }

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
                    <Box sx={{ display: "flex", ustifyContent: "center", mb: 2 }}>
                        <Box component="img" src={Logo} alt="WanderMemo" sx={{ width: "100%" }} />
                    </Box>
                    <Typography variant='h5' align='center' fontWeight={600} mb={3}>
                        Create your Account
                    </Typography>
                    <Stack spacing={2}>
                        <TextField label="First Name" slotProps={{ input: { autoCapitalize: "words" } }} value={firstName} onChange={handleFirstNameChange} sx={textfieldStyle} variant='outlined' />
                        <TextField label="Last Name" slotProps={{ input: { autoCapitalize: "words" } }} value={lastName} onChange={handleLastNameChange} sx={textfieldStyle} variant='outlined' />
                        <TextField label="Email" type='email' value={email} onChange={handleEmailChange} sx={textfieldStyle} variant='outlined' />
                        <TextField label="Password" type='password' value={password} onChange={handlePasswordChange} sx={textfieldStyle} variant='outlined' />
                        <Button variant='contained' size='large' onClick={handleSignup} sx={{
                            ...textfieldStyle, mt: 1, py: 2, borderRadius: 3, fontWeight: 600
                        }}>
                            Create Account
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default SignupPage