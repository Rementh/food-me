import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import classnames from 'classnames';
import guid from '../utils/guid';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';

const styles = theme => {
    const doubleUnit = theme.spacing.unit * 2;

    return ({
        container: {
            display: 'flex',
            flexDirection: 'column',
        },
        paper: {
            padding: doubleUnit,
            margin: doubleUnit
        },
        formControl: {
            marginTop: doubleUnit
        },
        text: {
            margin: 0
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        horizontalMargin: {
            marginLeft: doubleUnit,
            marginRight: doubleUnit
        }
    });
};

const Instruction = withStyles(styles)(({ classes, onRemove, index, value, onChange }) => (
    <div className={classnames(classes.header, classes.formControl)}>
        <TextField label={`Step ${index + 1}`} margin="dense" value={value} onChange={e => onChange(index, e.target.value)} />
        <Button variant="contained" type="button" onClick={() => onRemove(index)}>-</Button>
    </div>
));

const Group = withStyles(styles)(({ classes, onRemove, index, ingredients, onIngredientAdd, onIngredientRemove, onNameChange, onValueChange }) => (
    <>
        <div className={classnames(classes.header, classes.formControl)}>
            <p className={classes.text}>Group {index + 1}</p>
            <div>
                <Button className={classes.horizontalMargin} variant="contained" type="button" onClick={() => onRemove(index)}>-</Button>
                <Button color="primary" variant="contained" type="button" onClick={() => onIngredientAdd(index)}>+</Button>
            </div>
        </div>
        {ingredients.map((item, i) =>
            <div className={classnames(classes.header, classes.formControl)} key={item.id}>
                <TextField label="Name" margin="dense" value={item.name} onChange={e => onNameChange(index, i, e.target.value)} />
                <TextField label="Quantity" margin="dense" value={item.value} onChange={e => onValueChange(index, i, e.target.value)} className={classes.horizontalMargin} />
                <Button variant="contained" type="button" onClick={() => onIngredientRemove(index, i)}>-</Button>
            </div>
        )}
    </>
));

const NewRecipe = ({ classes, history }) => {
    const [title, setTitle] = useState('');
    const [ingredientGroups, setIngredientGroups] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);

        const recipe = {
            id: title.toLowerCase().replace(/\s/g, ''),
            body: {
                title: title,
                instructions: instructions.map(step => step.value),
                ingredients: ingredientGroups.map(group => group.ingredients.reduce((map, ingredient) => {
                    map[ingredient.name] = ingredient.value;
                    return map;
                }, {}))
            }
        };

        firebase.addRecipe(recipe).then(id => history.push(`/recipes/${id}`));
    };

    //////////////////////////////////////////// Instructions

    const addInstruction = () => {
        setInstructions([...instructions, {
            id: guid(),
            value: ''
        }]);
    };

    const removeInstruction = e => {
        const newInstructions = [...instructions];
        newInstructions.splice(e, 1);
        setInstructions(newInstructions);
    };

    const changeInstruction = (i, value) => {
        const newInstructions = [...instructions];
        newInstructions[i].value = value;
        setInstructions(newInstructions);
    };

    //////////////////////////////////////////// Ingredients

    const addGroup = () => {
        setIngredientGroups([...ingredientGroups, {
            id: guid(),
            ingredients: [{
                id: guid(),
                name: '',
                value: ''
            }]
        }]);
    };

    const removeGroup = e => {
        const newGroups = [...ingredientGroups];
        newGroups.splice(e, 1);
        setIngredientGroups(newGroups);
    };

    const addIngredient = group => {
        const newGroups = [...ingredientGroups];
        newGroups[group].ingredients = [...newGroups[group].ingredients, {
            id: guid(),
            name: '',
            value: ''
        }];
        setIngredientGroups(newGroups);
    };

    const removeIngredient = (group, ingredient) => {
        const newGroups = [...ingredientGroups];
        newGroups[group].ingredients.splice(ingredient, 1);
        setIngredientGroups(newGroups);
    };

    const changeIngredientName = (group, ingredient, name) => {
        const newGroups = [...ingredientGroups];
        newGroups[group].ingredients[ingredient].name = name;
        setIngredientGroups(newGroups);
    };

    const changeIngredientValue = (group, ingredient, value) => {
        const newGroups = [...ingredientGroups];
        newGroups[group].ingredients[ingredient].value = value;
        setIngredientGroups(newGroups);
    };

    return (
        <Paper className={classes.paper}>
            <form className={classes.container} onSubmit={handleSubmit}>
                <h2 className={classes.text}>New recipe</h2>
                <TextField
                    label="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    margin="dense" />

                {/* Ingredients */}
                <div className={classnames(classes.header, classes.formControl)}>
                    <h4 className={classes.text}>Ingredients</h4>
                    <Button variant="contained" color="secondary" type="button" onClick={addGroup}>+</Button>
                </div>
                {ingredientGroups.map((item, i) =>
                    <Group key={item.id} index={i} ingredients={item.ingredients} onRemove={removeGroup}
                        onIngredientAdd={addIngredient} onIngredientRemove={removeIngredient}
                        onNameChange={changeIngredientName} onValueChange={changeIngredientValue} />
                )}

                {/* Instructions */}
                <div className={classnames(classes.header, classes.formControl)}>
                    <h4 className={classes.text}>Instructions</h4>
                    <Button variant="contained" color="secondary" type="button" onClick={addInstruction}>+</Button>
                </div>
                {instructions.map((item, i) =>
                    <Instruction key={item.id} index={i} value={item.value} onChange={changeInstruction} onRemove={removeInstruction} />
                )}

                <Button disabled={isSubmitting} className={classes.formControl} variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </Paper>
    );
};

NewRecipe.propTypes = {
    classes: PropTypes.object,
    history: PropTypes.object
};

export default withRouter(withStyles(styles)(NewRecipe));
