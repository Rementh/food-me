import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';
import Recipes from './recipes';
import { Paper, makeStyles } from '@material-ui/core';
import AppBar from '../components/appbar';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
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
            <Paper className={classes.paper}>
                <Recipes />
            </Paper>
        </>
    );
};

Home.propTypes = { history: PropTypes.object.isRequired };

export default withRouter(Home);
