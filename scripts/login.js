import {  signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { auth } from "./firebaseconfig.js";


    const email = document.querySelector('#log-email');
    const password = document.querySelector('#log-pass');
    const btn = document.querySelector('#form');


    btn.addEventListener('submit' , function(event){


        event.preventDefault();
        signInWithEmailAndPassword( auth, email.value, password.value)
        .then((userCredential) => {

        const user = userCredential.user;
        console.log(user);
        window.location = 'index.html';
        
            
  })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Wrong Email or Password");
        
  });
    })

   