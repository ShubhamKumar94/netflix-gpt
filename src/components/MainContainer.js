import { useSelector } from "react-redux"
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";


const MainContainer = () => {

  const nowPlayingMovies = useSelector(store=>store.movie.nowPlayingMovies);
  
  if(!nowPlayingMovies) return;

  const {original_title,overview,id} = nowPlayingMovies[18];
  
  return (
    <div className="pt-[30%] bg-black md:pt-0">
        <VideoTitle title = {original_title} overview = {overview} />
        <VideoBackground movieId = {id}/>
      
    </div>
  )
}

export default MainContainer
