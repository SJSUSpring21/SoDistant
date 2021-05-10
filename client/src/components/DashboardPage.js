import React from 'react'
import NavBarAfterLogin from './NavBarAfterLogin'
import { FormControl,Modal,Container,Row,Col,Image, Form, FormLabel} from 'react-bootstrap';
import axios from 'axios';
import { useState ,useEffect} from 'react'
import CardMedia from '@material-ui/core/CardMedia';
//import 'VideoPlayer' from 'video-js';
import Paper from '@material-ui/core/Paper';
import GetAppIcon from '@material-ui/icons/GetApp';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Input from '@material-ui/core/Input';
import SwapHorizontalCircleRoundedIcon from '@material-ui/icons/SwapHorizontalCircleRounded';
import {useHistory} from 'react-router-dom';

export default function DashboardPage() {
  const history = useHistory();

      const[show, setShow] = useState(false);
      const[cameraName, setAddCameraName] = useState("");
      const[cameraUrl,setAddCameraUrl] = useState("");
      const[iframesrc, setIframeSrc] = useState("http://localhost:5000/video_feed/mall.mp4");
      const[downUrl,setDownUrl] = useState("http://localhost:5000/download/mall")
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

     
      const handleSaveCamera = async() =>{
        setIframeSrc(cameraUrl);
        var d = cameraUrl.split("/");
        console.log(d[4]);
     //   `${backendUrl}/api/posts`
        var durl = `http://localhost:5000/download/${d[4]}`;
        setDownUrl(durl);
        console.log("iframesrc:: "+cameraUrl);
      }

      const handleAddCamera = () =>{
        console.log("Add camera called");
        history.push('/addcamera');
      }

    const handleDownloadVideo = (e) =>{
            e.preventDefault();
            const requestOptions = {
             headers: { 'Content-Type': 'video/mp4'},
            }
            console.log("calling download video API");
            axios.get("http://localhost:5000/download/mall.mp4")
            .then((response) => {
            console.log("Response: "+response.data);
            console.log("Response: "+ JSON.stringify(response.data.type));
            var link = document.createElement("a");
              link.href = URL.createObjectURL(
                new Blob([response])
              );
              link.download = "file.zip";

              document.body.appendChild(link);

              link.click();
              setTimeout(function () {
                window.URL.revokeObjectURL(link);
              }, 200);
            }).catch(err=>{
                console.log(err);
            });
    }
    
    return (
        <>
        <NavBarAfterLogin />
        <Container>
        
        <br/>
        <Modal style={{marginTop:"10px",opacity:3,marginLeft:"300px"}} show={show} onHide={handleClose} centered>
                <Modal.Header style={{background:"#ccc",width:"800px",borderRadius:"5px"}}>
                <Modal.Title style={{fontWeight:"bold",color:"#d1335a"}}>Provide url of your camera</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background:"#FFFFFF"}} className="show-grid">
                <Container>

                <Row>
                <Col style={{fontWeight:"bold",fontSize:"18px",borderRadius:"5px"}} xs={12} md={8}>
                <Form.Group>
                <Form.Control
                style={{borderRadius:"3px",fontSize:"18px",width:"800px"}} 
                type="text" 
                onChange={e=> setAddCameraName(e.target.value)} 
                value={cameraName} 
                placeholder="Add camera name"
                /> <br/><br/>
                <Form.Control
                style={{borderRadius:"3px",fontSize:"18px",width:"800px"}} 
                type="text" 
                onChange={e=> setAddCameraUrl(e.target.value)} 
                value={cameraUrl} 
                placeholder="Add camera url"
                /> <br/>                   
                </Form.Group>
                </Col>
                </Row>

                </Container>
                </Modal.Body>
                <br/>
                <Modal.Footer>
                <Button style={{color: "black",background: "#ffffff",borderRadius: "5px",fontSize:"13px"}} onClick={handleClose}>
                    Close
                </Button>
                <Button style={{color: "#ffffff",background: "#d1335a",borderRadius: "5px",fontSize:"13px"}} onClick={handleSaveCamera} >
                    Save
                </Button>
                </Modal.Footer>
        </Modal>
        <br/>
        <Col style={{marginLeft:"20px"}}>
          <Button
          startIcon={<SwapHorizontalCircleRoundedIcon />}
          onClick={handleShow}
          style={{textTransform:"none",color:"#FFFFFF",background:"#d1335a"}} 
          >
          Change Camera</Button><br/>
          <Button
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={handleAddCamera}
          style={{textTransform:"none",color:"#d1335a",background:"#FFFFFF"}} 
          >
          Add Camera</Button>
        </Col>
        <Row>
        
        <Col>
        <Paper
        style={{display:"inline-block",marginLeft:"300px",width:"700",height:"700"}} 
        elevation={3}>
        <iframe id="myiframe" 
        src={iframesrc} 
        width="700" height="395"/>
        {/* <img src="http://localhost:5000/video_feed"
        width="700" height="395"/> */}
        </Paper>
        </Col>
        </Row>
        <br/>

        {/* <Button
        style={{marginLeft:"300px"}}
        variant="contained"
        color="default"
        onClick={handleDownloadVideo}
        startIcon={<GetAppRoundedIcon />}
      >
        Download video
      </Button> */}

      {/* <Button
      style={{marginLeft:"300px"}}
      variant = "contained"
      color = "default"
      onClick={(e) => {
        window.location.href="http://localhost:5000/download/mall"
      }}
      >
        Download video
      </Button> */}
        </Container>
        </>
    )

};
