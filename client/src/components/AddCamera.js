import React from 'react'
import NavBarAfterLogin from './NavBarAfterLogin'
import { FormControl,Modal,Container,Row,Col,Image, Form, FormLabel} from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { useState ,useEffect} from 'react'
import Button from '@material-ui/core/Button';

export default function AddCamera() {
    const[camName, setCamName] = useState("");
    const[camUrl, setCamUrl] = useState("");
    const[isCamAdded, setIsCamAdded] = useState(false);
    const[iframesrc, setIframeSrc] = useState("");
    const[down, setDown] = useState("");
    const handleAddCamSubmit = (e) =>{
        e.preventDefault();
        console.log("cam url: "+camUrl);
        setIframeSrc(camUrl);
        setIsCamAdded(true);
        var d = camUrl.split("/");
        console.log(d[4].trim());
        setDown(d[4].trim());
    }
    return (
        <>
            <NavBarAfterLogin />
            <br/><br/><br/>
            <body style={{margingLeft:"1000px"}}>
            <Container>
                <Card style={{width:"500px"}}>
                <CardContent style={{margingLeft:"100px"}}>
                    <h3 style={{color:"#d1335a"}}>Add Camera</h3>
                    <Form onSubmit={handleAddCamSubmit}> 
                    <TextField
                    fullWidth="true" 
                    id="standard-basic" 
                    label="Camera name"
                    value={camName}
                    onChange={(e)=>setCamName(e.target.value)} 
                     /><br/>
                     <TextField
                    fullWidth="true"  
                    id="standard-basic" 
                    label="Camera URL"
                    value={camUrl}
                    onChange={(e)=>setCamUrl(e.target.value)} 
                     />
                     <Row><br/>
                    <input
                    type="submit"
                    value="Save"
                    style={{fontWeight:"bold",fontSize:"18px",borderRadius:"5px",background:"#d1335a",color:"#FFFFFF"}}
                    />&nbsp;&nbsp;&nbsp;
                    <input
                    type="reset"
                    value="Cancel"
                    style={{fontWeight:"bold",fontSize:"18px",borderRadius:"5px",color:"#d1335a"}}
                    />
                    </Row>
                    </Form>
                </CardContent>
                </Card>
            </Container>

            {isCamAdded?
            <iframe id="myiframe" 
            src={iframesrc} 
            width="700" height="395"/>
            :null
            }

            {isCamAdded?
            <Button
            style={{marginLeft:"300px"}}
            variant = "contained"
            color = "default"
            onClick={(e) => {
                window.location.href=`http://localhost:5000/download/${down}`
            }}
             >
            Download video
            </Button>:null}

            </body>
        </>
    )
}
