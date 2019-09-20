import React, { Component, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
import { Container, Row, Col, Navbar, Form } from 'react-bootstrap';

const Admin = () => {
    const [adminState, setAdminState] = useState(false)

    const adminStatusHandler = (option) => {
        setTimeout(() => setAdminState(option), 1500)
    }

    return (
        <div className="App">
            {(!adminState) && <LoginForm passed={adminStatusHandler} />}
            {(adminState) && <AdminInterface></AdminInterface>}
        </div>
    )
}

const AdminInterface = () => {
    return (
        <div className="App">
            <h1>You're logged in!</h1>
        </div>
    )
}

const LoginForm = (props) => {
    const [statusMessage, setStatusMessage] = useState()

    const loginFormHandler = async (e) => {
        e.preventDefault()
        let formObj = {}
        for (let i = 0; i < (e.target.elements.length - 1); i++) {
            formObj[i] = e.target.elements[i].value
            e.target.elements[i].value = ''
        }
        try {
            await axios.post('/users/login', { username: formObj[0], password: formObj[1], secert: formObj[2] })
            setStatusMessage("Loggin successful!")
            props.passed(true)
        } catch (e) {
            setStatusMessage("Loggin invalid!")
            props.passed(false)
        }
    }

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
                    <p className={statusMessage === 'Loggin successful!' ? 'successStatus' : 'errorStatus'}>{statusMessage}</p>
                    <Form onSubmit={loginFormHandler}>
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
        </div >
    )
}

export default Admin;