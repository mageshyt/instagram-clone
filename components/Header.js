import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  HomeIcon,
} from "@heroicons/react/outline";
const Header = () => {
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className=" flex items-center justify-between max-w-6xl mx-5 xl:mx-auto ">
        {/* Left side  */}
        {/* logo */}
        <div className=" relative hidden lg:block w-24 h-12 cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* in mobile insta logo */}
        <div className="relative  lg:hidden w-12 h-12 flex-shrink-0">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* Middle */}
        {/* Search bar */}
        <div className=" relative mt-1 p-3 rounded-md">
          {/* search icon */}
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none ">
            <SearchIcon className="h-[22p] w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className=" bg-gray-100 p-2 pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-gray-700 rounded-lg"
            placeholder="Search"
          />
        </div>

        {/* Right */}
        {/* Buttons */}
        <div className="center space-x-4 ">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          <div className="relative navBtn -top-1">
            <PaperAirplaneIcon className="navBtn rotate-45" />
            <div className="absolute -top-2 -right-2 h-5 center text-gray-900 text-xs animate-bounce bg-red-500 rounded-full w-5">
              10
            </div>
          </div>
          <PlusCircleIcon className="navBtn" />
          <HeartIcon className="navBtn" />

          {/* logo */}

          <img src="/logo.jpg" className="h-10 cursor-pointer rounded-full " />
        </div>
      </div>
    </div>
  );
};

export default Header;
