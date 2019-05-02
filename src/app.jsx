import React, { Component } from 'react';
import firebase from './firebase';

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
        <React.Fragment>
            {this.state.data &&
                this.state.data.map((recipe, index) =>
                    <p key={index}>{recipe.title}</p>
                )}
        </React.Fragment>;
}

export default App;
