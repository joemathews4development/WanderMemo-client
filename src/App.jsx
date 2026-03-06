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

function App() {

  const handleToggleTheme = () => { }

  return (
    <>
    <CssBaseline />
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Navbar handleToggleTheme={handleToggleTheme}/>
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path='/' element={<SignupPage/>}/>
          <Route path='/feeds' element={<FeedsPage/>}/>
          <Route path='/users' element={<UsersPage/>}/>
          <Route path='/account' element={<AccountsPage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </Box>
    </Box>
    </>
  )
}

export default App
