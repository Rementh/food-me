import app from 'firebase/app';
import 'firebase/auth';
import * as config from '../firebase-config';

const makeFirebaseInstance = () => {
    app.initializeApp(config);

    const auth = app.auth();

    const restFunctions = {
        get: query => auth.currentUser.getIdToken().then(idToken =>
            fetch(`${config.databaseURL}${query}.json?auth=${idToken}`)
                .then(res => res.json()))
    };

    const { get } = restFunctions;

    const authFunctions = {
        login: (email, password) => auth.signInWithEmailAndPassword(email, password),
        logout: () => auth.signOut(),
        register: (name, email, password) => auth.createUserWithEmailAndPassword(email, password).then(() =>
            auth.currentUser.updateProfile({ displayName: name })),
        getCurrentUsername: () => auth.currentUser && auth.currentUser.displayName,
        isInitialized: () => new Promise(resolve => auth.onAuthStateChanged(resolve))
    };

    const recipesFunctions = {
        getRecipes: () => get('recipes'),
        getRecipe: id => get('recipes').then(data => data[id])
    };

    return {
        ...authFunctions,
        ...recipesFunctions
    };
};

const firebase = makeFirebaseInstance();

export default firebase;
