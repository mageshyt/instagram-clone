import React from "react";
import Post from "./Post";
// get  some dummy data with user name and image and caption
const dummyData = [
  {
    userName: "Soumya",
    userImage: "/pic1.png",
    caption: "This is a dummy caption",
  },
  {
    userName: "Soumya",
    userImage:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    caption: "This is a dummy caption",
  },
];
const Posts = () => {
  return (
    <div>
      {dummyData.map(({ userName, userImage, caption }, index) => (
        <Post
          key={index}
          userName={userName}
          img={userImage}
          caption={caption}
        />
      ))}
    </div>
  );
};

export default Posts;
