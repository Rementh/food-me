import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Mock from '../components/mock';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const renderMockRecipes = count => Array(count)
    .fill(null)
    .map((x, index) => <Mock key={index} />);


const useStyles = makeStyles({
    root: {
        padding: 6,
        borderRadius: '56px 4px 4px 56px',
        background: '#fff',
        margin: 5,
        lineHeight: 'unset',
        textTransform: 'unset',
    },
});

const RecipeLink = ({ id, title }) => {
    const styles = useStyles();

    return (
        <Button className={styles.root} component={Link} to={`/recipes/${id}`}>
            <div style={{ width: 56, height: 56, background: '#333', borderRadius: 56, marginRight: 6 }} />
            <div style={{ flex: 1 }}>
                <div>
                    {title}
                    {/* {'Papryki faszerowane kurczakiem, fasolą, oraz kukurydzą'} */}
                </div>
                <div style={{ flex: 1, height: 1, background: '#ddd', margin: '6px 0' }} />
                <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: 4, width: 8, height: 8, background: '#333' }}></div>
                    <div style={{ marginRight: 4, width: 8, height: 8, background: '#333' }}></div>
                    <div style={{ marginRight: 4, width: 8, height: 8, background: '#333' }}></div>
                </div>
            </div>
        </Button>
    );
};

RecipeLink.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

const renderRecipes = recipes => Object.entries(recipes).map(([key, value]) =>
    <RecipeLink key={key} id={key} title={value.title} />
);

const Recipes = () => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        firebase.getRecipes().then(data => setRecipes(data));
    }, []);

    return recipes === null ? renderMockRecipes(10) : renderRecipes(recipes);
};

export default Recipes;
