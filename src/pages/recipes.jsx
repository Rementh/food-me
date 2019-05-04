import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Mock from '../components/mock';

const styles = {
    container: {
        display: 'block'
    },
    title: {
        marginTop: 0
    }
};

const Recipes = () => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        firebase.getRecipes().then(data => setRecipes(data));
    });

    return (
        <div styles={styles.container}>
            <h2 style={styles.title}>Recipes</h2>
            {recipes
                ? recipes.map((recipe, index) =>
                    <React.Fragment key={index}>
                        <h4>{recipe.title}</h4>
                        {recipe.instructions.map((step, index) => <p key={index}>{index + 1}. {step}</p>)}
                    </React.Fragment>
                )
                : renderMockRecipes(10)}
        </div>
    );
};

const renderMockRecipes = (count) => Array(count).fill(null).map((x, index) => <Mock key={index}></Mock>);

export default Recipes;
