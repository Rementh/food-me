import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Mock from '../components/mock';
import { Link as RouterLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const renderMockRecipes = count => Array(count)
    .fill(null)
    .map((x, index) => <Mock key={index} />);

const ListItemLink = props =>
    <ListItem button component={RouterLink} {...props} />;

const Recipes = () => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        firebase.getRecipes().then(data => setRecipes(data));
    }, []);

    return (
        <>
            {recipes === null ? renderMockRecipes(10) :
                <List dense>
                    {Object.entries(recipes).map(([key, value]) =>
                        <ListItemLink to={`/recipes/${key}`} key={key}>
                            <ListItemText primary={value.title} />
                        </ListItemLink>
                    )}
                </List>}
        </>
    );
};

export default Recipes;
