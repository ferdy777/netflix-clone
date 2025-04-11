import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import requests from "../../../../request";
import { useAuth } from "../../../../context/authContext";
import { db } from "../../../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FaPlay, FaRegClock, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
}

const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

const Main = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const width = useScreenWidth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(requests.requestPopular);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (movies.length === 0 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies, isPaused]);

  const movie = movies[currentIndex];

  const truncateString = useCallback(
    (str: string | undefined, num: number): string => {
      return str && str.length > num ? str.slice(0, num) + "..." : str || "";
    },
    []
  );

  const getOverview = useCallback(() => {
    if (width <= 300)
      return isExpanded ? movie?.overview : truncateString(movie?.overview, 15);
    if (width < 360)
      return isExpanded ? movie?.overview : truncateString(movie?.overview, 30);
    if (width < 480)
      return isExpanded ? movie?.overview : truncateString(movie?.overview, 40);
    if (width < 640)
      return isExpanded ? movie?.overview : truncateString(movie?.overview, 40);
    return isExpanded ? movie?.overview : truncateString(movie?.overview, 40);
  }, [movie, width, isExpanded, truncateString]);

  const saveForLater = async () => {
    if (!user) {
      alert("Please log in to save to Watch Later");
      return;
    }
    const movieID = doc(db, "users", user.uid);
    try {
      await updateDoc(movieID, {
        watchLater: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
      console.log("Movie saved to Watch Later!");
    } catch (error) {
      console.error("Error saving movie to Watch Later:", error);
    }
  };

  const playMovie = () => {
    navigate(`/movie/${movie.id}`);
  };

  const toggleOverview = () => {
    setIsExpanded((prev) => !prev);
  };

  const goBackHome = () => {
    navigate("/");
  };

  if (!movie || !movie.backdrop_path) {
    return <div className="text-white p-10">Loading movies...</div>;
  }

  return (
    <div className="relative w-full h-[370px] lg:h-[600px] overflow-hidden">
      {/* Background Image with Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full md:object-cover object-contain object-center md:object-top"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 h-full w-full flex items-center justify-center px-2 sm:px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28 py-4 sm:py-6 md:py-10 lg:py-16">
        <div
          className="flex flex-col items-center justify-center max-w-full max-h-full pt-14 text-center gap-y-2 sm:gap-y-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Back Button (only on movie page) */}
          {location.pathname.includes("/movie/") && (
            <button
              onClick={goBackHome}
              className="absolute top-4 left-4 z-30 bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-200 transition"
            >
              <FaArrowLeft />
            </button>
          )}

          {/* Title */}
          <h1 className="text-white text-xs sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
            {movie.title}
          </h1>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-1 sm:mb-3">
            <button
              onClick={playMovie}
              className="bg-red-600 text-white px-2 sm:px-5 sm:py-2 rounded-full flex items-center gap-2 text-xs sm:text-base hover:bg-red-700 transition"
            >
              <FaPlay />
              Play
            </button>
            <button
              onClick={saveForLater}
              className="bg-white text-black px-2 sm:px-5 sm:py-2 rounded-full flex items-center gap-2 text-xs sm:text-base hover:bg-gray-300 transition"
            >
              <FaRegClock />
              Watch Later
            </button>
          </div>

          {/* Release Date */}
          <p className="text-gray-400 text-xs sm:text-sm mb-2">
            Released: {movie.release_date}
          </p>

          {/* Description */}
          {width > 1025 && (
            <div className="max-h-[150px] sm:max-h-[200px] flex items-center justify-center">
              <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[65%] xl:max-w-[50%] px-2 sm:px-0">
                {getOverview()}
                <span
                  className="underline cursor-pointer"
                  onClick={toggleOverview}
                >
                  {isExpanded ? " Read less" : " Read more"}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-16 sm:bottom-0 md:bottom-1 z-[2000] lg:bottom-2 left-1/2 transform -translate-x-1/2 flex gap-[2px] sm:gap-2 px-1 scale-75 sm:scale-100">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ease-in-out ${
              index === currentIndex
                ? "bg-red-500 scale-125 shadow-md"
                : "bg-white/40 hover:bg-white"
            }`}
            style={{
              width: width <= 300 ? "6px" : width <= 480 ? "8px" : "12px",
              height: width <= 300 ? "6px" : width <= 480 ? "8px" : "12px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
