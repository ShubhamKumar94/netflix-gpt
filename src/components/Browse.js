import React, { useEffect } from 'react'
import Header from './Header'

const Browse = () => {
  
  const getNowPlayingMovies = async()=>{
    
    const options = {
      
      method : 'GET',
      
      headers :{
        
        accept : 'application/json',
        
        Authorization : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTQ0M2IwZTdmYWFmNjE4NDI2ZDY4NzNjMTFiYjI1OSIsIm5iZiI6MTc3NDc3NDU1NC42NjYsInN1YiI6IjY5YzhlOTFhMGFlZWQxNjY0ZmE1OWQwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bdQseK3FTy-ZGN5_5KEMfw4wE7BCQiBPs5Mf-vYviNY'
      }
    }
    
    let resp = await fetch('https://api.themoviedb.org/3/movie/now_playing',options);
    
    resp = await resp.json();

    console.log(resp);
  }

  useEffect(()=>{
    getNowPlayingMovies();
  },[]);
  return (
    <div>
      <Header/>
    </div>
  )
}

export default Browse
