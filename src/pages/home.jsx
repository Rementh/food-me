import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';
import Recipes from './recipes';
import { makeStyles } from '@material-ui/core';
import AppBar from '../components/appbar';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        background: '#888',
        padding: 5,
        flex: 1,
    },
}));

const Home = ({ history }) => {
    if (!firebase.getCurrentUsername()) {
        history.replace('/login');
        return <></>;
    }

    const classes = useStyles();

    return (
        <>
            <AppBar />
            <div className={classes.container}>
                <Recipes />
            </div>
        </>
    );
};

Home.propTypes = { history: PropTypes.object.isRequired };

export default withRouter(Home);
