import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemText, Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Logo from "../assets/navbar_logo.png"
import { AuthContext } from "../context/auth.context";

function Navbar({ handleToggleTheme }) {
  const [open, setOpen] = useState(false);

  const { isLoggedIn, loggedInUser } = useContext(AuthContext)

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton color="inherit" edge="start" sx={{ display: { lg: "none" }, mr: 2 }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>

          {/* Home Link */}
          <Typography component={Link} to={isLoggedIn ? "/" : "/login"} sx={{
              textDecoration: "none", color: "inherit", display: { xs: "none", lg: "block" }
            }}
          >
            {isLoggedIn ? "Home" : "Login"}
          </Typography>

          {/* Center Logo (Desktop) */}
          <Box component={Link} to="/" sx={{
              position: "absolute", left: "50%",
              transform: "translateX(-50%)",
              display: { xs: "none", lg: "block" },
              height: "100%"
            }}
          >
            <Box component="img" src={Logo} alt="logo" sx={{ height: "100%", maxHeight: 130 }} />
          </Box>

          {/* Mobile Logo */}
          <Box component={Link} to="/" sx={{
              flexGrow: 1, display: { xs: "flex", lg: "none" }, justifyContent: "center"
            }}
          >
            <Box component="img" src={Logo} alt="logo" sx={{ height: "100%", maxHeight: 65 }} />
          </Box>

          {/* Desktop Links */}
          <Box sx={{ ml: "auto", display: { xs: "none", lg: "flex" }, gap: 3 }} >
            {
                isLoggedIn ?
                    <>
                        <Typography component={Link} to="/feeds" sx={{ textDecoration: "none", color: "inherit" }}>
                            Feeds
                        </Typography>
                        <Typography component={Link} to="/users" sx={{ textDecoration: "none", color: "inherit" }}>
                            Users
                        </Typography>
                        <Typography component={Link} to="/account" sx={{ textDecoration: "none", color: "inherit" }}>
                            Account
                        </Typography>
                    </> 
                : 
                    <Typography component={Link} to="/signup" sx={{ textDecoration: "none", color: "inherit" }}>
                        Signup
                    </Typography>
            }
            <Typography component={Link} to="/about" sx={{ textDecoration: "none", color: "inherit" }}>
              About
            </Typography>
            <Switch onChange={handleToggleTheme} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem button component={Link} to={isLoggedIn ? "/" : "/login"} onClick={toggleDrawer}>
              <ListItemText primary={isLoggedIn ? "Home" : "Login"} />
            </ListItem>
            {
                isLoggedIn ? 
                <>
                    <ListItem button component={Link} to="/feeds" onClick={toggleDrawer}>
                        <ListItemText primary="Feeds" />
                    </ListItem>
                    <ListItem button component={Link} to="/users" onClick={toggleDrawer}>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button component={Link} to="/account" onClick={toggleDrawer}>
                        <ListItemText primary="Account" />
                    </ListItem>
                </>
                :
                <ListItem button component={Link} to="/signup" onClick={toggleDrawer}>
                        <ListItemText primary="Signup" />
                </ListItem>
            }
            <ListItem button component={Link} to="/about" onClick={toggleDrawer}>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem>
              <Switch onChange={handleToggleTheme} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;