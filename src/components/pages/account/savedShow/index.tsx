// import { useState, useEffect } from "react";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import { useAuth } from "../../../../context/authContext";
// import { db } from "../../../../firebase";
// import { updateDoc, doc, onSnapshot } from "firebase/firestore";
// import { AiOutlineClose } from "react-icons/ai";

// // Define type for movie
// interface Movie {
//   id: number;
//   title: string;
//   img: string;
// }

// const SavedShows = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const { user } = useAuth();

//   const slideLeft = () => {
//     const slider = document.getElementById("slider") as HTMLElement;
//     if (slider) {
//       slider.scrollLeft = slider.scrollLeft - 150;
//     }
//   };

//   const slideRight = () => {
//     const slider = document.getElementById("slider") as HTMLElement;
//     if (slider) {
//       slider.scrollLeft = slider.scrollLeft + 150;
//     }
//   };

//   useEffect(() => {
//     if (!user?.uid) return;

//     const movieRef = doc(db, "users", user.uid);

//     const unsubscribe = onSnapshot(
//       movieRef,
//       (docSnapshot) => {
//         const savedMovies: Movie[] = docSnapshot.data()?.savedShows || [];
//         setMovies(savedMovies);
//       },
//       (error) => {
//         console.error("Error fetching data:", error);
//       }
//     );

//     return () => unsubscribe();
//   }, [user?.uid]);

//   const deleteShow = async (passedID: number) => {
//     if (!user?.uid) return;

//     try {
//       const updatedMovies = movies.filter((item) => item.id !== passedID);
//       const movieRef = doc(db, "users", user.uid);
//       await updateDoc(movieRef, {
//         savedShows: updatedMovies,
//       });
//       console.log("Movie deleted successfully");
//     } catch (error) {
//       console.error("Error deleting show:", error);
//     }
//   };

//   return (
//     <>
//       <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
//       <div className="relative flex items-center group">
//         {/* Left Arrow - Always show on mobile, hover on larger screens */}
//         <MdChevronLeft
//           onClick={slideLeft}
//           className="bg-white left-0 rounded-full absolute z-10 cursor-pointer
//                      opacity-50 hover:opacity-100
//                      block sm:hidden"
//           size={40}
//         />
//         <MdChevronLeft
//           onClick={slideLeft}
//           className="bg-white left-0 rounded-full absolute z-10 cursor-pointer
//                      opacity-50 hover:opacity-100
//                      hidden sm:block group-hover:block"
//           size={40}
//         />

//         <div
//           id="slider"
//           className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
//         >
//           {movies.length === 0 ? (
//             <p className="text-white text-center">No saved movies</p>
//           ) : (
//             movies.map((item) => (
//               <div
//                 key={item.id}
//                 className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
//               >
//                 <img
//                   className="w-full h-auto block"
//                   src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
//                   alt={item?.title}
//                 />
//                 <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
//                   <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
//                     {item?.title}
//                   </p>
//                   <p
//                     onClick={() => deleteShow(item.id)}
//                     className="absolute text-gray-300 top-4 right-4"
//                   >
//                     <AiOutlineClose />
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Right Arrow - Always show on mobile, hover on larger screens */}
//         <MdChevronRight
//           onClick={slideRight}
//           className="bg-white right-0 rounded-full absolute z-10 cursor-pointer
//                      opacity-50 hover:opacity-100
//                      block sm:hidden"
//           size={40}
//         />
//         <MdChevronRight
//           onClick={slideRight}
//           className="bg-white right-0 rounded-full absolute z-10 cursor-pointer
//                      opacity-50 hover:opacity-100
//                      hidden sm:block group-hover:block"
//           size={40}
//         />
//       </div>
//     </>
//   );
// };

// export default SavedShows;

// import { useState, useEffect } from "react";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import { useAuth } from "../../../../context/authContext";
// import { db } from "../../../../firebase";
// import { updateDoc, doc, onSnapshot } from "firebase/firestore";
// import { AiOutlineClose } from "react-icons/ai";

// // Define type for movie
// interface Movie {
//   id: number;
//   title: string;
//   img: string;
// }

// const SavedShows = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const { user } = useAuth();

//   const slideLeft = () => {
//     const slider = document.getElementById("slider") as HTMLElement;
//     if (slider) {
//       slider.scrollLeft = slider.scrollLeft - 150;
//     }
//   };

//   const slideRight = () => {
//     const slider = document.getElementById("slider") as HTMLElement;
//     if (slider) {
//       slider.scrollLeft = slider.scrollLeft + 150;
//     }
//   };

//   useEffect(() => {
//     if (!user?.uid) return;

//     const movieRef = doc(db, "users", user.uid);

