import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = ()=>{
    
    const dispatch = useDispatch();
    
    const upComingMovieAvail = useSelector(store => store.movie.upcomingMovies);
    
    
    useEffect(()=>{
        const getUpcomingMovies = async()=>{

        let data = await fetch("https://api.themoviedb.org/3/movie/upcoming?page=1",API_OPTIONS);

        data = await data.json();

        dispatch(addUpcomingMovies(data['results']));

    }

        !upComingMovieAvail && getUpcomingMovies();
    },[dispatch,upComingMovieAvail]);
}

export default useUpcomingMovies;