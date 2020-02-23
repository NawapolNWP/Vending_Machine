import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
if(!firebase.apps.length){
    const firebaseConfig = {
        apiKey: "AIzaSyAqELxz8D-EgCVU8oUaMylpDadYp9kl-2s",
    authDomain: "vending-machine-nwp.firebaseapp.com",
    databaseURL: "https://vending-machine-nwp.firebaseio.com",
    projectId: "vending-machine-nwp",
    storageBucket: "vending-machine-nwp.appspot.com",
    messagingSenderId: "523443338457",
    appId: "1:523443338457:web:f71fcdadbcd2277d3b12c8",
    measurementId: "G-LCWX4SYGDS"
    }
    firebase.initializeApp(firebaseConfig)
}

// export const db = firebase.firestore()
// export const storageRef = firebase.storage().ref();
// export const imagesRef = storageRef.child('images/');