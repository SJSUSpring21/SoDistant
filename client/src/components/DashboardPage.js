import React from 'react'
import NavBarAfterLogin from './NavBarAfterLogin'
import { FormControl,Modal,Container,Row,Col,Image,Button, Form, FormLabel} from 'react-bootstrap';
import axios from 'axios';
import { useState ,useEffect} from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import ReactPlayer from 'react-player';
import 'VideoPlayer' from 'video-js';

export default function DashboardPage() {

    const[video,setVideo] = useState({
        poster: null,
        src: null,
      });

    useEffect(() =>{
        const handleVideoFeed = (e) => {
            //e.preventDefault();
            console.log("calling video_feed API");
            axios.get("http://localhost:5000/video_feed")
            .then((response) => {
                setVideo(response.data);
            //   if (response.status !== 400) {
            //   }
            console.log("Response: "+response.data);
            }).catch(err=>{
                console.log(err);
            });
           }
           handleVideoFeed();
    },[]);

    console.log("BEFORE RETURN", video);
    
    return (
        <>
        <NavBarAfterLogin />
        <Container>
        <ReactPlayer url={video} playing />
        </Container>
        </>
    )
}