//     const unsubscribe = onSnapshot(
//       movieRef,
//       (docSnapshot) => {
//         const savedMovies: Movie[] = docSnapshot.data()?.savedShows || [];
//         setMovies(savedMovies);
//       },
//       (error) => {
//         console.error("Error fetching data:", error);
//       }
//     );

//     return () => unsubscribe();
//   }, [user?.uid]);

//   const deleteShow = async (passedID: number) => {
//     if (!user?.uid) return;

//     try {
//       const updatedMovies = movies.filter((item) => item.id !== passedID);
//       const movieRef = doc(db, "users", user.uid);
//       await updateDoc(movieRef, {
//         savedShows: updatedMovies,
//       });
//       console.log("Movie deleted successfully");
//     } catch (error) {
//       console.error("Error deleting show:", error);
//     }
//   };

//   return (
//     <>
//       <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
//       <div className="relative flex items-center group">
//         {/* Left Arrow - Always show on mobile, hover on larger screens */}
//         <MdChevronLeft
//           onClick={slideLeft}
//           className="bg-white left-0 rounded-full absolute z-10 cursor-pointer
//                      opacity-50 hover:opacity-100
//                      block sm:hidden"
//           size={40}
//         />
//         <MdChevronLeft
//           onClick={slideLeft}
//           className="bg-white left-0 rounded-full absolute z-10 cursor-pointer
//                      opacity-50 hover:opacity-100
//                      hidden sm:block group-hover:block"
//           size={40}
//         />

//         <div
//           id="slider"
//           className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
//         >
//           {movies.length === 0 ? (
//             <p className="text-white text-center">No saved movies</p>
//           ) : (
//             movies.map((item) => (
//               <div
//                 key={item.id}
//                 className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
//               >
//                 <img
//                   className="w-full h-auto block"
//                   src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
//                   alt={item?.title}
//                 />
//                 <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
//                   <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
//                     {item?.title}
//                   </p>
//                   {/* Close Icon Always Visible on Mobile */}
//                   <p
//                     onClick={() => deleteShow(item.id)}
//                     className="absolute text-gray-300 top-4 right-4 block sm:hidden"
//                   >
//                     <AiOutlineClose />
//                   </p>
//                   {/* Close Icon Visible on Hover for Larger Screens */}
//                   <p
//                     onClick={() => deleteShow(item.id)}
//                     className="absolute text-gray-300 top-4 right-4 hidden sm:block"
//                   >
//                     <AiOutlineClose />
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Right Arrow - Always show on mobile, hover on larger screens */}
//         <MdChevronRight
//           onClick={slideRight}
//           className="bg-white right-0 rounded-full absolute z-10 cursor-pointer
//                      opacity-50 hover:opacity-100
//                      block sm:hidden"
//           size={40}
//         />
//         <MdChevronRight
//           onClick={slideRight}
//           className="bg-white right-0 rounded-full absolute z-10 cursor-pointer
//                      opacity-50 hover:opacity-100
//                      hidden sm:block group-hover:block"
//           size={40}
//         />
//       </div>
//     </>
//   );
// };

// export default SavedShows;

// import { useState, useEffect } from "react";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import { useAuth } from "../../../../context/authContext";
// import { db } from "../../../../firebase";
// import { updateDoc, doc, onSnapshot } from "firebase/firestore";
// import { AiOutlineClose } from "react-icons/ai";

// // Define type for movie
// interface Movie {
//   id: number;
//   title: string;
//   img: string;
// }

// const SavedShows = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [clickedMovieId, setClickedMovieId] = useState<number | null>(null);
//   const { user } = useAuth();

//   const slideLeft = () => {
//     const slider = document.getElementById("slider") as HTMLElement;
//     if (slider) {
//       slider.scrollLeft = slider.scrollLeft - 150;
//     }
//   };

//   const slideRight = () => {
//     const slider = document.getElementById("slider") as HTMLElement;
//     if (slider) {
//       slider.scrollLeft = slider.scrollLeft + 150;
//     }
//   };

//   useEffect(() => {
//     if (!user?.uid) return;

//     const movieRef = doc(db, "users", user.uid);

//     const unsubscribe = onSnapshot(
//       movieRef,
//       (docSnapshot) => {
//         const savedMovies: Movie[] = docSnapshot.data()?.savedShows || [];
//         setMovies(savedMovies);
//       },
//       (error) => {
//         console.error("Error fetching data:", error);
//       }
//     );

//     return () => unsubscribe();
//   }, [user?.uid]);

//   const deleteShow = async (passedID: number) => {
//     if (!user?.uid) return;

//     try {
//       const updatedMovies = movies.filter((item) => item.id !== passedID);
//       const movieRef = doc(db, "users", user.uid);
//       await updateDoc(movieRef, {
//         savedShows: updatedMovies,
//       });
//       console.log("Movie deleted successfully");
//     } catch (error) {
//       console.error("Error deleting show:", error);
//     }
//   };

