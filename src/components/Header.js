import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import {LOGO} from "../utils/constants";
const Header = () => {
  
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  const user = useSelector(store => store.user)
  
  function signOutFun(){

    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(addUser(null));
      // navigate("/");
    }).catch((error) => {
      // An error happened.
      console.log("An error happened while login");
      
    });
  }
  
  useEffect(()=>{
    // unsubscribe is a function whenver it will be called the event that we have subscribed,it should be remove from the browser. 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {

        // const user = auth.currentUser
                
        const {uid,email,displayName,photoURL} = auth.currentUser;
        
        dispatch(addUser({uid,email,displayName,photoURL}));
        
        navigate("/browse");
        
      } else {

        dispatch(addUser());
        
        navigate("/");
        // User is signed out
        // ...
      }
    });
    // it is a cleanup function , and it is property of useEffect,whenever component unmounts , the return function will be called.
    return ()=>unsubscribe();
  
  },[dispatch, navigate]);
  
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      
      <img src = {LOGO} alt = "logo" className="w-44"/>

      {user && <div className="flex p-2">
        <img src = {user.photoURL} alt = "usericon" className="w-10 h-10 rounded-lg">
        </img>
        <button onClick = {signOutFun} className="font-bold text-white">(Sign Out)</button>
      </div>}
    </div>
  )
}

export default Header
