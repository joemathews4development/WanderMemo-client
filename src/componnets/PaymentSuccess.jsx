// in "src/components/PaymentSuccess.jsx"

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import service from "../services/config.services";
import { AuthContext } from "../context/auth.context";
import { ToastContext } from "../context/toast.context";

const PaymentSuccess = () => {

  const navigate = useNavigate();
  const location = useLocation()

  const { loggedInUser, setLoggedInUser } = useContext(AuthContext)

  const [isFetching, setIsFetching] = useState(true)

  const { showToast } = useContext(ToastContext)

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {

    // below is a way to extract queries from the search queries.
    // unfortunately, react-router-dom doesn't come with a proper way to extract them, similar to useParams
    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );
    const paymentIntentId = new URLSearchParams(location.search).get(
      "payment_intent"
    );

    const paymentIntentInfo = {
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId
    }

    try {
      await service.patch("/payment/update-payment-intent", paymentIntentInfo)
      const updatedUser = loggedInUser
      updatedUser.role = "premium"
      setLoggedInUser(updatedUser)
      setIsFetching(false);
    } catch (error) {
      console.log(error)
      showToast(`Failed to update payment intent: ${error}`, "error")
    }
  };

  if (isFetching) {
    return <h3>... updating payment</h3>;
  }

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
      <Card sx={{
          maxWidth: 500, width: "100%", textAlign: "center",
          p: 3, borderRadius: 4, boxShadow: 4
        }}
      >
        <CardContent>
          <CheckCircleIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
          <Typography variant="h4" fontWeight={700} mb={2}>
            You're Premium Now!
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Congratulations on becoming a premium WanderMemo member.
            You can now search and follow fellow travelers and explore
            their journeys around the world.
          </Typography>
          <Button component={Link} to="/account" variant="contained" size="large">
            Go Back to Account
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default PaymentSuccess;