
    import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
    import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
    import { auth, db } from "./firebaseconfig.js";





    const form = document.querySelector("#form")
    const username = document.querySelector("#username")
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")
    const file = document.querySelector("#file")




    
    let profilePicture = ""

    let inputFile = cloudinary.createUploadWidget({
        cloudName: 'dt0eqxlvz',
        uploadPreset: 'blogImg'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            profilePicture = result.info.secure_url
        }
    }
    )

    file.addEventListener("click" , (event)=>{

        event.preventDefault();

        inputFile.open()


    },false)







    form.addEventListener("submit" , (event)=>{


        event.preventDefault();

        console.log(username.value);
        console.log(email.value);
        console.log(password.value);
        


        createUserWithEmailAndPassword(auth, email.value, password.value )
        .then( async(userCredential) => {
        // Signed up 
           const user = userCredential.user;
           console.log(user);

        try {
            const docRef = await addDoc(collection(db, "registered"), {
                fullName: username.value,
                email: email.value,
                profileImage: profilePicture,
                uid: user.uid
            });
            console.log("Document written with ID: ", docRef.id);
            alert("Thanks For Registration");
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
            
           email.value='';
           password.value='';
           username.value='';
     })
         .catch((error) => {
           const errorMessage = error.message;
           console.log(errorMessage);
           alert("Already Registered");
    // ..
  });

    
    })















    




