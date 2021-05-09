import React from 'react'
import { Modal,Container,Row,Col,Image, Form, FormLabel} from 'react-bootstrap';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NavBarAfterLogin from './NavBarAfterLogin';
import FilledInput from '@material-ui/core/FilledInput';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState ,useEffect} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';

export default function Settings() {

    const[DISPLAY,setDisplay] = useState("");
    const[OUTPUT,setOUTPUT] = useState("");
    const[USE_GPU,setUSE_GPU] = useState("");
    const[ALERT,setALERT] = useState("");
    const[MODEL_PATH,setModel] = useState("");
    const[MIN_CONF,setMinConf] = useState("");
    const[NMS_THRESH,setnmsthr] = useState("");
    const[THRESHOLD,setthr] = useState("");
    const[MAIL,setMAIL] = useState("");
    const[URL,setURL] = useState("");
    const[MIN_DISTANCE,setmindis] = useState("");
    const[CV_INP_WIDTH,setcvp] = useState("");
    const[CV_INP_HEIGHT,setcvh] = useState("");
    const[WEIGHTS,setweights] = useState("");
    const[CFG,setcfg] = useState("");
    const[VIDEO_PATH,setvideopath] = useState("");

    const handleSettingsSubmit = async(e) =>{

        const body = {
            'DISPLAY':DISPLAY,
            'OUTPUT':OUTPUT,
            'MODEL_PATH':MODEL_PATH,
            'MIN_CONF':MIN_CONF,
            'NMS_THRESH':NMS_THRESH,
            'THRESHOLD':THRESHOLD,
            'USE_GPU':USE_GPU,
            'ALERT':ALERT,
            'MAIL':MAIL,
            'URL':URL,
            'MIN_DISTANCE':MIN_DISTANCE,
            'CV_INP_WIDTH':CV_INP_WIDTH,
            'CV_INP_HEIGHT':CV_INP_HEIGHT,
            'WEIGHTS':WEIGHTS,
            'CFG':CFG,
            'VIDEO_PATH':VIDEO_PATH
         }
         const response = await axios.post('http://localhost:5000/config',body);
         if(response.status===200){
             console.log("response:: "+response.data);
         }
        // axios.post('http://localhost:5000/settings')
        // .then(response=>{
        //     console.log("Response: "+JSON.stringify(response.data));
        // }).catch(err=>{
        // console.log(err);
        // });
    }


    return (        
        <>
        <NavBarAfterLogin />
          <Container style={{marginLeft:"150px"}}>
            <Row>
                <h2>Configuaration Settings</h2>
            </Row>
            <Row>
            <Form onSubmit={handleSettingsSubmit}>
            {/* <InputLabel htmlFor="modelpath">Model path</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="modelpath"
            value={MODEL_PATH}
            onChange={(e)=>setModel(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">provide your model path</FormHelperText>

            {/* <InputLabel htmlFor="minconf">Min Conf</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="minconf"
            value={MIN_CONF}
            onChange={(e)=>setMinConf(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">provide your min conf</FormHelperText>

            {/* <InputLabel htmlFor="nmsthr">Nms Threshold</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="nmsthr"
            value={NMS_THRESH}
            onChange={(e)=>setnmsthr(e.target.value)}
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">provide your nms threshold</FormHelperText>

            <label>display</label>
            <RadioGroup aria-label="Display" name="Display" value={DISPLAY} onChange={(e)=>setDisplay(e.target.value)}>
            <FormControlLabel value="true" control={<Radio />} label="true" />
            <FormControlLabel value="false" control={<Radio />} label="false" />
            </RadioGroup>

            <label>output</label>
            <RadioGroup aria-label="Output" name="Output" value={OUTPUT} onChange={(e)=>setOUTPUT(e.target.value)}>
            <FormControlLabel value="true" control={<Radio />} label="true" />
            <FormControlLabel value="false" control={<Radio />} label="false" />
            </RadioGroup>

            <label>use gpu</label>
            <RadioGroup aria-label="useGpu" name="useGpu" value={USE_GPU} onChange={(e)=>setUSE_GPU(e.target.value)}>
            <FormControlLabel value="true" control={<Radio />} label="true" />
            <FormControlLabel value="false" control={<Radio />} label="false" />
            </RadioGroup>

            <label>alert</label>
            <RadioGroup aria-label="alert" name="alert" value={ALERT} onChange={(e)=>setALERT(e.target.value)}>
            <FormControlLabel value="true" control={<Radio />} label="true" />
            <FormControlLabel value="false" control={<Radio />} label="false" />
            </RadioGroup>

            {/* <InputLabel htmlFor="thr">Threshold</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="thr"
            value={THRESHOLD}
            onChange={(e)=>setthr(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">set your threshold</FormHelperText>

            {/* <InputLabel htmlFor="email">Email</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="email"
            value={MAIL}
            onChange={(e)=>setMAIL(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">provide your email</FormHelperText>

            {/* <InputLabel htmlFor="url">Url</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="url"
            value={URL}
            onChange={(e)=>setURL(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">provide your url</FormHelperText>

            {/* <InputLabel htmlFor="mindis">Minimum distance</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="mindis"
            value={MIN_DISTANCE}
            onChange={(e)=>setmindis(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">set your minimum distance</FormHelperText>

            {/* <InputLabel htmlFor="cvp">CV_INP_WIDTH</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="cvp"
            value={CV_INP_WIDTH}
            onChange={(e)=>setcvp(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">set your CV_INP_WIDTH</FormHelperText>

            {/* <InputLabel htmlFor="cvh">CV_INP_HEIGHT</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="cvh"
            value={CV_INP_HEIGHT}
            onChange={(e)=>setcvh(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">set your CV_INP_HEIGHT</FormHelperText>

            {/* <InputLabel htmlFor="weights">WEIGHTS</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="weights"
            value={WEIGHTS}
            onChange={(e)=>setweights(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">set your WEIGHTS</FormHelperText>

            {/* <InputLabel htmlFor="cfg">CFG</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="cfg"
            value={CFG}
            onChange={(e)=>setcfg(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">set your CFG</FormHelperText>

            {/* <InputLabel htmlFor="videopath">VIDEO_PATH</InputLabel> */}
            <FilledInput 
            fullWidth="true"
            style={{width:"600px"}} 
            id="videopath"
            value={VIDEO_PATH}
            onChange={(e)=>setvideopath(e.target.value)} 
            aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">set your VIDEO_PATH</FormHelperText>
            <br/>
            <Row>
              <input
              type="submit"
              value="Post"
              style={{fontSize:"18px",textAlign:"center",background:"#D1335A",color:"#FFFFFF",borderRadius:"10px"}}
              />
            </Row>
            </Form>
            </Row>
          </Container>  
        </>
    )
}
