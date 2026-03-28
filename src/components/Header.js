import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
  function signOutFun(){

    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(addUser(null));
      navigate("/");
    }).catch((error) => {
      // An error happened.
      console.log("An error happened while login");
      
    });
  }  
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      
      <img src = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-02-12/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt = "logo" className="w-44"/>

      {user && <div className="flex p-2">
        <img src = {user.photoURL} alt = "usericon" className="w-10 h-10 rounded-lg">
        </img>
        <button onClick = {signOutFun} className="font-bold text-white">(Sign Out)</button>
      </div>}
    </div>
  )
}

export default Header
