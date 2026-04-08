import { useSelector } from "react-redux"
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  
  const gpt = useSelector(store => store.gpt);

  const {movieResults , movieNames} = gpt;
  
  if(!movieNames) return;  
  
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-70">
      
      <div>
        {movieNames.map((movieName,ind) => <MovieList key = {movieName} title = {movieName} movies = {movieResults[ind]}/>)}
      </div>    

    </div>
  )
}

export default GptMovieSuggestions
