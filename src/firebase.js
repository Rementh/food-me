import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as config from '../firebase-config';

const makeFirebaseInstance = () => {
    app.initializeApp(config);

    const auth = app.auth();
    const firestore = app.firestore();

    const restFunctions = {
        get: (query, refresh = false) => auth.currentUser.getIdToken(refresh).then(idToken =>
            fetch(`${config.databaseURL}${query}.json?auth=${idToken}`)
                .then(res => res.json())),
        put: (query, data) => auth.currentUser.getIdToken().then(idToken =>
            fetch(`${config.databaseURL}${query}.json?auth=${idToken}`, {
                method: 'put',
                body: JSON.stringify(data)
            }).then(res => res.json()))
    };

    const { get, put } = restFunctions;

    const authFunctions = {
        login: (email, password) => auth.signInWithEmailAndPassword(email, password),
        logout: () => auth.signOut(),
        register: (name, email, password) => auth.createUserWithEmailAndPassword(email, password).then(() =>
            auth.currentUser.updateProfile({ displayName: name })),
        getCurrentUsername: () => auth.currentUser && auth.currentUser.displayName,
        isInitialized: () => new Promise(resolve => auth.onAuthStateChanged(resolve))
    };

    const deprecatedRecipesFunctions = {
        getRecipes: () => get('recipes'),
        getRecipe: id => get('recipes').then(data => data[id]),
        addRecipe: recipe => put(`recipes/${recipe.id}`, recipe.body).then(() => get('recipes', true).then(() => recipe.id))
    };

    const recipesFunctions = {
        getRecipes: () => firestore.collection('recipes').get().then(snap => snap.docs.map(doc => ({ id: doc.id, data: doc.data() }))),
        getRecipe: id => firestore.collection('recipes').doc(id).get().then(snap => ({ id: snap.id, data: snap.data() })),
        addRecipe: recipe => put(`recipes/${recipe.id}`, recipe.body).then(() => get('recipes', true).then(() => recipe.id))
    };

    return {
        ...authFunctions,
        ...recipesFunctions
    };
};

const firebase = makeFirebaseInstance();

export default firebase;
