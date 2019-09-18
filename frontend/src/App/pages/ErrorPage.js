import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';

class ErrorPage extends Component {
    render() {
        return (
            <div className="App">
                <img className="pic" src="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png" alt="logo"></img>
                <h1>404 Page Not Found</h1>
            </div>
        );
    }
}

export default ErrorPage;