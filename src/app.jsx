import React, { Component } from 'react';
import firebase from './firebase';
import Mock from './components/mock';

const styles = {
    container: {
        margin: '0 20px'
    }
};

class App extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        const user = {
            email: 'test@test.com',
            password: 'testtest'
        };

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(this.loadData)
            .catch(console.log);
    }

    loadData = () => {
        firebase.database().ref('recipes').once('value').then(snap =>
            this.setState({ data: snap.val() })
        );
    }

    render = () =>
        <div style={styles.container}>
            <h2>Recipes</h2>
            {this.state.data
                ? this.state.data.map((recipe, index) => <p key={index}>{recipe.title}</p>)
                : renderMockRecipes(10)}
        </div>;
}

const renderMockRecipes = (count) => Array(count).fill(null).map((x, index) => <Mock key={index}></Mock>);

export default App;
