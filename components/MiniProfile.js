import React from "react";

const MiniProfile = () => {
  return (
    <div className="flex items-center  ml-10 mt-14 justify-between">
      {/* image rounded full */}

      <img
        src="/logo.jpg"
        alt=""
        className="h-16 w-16 p-[2px] rounded-full object-contain  mr-2 border"
      />

      <div>
        <h2>MageshYt</h2>
        <h3>Welcome to instagram</h3>
      </div>

      <div className="ml-4 text-blue-500">
        <button>sign out</button>
      </div>
    </div>
  );
};

export default MiniProfile;
