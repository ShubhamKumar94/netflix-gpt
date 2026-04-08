import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import {LOGO, SUPPORTED_LANGUAGES} from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  const user = useSelector(store => store.user);

  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  
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

  const handleGptSearchClick = ()=>{
    dispatch(toggleGptSearchView());
  }
  
  const handleLanguageChange = (e)=>{
    dispatch(changeLanguage(e.target.value));
    
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between ">
      
      <img  src = {LOGO} alt = "logo" className="w-44 mx-auto md:mx-0"/>

      {user && <div className="flex justify-between md:flex md:p-2">
          
          {showGptSearch && <select className="h-12 px-2 bg-gray-500 text-white " onChange={handleLanguageChange}>
             {SUPPORTED_LANGUAGES.map( lang => <option key = {lang.identifier} value = {lang.identifier}>{lang.name}</option>)}
          </select>}
          <button className="px-4 mx-2 my-1 -mt-3 relative -py-1 bg-purple-800 text-white rounded-lg" onClick = {handleGptSearchClick}>{showGptSearch ? "Home" : "GPT Search"}</button>
          <img src = {user.photoURL} alt = "usericon" className="hidden md:block w-10 h-10 rounded-lg">
          </img>
          <button onClick = {signOutFun} className="font-bold text-white">(Sign Out)</button>
      </div>}
    </div>
  )
}

export default Header;
