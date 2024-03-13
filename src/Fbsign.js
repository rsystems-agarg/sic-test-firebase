// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCxMC3NnmPWNhPmRbyhujdccxF7HPAlwWs",
  authDomain: "agent-ic-dev.firebaseapp.com",
  databaseURL: "https://agent-ic-dev-default-rtdb.firebaseio.com",
  projectId: "agent-ic-dev",
  storageBucket: "agent-ic-dev.appspot.com",
  messagingSenderId: "868615200795",
  appId: "1:868615200795:web:99e120dc1a028bfa4c58be",
  measurementId: "G-RZ4L4K0B7Z"
  // ...
};
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (authResult) =>{ 
      
      authResult.user.sendEmailVerification();
      return false;
    
    
    },
  },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </div>
  );
}

export default SignInScreen;