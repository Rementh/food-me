import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';

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

const Home = ({ history }) => {
    if (!firebase.getCurrentUsername()) {
        alert('login mate');
        history.push('/login');
        return null;
    }

    return (
        <form onSubmit={handleOnLogout}>
            <Paper style={styles.paper}>
                <h2 style={styles.header}>Login</h2>
                <p style={styles.user}>{firebase.getCurrentUsername()}</p>
                <Button variant="contained" color="primary" type="submit">Logout</Button>
            </Paper>
        </form>
    );

    async function handleOnLogout(e) {
        e.preventDefault();
        await firebase.logout();
        history.push('/login');
    }
};

Home.propTypes = { history: PropTypes.object.isRequired };

export default withRouter(Home);
