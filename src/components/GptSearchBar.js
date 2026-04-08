import { useDispatch, useSelector } from "react-redux"
import languageConfig from "../utils/languageConstants"
import { useRef } from "react";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  
  const lang = useSelector(store => store.config.lang);

  const searchText = useRef(null);

  const dispatch = useDispatch();

  const gptMovies = async(movie)=>{
    try{
      let data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,API_OPTIONS);

      data = await data.json();

      if(!data.results){
        // do error validation here
      }

      return data.results;

    }catch(err){
      console.log("Do error validation if you do not get the response");
      
    }
  }

  const handleGptSearchClick = async()=>{
    
    if(!searchText.current || !searchText.current.value) return;
    
    const gptQuery = `Act as a movie recommendation system and suggest some movies for the query : ${searchText.current.value} . only give me name of 5 movies, comma separated like the example result given ahead .Example result : Gadar, Sholay, Don, De Dana Dan`

    
    const gptResult = await client.chat.completions.create({
      
      model: "gpt-5.4-mini", // ✅ change here
      
      messages: [
        { role: "user", content: gptQuery },
      ],
    
    });

    if(!gptResult.choices){
      console.log("handle the error properly");
      
      // handle the error properly
    }

    console.log(gptResult.choices?.[0]?.message?.content);

    let movieData = gptResult.choices?.[0]?.message?.content.split(", ");

    const promiseMovieArr = movieData.map(movie => gptMovies(movie));

    const tmdbResults = await Promise.all(promiseMovieArr);

    dispatch(addGptMovieResult({"movieNames":movieData,"movieResults":tmdbResults}));

    
  }

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form className="w:full mx-2 md:w-1/2 bg-black grid grid-cols-12" onSubmit={e=>e.preventDefault()}>
        <input type = "text" placeholder={languageConfig[lang]["gptSearchPlaceholder"]} className="p-4 m-4 col-span-9" ref={searchText}></input>
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>{languageConfig[lang]["search"]}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