//   return (
//     <>
//       <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
//       <div className="relative flex items-center group">
//         {/* Left Arrow - Mobile Always Visible, Desktop on Hover */}
//         <MdChevronLeft
//           onClick={slideLeft}
//           className="bg-white left-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 block sm:hidden"
//           size={40}
//         />
//         <MdChevronLeft
//           onClick={slideLeft}
//           className="bg-white left-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 hidden sm:block group-hover:block"
//           size={40}
//         />

//         <div
//           id="slider"
//           className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
//         >
//           {movies.length === 0 ? (
//             <p className="text-white text-center">No saved movies</p>
//           ) : (
//             movies.map((item) => (
//               <div
//                 key={item.id}
//                 className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
//                 onClick={() =>
//                   setClickedMovieId(clickedMovieId === item.id ? null : item.id)
//                 }
//               >
//                 <img
//                   className="w-full h-auto block"
//                   src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
//                   alt={item?.title}
//                 />
//                 <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white transition duration-300">
//                   <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center px-2">
//                     {item?.title}
//                   </p>

//                   {/* Mobile Button on Click */}
//                   {clickedMovieId === item.id && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         deleteShow(item.id);
//                       }}
//                       className="absolute top-4 right-4 sm:hidden bg-red-600 text-white px-3 py-1 rounded text-sm shadow-md"
//                     >
//                       <AiOutlineClose className="inline mr-1" /> Delete
//                     </button>
//                   )}

//                   {/* Desktop Hover Icon */}
//                   <p
//                     onClick={() => deleteShow(item.id)}
//                     className="absolute text-gray-300 top-4 right-4 hidden sm:block"
//                   >
//                     <AiOutlineClose />
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Right Arrow - Mobile Always Visible, Desktop on Hover */}
//         <MdChevronRight
//           onClick={slideRight}
//           className="bg-white right-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 block sm:hidden"
//           size={40}
//         />
//         <MdChevronRight
//           onClick={slideRight}
//           className="bg-white right-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 hidden sm:block group-hover:block"
//           size={40}
//         />
//       </div>
//     </>
//   );
// };

// export default SavedShows;

// import { useState, useEffect } from "react";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import { useAuth } from "../../../../context/authContext";
// import { db } from "../../../../firebase";
// import { updateDoc, doc, onSnapshot } from "firebase/firestore";
// import { AiOutlineClose } from "react-icons/ai";

// interface Movie {
//   id: number;
//   title: string;
//   img: string;
// }

// const SavedShows = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [clickedMovieId, setClickedMovieId] = useState<number | null>(null);
//   const { user } = useAuth();

//   const slideLeft = () => {
//     const slider = document.getElementById("slider") as HTMLElement;
//     if (slider) {
//       slider.scrollLeft -= 150;
//     }
//   };

//   const slideRight = () => {
//     const slider = document.getElementById("slider") as HTMLElement;
//     if (slider) {
//       slider.scrollLeft += 150;
//     }
//   };

//   useEffect(() => {
//     if (!user?.uid) return;

//     const movieRef = doc(db, "users", user.uid);

//     const unsubscribe = onSnapshot(movieRef, (docSnapshot) => {
//       const savedMovies: Movie[] = docSnapshot.data()?.savedShows || [];
//       setMovies(savedMovies);
//     });

//     return () => unsubscribe();
//   }, [user?.uid]);

//   const deleteShow = async (passedID: number) => {
//     if (!user?.uid) return;

//     try {
//       const updatedMovies = movies.filter((item) => item.id !== passedID);
//       const movieRef = doc(db, "users", user.uid);
//       await updateDoc(movieRef, {
//         savedShows: updatedMovies,
//       });
//     } catch (error) {
//       console.error("Error deleting show:", error);
//     }
//   };

//   return (
//     <>
//       <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
//       <div className="relative flex items-center group">
//         {/* Arrows */}
//         <MdChevronLeft
//           onClick={slideLeft}
//           className="bg-white left-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 block sm:hidden"
//           size={40}
//         />
//         <MdChevronLeft
//           onClick={slideLeft}
//           className="bg-white left-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 hidden sm:block group-hover:block"
//           size={40}
//         />

//         <div
//           id="slider"
//           className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
//         >
//           {movies.length === 0 ? (
//             <p className="text-white text-center">No saved movies</p>
//           ) : (
//             movies.map((item) => {
//               const isMobile =
//                 typeof window !== "undefined" && window.innerWidth < 640;
//               const isActive = clickedMovieId === item.id;

