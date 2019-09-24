import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Mock from '../components/mock';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        padding: 6,
        borderRadius: '4px',
        background: '#fff',
        margin: 5,
        lineHeight: 'unset',
        textTransform: 'unset',
        border: '1px solid #dedede',
        fontWeight: 400,
    },
});

const RecipeLink = ({ id, name }) => {
    const styles = useStyles();

    return (
        <Button className={styles.root} component={Link} to={`/recipes/${id}`}>
            <div style={{ width: 56, height: 56, background: 'rgba(255, 128, 0, 0.2)', borderRadius: 56, marginRight: 6 }} />
            <div style={{ flex: 1 }}>
                <div>
                    {name}
                </div>
                <div style={{ flex: 1, height: 1, background: '#ddd', margin: '6px 0' }} />
                <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: 4, width: 8, height: 8, background: 'rgba(76, 175, 80, 0.2)', borderRadius: 2 }}></div>
                    <div style={{ marginRight: 4, width: 8, height: 8, background: 'rgba(76, 175, 80, 0.2)', borderRadius: 2 }}></div>
                    <div style={{ marginRight: 4, width: 8, height: 8, background: 'rgba(76, 175, 80, 0.2)', borderRadius: 2 }}></div>
                </div>
            </div>
        </Button>
    );
};

RecipeLink.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

const renderMockRecipes = count => Array(count)
    .fill(null)
    .map((x, index) => <Mock key={index} />);

const renderRecipes = recipes => recipes.map(value =>
    <RecipeLink key={value.id} id={value.id} name={value.data.name} />
);

const pickUnitLabelForValue = (label, value) => {
    /* Is standard unit (g, ml, ...) */
    if (typeof label === 'string') {
        return label;
    }

    /* Is floating point */
    if (value % 1 !== 0) {
        return label.three;
    }

    /* Is 1 */
    if (value === 1) {
        return label.one;
    }

    /* Ends with 12, 13, or 14 */
    if ((value - 12) % 100 === 0 || (value - 13) % 100 === 0 || (value - 14) % 100 === 0) {
        return label.five;
    }

    /* Ends with 2, 3, or 4 */
    if ((value - 2) % 10 === 0 || (value - 3) % 10 === 0 || (value - 4) % 10 === 0) {
        return label.three;
    }

    /* Is anything else */
    return label.five;
};

const doit = () => {
    const qts = [
        1, 2, 3, 4, 5, 5.1,
        11, 12, 13, 14, 15, 15.2,
        21, 22, 23, 24, 25, 25.3,
        101, 102, 103, 104, 105, 105.4,
        111, 112, 113, 114, 115, 115.5,
        121, 122, 123, 124, 125, 125.6,
    ];

    console.clear();
    qts.forEach(x => {
        const spoon = { one: 'łyżka', three: 'łyżki', five: 'łyżek' };
        const g = 'g';
        console.log(x, pickUnitLabelForValue(spoon, x));
    });
};

const Recipes = () => {
    const [recipes, setRecipes] = useState(null);


    useEffect(() => {
        doit();
        firebase.getRecipes().then(data => setRecipes(data));
    }, []);

    return recipes === null ? renderMockRecipes(10) : renderRecipes(recipes);
};

export default Recipes;
