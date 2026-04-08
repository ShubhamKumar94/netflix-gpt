import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  
    const dispatch = useDispatch();

    const trailerAvail = useSelector(store => store.movie.trailerVideo);
  
    

    useEffect(()=>{
        const getMovieVideos = async()=>{
        
        try{

        let data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`,API_OPTIONS);
    
        data = await data.json();
        
        let trailerDetail = data["results"].filter(el=>el["type"]==="Trailer");

        trailerDetail = trailerDetail.length ? trailerDetail[0] : data['results'][0];

        dispatch(addTrailerVideo(trailerDetail));
        
        }
        catch(err){
        return (
            <div>Some error occured,Please try again</div>
        )
        }



    }
        !trailerAvail && getMovieVideos();
    },[trailerAvail,dispatch,movieId]);
}

export default useMovieTrailer
