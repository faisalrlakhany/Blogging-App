
import { collection, addDoc , Timestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";
import {  getDocs, query, where ,orderBy} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";




    const title = document.querySelector('#title')
    const file = document.querySelector('#file')
    const form = document.querySelector('#form')
    let blogImg = ''
    const displayBlog = document.querySelector('#display-container')
    let allBlog = []
    let time = Timestamp.fromDate(new Date())
    // cloudnary config

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

    // open file in cloudnary
    document.querySelector('#input-field').addEventListener('click' , function (event){

        event.preventDefault();
        inputFile.open()
        
    },false)

    


    // send data to firestore
    form.addEventListener('submit' , async(event)=> {

        event.preventDefault();
        console.log(title.value);
        
        try {
            const docRef = await addDoc(collection(db, "blog-user"), {
              title:title.value,
              image:blogImg,
              date:time ,
              uid:auth.currentUser.uid
            });

            allBlog.push({id: docRef.id, title: title.value, image: blogImg , time: time });
            console.log("Document written with ID: ", docRef.id);

            renderBlog();



          } catch (e) {
            console.error("Error adding document: ", e);
          }
          
    })


   async function getDataFromFirestore(){


        const q = query(collection(db, "blog-user"), orderBy("date" , "desc"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((item) => {

        // console.log(`${item.id} => ${item.data()}`);
        allBlog.push({ id:item.id, ...item.data() })

        });


        renderBlog();
        console.log(allBlog);
        
       
    }

    getDataFromFirestore()





    function renderBlog(){

      displayBlog.innerHtml += ''

        allBlog.map((item)=>{

            // const convertedTime = item.time.toDate();


            // const date = convertedTime.toLocaleString();


            displayBlog.innerHTML +=`<div class="blog-entry">
            <h3>Your Blog</h3>
            <p class="blog-description">${item.title}</p>
            <div class="blog-content">
              <img src=${item.image} alt="Sample Image" class="blog-image">
              {/* <p class="uploaded-time">Uploaded Time: ${date}</p>  */}
            </div>
          </div>`



        })
    }