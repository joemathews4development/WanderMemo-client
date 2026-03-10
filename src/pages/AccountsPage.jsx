import { Box, Card, CardContent, Typography, TextField, Button, Avatar, Stack } from "@mui/material"
import { useContext, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"

function AccountsPage() {
  const { loggedInUser, setLoggedInUser, setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  console.log("over here", loggedInUser)
  const [profile, setProfile] = useState({
    firstName: loggedInUser.firstName,
    lastName: loggedInUser.lastName,
    profileImage: loggedInUser.profileImage
  })
  const [email, setEmail] = useState(loggedInUser.email)
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: ""
  })

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const saveProfile = async () => {
    const res = await axios.patch("/api/users/profile", profile)
    setLoggedInUser(res.data)
  }

  const updateEmail = async () => {
    await axios.patch("/api/users/email", { email })
    alert("Email updated")
  }

  const updatePassword = async () => {
    await axios.patch("/api/users/password", password)
    alert("Password updated")
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setLoggedInUser(null)
    setIsLoggedIn(false)
    navigate(`/login`)
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      {/* PROFILE */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>Profile</Typography>
          <Stack spacing={2} alignItems="center">
            <Avatar src={profile.profileImage} sx={{ width: 80, height: 80 }} />
            <TextField
              label="First Name" name="firstName" value={profile.firstName}
              onChange={handleProfileChange} fullWidth
            />
            <TextField
              label="Last Name" name="lastName" value={profile.lastName}
              onChange={handleProfileChange} fullWidth
            />
            <Button variant="contained" onClick={saveProfile}>
              Save Profile
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* EMAIL */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>Update Email</Typography>
          <Stack spacing={2}>
            <TextField
              label="New Email" value={email} fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" onClick={updateEmail}>
              Update Email
            </Button>
          </Stack>
        </CardContent>
      </Card>
      {/* PASSWORD */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>Change Password</Typography>
          <Stack spacing={2}>
            <TextField
              label="Current Password" type="password" fullWidth
              value={password.currentPassword} onChange={(e) =>
                setPassword({
                  ...password,
                  currentPassword: e.target.value
                })
              }
            />
            <TextField
              label="New Password" type="password" value={password.newPassword}
              fullWidth onChange={(e) =>
                setPassword({
                  ...password,
                  newPassword: e.target.value
                })
              }
            />
            <Button variant="contained" onClick={updatePassword}>
              Change Password
            </Button>
          </Stack>
        </CardContent>
      </Card>
      {/* LOGOUT */}
      <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  )
}

export default AccountsPage