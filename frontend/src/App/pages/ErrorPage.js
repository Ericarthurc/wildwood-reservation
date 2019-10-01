import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';

class ErrorPage extends Component {
    render() {
        return (
            <div className="App">
                <img className="logoImage" src="./images/wwTitleLogo.svg" alt="logoImage" />
                <h1 className="notFound">404 Page Not Found</h1>
            </div >
        );
    }
}

export default ErrorPage;