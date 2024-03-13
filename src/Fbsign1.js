import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';

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

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    //signInSuccessUrl: '/Authincated',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    //tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    // privacyPolicyUrl: function() {
    //   window.location.assign('<your-privacy-policy-url>');
    // },
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
      },
  };
  firebase.initializeApp(config);

  function SignInScreen1()
  {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    useEffect(() =>{
        // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    },[]);
    // return(
    //     <>
    //     <h1>Welcome to My Awesome App</h1>
    
    //     </>
    // );
   
    
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
          <div id="firebaseui-auth-container"></div>
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

  export default SignInScreen1;