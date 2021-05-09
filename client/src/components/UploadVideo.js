import React from 'react'
import { FormControl,Modal,Container,Row,Col,Image, Form, FormLabel} from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useState ,useEffect} from 'react'
import { CardHeader } from '@material-ui/core';
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';
import NavBarAfterLogin from './NavBarAfterLogin'
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function UploadVideo() {
    const[video,setVideo] = useState("");
    const[openUploadVideoSnack, setOpenUploadVideoSnack] = useState(false);
    function Alert(props) {
        return <MuiAlert elevation={10} variant="filled" {...props} />;
    }

    const handleUploadVideoSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpenUploadVideoSnack(false);
      };

    const uploadImage = async(e)=>{
        console.log("uploading video to server");
        var formData = new FormData();
        formData.append("file", video);
        axios.post("http://localhost:5000/upload", formData)
        .then((response) =>{
            if(response.status===200){
                openUploadVideoSnack(true);
                console.log(JSON.stringify(response.data));
            }
        });
    }
    return (
        <>
        <NavBarAfterLogin />
        <br/><br/><br/>
           <Container>
           <Snackbar open={openUploadVideoSnack} autoHideDuration={6000} onClose={handleUploadVideoSnack}>
                    <Alert style={{fontSize:"20px"}} onClose={handleUploadVideoSnack} severity="success">
                        You have uploaded video!
                    </Alert>
           </Snackbar>
            <Row></Row>
            <Row></Row>
            {/* <Row>
                <h3>SoDistant provides custom video detection also!!</h3>
                <lable>Please upload your video for us to help you</lable>
            </Row> */}
            <Row>
            <Card style={{width:"717px",height:"300px",marginLeft:"280px",background:"#FFFFFF"}}>
            <CardContent>
            <Card style={{height:"100px"}}>
            <input
            style={{color:"#d1335a"}}
            placeholder="Upload video"
            type="file"
            onChange={(e)=>setVideo(e.target.files[0])} 
            multiple
            />
            <Button
            startIcon={<BackupRoundedIcon />}
            style={{textTransform:"none",borderRadius:"10px",color:"#FFFFFF",background:"#d1335a"}} 
            value="upload"
            variant="outlined"
            onClick={uploadImage}>Upload</Button>
            </Card>
            <br/><br/>
                <h3 style={{color:"#d1335a"}}>SoDistant provides custom video surveillance detection also!!</h3>
                <lable style={{color:"#ccc"}}>Please upload your video for us to help you</lable>            
            </CardContent>
            </Card>
            </Row>
           </Container> 
        </>
    )
}
