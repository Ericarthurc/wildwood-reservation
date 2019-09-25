import React, { Component, useState, useEffect } from 'react';
import '../App.css';
import Navigation from './Navigation'
import axios from "axios";
import validator from 'validator'
import { Container, Row, Col, Navbar, Form } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="App">
      <Navigation></Navigation>
      <ServiceForm></ServiceForm>
    </div>
  )
}

const ServiceForm = () => {
  const [serviceOne, setServiceOne] = useState([])
  const [serviceTwo, setServiceTwo] = useState([])
  const [serviceThree, setServiceThree] = useState([])
  const [radioCheck, setRadioCheck] = useState()
  const [radioID, setRadioID] = useState()
  const [statusMessage, setStatusMessage] = useState()

  const getServices = async () => {
    try {
      const res = await axios.get('/services')
      setServiceOne(res.data[0])
      setServiceTwo(res.data[1])
      setServiceThree(res.data[2])
      // Line below causes all messages to reset to '' after the interval
      // setStatusMessage('')
    } catch (e) {
      setStatusMessage('Database had error, try again')
    }
  }

  const radioHandler = (e, id) => {
    setRadioCheck(e.target.value)
    setRadioID(id)
  }

  const formHandler = async (e) => {
    e.preventDefault()
    let formObj = {}
    for (let i = 3; i < (e.target.elements.length - 1); i++) {
      formObj[i] = e.target.elements[i].value
      e.target.elements[i].value = ''
    }
    try {
      if (radioCheck && formObj[3] && formObj[4] && formObj[5] && validator.isEmail(formObj[5])) {
        await axios.post('/forms/services', [{ '_id': radioID, 'serviceSeats': formObj[3] },
        { 'service': radioCheck, 'seats': formObj[3], 'name': formObj[4], 'email': formObj[5] }])
        getServices()
        setRadioCheck()
        setStatusMessage('Submitted Successfully!')
      } else {
        console.log('stopped by frontend')
        setStatusMessage('Invalid Form Input')
      }
    } catch (e) {
      if (e.response.status === 400) {
        setStatusMessage('Invalid Form Input')
      } else if (e.response.status === 406) {
        setStatusMessage(`The selected service does not have ${formObj[3]} seats available`)
      } else if (e.response.status === 422) {
        setStatusMessage('This email has already been used')
      } else if (e.response.status === 500) {
        setStatusMessage('Database had error, try again')
      } else {
        console.log(e)
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
                <div className={(serviceOne.serviceSeats <= 0) ? 'serviceIconDisabled' : (radioCheck === 'First Service' ? 'serviceIconClicked' : 'serviceIcon')}>
                  <ion-icon name="cloudy"></ion-icon>
                </div>
                <Form.Check type="radio" value="First Service" key={serviceOne._id} onChange={(e) => radioHandler(e, serviceOne._id)} checked={radioCheck === 'First Service'} disabled={(serviceOne.serviceSeats <= 0)} />
              </div>
              <div>
                {(serviceOne.serviceSeats <= 0) ? <p>Service full</p> : <p key={serviceOne._id}>Seats: {serviceOne.serviceSeats}</p>}
              </div>
            </Col>
            <Col>
              <div>
                <p>9:45am</p>
                <div className={(serviceTwo.serviceSeats <= 0) ? 'serviceIconDisabled' : (radioCheck === 'Second Service' ? 'serviceIconClicked' : 'serviceIcon')}>
                  <ion-icon name="cloudy"></ion-icon>
                </div>
                <Form.Check type="radio" value="Second Service" key={serviceTwo._id} onChange={(e) => radioHandler(e, serviceTwo._id)} checked={radioCheck === 'Second Service'} disabled={(serviceTwo.serviceSeats <= 0)} />
              </div>
              <div>
                {(serviceTwo.serviceSeats <= 0) ? <p>Service full</p> : <p key={serviceTwo._id}>Seats: {serviceTwo.serviceSeats}</p>}
              </div>
            </Col>
            <Col>
              <div>
                <p>11:30am</p>
                <div className={(serviceThree.serviceSeats <= 0) ? 'serviceIconDisabled' : (radioCheck === 'Third Service' ? 'serviceIconClicked' : 'serviceIcon')}>
                  <ion-icon name="cloudy"></ion-icon>
                </div>
                <Form.Check type="radio" value="Third Service" key={serviceThree._id} onChange={(e) => radioHandler(e, serviceThree._id)} checked={radioCheck === 'Third Service'} disabled={(serviceThree.serviceSeats <= 0)} />
              </div>
              <div>
                {(serviceThree.serviceSeats <= 0) ? <p>Service full</p> : <p key={serviceThree._id}>Seats: {serviceThree.serviceSeats}</p>}
              </div>
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
