import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../../context/authContext";
import { db } from "../../../../firebase";
import {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface MovieProps {
  item: {
    id: number;
    title: string;
    backdrop_path: string;
  };
  isHovered: boolean; // New prop to track hover state
  showModal: (message: string) => void;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Movie: React.FC<MovieProps> = ({
  item,
  isHovered,
  showModal,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const alreadySaved = docSnap
        .data()
        ?.savedShows?.some((movie: { id: number }) => movie.id === item.id);
      setLiked(alreadySaved || false); // Added default value to avoid undefined
    };

    checkIfSaved();
  }, [item.id, user]);

  const handleLikeToggle = async () => {
    if (!user) {
      showModal("Please log in to manage your saved movies.");
      return;
    }

    const movieRef = doc(db, "users", user.uid);
    const movieData = {
      id: item.id,
      title: item.title,
      img: item.backdrop_path,
    };

    const docSnap = await getDoc(movieRef);
    const alreadySaved = docSnap
      .data()
      ?.savedShows?.some((movie: { id: number }) => movie.id === item.id);

    try {
      if (alreadySaved) {
        await updateDoc(movieRef, {
          savedShows: arrayRemove(movieData),
        });
        setLiked(false);
        setModalMessage("Removed from your list.");
      } else {
        await updateDoc(movieRef, {
          savedShows: arrayUnion(movieData),
        });
        setLiked(true);
        setModalMessage("Saved to your list!");
      }

      // Clear the modal message after 1 second
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setModalMessage(null);
      }, 1000);
    } catch (err) {
      console.error("Error updating saved shows:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        // Removed unnecessary setIsActiveState
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
      onClick={onClick}
      onTouchStart={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        className="w-full h-auto block rounded"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />

      {/* Title Overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          isActive ? "bg-black/60 opacity-100" : "opacity-0"
        } text-white transition duration-300 flex justify-center items-center text-xs md:text-sm font-bold text-center px-2`}
      >
        {item?.title}
      </div>

      {/* Save/Unsave Button - Only shows if hovered */}
      {isHovered && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-300">
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-1 bg-blue-600 text-white text-xs px-4 py-1 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          >
            {liked ? <FaHeart className="text-red-400" /> : <FaRegHeart />}
            {liked ? "Unsave" : "Save"}
          </button>
        </div>
      )}

      {/* Modal */}
      {modalMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[1000] bg-white text-black px-6 py-3 rounded-md shadow-lg border border-gray-300 text-sm font-medium opacity-100 transition-opacity duration-300">
          {modalMessage}
        </div>
      )}
    </div>
  );
};

export default Movie;
