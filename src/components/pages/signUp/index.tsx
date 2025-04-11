// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/authContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const { user, signUp } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setEmailError("");
//     setPasswordError("");
//     setConfirmPasswordError("");

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!email) {
//       setEmailError("Email is required.");
//     } else if (!emailRegex.test(email)) {
//       setEmailError("please provide a valid email");
//     } else if (!email.endsWith(".com")) {
//       setEmailError("please provide a valid email.");
//     }

//     if (!password) {
//       setPasswordError("Password is required.");
//     } else if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters.");
//     }

//     if (!confirmPassword) {
//       setConfirmPasswordError("Please confirm your password.");
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match.");
//     }

//     if (
//       emailError ||
//       passwordError ||
//       confirmPasswordError ||
//       !email ||
//       !password ||
//       !confirmPassword ||
//       password.length < 8 ||
//       !emailRegex.test(email) ||
//       !email.endsWith(".com") ||
//       password !== confirmPassword
//     ) {
//       return;
//     }

//     try {
//       await signUp(email, password);
//       navigate("/");
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         if (error.message.includes("auth/email-already-in-use")) {
//           setEmailError("An account already exists with this email.");
//           setShowModal(true);
//         } else {
//           setPasswordError("An error occurred. Please try again.");
//         }
//       } else {
//         setPasswordError("An unknown error occurred.");
//       }
//     }
//   };

//   useEffect(() => {
//     if (showModal) {
//       const timeoutId = setTimeout(() => setShowModal(false), 3000);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [showModal]);

//   if (user) return null;

//   const Modal = () => (
//     <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-10 bg-white p-6 rounded-lg max-w-sm mx-auto z-90 shadow-lg">
//       <p className="text-center text-gray-700">{emailError || passwordError}</p>
//     </div>
//   );

//   return (
//     <>
//       {showModal && <Modal />}
//       <div className="w-full h-screen overflow-y-hidden relative mt-8 xl:mt-14">
//         <img
//           className="sm:block absolute w-full h-full object-cover"
//           src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
//           alt="/"
//         />
//         <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 py-24 z-50">
//           <div className="max-w-[450px] mx-auto bg-black/75 text-white p-8 rounded-lg h-[600px]">
//             <div className="max-w-[320px] mx-auto py-10">
//               <h1 className="text-3xl font-bold text-center">Sign Up</h1>
//               <form
//                 onSubmit={handleSubmit}
//                 className="w-full flex flex-col py-4"
//               >
//                 <input
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`p-3 my-2 bg-gray-700 rounded ${
//                     emailError ? "border border-red-500" : ""
//                   }`}
//                   type="email"
//                   placeholder="Email"
//                   autoComplete="email"
//                   value={email}
//                 />
//                 <div className="min-h-[20px]">
//                   {emailError && (
//                     <p className="text-red-500 text-sm mt-[-0.5rem]">
//                       {emailError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div className="relative">
//                   <input
//                     onChange={(e) => setPassword(e.target.value)}
//                     className={`p-3 my-2 bg-gray-700 rounded w-full ${
//                       passwordError ? "border border-red-500" : ""
//                     }`}
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     autoComplete="new-password"
//                     value={password}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                   >
//                     {showPassword ? (
//                       <FaEyeSlash className="text-gray-400" />
//                     ) : (
//                       <FaEye className="text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//                 <div className="min-h-[20px]">
//                   {passwordError && (
//                     <p className="text-red-500 text-sm mt-[-0.5rem]">
//                       {passwordError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="relative">
//                   <input
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className={`p-3 my-2 bg-gray-700 rounded w-full ${
//                       confirmPasswordError ? "border border-red-500" : ""
//                     }`}
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm Password"
//                     autoComplete="new-password"
//                     value={confirmPassword}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                     onClick={() => setShowConfirmPassword((prev) => !prev)}
//                   >
//                     {showConfirmPassword ? (
//                       <FaEyeSlash className="text-gray-400" />
//                     ) : (
//                       <FaEye className="text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//                 <div className="min-h-[20px]">
//                   {confirmPasswordError && (
//                     <p className="text-red-500 text-sm mt-[-0.5rem]">
//                       {confirmPasswordError}
//                     </p>
//                   )}
//                 </div>

//                 <button className="bg-red-600 py-3 my-6 rounded font-bold cursor-pointer">
//                   Sign Up
//                 </button>

//                 <div className="flex justify-between items-center text-sm text-gray-600">
//                   <label className="flex items-center">
//                     <input className="mr-2" type="checkbox" />
//                     Remember me
//                   </label>
//                   <p>Need Help?</p>
//                 </div>

//                 <p className="py-8 text-center">
//                   <span className="text-gray-600">
//                     Already subscribed to Netflix?
//                   </span>{" "}
//                   <Link to="/login" className="text-blue-500">
//                     Sign In
//                   </Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/authContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const { user, signUp } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setEmailError("");
//     setPasswordError("");
//     setConfirmPasswordError("");

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!email) {
//       setEmailError("Email is required.");
//     } else if (!emailRegex.test(email)) {
//       setEmailError("Please provide a valid email");
//     }

//     if (!password) {
//       setPasswordError("Password is required.");
//     } else if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters.");
//     }

//     if (!confirmPassword) {
//       setConfirmPasswordError("Please confirm your password.");
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match.");
//     }

//     if (
//       emailError ||
//       passwordError ||
//       confirmPasswordError ||
//       !email ||
//       !password ||
//       !confirmPassword ||
//       password.length < 8 ||
//       !emailRegex.test(email) ||
//       password !== confirmPassword
//     ) {
//       return;
//     }

//     try {
//       await signUp(email, password);
//       navigate("/");
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         if (error.message.includes("auth/email-already-in-use")) {
//           setEmailError("An account already exists with this email.");
//           setShowModal(true);
//         } else {
//           setPasswordError("An error occurred. Please try again.");
//         }
//       } else {
//         setPasswordError("An unknown error occurred.");
//       }
//     }
//   };

//   useEffect(() => {
//     if (showModal) {
//       const timeoutId = setTimeout(() => setShowModal(false), 3000);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [showModal]);

//   if (user) return null;

//   const Modal = () => (
//     <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-10 bg-white p-6 rounded-lg max-w-sm mx-auto z-90 shadow-lg">
//       <p className="text-center text-gray-700">{emailError || passwordError}</p>
//     </div>
//   );

//   return (
//     <>
//       {showModal && <Modal />}
//       <div className="w-full h-screen overflow-y-hidden relative mt-8 xl:mt-14">
//         <img
//           className="sm:block absolute w-full h-full object-cover"
//           src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
//           alt="/"
//         />
//         <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 py-24 z-50">
//           <div className="max-w-[450px] mx-auto bg-black/75 text-white p-8 rounded-lg h-[600px]">
//             <div className="max-w-[320px] mx-auto py-10">
//               <h1 className="text-3xl font-bold text-center">Sign Up</h1>
//               <form
//                 onSubmit={handleSubmit}
//                 className="w-full flex flex-col py-4"
//               >
//                 <input
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`p-3 my-2 bg-gray-700 rounded ${
//                     emailError ? "border border-red-500" : ""
//                   }`}
//                   type="email"
//                   placeholder="Email"
//                   autoComplete="email"
//                   value={email}
//                 />
//                 <div className="min-h-[20px]">
//                   {emailError && (
//                     <p className="text-red-500 text-sm mt-[-0.5rem]">
//                       {emailError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div className="relative">
//                   <input
//                     onChange={(e) => setPassword(e.target.value)}
//                     className={`p-3 my-2 bg-gray-700 rounded w-full ${
//                       passwordError ? "border border-red-500" : ""
//                     }`}
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     autoComplete="new-password"
//                     value={password}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                   >
//                     {showPassword ? (
//                       <FaEyeSlash className="text-gray-400" />
//                     ) : (
//                       <FaEye className="text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//                 <div className="min-h-[20px]">
//                   {passwordError && (
//                     <p className="text-red-500 text-sm mt-[-0.5rem]">
//                       {passwordError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="relative">
//                   <input
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className={`p-3 my-2 bg-gray-700 rounded w-full ${
//                       confirmPasswordError ? "border border-red-500" : ""
//                     }`}
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm Password"
//                     autoComplete="new-password"
//                     value={confirmPassword}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                     onClick={() => setShowConfirmPassword((prev) => !prev)}
//                   >
//                     {showConfirmPassword ? (
//                       <FaEyeSlash className="text-gray-400" />
//                     ) : (
//                       <FaEye className="text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//                 <div className="min-h-[20px]">
//                   {confirmPasswordError && (
//                     <p className="text-red-500 text-sm mt-[-0.5rem]">
//                       {confirmPasswordError}
//                     </p>
//                   )}
//                 </div>

//                 <button className="bg-red-600 py-3 my-6 rounded font-bold cursor-pointer">
//                   Sign Up
//                 </button>

//                 <div className="flex justify-between items-center text-sm text-gray-600">
//                   <label className="flex items-center">
//                     <input className="mr-2" type="checkbox" />
//                     Remember me
//                   </label>
//                   <p>Need Help?</p>
//                 </div>

//                 <p className="py-8 text-center">
//                   <span className="text-gray-600">
//                     Already subscribed to Netflix?
//                   </span>{" "}
//                   <Link to="/login" className="text-blue-500">
//                     Sign In
//                   </Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/authContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const { user, signUp } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setEmailError("");
//     setPasswordError("");
//     setConfirmPasswordError("");

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!email) {
//       setEmailError("Email is required.");
//     } else if (!emailRegex.test(email)) {
//       setEmailError("Please provide a valid email");
//     }

//     if (!password) {
//       setPasswordError("Password is required.");
//     } else if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters.");
//     }

//     if (!confirmPassword) {
//       setConfirmPasswordError("Please confirm your password.");
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match.");
//     }

//     if (
//       emailError ||
//       passwordError ||
//       confirmPasswordError ||
//       !email ||
//       !password ||
//       !confirmPassword ||
//       password.length < 8 ||
//       !emailRegex.test(email) ||
//       password !== confirmPassword
//     ) {
//       return;
//     }

//     try {
//       await signUp(email, password);
//       navigate("/");
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         if (error.message.includes("auth/email-already-in-use")) {
//           setEmailError("An account already exists with this email.");
//           setShowModal(true);
//         } else {
//           setPasswordError("An error occurred. Please try again.");
//         }
//       } else {
//         setPasswordError("An unknown error occurred.");
//       }
//     }
//   };

//   useEffect(() => {
//     if (showModal) {
//       const timeoutId = setTimeout(() => setShowModal(false), 3000);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [showModal]);

//   if (user) return null;

//   const Modal = () => (
//     <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-10 bg-white p-6 rounded-lg max-w-sm mx-auto z-90 shadow-lg">
//       <p className="text-center text-gray-700">{emailError || passwordError}</p>
//     </div>
//   );

//   return (
//     <>
//       {showModal && <Modal />}
//       <div className="w-full h-screen overflow-hidden relative mt-8 xl:mt-14">
//         <img
//           className="sm:block absolute w-full h-full object-cover"
//           src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
//           alt="/"
//         />
//         <div className="bg-black/60 fixed top-0 left-0 w-full h-full"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 py-4 z-50 flex items-center justify-center">
//           <div className="max-w-[450px] mx-auto bg-black/75 text-white p-8 rounded-lg">
//             <div className="max-w-[320px] mx-auto py-10">
//               <h1 className="text-3xl font-bold text-center">Sign Up</h1>
//               <form
//                 onSubmit={handleSubmit}
//                 className="w-full flex flex-col py-4"
//               >
//                 <input
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`p-3 my-2 bg-gray-700 rounded ${
//                     emailError ? "border border-red-500" : ""
//                   }`}
//                   type="email"
//                   placeholder="Email"
//                   autoComplete="email"
//                   value={email}
//                 />
//                 <div className="min-h-[20px]">
//                   {emailError && (
//                     <p className="text-red-500 text-sm mt-[-0.5rem]">
//                       {emailError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div className="relative">
//                   <input
//                     onChange={(e) => setPassword(e.target.value)}
//                     className={`p-3 my-2 bg-gray-700 rounded w-full ${
//                       passwordError ? "border border-red-500" : ""
//                     }`}
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     autoComplete="new-password"
//                     value={password}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                   >
//                     {showPassword ? (
//                       <FaEyeSlash className="text-gray-400" />
//                     ) : (
//                       <FaEye className="text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//                 <div className="min-h-[20px]">
//                   {passwordError && (
//                     <p className="text-red-500 text-sm mt-[-0.5rem]">
//                       {passwordError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="relative">
//                   <input
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className={`p-3 my-2 bg-gray-700 rounded w-full ${
//                       confirmPasswordError ? "border border-red-500" : ""
//                     }`}
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm Password"
//                     autoComplete="new-password"
//                     value={confirmPassword}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                     onClick={() => setShowConfirmPassword((prev) => !prev)}
//                   >
//                     {showConfirmPassword ? (
//                       <FaEyeSlash className="text-gray-400" />
//                     ) : (
//                       <FaEye className="text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//                 <div className="min-h-[20px]">
//                   {confirmPasswordError && (
//                     <p className="text-red-500 text-sm mt-[-0.5rem]">
//                       {confirmPasswordError}
//                     </p>
//                   )}
//                 </div>

//                 <button className="bg-red-600 py-3 my-6 rounded font-bold cursor-pointer">
//                   Sign Up
//                 </button>

//                 <div className="flex justify-between items-center text-sm text-gray-600">
//                   <label className="flex items-center">
//                     <input className="mr-2" type="checkbox" />
//                     Remember me
//                   </label>
//                   <p>Need Help?</p>
//                 </div>

//                 <p className="py-8 text-center">
//                   <span className="text-gray-600">
//                     Already subscribed to Netflix?
//                   </span>{" "}
//                   <Link to="/login" className="text-blue-500">
//                     Sign In
//                   </Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;

import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FirebaseError } from "firebase/app";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setSignupError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
    } else if (!email.endsWith(".com")) {
      setEmailError("Please provide a valid email.");
    }

    if (!password) {
      setPasswordError("Password is required.");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    }

    // Stop if errors exist
    if (
      emailError ||
      passwordError ||
      confirmPasswordError ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return;
    }

    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            setEmailError("An account already exists with this email.");
            break;
          case "auth/invalid-email":
            setEmailError("Invalid email format.");
            break;
          case "auth/weak-password":
            setPasswordError("Password is too weak. Try a stronger password.");
            break;
          default:
            setSignupError("Signup failed. Please try again.");
        }
      } else {
        setSignupError("An unexpected error occurred.");
      }
    }
  };

  if (user) return null;

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 pt-12 sm:pt-16 pb-6">
        <div className="w-full max-w-[450px] bg-black/75 p-6 sm:p-8 rounded-lg">
          <div className="max-w-[320px] mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 bg-gray-700 rounded text-base sm:text-lg"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
              />
              <div className="min-h-[20px]">
                {emailError && (
                  <p className="text-red-500 text-sm mt-[-0.5rem]">
                    {emailError}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded w-full text-base sm:text-lg"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  value={password}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
              <div className="min-h-[20px]">
                {passwordError && (
                  <p className="text-red-500 text-sm mt-[-0.5rem]">
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded w-full text-base sm:text-lg"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  value={confirmPassword}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
              <div className="min-h-[20px]">
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-[-0.5rem]">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
              <button className="bg-red-600 py-3 my-4 rounded font-bold cursor-pointer text-base sm:text-lg">
                Sign Up
              </button>

              <div className="flex justify-between items-center text-sm text-gray-600 ">
                <label className="flex items-center">
                  <input className="mr-2 cursor-pointer" type="checkbox" />
                  Remember me
                </label>
                <p>Need Help?</p>
              </div>

              <p className="py-4 text-center text-sm sm:text-base">
                <span className="text-gray-600">Already have an account?</span>{" "}
                <Link to="/login" className="text-blue-500">
                  Sign In
                </Link>
              </p>

              {signupError && (
                <p className="text-red-500 text-sm text-center mt-4">
                  {signupError}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
