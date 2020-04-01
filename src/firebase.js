import * as firebase from 'firebase';
//import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDNQ-k_6i0mSOKe7KuM943fF3VLwDOQe-s",
    authDomain: "diaryinvue.firebaseapp.com",
    databaseURL: "https://diaryinvue.firebaseio.com",
    projectId: "diaryinvue",
    storageBucket: "diaryinvue.appspot.com",
    messagingSenderId: "311235602572",
    appId: "1:311235602572:web:3fddecc525cdbe7b83b3a9"
  };


firebase.initializeApp(firebaseConfig);

export default firebase;