import React, { Component, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
import { Container, Row, Col, Navbar, Form } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="App">
      <HomeNavbar></HomeNavbar>
      <ServiceForm></ServiceForm>
    </div>
  )
}

const HomeNavbar = () => {
  return (
    <div className="App">
      <Navbar variant="light" className="topBar">
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
    </div>
  )
}

const ServiceForm = () => {
  const [serviceOne, setServiceOne] = useState([])
  const [serviceTwo, setServiceTwo] = useState([])
  const [serviceThree, setServiceThree] = useState([])
  const [radioCheck, setRadioCheck] = useState('')
  const [statusMessage, setStatusMessage] = useState()

  const getServices = async () => {
    try {
      const res = await axios.get('/services')
      setServiceOne(res.data[0])
      setServiceTwo(res.data[1])
      setServiceThree(res.data[2])
    } catch (e) {
      console.log(e.response.status)
    }
  }

  const radioHandler = (e) => {
    setRadioCheck(e.target.value)
  }

  const formHandler = async (e) => {
    e.preventDefault()
    let formObj = {}
    for (let i = 3; i < (e.target.elements.length - 1); i++) {
      formObj[i] = e.target.elements[i].value
      e.target.elements[i].value = ''
    }
    console.log(formObj)
    setRadioCheck('')
    try {
      const res = await axios.post('/users',
        { 'service': radioCheck, 'seats': formObj[3], 'name': formObj[4], 'email': formObj[5] })
      setStatusMessage('Submitted Successfully!')
    } catch (e) {
      console.log('Status:', e.response.status)
      if (e.response.status === 400) {
        console.log("400 ERROR")
        setStatusMessage('Invalid Form Input')
      } else if (e.response.status === 422) {
        setStatusMessage('This email has already been used')
        console.log("422 ERROR")
      } else {
        console.log("You goofed somehow")
      }
    }
  }

  useEffect(() => {
    getServices()
    setInterval(() => getServices(), 3000)
  }, [])

  return (
    <div id="form" className="App">
      <Container>
        <Form onSubmit={formHandler}>
          <Row>
            <Col lg={2}></Col>
            <Col>
              <div>
                <p>8:00am</p>
                <div className={radioCheck === 'First Service' ? 'serviceIconClicked' : 'serviceIcon'}>
                  <ion-icon name="cloudy"></ion-icon>
                </div>
                <Form.Check type="radio" value="First Service" onChange={radioHandler} checked={radioCheck === 'First Service'} />
              </div>
              <p key={serviceOne._id}>{serviceOne.serviceSeats}</p>
            </Col>
            <Col>
              <div>
                <p>9:45am</p>
                <div className={radioCheck === 'Second Service' ? 'serviceIconClicked' : 'serviceIcon'}><ion-icon name="cloudy"></ion-icon></div>
                <Form.Check type="radio" value="Second Service" onChange={radioHandler} checked={radioCheck === 'Second Service'} />
              </div>
              <p key={serviceTwo._id}>{serviceTwo.serviceSeats}</p>
            </Col>
            <Col>
              <div>
                <p>11:30am</p>
                <div className={radioCheck === 'Third Service' ? 'serviceIconClicked' : 'serviceIcon'}><ion-icon name="cloudy"></ion-icon></div>
                <Form.Check type="radio" value="Third Service" onChange={radioHandler} checked={radioCheck === 'Third Service'} />
              </div>
              <p key={serviceTwo._id}>{serviceTwo.serviceSeats}</p>
            </Col>
            <Col lg={2}></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={8} lg={6}>
              <p className={statusMessage === 'Submitted Successfully!' ? 'successStatus' : 'errorStatus'}>{statusMessage}</p>
              <Form.Group>
                <Form.Control type="number" min="1" max="10" name="form2" placeholder="How many seats 1-10:"></Form.Control>
                <Form.Control type="text" name="form3" placeholder="Enter name:"></Form.Control>
                <Form.Control type="email" name="form4" placeholder="Enter email:"></Form.Control>
                <button className="myButton">Submit</button>
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

export default Home;
