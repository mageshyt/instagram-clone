import React from "react";
import {
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import {
  BookmarkIcon as BookmarkIconFilled,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";
const Post = ({ userName, img, caption }) => {
  // post set post usesate
  const [liked, setLiked] = React.useState(true);

  // bookmark state
  const [bookmarked, setBookmarked] = React.useState(false);
  const handleClick = () => {
    setBookmarked(!bookmarked);
  };

  const likePost = () => {
    console.log(liked);
    setLiked(!liked);
  };

  console.log(userName);
  return (
    <div className="bg-white border my-7">
      {/* Header */}
      <div className="flex items-center p-5">
        {/* image */}
        <img
          src="/logo.jpg"
          alt=""
          className="h-12 w-12 rounded-full object-contain p-1 mr-2 border"
        />
        {/* username */}
        <h3 className="flex-1 font-bold">{userName}</h3>
        <DotsHorizontalIcon className="h-6 cursor-pointer " />
      </div>
      {/* Post image */}
      <div>
        <img src={img} alt="post-image" className="w-full" />
      </div>
      {/* buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4 mt-1">
          {liked ? (
            <HeartIcon onClick={() => likePost()} className="btn " />
          ) : (
            <HeartIconFilled
              onClick={() => likePost()}
              className="btn text-red-500"
            />
          )}

          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn rotate-45" />
        </div>
        {/* BookMark */}
        {bookmarked ? (
          <BookmarkIconFilled onClick={() => handleClick()} className="btn" />
        ) : (
          <BookmarkIcon onClick={() => handleClick()} className="btn" />
        )}
      </div>

      {/* caption */}
      <p className="truncate p-5">
        <span className="font-bold mr-1">{caption}</span>
      </p>

      {/* Comments */}
      {/* Input box */}
      <form className="flex items-center p-4 space-x-2">
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          placeholder="Add a comment"
          className="border-none flex-1 focus:ring-0 outline-none"
        />
        <button className="font-semibold text-blue-500">Post</button>
      </form>
    </div>
  );
};

export default Post;
