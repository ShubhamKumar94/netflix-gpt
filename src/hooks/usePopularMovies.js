import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = ()=>{

    const dispatch = useDispatch();
    const popularMovieAvail = useSelector(store => store.movie.popularMovies);
    

    useEffect(()=>{
        const getPopularMovies = async()=>{

        let data = await fetch("https://api.themoviedb.org/3/movie/popular",API_OPTIONS);

        data = await data.json();

        dispatch(addPopularMovies(data['results']));
    }
        !popularMovieAvail && getPopularMovies();
    },[dispatch,popularMovieAvail]);
}

export default usePopularMovies;