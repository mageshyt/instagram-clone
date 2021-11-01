// create feed component
import { useSession } from "next-auth/react";
import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Feed = () => {
  const { data: session } = useSession();
  console.log("feed session", session);
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-s xl:grid-cols-3 md:max-w-3xl xl:max-w-6xl mx-auto ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      {/* section-1 */}
      <section className="col-span-2">
        {/* stories */}
        <Stories />
        <Posts />
        {/* posts */}
      </section>
      {session && (
        <section className=" hidden xl:inline-flex md:col-span-1">
          <div className="fixed top-20 col-span-1">
            {/* Mini profile */}
            <MiniProfile />
            {/* Suggestion */}
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
};

export default Feed;
