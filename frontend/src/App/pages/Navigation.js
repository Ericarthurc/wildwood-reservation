import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Form } from 'react-bootstrap';


const Navigation = () => {
    return (
        <div>
            <Navbar>
                <Navbar.Brand href="">Wildwood Christmas Services</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
        </div>
    )
}

export default Navigation;