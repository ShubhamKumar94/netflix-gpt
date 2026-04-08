import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const SecondaryContainer = () => {

  const movies = useSelector(store=>store.movie);

  
  if(!movies.nowPlayingMovies || !movies.popularMovies || !movies.topRatedMovies || !movies.upcomingMovies) return;
    
  return (
    <div className="bg-black">
      <div className="mt-0 md:-mt-31 relative z-20 pl-2 md:pl-8">
        <MovieList title = "Now playing" movies = {movies.nowPlayingMovies}/>
        <MovieList title = "Top Rated" movies = {movies.topRatedMovies}/>
        <MovieList title = "Popular" movies = {movies.popularMovies}/>
        <MovieList title = "Upcoming movies" movies = {movies.upcomingMovies}/>
        
      </div>
    </div>
  )
}

export default SecondaryContainer
