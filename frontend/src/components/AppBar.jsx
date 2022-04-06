import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/userActions'
import Link from '@mui/material/Link';


const ResponsiveAppBar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    routeChangeHome();
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const history = useHistory();

  const routeChangeLogin = () => {
    let path = "/login";
    history.push(path);
  };

  
  const routeChangeHome = () => {
    let path = "/";
    history.push(path);
  };

  const routeChangeRegister = () => {
    let path = "/register";
    history.push(path);
  };


  const routeChangeDashboard = () => {
    let path = "/dashboard";
    history.push(path);
  };
  return (
    <AppBar position="static" style={{ background: '#2F2FA2' }}>
      <Container maxWidth="l">
        <Toolbar       
        sx={{
          height : 36
        }}>
        <Button
              onClick={routeChangeHome}
              sx={{
                my: 2,
                color: "#F64C72",
                display: "block",
                fontWeight: "bold",
                fontSize: 25
              }}
            >
              DOCTOUCH
            </Button>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontWeight: "bold",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">LOGIN</Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">REGISTER</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {userInfo ? 

         (
            <Button
              onClick={routeChangeDashboard}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontWeight: "bold",
                fontSize: 15
              }}
            >
              DASHBOARD
            </Button>
          )
          : <></>}
          {userInfo ? (<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={logoutHandler}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontWeight: "bold",
                fontSize: 15
              }}
            >
              LOGOUT
            </Button>
          </Box>) :
          (<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={routeChangeLogin}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontWeight: "bold",
                fontSize: 15
              }}
            >
              LOGIN
            </Button>
            <Button
              onClick={routeChangeRegister}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontWeight: "bold",
                fontSize: 15

              }}
            >
              REGISTER
            </Button>
          </Box>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;


