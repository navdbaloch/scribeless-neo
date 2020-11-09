import firebase from 'firebase/app';
// import firebaseui from 'firebaseui';

const firebaseConfig = {
  apiKey: 'AIzaSyDH6XM7m4bVsWE8pqzSc-rvfC6-5DsmxjM',
  authDomain: 'neo-app-493f0.firebaseapp.com',
  databaseURL: 'https://neo-app-493f0.firebaseio.com',
  projectId: 'neo-app-493f0',
  storageBucket: 'neo-app-493f0.appspot.com',
  messagingSenderId: '411326663604',
  appId: '1:411326663604:web:b2afb152174cf8f72940e1',
  measurementId: 'G-C239KGL6KC',
};

const app = firebase.initializeApp(firebaseConfig);
// const ui = new firebaseui.auth.AuthUI(firebase.auth());
export default app;
