import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyAlcLI7fLatHN_VUoBccI68FHjOLSm5vO0',
    authDomain: 'https://food-me-app.firebasapp.com/',
    databaseURL: 'https://food-me-app.firebaseio.com/'
};

const makeFirebaseInstance = () => {
    app.initializeApp(config);

    const auth = app.auth();

    const restFunctions = {
        firebaseGet: query => auth.currentUser.getIdToken().then(idToken =>
            fetch(`${config.databaseURL}${query}.json?auth=${idToken}`)
                .then(res => res.json()))
    };

    const authFunctions = {
        login: (email, password) => auth.signInWithEmailAndPassword(email, password),
        logout: () => auth.signOut(),
        register: (name, email, password) => auth.createUserWithEmailAndPassword(email, password).then(() =>
            auth.currentUser.updateProfile({ displayName: name })),
        getCurrentUsername: () => auth.currentUser && auth.currentUser.displayName,
        isInitialized: () => new Promise(resolve => auth.onAuthStateChanged(resolve))
    };

    const recipesFunctions = {
        getRecipes: () => restFunctions.firebaseGet('recipes')
    };

    return {
        ...authFunctions,
        ...recipesFunctions
    };
};

const firebase = makeFirebaseInstance();

export default firebase;
