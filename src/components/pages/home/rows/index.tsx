import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Movie from "../movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface MovieData {
  id: number;
  title: string;
  backdrop_path: string;
}

interface User {
  email: string | null;
}

interface RowProps {
  title: string;
  fetchURL: string;
  rowID: string;
  user?: User | null;
}

const Row: React.FC<RowProps> = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [activeMovieId, setActiveMovieId] = useState<number | null>(null);
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null); // New state to track hovered movie
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchURL);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [fetchURL]);

  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowID);
    if (slider) slider.scrollLeft -= 150;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider" + rowID);
    if (slider) slider.scrollLeft += 150;
  };

  const showModal = (message: string) => {
    setModalMessage(message);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setModalMessage(null);
    }, 1500);
  };

  // Close active movie button when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveMovieId(null);
      }
    };

    if (activeMovieId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMovieId]);

  return (
    <div className="mt-7 relative" ref={containerRef}>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 block lg:hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item) => (
            <Movie
              key={item.id}
              item={item}
              showModal={showModal}
              isActive={activeMovieId === item.id}
              isHovered={hoveredMovieId === item.id} // Pass the hovered state
              onClick={() =>
                setActiveMovieId((prev) => (prev === item.id ? null : item.id))
              }
              onMouseEnter={() => setHoveredMovieId(item.id)} // Set hovered state
              onMouseLeave={() => setHoveredMovieId(null)} // Reset hovered state when mouse leaves
            />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 block lg:hidden group-hover:block"
          size={40}
        />
      </div>

      {/* Shared modal */}
      {modalMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[1000] bg-white text-black px-6 py-3 rounded-md shadow-lg border border-gray-300 text-sm font-medium opacity-100 transition-opacity duration-300">
          {modalMessage}
        </div>
      )}
    </div>
  );
};

export default Row;
