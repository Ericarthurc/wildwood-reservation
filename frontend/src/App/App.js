import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

// <Route path='/list' component={List} />

class App extends Component {
    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='*' component={ErrorPage} />
                </Switch>
            </div>
        )
        return (
            <Switch>
                <App />
            </Switch>
        );
    }
}

export default App;