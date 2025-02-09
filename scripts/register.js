
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";


   const username = document.querySelector('#reg-name');
    const email = document.querySelector('#reg-email');
    const password = document.querySelector('#reg-pass');
    const btn = document.querySelector('#form');

    let userProfilePicUrl = ""

    let inputFile = cloudinary.createUploadWidget({
        cloudName: 'dt0eqxlvz',
        uploadPreset: 'blogImg'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            userProfilePicUrl = result.info.secure_url
        }
    }
    )


    document.querySelector('#input-file').addEventListener("click", function (event) {
        event.preventDefault();
        inputFile.open();
    }, false);












    btn.addEventListener('submit' , function(event){


        event.preventDefault();
        createUserWithEmailAndPassword(auth, email.value, password.value )
        .then( async(userCredential) => {
        // Signed up 
           const user = userCredential.user;
           console.log(user);
        //    window.location = 'login.html';

        try {
            const docRef = await addDoc(collection(db, "blogs-User"), {
                fullName: username.value,
                email: email.value,
                profileImage: userProfilePicUrl,
                uid: user.uid
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
            
           email.value='';
           password.value='';
           username.value='';
     })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           console.log(errorMessage);
           alert("Already Registered");
    // ..
  });

    
    })


    