//               return (
//                 <div
//                   key={item.id}
//                   className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
//                   onClick={() => {
//                     // Only toggle overlay on mobile
//                     if (window.innerWidth < 640) {
//                       setClickedMovieId(isActive ? null : item.id);
//                     }
//                   }}
//                 >
//                   <img
//                     className="w-full h-auto block"
//                     src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
//                     alt={item?.title}
//                   />

//                   {/* Overlay Logic */}
//                   <div
//                     className={`absolute top-0 left-0 w-full h-full text-white transition duration-300
//                     ${
//                       isActive
//                         ? "bg-black/80 opacity-100"
//                         : "opacity-0 sm:opacity-0 sm:hover:opacity-100 sm:hover:bg-black/80"
//                     }`}
//                   >
//                     <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center px-2">
//                       {item?.title}
//                     </p>

//                     {/* Mobile: Show delete button if clicked */}
//                     {isActive && (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteShow(item.id);
//                           setClickedMovieId(null);
//                         }}
//                         className="absolute top-3 right-4 sm:hidden bg-red-600 text-white px-3 py-1 rounded text-sm shadow-md"
//                       >
//                         <AiOutlineClose className="inline mr-1" />
//                         remove
//                       </button>
//                     )}

//                     {/* Desktop: Show icon on hover */}
//                     <p
//                       onClick={() => deleteShow(item.id)}
//                       className="absolute text-gray-300 top-4 right-4 hidden sm:block cursor-pointer"
//                     >
//                       <AiOutlineClose />
//                     </p>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Arrows */}
//         <MdChevronRight
//           onClick={slideRight}
//           className="bg-white right-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 block sm:hidden"
//           size={40}
//         />
//         <MdChevronRight
//           onClick={slideRight}
//           className="bg-white right-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 hidden sm:block group-hover:block"
//           size={40}
//         />
//       </div>
//     </>
//   );
// };

// export default SavedShows;

import { useState, useEffect, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useAuth } from "../../../../context/authContext";
import { db } from "../../../../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

interface Movie {
  id: number;
  title: string;
  img: string;
}

const SavedShows = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [clickedMovieId, setClickedMovieId] = useState<number | null>(null);
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    const slider = document.getElementById("slider") as HTMLElement;
    if (slider) {
      slider.scrollLeft -= 150;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById("slider") as HTMLElement;
    if (slider) {
      slider.scrollLeft += 150;
    }
  };

  useEffect(() => {
    if (!user?.uid) return;

    const movieRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(movieRef, (docSnapshot) => {
      const savedMovies: Movie[] = docSnapshot.data()?.savedShows || [];
      setMovies(savedMovies);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const deleteShow = async (passedID: number) => {
    if (!user?.uid) return;

    try {
      const updatedMovies = movies.filter((item) => item.id !== passedID);
      const movieRef = doc(db, "users", user.uid);
      await updateDoc(movieRef, {
        savedShows: updatedMovies,
      });
    } catch (error) {
      console.error("Error deleting show:", error);
    }
  };

  // 🔁 Close delete button on outside click (for mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setClickedMovieId(null);
      }
    };

    if (clickedMovieId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickedMovieId]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 block sm:hidden"
          size={40}
        />
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 hidden sm:block group-hover:block"
          size={40}
        />

        <div
          id="slider"
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
          ref={containerRef}
        >
          {movies.length === 0 ? (
            <p className="text-white text-center">No saved movies</p>
          ) : (
            movies.map((item) => {
              const isActive = clickedMovieId === item.id;

              return (
                <div
                  key={item.id}
                  className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
                  onClick={() => {
                    if (window.innerWidth < 640) {
                      setClickedMovieId(isActive ? null : item.id);
                    }
                  }}
                >
                  <img
                    className="w-full h-auto block"
                    src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                    alt={item?.title}
                  />

                  <div
                    className={`absolute top-0 left-0 w-full h-full text-white transition duration-300
                    ${
                      isActive
                        ? "bg-black/80 opacity-100"
                        : "opacity-0 sm:opacity-0 sm:hover:opacity-100 sm:hover:bg-black/80"
                    }`}
                  >
                    <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center px-2">
                      {item?.title}
                    </p>

                    {/* Mobile delete button */}
                    {isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteShow(item.id);
                          setClickedMovieId(null);
                        }}
                        className="absolute top-4 right-4 sm:hidden bg-red-600 text-white px-3 py-1 rounded text-sm shadow-md"
                      >
                        <AiOutlineClose className="inline mr-1" />
                        Delete
                      </button>
                    )}

                    {/* Desktop delete icon */}
                    <p
                      onClick={() => deleteShow(item.id)}
                      className="absolute text-gray-300 top-4 right-4 hidden sm:block cursor-pointer"
                    >
                      <AiOutlineClose />
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 block sm:hidden"
          size={40}
        />
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute z-10 cursor-pointer opacity-50 hover:opacity-100 hidden sm:block group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShows;
