import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
import { Container, Row, Col, Navbar, Form } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props)
    this.handlerDataPost = this.handlerDataPost.bind(this)
    this.servicesGetHandler = this.servicesGetHandler.bind(this)
    this.radioHandler = this.radioHandler.bind(this)
    this.state = {
      serviceOne: 0,
      serviceTwo: 0,
      serviceThree: 0,
      form1: '',
      form2: '',
      form3: '',
      form4: '',
    }
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
  async servicesGetHandler() {
    try {
      const res = await axios.get('/services')
      await this.setStateAsync(() => {
        return {
          serviceOne: res.data[0].serviceSeats,
          serviceTwo: res.data[1].serviceSeats,
          serviceThree: res.data[2].serviceSeats
        }
      })
    } catch (e) {

    }
  }
  async handlerDataPost(e) {
    e.preventDefault();
    // e.target.elements.form1.value = ''
    let form2 = e.target.elements.form2.value
    let form3 = e.target.elements.form3.value
    let form4 = e.target.elements.form4.value
    try {
      await this.setStateAsync(() => { return { form2: form2, form3: form3, form4: form4, } })
      const res = await axios.post('/users',
        { 'service': this.state.form1, 'seats': this.state.form2, 'name': this.state.form3, 'email': this.state.form4 })
      console.log("weha", res.data)
    } catch (e) {
      console.log('Status:', e.response.status)
      if (e.response.status === 400) {
        console.log("400 ERROR")
      } else if (e.response.status === 422) {
        console.log("422 ERROR")
      } else {
        console.log("You goofed somehow")
      }
    }
  }
  radioHandler(e) {
    let form1 = e.target.value
    this.setState(() => {
      return {
        form1: form1
      }
    })
  }
  render() {
    const style1 = 'serviceIcon'
    const style2 = 'serviceIconClicked'
    return (
      <div className="App">
        <Navbar variant="light" className="topBar">
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
        <Container className="topContainer">
          <Row>
            <Col></Col>
            <Col xs={8}></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={8}></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col lg={2}></Col>
            <Col>
              <div>
                <p>8:00am</p>
                <div className={this.state.form1 === 'First Service' ? 'serviceIconClicked' : 'serviceIcon'}><ion-icon name="cloudy"></ion-icon></div>
                <Form.Check type="radio" value="First Service" onChange={this.radioHandler} checked={this.state.form1 === 'First Service'} />
              </div>
              <p>{this.state.serviceOne}</p>
            </Col>
            <Col>
              <div>
                <p>9:45am</p>
                <div className={this.state.form1 === 'Second Service' ? 'serviceIconClicked' : 'serviceIcon'}><ion-icon name="cloudy"></ion-icon></div>
                <Form.Check type="radio" value="Second Service" onChange={this.radioHandler} checked={this.state.form1 === 'Second Service'} />
              </div>
              <p>{this.state.serviceTwo}</p>
            </Col>
            <Col>
              <div>
                <p>11:30am</p>
                <div className={this.state.form1 === 'Third Service' ? 'serviceIconClicked' : 'serviceIcon'}><ion-icon name="cloudy"></ion-icon></div>
                <Form.Check type="radio" value="Third Service" onChange={this.radioHandler} checked={this.state.form1 === 'Third Service'} />
              </div>
              <p>{this.state.serviceThree}</p>
            </Col>
            <Col lg={2}></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={8} lg={6}>
              <Form onSubmit={this.handlerDataPost}>
                <Form.Group>
                  <Form.Control type="number" min="1" max="10" name="form2" placeholder="How many seats 1-10:"></Form.Control>
                  <Form.Control type="text" name="form3" placeholder="Enter name:"></Form.Control>
                  <Form.Control type="email" name="form4" placeholder="Enter email:"></Form.Control>
                  {/*<Form.Control type="text" name="form4" placeholder="Place Input:"></Form.Control>*/}
                  <button className="myButton">Submit</button>
                </Form.Group>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div >
    )
  }
  componentDidMount() {
    this.servicesGetHandler()
  }
}

export default Home;
