import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
import { Container, Row, Col, Navbar, Form } from 'react-bootstrap';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.handlerLoginState = this.handlerLoginState.bind(this)
        this.state = {
            loggedIn: false
        }
    }
    handlerLoginState(option) {
        setTimeout(() => this.setState(() => {
            return {
                loggedIn: option
            }
        }), 1500)
    }
    render() {
        return (
            <div className="App">
                {(!this.state.loggedIn) && <Login
                    handlerLoginState={this.handlerLoginState}
                />}
                {(this.state.loggedIn) && <LoggedIn></LoggedIn>}
            </div>
        )
    }
}

class LoggedIn extends Component {
    render() {
        return (
            <div className="App">
                <h1>You're logged in!</h1>
            </div>
        )
    }
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.handlerLogin = this.handlerLogin.bind(this)
        this.state = {
            status: '',
            form1: '',
            form2: '',
            form3: ''
        }
    }
    async handlerLogin(e) {
        e.preventDefault();
        let form1 = e.target.elements.form1.value
        let form2 = e.target.elements.form2.value
        let form3 = e.target.elements.form3.value
        this.setState(() => {
            return {
                form1: form1,
                form2: form2,
                form3: form3
            }
        }, async () => {
            try {
                await axios.post('/users/login', {
                    username: this.state.form1,
                    password: this.state.form2,
                    secert: this.state.form3
                })
                this.setState(() => { return { status: "Loggin successful!" } })
                this.props.handlerLoginState(true)
            } catch (e) {
                this.setState(() => { return { status: "Loggin invalid!" } })
                this.props.handlerLoginState(false)
            }
        })
    }
    render() {
        return (
            <div className="App">
                <Row>
                    <Col></Col>
                    <Col xs={10}><h1 className="header1">Admin Login</h1></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col xs={2} md={4} lg={4} xl={5}></Col>
                    <Col xs={8} md={4} lg={4} xl={2}>
                        {(this.state.status) && <p>{this.state.status}</p>}
                        <Form onSubmit={this.handlerLogin}>
                            <Form.Group>
                                <Form.Control type="text" name="form1" placeholder="Username:"></Form.Control>
                                <Form.Control type="password" name="form2" placeholder="Password:"></Form.Control>
                                <Form.Control type="password" name="form3" placeholder="Secret:"></Form.Control>
                                <button className="myButton">Submit</button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={2} md={4} lg={4} xl={5}></Col>
                </Row>
            </div>
        )
    }
}

export default Admin;