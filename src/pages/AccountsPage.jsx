import {
  Box, Card, CardContent, Typography, TextField, Button, Avatar, Stack,
  FormControl, InputLabel, Select, MenuItem, FormHelperText, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton
} from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"
import { ToastContext } from "../context/toast.context"
import service from "../services/config.services"
import { passwordRegex, emailRegex } from "../componnets/Constants"
import { USER_ROLES as roles } from "../componnets/Constants"

function AccountsPage() {
  const { loggedInUser, setLoggedInUser, setIsLoggedIn } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)
  const navigate = useNavigate()
  console.log("over here", loggedInUser)

  const [errors, setErrors] = useState({})
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  const [open, setOpen] = useState(false)

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

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const confirmLogout = () => {
    handleClose()
    handleLogout()
  }

  const saveProfile = async () => {
    try {
      const res = await service.patch("/users/profile", profile)
      setLoggedInUser(res.data)
      showToast("Profile update successful!", "success")
    } catch (error) {
      console.log(error)
      showToast(error.response.data.errorMessage, "error")
    }
  }

  const validateEmail = async () => {
    if (!email) {
      setErrors = { email: "Email is mandatory" }
      return false
    }
    if (!emailRegex.test(email)) {
      setErrors = { email: "Invalid email format" }
      return false
    }
    setErrors("")
    return true
  }

  const updateEmail = async () => {
    if (!validateEmail) return
    try {
      setEmailLoading(true)
      await service.patch("/auth/changeEmail", { newEmail: email })
      showToast("Updated Email successfully!", "success")
    } catch (error) {
      console.log(error)
      showToast(error.response.data.errorMessage, "error")
    } finally {
      setEmailLoading(false)
    }
  }

  const validatePassword = () => {
    const newErrors = {}
    if (!password.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }
    if (!password.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (!passwordRegex.test(password.newPassword)) {
      newErrors.newPassword = "Password must be at least 8 characters with uppercase, lowercase and number"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const updatePassword = async () => {
    if (!validatePassword()) return
    try {
      setPasswordLoading(true)
      await service.patch(
        "/auth/changePassword",
        { oldPassword: password.currentPassword, newPassword: password.newPassword }
      )
      setPassword({ currentPassword: "", newPassword: "" })
      showToast("Updated Password successfully!", "success")
    } catch (error) {
      console.log(error)
      showToast(error.response.data.errorMessage, "error")
    } finally {
      setPasswordLoading(false)
    }
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
              label="New Email" value={email} fullWidth error={Boolean(errors.email)}
              helperText={errors.email} onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" onClick={updateEmail} disabled={emailLoading} >
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
              label="Current Password" type="password" fullWidth error={Boolean(errors.currentPassword)}
              helperText={errors.currentPassword} value={password.currentPassword} onChange={(e) =>
                setPassword({
                  ...password,
                  currentPassword: e.target.value
                })
              }
            />
            <TextField
              label="New Password" type="password" value={password.newPassword} error={Boolean(errors.newPassword)}
              helperText={errors.newPassword} fullWidth onChange={(e) =>
                setPassword({
                  ...password,
                  newPassword: e.target.value
                })
              }
            />
            <Button variant="contained" onClick={updatePassword} disabled={passwordLoading}>
              Change Password
            </Button>
          </Stack>
        </CardContent>
      </Card>
      {/* ROLE */}
      <FormControl fullWidth disabled sx={{my:2}}>
        <InputLabel id="role-label">Role</InputLabel>
        <Select labelId="role-label" label="Role" value={loggedInUser.role}>
          {Object.values(roles).map((role) => <MenuItem key={role.value} value={role.value}>{role.displayLabel}</MenuItem>)}
        </Select>
        <FormHelperText>
          Contact the administrator to change your role.
        </FormHelperText>
      </FormControl>
      {/* LOGOUT */}
      <Button variant="outlined" color="error" fullWidth onClick={handleOpen}>
        Logout
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon color="warning" />
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out of WanderMemo?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmLogout} variant="contained" color="error" startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AccountsPage