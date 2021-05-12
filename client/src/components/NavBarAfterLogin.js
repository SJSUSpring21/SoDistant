import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import sodistantlogo from "../assets/sodistantlogo.svg";
import cameralogo from "../assets/cameralogo.png";
import camlogo from "../assets/camlogo.png";
import cam from "../assets/cam.png";
import logo from "../assets/logo.png";
import BackupRoundedIcon from "@material-ui/icons/BackupRounded";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import { useHistory } from "react-router-dom";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBarAfterLogin() {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUploadVideo = () => {
    history.push("/uploadvideo");
  };
  const handleSettings = () => {
    history.push("/settings");
  };
  const classes = useStyles();
  return (
    //     <div className={classes.root}>
    //     <AppBar position="static" style={{background:"#FFFFFF"}}>
    //       <Toolbar>
    //         <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    //          <Image  style={{width:"50px",height:"50px"}} src={cam}
    //          to="/landing"
    //          />
    //         </IconButton>

    //         <Button style={{float:"right"}} variant="outlined" color="primary">
    //         Login
    //         </Button> &nbsp;&nbsp;
    //         <Button style={{float:"right"}} variant="contained" color="secondary">
    //         Sign up
    //         </Button>

    //       </Toolbar>
    //     </AppBar>
    //   </div>

    <AppBar position="static" style={{ background: "#FFFFFF" }}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Link to="dashboard">
            <Image style={{ width: "110px", height: "45px" }} src={logo} />
          </Link>
        </IconButton>
        {/* <Typography variant="h4" className={classes.title}>
              <Link style={{textDecoration:"none", color:"#d1335a",fontFamily:"-apple-system, BlinkMacSystemFont, sans-serif"}} to="dashboard">SoDistant</Link>
            </Typography> */}
        {/* {(
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                //onClick={handleMenu}
                color="inherit"
                
              > */}
        {/* <AccountCircle style={{fontSize:"30px"}} /> */}
        {/* <Avatar alt="user"/>
              </IconButton>
              <Menu
                id="menu-appbar"
                //anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }} */}
        {/* keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem style={{textDecoration:"none",fontSize:"17px"}} component={Link}  to='landing'>Logout</MenuItem>
              </Menu>
            </div>

          )} */}
        &nbsp;&nbsp;
        <span style={{marginLeft:'88%'}}>
        <Button
          startIcon={<SettingsRoundedIcon />}
          onClick={handleSettings}
          style={{
            fontSize: "18px",
            float: "right",
            color: "#d1335a",
            borderRadius: "10px",
          }}
        ></Button>
        </span>
      </Toolbar>
    </AppBar>
  );
}
