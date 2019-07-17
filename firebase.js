import firebase from '@firebase/app';

const config = {
    apiKey: 'AIzaSyA3x65haGj9_a0LN-ujthRuxTSYxRtYnzE',
    authDomain: 'scitech-a8f1c.firebaseapp.com',
    databaseURL: 'https://scitech-a8f1c.firebaseio.com',
    projectId: 'scitech-a8f1c',
    storageBucket: 'scitech-a8f1c.appspot.com',
    messagingSenderId: '1088829867500',
}
const Firebase = firebase.initializeApp(config);
export default Firebase;
