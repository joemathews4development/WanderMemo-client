import React, { useContext } from 'react'
import { USER_ROLES } from './Constants'
import { AuthContext } from '../context/auth.context'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import LockIcon from "@mui/icons-material/Lock";
import { Link } from 'react-router-dom';

function PremiumUser(props) { 
    const { loggedInUser } = useContext(AuthContext)
    if (loggedInUser.role === USER_ROLES.PREMIUM.value) {
        return props.children
    }
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Card sx={{ maxWidth: 500, textAlign: "center", p: 3, borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                    <LockIcon sx={{ fontSize: 50, color: "primary.main", mb: 1 }} />
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        Premium Feature
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        This feature is available only for premium members.
                        Upgrade your account to unlock this feature and
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

export default PremiumUser