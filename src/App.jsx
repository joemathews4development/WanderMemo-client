import { useState } from 'react'
import { CssBaseline, Box } from "@mui/material";
import './App.css'
import Navbar from './componnets/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FeedsPage from './pages/FeedsPage';
import UsersPage from './pages/UsersPage';
import AccountsPage from './pages/AccountsPage';
import AboutPage from './pages/AboutPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LoggedIn from './componnets/LoggedIn';
import TripDetailsPage from './pages/TripDetailsPage';
import AITripPlannerPage from './pages/AITripPlannerPage';
import PremiumUser from './componnets/PremiumUser';
import Footer from './componnets/Footer';
import PaymentSuccess from './componnets/PaymentSuccess';

function App() {

  const handleToggleTheme = () => { }

  return (
    <>
    <CssBaseline />
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar handleToggleTheme={handleToggleTheme}/>
      <Box sx={{ flexGrow: 1, mt: "64px"}}>
        <Routes>
          <Route path='/' element={<LoggedIn><HomePage/></LoggedIn>}/>
          <Route path='/feeds' element={<LoggedIn><FeedsPage/></LoggedIn>}/>
          <Route path='/users' element={<LoggedIn><PremiumUser><UsersPage/></PremiumUser></LoggedIn>}/>
          <Route path='/account' element={<LoggedIn><AccountsPage/></LoggedIn>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/ai-trip-planner' element={<LoggedIn><PremiumUser><AITripPlannerPage/></PremiumUser></LoggedIn>}/>

          <Route path='/trips/:tripId' element={<LoggedIn><TripDetailsPage/></LoggedIn>}/>
          <Route path="/payment-success" element={ <PaymentSuccess/> }/>
        </Routes>
      </Box>
      <Footer/>
    </Box>
    </>
  )
}

export default App
