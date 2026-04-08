import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = ()=>{
    
    const dispatch = useDispatch();
    const topRatedMovieAvail = useSelector(store => store.movie.topRatedMovies);
    

    useEffect(()=>{
        const getTopRatedMovies = async()=>{

        let data = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1",API_OPTIONS);

        data = await data.json();

        dispatch(addTopRatedMovies(data['results']));

    }
        !topRatedMovieAvail && getTopRatedMovies();
    },[dispatch,topRatedMovieAvail]);
};

export default useTopRatedMovies;