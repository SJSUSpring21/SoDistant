import React from "react";
import "../../src/App.css";
import NavBarAfterLogin from "./NavBarAfterLogin";
import video_play from "../../src/assets/video_play.png";
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
import Plot from "react-plotly.js";
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
import useForceUpdate from "use-force-update";
import { ContactSupportOutlined } from "@material-ui/icons";
const video_url = "http://localhost:5000/video_feed/";
export default function DashboardPage() {
  const history = useHistory();

  const [show, setShow] = useState(false);

  const [cameraName, setAddCameraName] = useState("");
  const [iframesrc, setIframeSrc] = useState("");
  const [videoName, setVideoName] = useState("");
  const [video, setVideo] = useState("");
  const [cameraNameArray, setCameraNameArray] = useState([]);
  const [openUploadVideoSnack, setOpenUploadVideoSnack] = useState(false);
  const [ComponentDidMountState, setComponentDidMount] = useState(false);
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

  function loadCameraArrayFromLocalStorage() {
    let tempArray = JSON.parse(window.localStorage.getItem("camera_array"));
    if (tempArray !== null && tempArray.length > 0) {
      console.log("local storage ", cameraNameArray);
      setCameraNameArray(tempArray);
      setIframeSrc(video_url + tempArray[0].file);
    }
  }
  useEffect(() => {
    loadCameraArrayFromLocalStorage();
  }, []);

  const uploadImage = async (e) => {
    // let newArray = {...cameraNameArray};
    // console.log(typeof newArray );
    // newArray.push(cameraName);
    // setCameraNameArray([
    //   ...cameraNameArray,
    //   { name: cameraName, file: videoName },
    // ]);
    cameraNameArray.push({ name: cameraName, file: videoName });
    window.localStorage.setItem(
      "camera_array",
      JSON.stringify(cameraNameArray)
    );
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

  const [xValues, setXValues] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/dashboard').then(res => res.json()).then(data => {
        console.log('---', data)
        setXValues(data.time);
        });
    }, []);

    const [yValues, setYValues] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/dashboard1').then(res => res.json()).then(data => {
        console.log('---', data)
        setYValues(data.time1);
        });
    }, []);

    const [timeValues, setTimeValues] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/dashboard2').then(res => res.json()).then(data => {
        console.log('---', data)
        setTimeValues(data.time2);
        });
    }, []);

    const xlen = []
    for(let i=1; i<xValues.length; i++){
        xlen.push(i)
    }
    console.log('i----------', xlen)

    const ylen = []
    for(let i=1; i<yValues.length; i++){
        ylen.push(i)
    }

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

//    fetch("./violations.csv").then(function (response) {
//      return response.text();
//   })
//   .then(function (text) {
////	csvToSeries(text);
//	console.log('file data', text.split('\n')[0][0])
//   })
//   .catch(function (error) {
//      //Something went wrong
//      console.log(error);
//   });
//
//function csvToSeries(text) {
//   console.log(text);
//}

//    useEffect(() => {
//    d3.csvParse("../../../code/violations.csv").then((d) => {
//      setData(d);
//      setLoading(false);
//    });
//    console.log('file data', data)
//    return () => undefined;
//  }, []);

  return (
    <>
      <NavBarAfterLogin />

      <Row>
        <Col sm={3}>
          <div
            style={{ height: "100vh", backgroundColor: "black", padding: "5%" }}
          >
            <button onClick={handleShow} className="ButtonSyle_1">
              Add Camera
            </button>
            {cameraNameArray.map((data) => (
              <div className="sidenav border-bottom">
                <Row>
                  <Col sm={2}>
                    <img src={video_play} className="image_style"></img>
                  </Col>
                  <Col sm={8}>
                    <label
                      onClick={() => {
                        setIframeSrc(video_url + data.file);
                      }}
                    >
                      {data.name}
                    </label>
                  </Col>
                  <Col sm={2}>
                    <button
                      className="cross_button"
                      // onClick={removeVideo(index)}
                      onClick={() => {
                        // console.log("clicked cross");
                        // console.log("crossed clicked " + data.name);
                        var index = cameraNameArray.indexOf(data);
                        //console.log("index is ----------------",index)
                        cameraNameArray.splice(index, 1);
                        window.localStorage.setItem(
                          "camera_array",
                          JSON.stringify(cameraNameArray)
                        );

                        if (ComponentDidMountState === false) {
                          setComponentDidMount(true);
                        }
                        if (ComponentDidMountState === true) {
                          setComponentDidMount(false);
                        }
                        if (cameraNameArray.length === 0) {
                          setIframeSrc("");
                        } else {
                          setIframeSrc(video_url + cameraNameArray[0].file);
                        }
                      }}
                    >
                      X
                    </button>
                  </Col>
                </Row>
              </div>
            ))}

            {/* {window.localStorage.setItem(
              "camera_array",
              JSON.stringify(cameraNameArray)
            )} */}
          </div>
        </Col>

        <Col sm={9}>
          <Row>
            <Col>
              <Paper
                style={{
                  display: "inline-block",
                  marginLeft: "10px",
                  marginTop: "90px",
                  width: "700",
                  height: "700",
                }}
                elevation={3}
              >
                <iframe
                  id="myiframe"
                  src={iframesrc}
                  width="700"
                  height="395"
                />
                {/* <img src="http://localhost:5000/video_feed"
        width="700" height="395"/> */}
              </Paper>
            </Col>
          </Row>
          <Plot
          data={[{
            x: timeValues,
            y: xValues
          }]}
          layout={{ width: 1820, height: 640, title: "Graph Example", xaxis: {title: 'Duration'}, yaxis: {title: 'No. of People', titlefont: {
                     family: 'Courier New, monospace',
                     size: 18,
                     color: '#7f7f7f'
                 }} }}
          graphDiv="graph"
        />
        <Plot
          data={[{
            x: ylen,
            y: yValues
          }]}
          layout={{ width: 1820, height: 640, title: "Graph Example", xaxis: {title: 'Duration'}, yaxis: {title: 'Violations', titlefont: {
                     family: 'Courier New, monospace',
                     size: 18,
                     color: '#7f7f7f'
                 }} }}
          graphDiv="graph"
        />
          <br />
        </Col>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Add Camera</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  Camera Name
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => {
                  setAddCameraName(e.target.value);
                }}
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
                    setVideo(e.target.files[0]);
                    setVideoName(e.target.files[0].name);
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
      </Row>
    </>
  );
}
