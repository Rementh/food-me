import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from './firebase';

const App = () => {
    const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);

    useEffect(() => {
        firebase.isInitialized().then(val =>
            setIsFirebaseInitialized(val)
        );
    });

    return isFirebaseInitialized !== false ? (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
        </Router>
    ) : <CircularProgress />;
};

export default App;
