import React, { useEffect } from "react";
import faker from "faker";
import { useSession } from "next-auth/react";
const Stories = () => {
  // save out faker data using usestate
  const [suggestions, setSuggestions] = React.useState([]);
  useEffect(() => {
    const suggestion = [...Array(20)].map((_, i) => {
      return {
        ...faker.helpers.contextualCard(),
        id: i,
      };
    });
    setSuggestions(suggestion);
  }, []);
  // session
  console.log(suggestions);
  const { data: session } = useSession();
  return (
    <div
      className="flex flex-row space-x-2 p-6 mt-8 rounded-xl border-gray-300 border bg-white mx-auto  rounded-sm 
    border-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black"
    >
      {session && (
        <Story img={session?.user.image} username={session.user.name} />
      )}
      {suggestions.map(({ id, avatar, username }) => (
        <Story key={id} id={id} img={avatar} username={username} />
      ))}
    </div>
  );
};

const Story = ({ img, username, id }) => {
  console.log(img);
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
        src={`https://i.pravatar.cc/150?img=${id}`}
        alt={username}
      />
      <p className="text-xs w-14 truncate text-center">
        {username.toLowerCase()}
      </p>
    </div>
  );
};

export default Stories;
