
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


    const loginBtn = document.querySelector('#login-btn')
    const userName = document.querySelector('#user-name')
    const userImg = document.querySelector('#user-img')
    const userInfo = document.querySelector('#user-info')



    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid);
            let users = await getDataFromFirestore()
            console.log(users);
            loginBtn.classList.add('del')
            userInfo.classList.remove('del')
    
            userName.innerHTML = users.fullName
            userImg.src = users.profileImage
    
        } else {
            window.location = "login.html"
        }
    });


    async function getDataFromFirestore() {
        let user = null
        const q = query(collection(db, "blogs-User"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            user = doc.data()
        });
    
        return user
    }
    

    