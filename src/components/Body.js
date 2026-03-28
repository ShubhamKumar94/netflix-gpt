import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const Body = () => {
    
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path : "/browse",
      element:<Browse/>
    }
  ]);

  // useEffect(()=>{
    
  //   onAuthStateChanged(auth, (user) => {
      
  //     if (user) {
        
  //       const {uid,email,displayName} = user;

  //       dispatch(addUser({uid,email,displayName}));

  //       console.log("auth state change");
        
  //     } else {

  //       dispatch(addUser());
  //       // User is signed out
  //       // ...
  //     }
  //   });
  
  // },[]);
  
  return (
    <div>
        <RouterProvider router={appRouter}/>
        
    </div>
  )
}

export default Body;
