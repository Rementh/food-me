import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    paper: {
        padding: 20,
        margin: 20
    }
});

const NewRecipe = ({ classes }) => {

    return (
        <Paper className={classes.paper}>
            <p>Hi</p>
        </Paper>
    );
};

NewRecipe.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(NewRecipe);
