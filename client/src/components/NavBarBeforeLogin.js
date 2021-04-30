import React from 'react'
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import sodistantlogo from '../assets/sodistantlogo.svg';
import cameralogo from '../assets/cameralogo.png';
import camlogo from '../assets/camlogo.png';
import cam from '../assets/cam.png';

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
export default function NavBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static" style={{background:"#FFFFFF"}}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
             <Image  style={{width:"50px",height:"50px"}} src={cam}
             to="/landing"
             />
            </IconButton>
            {/* <Typography variant="h2" className={classes.title}>
            <Link style={{textDecoration:"none", color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, sans-serif"}} to="landing">Splitwise</Link>
            </Typography> */}
            {/* <Link to="login" >Login</Link>
            <Link to="signup">Sign up</Link> */}
            <Button style={{float:"right"}} variant="outlined" color="primary">
            Login
            </Button> &nbsp;&nbsp;
            <Button style={{float:"right"}} variant="contained" color="secondary">
            Sign up
            </Button>
            

          </Toolbar>
        </AppBar>
      </div>
    )
}
