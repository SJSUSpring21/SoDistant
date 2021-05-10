import React from "react";
import NavBarAfterLogin from "./NavBarAfterLogin";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
// import InputGroup from 'react-bootstrap/InputGroup'
import axios from "axios";
import { useState, useEffect } from "react";
// import CardMedia from '@material-ui/core/CardMedia';
//import 'VideoPlayer' from 'video-js';
import Paper from "@material-ui/core/Paper";
// import GetAppIcon from '@material-ui/icons/GetApp';
// import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
// import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
// import SwapHorizontalCircleRoundedIcon from '@material-ui/icons/SwapHorizontalCircleRounded';
import { useHistory } from "react-router-dom";
const video_url="http://localhost:5000/video_feed/";
export default function DashboardPage() {
  const history = useHistory();

  const [show, setShow] = useState(false);

  const [cameraName, setAddCameraName] = useState("");
  const [iframesrc, setIframeSrc] = useState(
    ""
  );
  const [videoName, setVideoName] = useState("");
  const [video, setVideo] = useState("");
  const [cameraNameArray,setCameraNameArray]=useState([]);
  const [openUploadVideoSnack, setOpenUploadVideoSnack] = useState(false);
  const [downUrl, setDownUrl] = useState("http://localhost:5000/download/mall");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleSaveCamera = async () => {
  //   setIframeSrc(cameraUrl);
  //   var d = cameraUrl.split("/");
  //   console.log(d[4]);
  //   //   `${backendUrl}/api/posts`
  //   var durl = `http://localhost:5000/download/${d[4]}`;
  //   setDownUrl(durl);
  //   console.log("iframesrc:: " + cameraUrl);
  // };

  const handleAddCamera = () => {
    console.log("Add camera called");
    history.push("/addcamera");
  };

  const handleDownloadVideo = (e) => {
    e.preventDefault();
    const requestOptions = {
      headers: { "Content-Type": "video/mp4" },
    };
    console.log("calling download video API");
    axios
      .get("http://localhost:5000/download/mall.mp4")
      .then((response) => {
        console.log("Response: " + response.data);
        console.log("Response: " + JSON.stringify(response.data.type));
        var link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([response]));
        link.download = "file.zip";

        document.body.appendChild(link);

        link.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(link);
        }, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImage = async (e) => {
// let newArray = {...cameraNameArray};
// console.log(typeof newArray );
// newArray.push(cameraName);
    setCameraNameArray([...cameraNameArray,{"name":cameraName, "file": videoName}]);  
    var formData = new FormData();
    formData.append("file", video);
    axios.post("http://localhost:5000/upload", formData).then((response) => {
      if (response.status === 200) {
        setOpenUploadVideoSnack(true);
        console.log(JSON.stringify(response.data));
        handleClose();
      }
    });
    
  };

  return (
    <>
      <NavBarAfterLogin />
      <div>
      {cameraNameArray.map((data) => (
        <button onClick={()=>{setIframeSrc(video_url+data.file)} }>{data.name}</button>
      ))}
    </div>
      <Container>
        <Col style={{ marginLeft: "20px" }}>
          <br />
          {localStorage.setItem('camera_array',JSON.stringify(cameraNameArray))}
          <Button variant="primary" onClick={handleShow}>
            Add Camera
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Add Camera</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend  >
                  <InputGroup.Text id="inputGroup-sizing-default" > 
                    Camera Name
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => {setAddCameraName(e.target.value)}}
                />
              </InputGroup>
              <Form>
                <div className="mb-3">
                  <input
                    style={{ color: "#d1335a" }}
                    placeholder="Upload video"
                    type="file"
                    id="videoUpload"
                    onChange={(e) => {
                      setVideo(e.target.files[0])
                      setVideoName(e.target.files[0].name)
                    }}
                    multiple
                  />
                </div>
              </Form>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Camera URL
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={uploadImage}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Row>
          <Col>
            <Paper
              style={{
                display: "inline-block",
                marginLeft: "300px",
                width: "700",
                height: "700",
              }}
              elevation={3}
            >
              <iframe id="myiframe" src={iframesrc} width="700" height="395" /> 
              {/* <img src="http://localhost:5000/video_feed"
        width="700" height="395"/> */}
            </Paper>
          </Col>
        </Row>
        <br />
      
      </Container>
    </>
  );
}
