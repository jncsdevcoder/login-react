import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';


import Header from './components/layout/Header';
import User from './components/User';
import Routes from './Routes';

import firebase from 'firebase/app';
import 'firebase/database';
import  'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCYS50O2uYBI9rcXVfFh-fvFZ3ox0kcz1A",
  authDomain: "web-app-8c90e.firebaseapp.com",
  databaseURL: "https://web-app-8c90e.firebaseio.com",
  projectId: "web-app-8c90e",
  storageBucket: "web-app-8c90e.appspot.com",
  messagingSenderId: "121393984606",
  appId: "1:121393984606:web:bb90d322fe84241e8130cf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState(null);

  const onLogout = () => {
    setUser(null);
  };
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(response => {
      if (response) {
        // leer datos
        firebase.database().ref(`/users/${response.user.uid}`)
        .once('value')
        .then(snapshot => {
          setUser(snapshot.val());
        });
      }
    });
  }, []);


  return (
          <Router>
            <CssBaseline/>
            <Header>
              {user && <User user={user} onLogout={onLogout} />}
            </Header>
            <Routes/>
          </Router>

  );
};

export default App;
