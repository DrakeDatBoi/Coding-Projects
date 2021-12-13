import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import ClydesLogo from './clydes-logo.png';

function TopNavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#FFFFFF'}}>
        <Toolbar>
          <Typography component={Link} to="/home" sx={{ flexGrow: 1 }}>
            <img src={ClydesLogo} alt="logo" width="150px" height="50px" />
          </Typography>
          <Button color="inherit" component={Link} to="/home" sx={{ color: 'text.primary' }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/menu" sx={{ color: 'text.primary' }}>
            Menu
          </Button>
          <IconButton
            aria-label="add to shopping cart"
            size="large"
            component={Link}
            to="/cart"
          >
            <ShoppingCartIcon style={{ color: "black" }} />
          </IconButton>
          <IconButton
            aria-label="log in / sign up"
            size="large"
            component={Link}
            to="/login"
          >
            <AccountCircleIcon style={{ color: "black" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopNavBar;
