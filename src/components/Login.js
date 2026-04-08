import { useRef, useState } from 'react'
import Header from './Header'
import {checkValidData} from '../utils/validate'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {BG_URL, USER_AVATAR} from '../utils/constants';


const Login = () => {
  
  const [isSignInForm,setIsSignInForm] = useState(true);

  const [errorMessage,setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  
  const name = useRef(null);
  
  const email = useRef(null);
  
  const password = useRef(null);
  
  const handleButtonClick = ()=>{
    
    if(!isSignInForm){
      
      const errorMessage = checkValidData(email.current.value,password.current.value,name.current.value);
      
      setErrorMessage(errorMessage);
      
      if(!errorMessage){
        
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
        
          updateProfile(user, {
            displayName: name.current.value, photoURL:USER_AVATAR
          }).then(() => {

            const user = auth.currentUser;

            dispatch(addUser({uid:user.uid,email:user.email,displayName:user.displayName,photoURL:user.photoURL}));
            // navigate("/browse");
            // Profile updated!
            // ...
          }).catch((error) => {

            console.log(error.message);
            
            // An error occurred
            // ...
          });

          

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
          // ..
        });
      }
      
    }
    else{

      setErrorMessage(checkValidData(email.current.value,password.current.value));

      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
          
          dispatch(addUser({uid:user.uid,email:user.email,displayName:user.displayName,photoURL:user.photoURL}));
          // navigate("/browse");
         
          // ...
        })
        .catch((error) => {
          
          const errorCode = error.code;
          
          const errorMessage = error.message;
          
          setErrorMessage(errorCode+"-"+errorMessage);
        });
    }
  }
  
  const toggleSignInForm = ()=>{
    if(!isSignInForm) name.current.value = "";
    email.current.value = "";
    password.current.value = "";
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  }
  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img src = {BG_URL} alt = "background-img" className='h-screen w-screen object-cover'></img>
      </div>
      <form className='bg-black absolute w-full md:w-3/12  my-36 md:mx-auto right-0 left-0 text-white p-8 rounded-lg bg-opacity-80' onSubmit={e=>e.preventDefault()}>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input ref = {name} type="text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-sm'/>}
        <input ref={email} type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 rounded-sm'/>
        <input  ref={password} type="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-sm'/>
        {errorMessage && <p className='text-red-500 font-bold text-lg '>{errorMessage}</p>}
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"} </button>
        <p className = "cursor-pointer" onClick = {toggleSignInForm}>{isSignInForm ? "New to Netflix?Sign Up Now" : "Already a user?Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login
