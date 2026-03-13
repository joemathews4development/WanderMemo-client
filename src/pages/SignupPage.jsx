import { Box, Button, Card, CardContent, Stack, TextField, Typography, Link } from '@mui/material'
import Logo from "../assets/navbar_logo.png"
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import service from '../services/config.services'
import { ToastContext } from '../context/toast.context'
import { passwordRegex, emailRegex } from '../componnets/Constants'

function SignupPage() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const { showToast } = useContext(ToastContext)

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value.replace(/\b\w/g, (char) => char.toUpperCase()));
    const handleLastNameChange = (e) => setLastName(e.target.value.replace(/\b\w/g, (char) => char.toUpperCase()));

    const textfieldStyle = { width: "60%", minWidth: 250, alignSelf: "center" }

    const validate = () => {
        const newErrors = {}
        if (!firstName) {
            newErrors.firstName = "First name is required"
        }
        if (!lastName) {
            newErrors.lastName = "Last name is required"
        }
        if (!email) {
            newErrors.email = "Email is required"
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format"
        }
        if (!password) {
            newErrors.password = "Password is required"
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Password must be at least 8 characters with uppercase, lowercase and number"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSignup = async () => {
        if(!validate()) return
        const body = { firstName, lastName, email, password }
        try {
            setLoading(true)
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
        } finally {
            setLoading(false)
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
                        <TextField 
                            label="First Name" slotProps={{ input: { autoCapitalize: "words" } }} error={Boolean(errors.firstName)}
                            helperText={errors.firstName} value={firstName} onChange={handleFirstNameChange} sx={textfieldStyle} variant='outlined' 
                        />
                        <TextField 
                            label="Last Name" slotProps={{ input: { autoCapitalize: "words" } }} error={Boolean(errors.lastName)}
                            helperText={errors.lastName} value={lastName} onChange={handleLastNameChange} sx={textfieldStyle} variant='outlined' 
                        />
                        <TextField 
                            label="Email" type='email' value={email} error={Boolean(errors.email)}
                            helperText={errors.email} onChange={handleEmailChange} sx={textfieldStyle} variant='outlined' 
                        />
                        <TextField
                            label="Password" type='password' value={password} error={Boolean(errors.password)}
                            helperText={errors.password} onChange={handlePasswordChange} sx={textfieldStyle} variant='outlined' 
                        />
                        <Button variant='contained' size='large' disabled={loading} onClick={handleSignup} sx={{
                            ...textfieldStyle, mt: 1, py: 2, borderRadius: 3, fontWeight: 600
                        }}>
                            Create Account
                        </Button>
                        <Typography variant="h6" align="center" fontWeight={300} mb={3}>
  Alrerady a WanderMemo member? Login to your account{" "}
  <Link component={RouterLink} to="/login" underline="hover" sx={{ fontWeight: 600 }}>
    here
  </Link>
</Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default SignupPage