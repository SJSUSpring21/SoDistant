import React from 'react'
import NavBarBeforeLogin from './NavBarBeforeLogin'
import backgroundimg from '../assets/sodistantlogo.svg';
import { FormControl,Modal,Container,Row,Col,Image,Button, Form, FormLabel} from 'react-bootstrap';

export default function LandingPage() {
    return (
        <>
            <NavBarBeforeLogin/>
            <br/><br/>
            <Container>
            <Row></Row>
            <Row></Row>
            <Row></Row>
            <Row></Row>
            <Row></Row>
            <Row></Row>
            <Row>
            <Col></Col>
            <Col style={{fontFamily:"sans-serif",color:"#d1335a",fontSize:"50px",position:"relative"}}>
                <h1 style={{marginLeft:"20px"}}>SoDistant</h1>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>            
            <Col>
            <div style={{marginRight:"50px",float:"right",bottom:"0px",right:"0px",display:"block",zIndex:"0",backgroundRepeat:"no-repeat",backgroundSize:"cover",marginTop:"-15px",height:"450.047px",width:"453.047px",margin:"-53px 0 0 0",minHeight:"auto",minWidth:"auto",backgroundPosition:"0% 0%",backgroundImage: "url(" + backgroundimg + ")"}} />
            </Col>
            <Col></Col>
            <Col></Col><Col></Col>
            </Row>
            </Container>
        </>
    )
}
