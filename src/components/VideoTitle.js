
const VideoTitle = ({title,overview}) => {
  return (
    <div className="w-screen aspect-video pt-[10%] px-4 md:px-20 absolute text-white">
        <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
        <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
        <div className="my-2 md:m-0">
            <button className="bg-white text-black py-0.5 md:py-3 px-2 md:px-10 text-xl rounded-lg hover:bg-opacity-80">▶ Play</button>
            <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-3 px-10 text-xl bg-opacity-50 rounded-lg">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle
