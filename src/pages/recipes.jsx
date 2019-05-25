import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Mock from '../components/mock';
import { Link as RouterLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';

const styles = () => ({
    title: {
        margin: 0
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});

const renderMockRecipes = count => Array(count)
    .fill(null)
    .map((x, index) => <Mock key={index} />);

const ListItemLink = props =>
    <ListItem button component={RouterLink} {...props} />;

const NavButton = props =>
    <Button variant="contained" color="secondary" component={RouterLink} {...props} />;

const Recipes = ({ classes }) => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        firebase.getRecipes().then(data => setRecipes(data));
    }, []);

    return (
        <div>
            <div className={classes.header}>
                <h2 className={classes.title}>Recipes</h2>
                <NavButton to="/newrecipe">+</NavButton>
            </div>
            {recipes === null ? renderMockRecipes(10) :
                <List dense component="nav">
                    {Object.entries(recipes).map(([key, value]) =>
                        <ListItemLink to={`/recipes/${key}`} key={key}>
                            <ListItemText primary={value.title} />
                        </ListItemLink>)}
                </List>}
        </div>
    );
};

Recipes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Recipes);
