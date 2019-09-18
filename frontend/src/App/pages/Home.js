import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
import { Container, Row, Col, Navbar, Form } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props)
    this.handlerDataPost = this.handlerDataPost.bind(this)
    this.handlerDataNumGet = this.handlerDataNumGet.bind(this)
    this.state = {
      // randomNum: 0,
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
    axios.get('/services')
      .then(response => {
        console.log(response.data)
        this.setState(() => {
          return {
            number1: response.data[0].serviceSeats,
            number2: response.data[1].serviceSeats,
            number3: response.data[2].serviceSeats
          }
        })
      })
  }
  // handlerRandomNumGet() {
  //   axios.get('/api/randomNum')
  //     .then(response => {
  //       console.log(response.data)
  //       this.setState(() => {
  //         return {
  //           randomNum: response.data.number
  //         }
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
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
        .post('/api/test',
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
            <Col xs={8}></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <p>Service1:</p>
              <p>{this.state.number1}</p>
            </Col>
            <Col>
              <p>Service2:</p>
              <p>{this.state.number2}</p>
            </Col>
            <Col>
              <p>Service3:</p>
              <p>{this.state.number3}</p>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={8}>
              <Form onSubmit={this.handlerDataPost}>
                <Form.Group>
                  <Form.Control type="text" name="form1" placeholder="Place Input:"></Form.Control>
                  <Form.Control type="text" name="form2" placeholder="Place Input:"></Form.Control>
                  <Form.Control type="text" name="form3" placeholder="Place Input:"></Form.Control>
                  <Form.Control type="text" name="form4" placeholder="Place Input:"></Form.Control>
                  <button className="myButton" >Submit</button>
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
    this.handlerDataNumGet()
  }
}

// const Header = (props) => {
//   return (
//     <div>
//       <h1>{props.title}</h1>
//     </div>
//   )
// }

export default Home;
