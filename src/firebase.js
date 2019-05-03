import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyAlcLI7fLatHN_VUoBccI68FHjOLSm5vO0',
    authDomain: 'https://food-me-app.firebasapp.com/',
    databaseURL: 'https://food-me-app.firebaseio.com/'
};

const makeFirebaseInstance = () => {
    app.initializeApp(config);

    const auth = app.auth();
    //const db = app.database();

    return {
        login: (email, password) => auth.signInWithEmailAndPassword(email, password),
        logout: () => auth.signOut(),
        register: async (name, email, password) => {
            await auth.createUserWithEmailAndPassword(email, password);
            return auth.currentUser.updateProfile({ displayName: name });
        },
        getCurrentUsername: () => auth.currentUser && auth.currentUser.displayName,
        isInitialized: () => new Promise(resolve => auth.onAuthStateChanged(resolve))
    };
};

const firebase = makeFirebaseInstance();

export default firebase;
