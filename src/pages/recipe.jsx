import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from '../firebase';
import { Paper, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = () => ({
    paper: {
        display: 'flex',
        fontSize: '0.875rem',
        flexDirection: 'column',
        padding: '20px 20px 0',
        '& *': {
            margin: 0
        },
        '& > *': {
            marginBottom: 16
        },
    },
    bar: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #d5d5d5',
        paddingBottom: 16,
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
    }
});

const Title = ({ className, children }) => <p className={className}>{children}</p>;

Title.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

const Ingredients = ({ className, ingredients, name = 'Ingredients' }) => {
    return (
        <div className={className}>
            <h4 style={{ marginBottom: 10, marginTop: 10 }}>{name}</h4>
            <ul>
                {Object.entries(ingredients).map(([key, value], index) => typeof (value) === 'object'
                    ? <Ingredients name={key} ingredients={value} />
                    : <li key={index}>{key}: {value}</li>
                )}
            </ul>
        </div>
    );
};

Ingredients.propTypes = {
    className: PropTypes.string,
    ingredients: PropTypes.object.isRequired,
    name: PropTypes.string,
};

const Instructions = ({ className, instructions }) => {
    return (
        <div className={className}>
            <h4 style={{ marginBottom: 10 }}>Instructions</h4>
            {instructions.map((step, index) =>
                <p key={index}>
                    {index + 1}. {step}
                </p>
            )}
        </div>
    );
};

Instructions.propTypes = {
    className: PropTypes.string,
    instructions: PropTypes.array.isRequired
};

const Recipe = ({ history, match, classes }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        firebase.getRecipe(match.params.id).then(data => setRecipe(data));
    }, []);

    return recipe ? (
        <Paper className={classes.paper}>
            <div className={classes.bar} >
                <Button onClick={() => history.push('/')}>
                    <ArrowBackIosIcon />
                </Button>
                <Title>{recipe.title}</Title>
            </div>
            <div className={classes.info}>
                <div>{recipe.difficulity}</div>
                <div>{recipe.time}</div>
            </div>
            <Ingredients ingredients={recipe.ingredients} />
            <Instructions instructions={recipe.instructions} />
        </Paper>
    ) : <></>;
};

Recipe.propTypes = {
    classes: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
    history: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Recipe));
