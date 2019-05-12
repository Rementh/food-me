import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from '../firebase';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    paper: {
        padding: 20,
        margin: 20
    }
});

const Recipe = ({ match, classes }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        firebase.getRecipe(match.params.id).then(data => setRecipe(data));
    }, []);

    return recipe ? (
        <Paper className={classes.paper}>
            <h2>{recipe.title}</h2>
            <br></br>
            <h3>Ingredients</h3>
            {recipe.ingredients.map((group, index) =>
                <div key={index}>
                    <h4>Group {index + 1}</h4>
                    <ul>
                        {Object.entries(group).map(([key, value], index) =>
                            <li key={index}>{key}: {value}</li>
                        )}
                    </ul>
                </div>
            )}
            <br></br>
            <h3>Instructions</h3>
            {recipe.instructions.map((step, index) =>
                <p key={index}>
                    {index + 1}. {step}
                </p>)}
        </Paper>
    ) : match.params.id;
};

Recipe.propTypes = {
    classes: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
};

export default withStyles(styles)(Recipe);
