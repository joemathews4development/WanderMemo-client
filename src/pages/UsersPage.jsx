import { Box, TextField, Typography, Card, CardContent, Avatar, Stack, Button, Chip } from "@mui/material"
import { useState, useEffect } from "react"
import service from "../services/config.services"

function UsersPage() {

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

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
      console.log("overhere", res)
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