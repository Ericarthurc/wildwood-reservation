import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Container, Row, Col, Navbar, Form } from 'react-bootstrap';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ErrorPage from './pages/ErrorPage';

// <Route path='/list' component={List} />

class App extends Component {
    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/admin' component={Admin} />
                    <Route exact path='*' component={ErrorPage} />
                </Switch>
            </div>
        )
        return (
            <div>
                <Switch>
                    <App />
                </Switch>
            </div>
        );
    }
}

export default App;