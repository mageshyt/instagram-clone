import faker from "faker";
import React, { useEffect, useState } from "react";

const Suggestions = () => {
  //usestate suggestion
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="ml-10 mt-4">
      <div className="flex justify-between text-gray-500 text-sm font-bold ">
        <h2>Suggestions for you</h2>
        <button className=" font-bold text-gray-900 ">see All</button>
      </div>

      {suggestions.map(({ id, avatar, username, company }) => (
        <div key={id} className="flex justify-between mt-2 items-center">
          <img
            src={avatar}
            alt="avatar"
            className="rounded-full cursor-pointer border border-2 border-purple-700 p-[2.6px] w-12 h-12"
          />
          <div className="flex-1 ml-3">
            <h2 className="text-semibold text-xm">{username}</h2>
            <h3 className="text-sm text-gray-300">Wort at {company.name}</h3>
          </div>
          <h2 className="text-semibold text-gray-600 text-sm ml-2 cursor-pointer">
            follow
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
