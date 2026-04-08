import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";


// custom hook it s, and custom hook is nothing but a function end of the day
const useNowPlayingMovies = ()=>{
    
    const dispatch = useDispatch();

    const nowPlayingMoviesAvail = useSelector(store => store.movie.nowPlayingMovies);
    
    

    useEffect(()=>{
        const getNowPlayingMovies = async()=>{
        
        const options = {
        
            method : 'GET',
        
            headers :{
                
                accept : 'application/json',
                
                Authorization : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTQ0M2IwZTdmYWFmNjE4NDI2ZDY4NzNjMTFiYjI1OSIsIm5iZiI6MTc3NDc3NDU1NC42NjYsInN1YiI6IjY5YzhlOTFhMGFlZWQxNjY0ZmE1OWQwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bdQseK3FTy-ZGN5_5KEMfw4wE7BCQiBPs5Mf-vYviNY'
            }
        }
        
        let resp = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1',options);
        
        resp = await resp.json();

        dispatch(addNowPlayingMovies(resp['results']));
    }    
        !nowPlayingMoviesAvail && getNowPlayingMovies();
    
    },[dispatch,nowPlayingMoviesAvail]);
}

export default useNowPlayingMovies;