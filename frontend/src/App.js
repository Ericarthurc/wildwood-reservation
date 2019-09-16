import React from 'react';
import './App.css';
import axios from "axios";
import { Container, Row, Col, Navbar, Form, FormControl, Nav, NavDropdown, Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handlerRandomNumGet = this.handlerRandomNumGet.bind(this)
    this.handlerDataPost = this.handlerDataPost.bind(this)
    this.handlerDataNumGet = this.handlerDataNumGet.bind(this)
    this.state = {
      randomNum: 0,
      number1: 0,
      number2: 0,
      number3: 0,
      form1: '',
      form2: '',
      form3: '',
      form4: '',

    }
  }
  handlerDataNumGet() {
    axios.get('http://192.168.1.18:3000/api/dataNum')
      .then(response => {
        console.log(response.data[0])
        this.setState(() => {
          return {
            number1: response.data[0].number1,
            number2: response.data[0].number2,
            number3: response.data[0].number3
          }
        })
      })
  }
  handlerRandomNumGet() {
    axios.get('http://192.168.1.18:3000/api/randomNum')
      .then(response => {
        console.log(response.data)
        this.setState(() => {
          return {
            randomNum: response.data.number
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  handlerDataPost(e) {
    e.preventDefault();
    // e.target.elements.form1.value = ''
    let form1 = e.target.elements.form1.value
    let form2 = e.target.elements.form2.value
    let form3 = e.target.elements.form3.value
    let form4 = e.target.elements.form4.value
    this.setState(() => {
      return {
        form1: form1,
        form2: form2,
        form3: form3,
        form4: form4

      }
    }, () => {
      axios
        .post('http://192.168.1.18:3000/api/test',
          [{ 'form1': this.state.form1 }, { 'form2': this.state.form2 }, { 'form3': this.state.form3 }, { 'form4': this.state.form4 }])
        .then(response => { console.log(response.data) })
    })
  }
  render() {
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
            <Col xs={8}>
              <h5>Random Number from Express: {this.state.randomNum}</h5>
              <button className="myButton" onClick={this.handlerRandomNumGet}>New Number!</button>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <p>Number1:</p>
              <p>{this.state.number1}</p>
            </Col>
            <Col>
              <p>Number2:</p>
              <p>{this.state.number2}</p>
            </Col>
            <Col>
              <p>Number3:</p>
              <p>{this.state.number3}</p>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={8}>
              <button className="myButton" onClick={this.handlerDataNumGet}>Ask for JSON</button>
              <Form onSubmit={this.handlerDataPost}>
                <Form.Group>
                  <Form.Control type="text" name="form1" placeholder="Place Input:"></Form.Control>
                  <Form.Control type="text" name="form2" placeholder="Place Input:"></Form.Control>
                  <Form.Control type="text" name="form3" placeholder="Place Input:"></Form.Control>
                  <Form.Control type="text" name="form4" placeholder="Place Input:"></Form.Control>
                  <button className="myButton" >Send Data!</button>
                </Form.Group>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    )
  }
  componentDidMount() {
    this.handlerRandomNumGet()
    // this.handlerDataNumGet()
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

export default App;
