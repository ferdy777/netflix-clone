// import { useAuth } from "../../../context/authContext";
import SavedShows from "./savedShow/index";

const Account = () => {
  // const { user } = useAuth();

  return (
    <>
      <div className="w-full  text-white relative]">
        {/* Background image */}
        <img
          className="w-full h-[400px] lg:h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="bg-black/60 absolute top-0 left-0 w-full h-[400px]" />

        {/* Centered content */}
        <div className="absolute top-[25%] sm:top-[30%] lg:top-[30%] left-1/2 transform -translate-x-1/2 text-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
          </div>
        </div>
      </div>

      <SavedShows />
    </>
  );
};

export default Account;
