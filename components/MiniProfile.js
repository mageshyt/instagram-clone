import { signOut, useSession } from "next-auth/react";
import React from "react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center  ml-10 mt-14 justify-between">
      {/* image rounded full */}

      <img
        src={session?.user?.image}
        alt=""
        className="h-16 w-16 p-[2px] rounded-full object-contain  mr-2 border"
      />

      <div>
        <h2>{session?.user?.username}</h2>
        <h3>Welcome to instagram</h3>
      </div>

      <div className="ml-4 text-blue-500">
        <button onClick={signOut}>sign out</button>
      </div>
    </div>
  );
};

export default MiniProfile;
