// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../../context/authContext";
// import { useState, useEffect, useRef } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";

// const NavBar = () => {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logOut();
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const isAccountPage = location.pathname === "/account";

//   const handleMenuItemClick = (path: string) => {
//     setIsMenuOpen(false);
//     navigate(path);
//   };

//   return (
//     <div className="flex items-center justify-between px-2.5 py-2.5 sm:p-2 z-[100] w-full top-0 left-0 bg-black fixed">
//       <Link to="/">
//         <h1 className="text-red-600 text-md sm:text-4xl font-bold cursor-pointer">
//           NETFLIX
//         </h1>
//       </Link>

//       {/* Hamburger icon (visible only on small screens) */}
//       <div className="lg:hidden flex items-center">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-white text-sm sm:text-3xl"
//         >
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Main navigation (hidden on small screens) */}
//       <div className="hidden lg:flex items-center gap-4">
//         {user?.email ? (
//           <div className="flex items-center gap-4">
//             {!isAccountPage && (
//               <Link to="/account">
//                 <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold hover:opacity-80 transition">
//                   {user.email.charAt(0).toUpperCase()}
//                 </div>
//               </Link>
//             )}
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 px-4 py-1.5 rounded text-white hover:bg-red-700 transition"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div>
//             <Link to="/login">
//               <button className="text-white pr-4">Sign In</button>
//             </Link>
//             <Link to="/signup">
//               <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
//                 Sign Up
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Mobile Menu - Right side, half width */}
//       <div
//         ref={menuRef}
//         className={`fixed top-0 right-0 w-36 h-36 sm:w-44 sm:h-44 bg-black text-white z-[999] transform transition-transform duration-300 lg:hidden ${
//           isMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className=" p-6 h-full flex flex-col justify-between items-center">
//           <div>
//             <div className="flex justify-between items-center gap-2">
//               <h2 className=" text-sm sm:text-2xl font-bold">Menu</h2>
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-white text-3xl"
//               >
//                 <FaTimes className="text-sm sm:text-xl" />
//               </button>
//             </div>

//             <div className="flex flex-col mt-5 gap-6">
//               {user?.email ? (
//                 <div className="flex flex-col gap-4">
//                   {!isAccountPage && (
//                     <button
//                       onClick={() => handleMenuItemClick("/account")}
//                       className="text-white text-sm sm:text-xl"
//                     >
//                       Account
//                     </button>
//                   )}
//                   <button
//                     onClick={handleLogout}
//                     className="text-white text-sm sm:text-xl"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col gap-4">
//                   <button
//                     onClick={() => handleMenuItemClick("/login")}
//                     className="text-white text-sm sm:text-xl"
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => handleMenuItemClick("/signup")}
//                     className="text-white text-sm sm:text-xl"
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../../context/authContext";
// import { useState, useEffect, useRef } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";

// const NavBar = () => {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logOut();
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const isAccountPage = location.pathname === "/account";

//   const handleMenuItemClick = (e: React.MouseEvent, path: string) => {
//     e.preventDefault(); // Prevent the default link behavior
//     console.log("Navigating to:", path); // Debugging log
//     setIsMenuOpen(false); // Close the menu
//     navigate(path); // Navigate to the path programmatically
//   };

//   return (
//     <div className="flex items-center justify-between px-2.5 py-2.5 sm:p-2 z-[100] w-full top-0 left-0 bg-black fixed">
//       <Link to="/">
//         <h1 className="text-red-600 text-md sm:text-4xl font-bold cursor-pointer">
//           NETFLIX
//         </h1>
//       </Link>

//       {/* Hamburger icon (visible only on small screens) */}
//       <div className="lg:hidden flex items-center">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-white text-sm sm:text-3xl"
//         >
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Main navigation (hidden on small screens) */}
//       <div className="hidden lg:flex items-center gap-4">
//         {user?.email ? (
//           <div className="flex items-center gap-4">
//             {!isAccountPage && (
//               <Link to="/account">
//                 <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold hover:opacity-80 transition">
//                   {user.email.charAt(0).toUpperCase()}
//                 </div>
//               </Link>
//             )}
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 px-4 py-1.5 rounded text-white hover:bg-red-700 transition"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div>
//             <Link to="/login">
//               <button className="text-white pr-4">Sign In</button>
//             </Link>
//             <Link to="/signup">
//               <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
//                 Sign Up
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Mobile Menu - Right side, half width */}
//       <div
//         ref={menuRef}
//         className={`fixed top-0 right-0 w-36 h-36 sm:w-44 sm:h-44 bg-black text-white z-[999] transform transition-transform duration-300 lg:hidden ${
//           isMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-6 h-full flex flex-col justify-between items-center">
//           <div>
//             <div className="flex justify-between items-center gap-2">
//               <h2 className=" text-sm sm:text-2xl font-bold">Menu</h2>
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-white text-3xl"
//               >
//                 <FaTimes className="text-sm sm:text-xl" />
//               </button>
//             </div>

//             <div className="flex flex-col mt-5 gap-6">
//               {user?.email ? (
//                 <div className="flex flex-col gap-4">
//                   {!isAccountPage && (
//                     <button
//                       onClick={(e) => handleMenuItemClick(e, "/account")}
//                       className="text-white text-sm sm:text-xl"
//                     >
//                       Account
//                     </button>
//                   )}
//                   <button
//                     onClick={(e) => handleMenuItemClick(e, "/")}
//                     className="text-white text-sm sm:text-xl"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col gap-4">
//                   <button
//                     onClick={(e) => handleMenuItemClick(e, "/login")}
//                     className="text-white text-sm sm:text-xl"
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={(e) => handleMenuItemClick(e, "/signup")}
//                     className="text-white text-sm sm:text-xl"
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const isAccountPage = location.pathname === "/account";

  const handleMenuItemClick = (path: string) => {
    setIsMenuOpen(false); // Close the menu
    if (location.pathname !== path) {
      // Prevent navigation if already on the same path
      navigate(path);
    }
  };

  return (
    <div className="flex items-center justify-between px-2.5 py-2.5 sm:p-2 z-[100] w-full top-0 left-0 bg-black fixed">
      <Link to="/">
        <h1 className="text-red-600 text-md sm:text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>

      {/* Hamburger icon (visible only on small screens) */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white text-sm sm:text-3xl"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Main navigation (hidden on small screens) */}
      <div className="hidden lg:flex items-center gap-4">
        {user?.email ? (
          <div className="flex items-center gap-4">
            {!isAccountPage && (
              <Link to="/account">
                <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold hover:opacity-80 transition">
                  {user.email.charAt(0).toUpperCase()}
                </div>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-1.5 rounded text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="text-white pr-4">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu - Right side, half width */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-36 h-36 sm:w-44 sm:h-44 bg-black text-white z-[999] transform transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col justify-between items-center">
          <div>
            <div className="flex justify-between items-center gap-2">
              <h2 className=" text-sm sm:text-2xl font-bold">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-3xl"
              >
                <FaTimes className="text-sm sm:text-xl" />
              </button>
            </div>

            <div className="flex flex-col mt-5 gap-6">
              {user?.email ? (
                <div className="flex flex-col gap-4">
                  {!isAccountPage && (
                    <button
                      onClick={() => handleMenuItemClick("/account")}
                      className="text-white text-sm sm:text-xl"
                    >
                      Account
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-white text-sm sm:text-xl"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleMenuItemClick("/login")}
                    className="text-white text-sm sm:text-xl"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleMenuItemClick("/signup")}
                    className="text-white text-sm sm:text-xl"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
