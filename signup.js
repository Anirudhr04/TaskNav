// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCHxGnXtuZX1vdflfmfXh2yFqdqcsJsGc8",
  authDomain: "signupform-7ed80.firebaseapp.com",
  projectId: "signupform-7ed80",
  storageBucket: "signupform-7ed80.appspot.com",
  messagingSenderId: "438196109597",
  appId: "1:438196109597:web:549cf7f71300053a6b61f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);


// const sendOtpBtn = document.getElementById('send-otp-btn');
//     const otpSection = document.getElementById('otp-section');

//     sendOtpBtn.addEventListener('click', function() {
//       // Hide the 'Send OTP' button after clicking and show the OTP section
//       sendOtpBtn.style.display = 'none';
//       otpSection.style.display = 'block';
//     });


const phonenumber=document.getElementById('phonenumber').value;

const submit=document.getElementById('submit');
      
submit.addEventListener("click",function(event){
    event.preventDefault()
    const email=document.getElementById('emailid').value;
    const password=document.getElementById('password').value; 
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert("Account has been created")
        window.location.href="login.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
  });
})
