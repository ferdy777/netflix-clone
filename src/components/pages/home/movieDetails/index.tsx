import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movie, setMovie] = useState<any>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_IMDB_API_KEY
          }`
        );
        setMovie(response.data);

        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
            import.meta.env.VITE_IMDB_API_KEY
          }`
        );

        const trailer = videoResponse.data.results.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (video: any) => video.type === "Trailer"
        );
        setVideoKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <div className="relative mt-26 mb-20 lg:mt-20 lg:mb-0 px-4">
      {movie ? (
        <>
          <button
            onClick={goBackHome}
            className="fixed top-12 left-4 z-[1008] bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            <FaArrowLeft />
          </button>

          {/* Trailer or Image Display */}
          {videoKey ? (
            <div className="w-full max-w-7xl mx-auto overflow-hidden rounded-lg">
              <iframe
                className="w-full h-[240px] sm:h-[320px] md:h-[500px] lg:h-[600px] rounded-lg"
                src={`https://www.youtube.com/embed/${videoKey}?playsinline=1&rel=0&modestbranding=1&showinfo=0&controls=1`}
                title={movie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="image-container mb-8 text-center">
              <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/original/${
                  movie.backdrop_path || movie.poster_path
                }`}
                alt={movie.title}
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-4 text-sm">
                No trailer available, showing movie image.
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-lg font-medium">
          Loading movie details...
        </p>
      )}
    </div>
  );
};

export default MovieDetails;
