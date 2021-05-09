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


export default function DashboardPage() {

      
    // useEffect(() =>{
    //     const handleVideoFeed = (e) => {
    //         //e.preventDefault();
    //         console.log("calling video_feed API");
    //         axios.get("http://localhost:5000/video_feed")
    //     // var targetDiv = document.getElementById('iframe');
    //     // console.log("Iframe id: "+JSON.stringify(targetDiv.contentDocument));

    //     // var targetDiv = document.getElementById('iframe');
    //     // console.log("Iframe id: "+targetDiv.contentWindow.frames[0]);
    //     console.log("calling axios on effect get video feed")
    //     axios.get("http://localhost:5000/video_feed")
    //         .then((response) => {
    //             setVideo(response.data);
    //         //   if (response.status !== 400) {
    //         //   }
    //         console.log("Response: "+response.data);
    //         console.log("Response: "+response);
    //         }).catch(err=>{
    //             console.log(err);
    //         });
    //        }
    //        handleVideoFeed();
    // },[]);


    const handleDownloadVideo = (e) =>{
            e.preventDefault();
            const requestOptions = {
             headers: { 'Content-Type': 'video/mp4'},
            }
            console.log("calling download video API");
            axios.get("http://localhost:5000/download/test")
            .then((response) => {
            console.log("Response: "+response.data);
            }).catch(err=>{
                console.log(err);
            });
    }
    
    return (
        <>
        <NavBarAfterLogin />
        <Container>
        <br/><br/><br/><br/><br/>
        <Row>
        <Col>
        <Paper
        style={{display:"inline-block",marginLeft:"300px",width:"700",height:"700"}} 
        elevation={3}>
        <iframe id="myiframe" 
        src="http://localhost:5000/video_feed/mall" 
        width="700" height="395"/>
        {/* <img src="http://localhost:5000/video_feed"
        width="700" height="395"/> */}
        </Paper>
        </Col>
        <Col>
        <br/>

        <Button
        style={{marginLeft:"300px"}}
        variant="contained"
        color="default"
        onClick={handleDownloadVideo}
        startIcon={<GetAppRoundedIcon />}
      >
        Download video
      </Button>
      </Col>
        </Row>
        </Container>
        </>
    )

};
