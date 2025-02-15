
    import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
    import { auth, db } from "./firebaseconfig.js";
    import { collection, getDocs, query , where } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


const logout = document.querySelector("#log-out")
const log = document.querySelector("#log-out-desktop")
const loginBtn = document.querySelector("#login-btn")
const userInfo = document.querySelector("#user-info")
const hamburgerBtn = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobile-menu')
const userName = document.querySelector("#user-name")
const userImage = document.querySelector("#user-image")
const mobileLogin = document.querySelector("#mobile-login")
const allBlogData = []
const displayBlog = document.querySelector("#display-container")
const username1 = document.querySelector("#user-name1")
const userimage1 = document.querySelector("#user-image1")


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        let registered = await getDataFromFirestore()
        console.log(registered);
        loginBtn.classList.remove('md:block')
        userInfo.classList.add('md:flex')
        mobileLogin.classList.add('hidden')

        userName.innerHTML = registered.fullName
        username1.innerHTML = registered.fullName
        userImage.src = registered.profileImage
        userimage1.src = registered.profileImage

        getBlogFromFirestore();

    } else {
        window.location = "login.html"
    }
});



hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});



async function getDataFromFirestore() {
    let user = null
    const q = query(collection(db, "registered"),where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        user = doc.data()

    });

    return user
}


log.addEventListener('click' , (event)=>{


    console.log("working");

    signOut(auth).then(() => {
        console.log("logged out");
        window.location = 'login.html'
      }).catch((error) => {
        console.log(error);
      });
})

logout.addEventListener('click' , (event)=>{


    console.log("working");

    signOut(auth).then(() => {
        console.log("logged out");
        window.location = 'login.html'
      }).catch((error) => {
        console.log(error);
      });
})




async function getBlogFromFirestore() {

    const q = query(collection(db, "user's-blog"))
   
           const querySnapshot = await getDocs(q);
           querySnapshot.forEach((item) => {
   
           allBlogData.push({ id:item.id, ...item.data() })
   
           });

           renderBlog();
   
 }



 function renderBlog()
 {

             allBlogData.map((item)=>{

        displayBlog.innerHTML += `<div class="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src=${item.image} alt="Blog Image" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <h2 class="text-teal-600 text-2xl font-semibold mb-4">${item.title}</h2>
                        <p class="text-gray-700 text-base mb-4">${item.description}</p>
                        <button class="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-500 transition duration-300">Read More</button>
                    </div>`




   })



 }




