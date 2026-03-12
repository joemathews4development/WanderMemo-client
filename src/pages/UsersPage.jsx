import { Box, TextField, Typography, Card, CardContent, Avatar, Stack, Button, Chip } from "@mui/material"
import { useState, useEffect, useContext } from "react"
import service from "../services/config.services"
import { AuthContext } from "../context/auth.context"
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";

function UsersPage() {

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const { loggedInUser } = useContext(AuthContext)

  // debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  // fetch users
  useEffect(() => {
    if (!debouncedSearch) {
      setUsers([])
      return
    }
    fetchUsers()
  }, [debouncedSearch])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await service.get(`/users?search=${debouncedSearch}`)
      setUsers(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = async (user) => {
    try {
      await service.post(`/follows/request`, {
        following: user._id,
        status: "Pending"
      })
      fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  const renderStatus = (user) => {
    const status = user.status
    if (status === "Accepted") {
      return <Chip label="Following" color="success" size="small" />
    }
    if (status === "Pending") {
      return <Chip label="Requested" color="warning" size="small" />
    }
    if (status === "Rejected") {
      return <Chip label="Rejected" size="small" />
    }
    if (status === "Blocked") {
      return <Chip label="Rejected" size="small" />
    }
    if (status === "Not_requested") {
      return (
        <Button variant="contained" size="small" onClick={() => { handleFollow(user) }}>
          Follow
        </Button>
      )
    }
  }

  if (loggedInUser.role !== "premium") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Card sx={{ maxWidth: 500, textAlign: "center", p: 3, borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <LockIcon sx={{ fontSize: 50, color: "primary.main", mb: 1 }} />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Premium Feature
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Searching and following WanderMemo users is available only for
              premium members. Upgrade your account to unlock this feature and
              connect with fellow travelers.
            </Typography>
            <Button variant="contained" component={Link} to="/account" size="large" sx={{ borderRadius: 3 }}>
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Find Users
      </Typography>
      {/* search field */}
      <TextField
        label="Search users"
        placeholder="Search by name..."
        fullWidth
        value={search}
        disabled={loading}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* results */}
      <Box mt={4}>
        {loading && (
          <Typography>Searching...</Typography>
        )}
        {(!loading && users.length === 0 && debouncedSearch) ? (
          <Typography>No users found</Typography>
        ) :
          <Stack spacing={2}>
            {users.map((user) => (
              <Card key={user._id} sx={{ cursor: "pointer" }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={user.profileImage}>
                        {user.firstName[0]}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={600}>
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Stack>
                    {renderStatus(user)}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        }

      </Box>

    </Box>
  )
}

export default UsersPage