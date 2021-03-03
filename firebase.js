var firebase = require('firebase');
require('firebase/firestore');

let config = {
  apiKey: "AIzaSyDOzLECNbjsCQWakIM3TBWxYg2EnQn8qfk",
  authDomain: "bezkoder-firebase-dc079.firebaseapp.com",
  databaseURL: "https://console.firebase.google.com/project/bezkoder-firebase-dc079/firestore/data~2F",
  projectId: "bezkoder-firebase-dc079",
  storageBucket: "bezkoder-firebase-dc079.appspot.com",
  messagingSenderId: "915635916962",
  appId: "1:915635916962:web:f0b574674059b44e9a87fb",
};

firebase.initializeApp(config);

module.exports = firebase.firestore();