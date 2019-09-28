import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

const config = {
    apiKey : 'AIzaSyDuXUQuwKexaAk9ZfBAhUH-OsGW4KBdNVM',
    authDomain:'chat-room-ee9e6.firebaseapp.com',
    databaseURL :'https://chat-room-ee9e6.firebaseio.com',
    projectId:'chat-room-ee9e6',
    storageBucket:'chat-room-ee9e6.appspot.com',
    messagingSenderId:'540825649704'
};

firebase.initializeApp(config);

export default firebase;