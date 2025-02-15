import { collection, addDoc , Timestamp , getDocs, query, where ,orderBy  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";
import {  onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";


    const title = document.querySelector("#title")
    const description = document.querySelector("#description")
    const form = document.querySelector("#form")
    const image = document.querySelector("#image")
    let blogImg =''
    let time = Timestamp.fromDate(new Date())
    let getBlog = []
    const displayBlog = document.querySelector("#display-container")

    
    let inputFile = cloudinary.createUploadWidget({
        cloudName: 'dt0eqxlvz',
        uploadPreset: 'blogImg'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            blogImg = result.info.secure_url
        }
    }
    )

    image.addEventListener("click" , (event)=>{

        event.preventDefault();
        inputFile.open();
    },false)

    form.addEventListener('submit' , async(event)=> {

        event.preventDefault();
        console.log(title.value);
        
        try {
            const docRef = await addDoc(collection(db, "user's-blog"), {
              title:title.value,
              description:description.value,
              image:blogImg,
              date:time,
              uid:auth.currentUser.uid
            });

            getBlog.push({id: docRef.id, title: title.value, image: blogImg  ,description:description.value , date:time });
            console.log("Document written with ID: ", docRef.id);

            renderBlog()
    
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          
          title.value = ''
          description.value = ''
          

    })


    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const uid = user.uid;
        console.log(uid);
        getDataFromFirestore();
        
      } else {
       
        window.location = 'login.html'

      }
    });
    


    async function getDataFromFirestore(){


      const q = query(collection(db, "user's-blog") , where("uid", "==", auth.currentUser.uid),orderBy("date" , "desc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((item) => {

      getBlog.push({ id:item.id, ...item.data() })

      });


      renderBlog();
      console.log(getBlog);
      
     
  }









    function renderBlog(){

        displayBlog.innerHTML = ''
  
  
          getBlog.map((item)=>{
  
              const convertedTime = item.date.toDate();
  
  
              const date = convertedTime.toLocaleString();
  
  
              displayBlog.innerHTML +=`<div class="blog-entry bg-white shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-teal-600">
                  <div class="p-6 flex flex-col lg:flex-row">
                    <!-- Blog Content Section with image on left -->
                    <div class="blog-content flex-1 mb-4 lg:mb-0 lg:flex lg:flex-row">
                      <!-- Image on the left with hover effect -->
                      <div class="w-full lg:w-1/3 mb-4 lg:mb-0">
                      <img src=${item.image} alt="Blog Image" class="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                      </div>
                      
                      <!-- Blog text content on the right of the image -->
                      <div class="lg:w-2/3 lg:pl-6">
                        <h3 class="blog-heading text-3xl font-bold text-gray-800 mb-4">${item.title}</h3>
                        <p class="blog-description text-lg text-gray-600 mb-4">${item.description}</p>
                      </div>
                    </div>
                    
                    <!-- Time Section (Right Aligned at bottom) -->
                    <div class="flex justify-between items-center mt-auto gap-6">
                      <!-- Uploaded Time -->
                      <p class="uploaded-time text-sm text-gray-500">Uploaded Time: ${date}</p>
                      
                      <!-- Edit and Delete Buttons -->
                      <div class="flex gap-4">
                        <!-- Edit Button -->
                        <button class="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-500 transition duration-300">Edit</button>
                        
                        <!-- Delete Button -->
                        <button class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition duration-300">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>`
  
  
  
          })
      }