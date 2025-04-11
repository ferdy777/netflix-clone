// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-black text-gray-400 px-4 py-8 mt-10">
//       <div className="max-w-[1000px] mx-auto text-sm">
//         <p className="mb-6">
//           Questions?{" "}
//           <span className="underline cursor-pointer">Contact us.</span>
//         </p>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
//           <Link to="#" className="hover:underline">
//             FAQ
//           </Link>
//           <Link to="#" className="hover:underline">
//             Help Center
//           </Link>
//           <Link to="#" className="hover:underline">
//             Terms of Use
//           </Link>
//           <Link to="#" className="hover:underline">
//             Privacy
//           </Link>
//           <Link to="#" className="hover:underline">
//             Cookie Preferences
//           </Link>
//           <Link to="#" className="hover:underline">
//             Corporate Information
//           </Link>
//         </div>

//         <p className="text-xs">
//           &copy; {new Date().getFullYear()} Netflix. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-4 py-2 mt-10">
      <div className="max-w-[1000px] mx-auto text-sm">
        <p className="mb-6 text-center">
          Questions?{" "}
          <span className="underline cursor-pointer">Contact us.</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6 text-center">
          <Link to="#" className="hover:underline">
            FAQ
          </Link>
          <Link to="#" className="hover:underline">
            Help Center
          </Link>
          <Link to="#" className="hover:underline">
            Terms of Use
          </Link>
          <Link to="#" className="hover:underline">
            Privacy
          </Link>
          <Link to="#" className="hover:underline">
            Cookie Preferences
          </Link>
          <Link to="#" className="hover:underline">
            Corporate Information
          </Link>
        </div>

        <p className="text-xs text-center">
          &copy; {new Date().getFullYear()} Netflix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
