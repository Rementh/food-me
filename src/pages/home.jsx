import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';
import Recipes from './recipes';

const styles = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        margin: 20
    },
    user: {
        marginTop: 0
    },
    header: {
        textAlign: 'center',
        marginTop: 0
    }
};

const handleOnLogout = history => async e => {
    e.preventDefault();
    await firebase.logout();
    history.push('/login');
};

const Home = ({ history }) => {
    if (!firebase.getCurrentUsername()) {
        history.replace('/login');
        return <></>;
    }

    return (
        <form onSubmit={handleOnLogout(history)}>
            <Paper style={styles.paper}>
                <Recipes />
                <Button variant="contained" color="primary" type="submit">Logout</Button>
            </Paper>
        </form>
    );
};

Home.propTypes = { history: PropTypes.object.isRequired };

export default withRouter(Home);
