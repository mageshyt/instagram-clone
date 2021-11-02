import React, { useEffect, useState } from "react";
import { onSnapshot, query, collection, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
  // !get post from firebase
  const [posts, setPosts] = useState([]);
  // !useEffect is a hook that runs after the component is rendered
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div>
      {posts.map((post) => (
        <Post
          reference={post}
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
