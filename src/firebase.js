import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyAlcLI7fLatHN_VUoBccI68FHjOLSm5vO0',
    authDomain: 'https://food-me-app.firebasapp.com/',
    databaseURL: 'https://food-me-app.firebaseio.com/'
};

firebase.initializeApp(config);

export default firebase;
