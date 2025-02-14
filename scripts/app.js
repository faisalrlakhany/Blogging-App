
import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


    const loginBtn = document.querySelector('#login-btn')
    const userName = document.querySelector('#user-name')
    const userImg = document.querySelector('#user-img')
    const userInfo = document.querySelector('#user-info')
    const signout = document.querySelector('#sign-out')
    const allBlogData = []
    const displayBlog = document.querySelector('#display-container')

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

            getBlogFromFirestore()
    
        } else {
            window.location = "login.html"
        }
    });


    async function getDataFromFirestore() {
        let user = null
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            user = doc.data()
 
        });
    
        return user
    }
    
    signout.addEventListener('click' , () => {
        signOut(auth).then(() => {
            window.location = 'login.html';
            
          }).catch((error) => {
            console.log(error);
            
          });
          
      })
    
      async function getBlogFromFirestore() {

         const q = query(collection(db, "blog-user"))
        
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((item) => {
        
                allBlogData.push({ id:item.id, ...item.data() })
        
                });

                renderBlog();
        
      }



      function renderBlog()
      {

        allBlogData.map((item)=>{

            displayBlog.innerHTML += `<div class="inner-div">
      <h1> ${item.title}</h1>
      <img src=${item.image} alt="Placeholder Image">
    </div> `




        })



      }