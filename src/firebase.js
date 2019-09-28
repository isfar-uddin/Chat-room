import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

const config = {
    apiKey : 'AIzaSyDj4UvFniA1xCMhw-1JheDWWEhnfvT_DFk',
    authDomain:'chat-room-6240a.firebaseapp.com',
    databaseURL :'https://chat-room-6240a.firebaseio.com',
    projectId:'chat-room-6240a',
    storageBucket:'chat-room-6240a.appspot.com',
    messagingSenderId:'244262667223'
};

firebase.initializeApp(config);

export default firebase;