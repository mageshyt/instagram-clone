import React, { useEffect, useState } from "react";
import {
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  EmojiHappyIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  BookmarkIcon as BookmarkIconFilled,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";

import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";

import { db } from "../firebase";
import { useSession } from "next-auth/react";
import Moment from "react-moment";

const Post = ({ userName, img, caption, reference, userImg, id }) => {
  const { data: session } = useSession();

  //! post set post usesate
  const [liked, setLiked] = React.useState(true);
  // !for comments

  const [comments, setComments] = useState([]);
  // ! for user comment
  const [comment, setComment] = useState("");

  // ! we are going to get the comment from fire base and insert into to the post object

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );

  // * when user clicks the post btn it will upload in  firebase
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment(" ");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.username,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };
  // bookmark state
  const [bookmarked, setBookmarked] = React.useState(false);
  const handleClick = () => {
    setBookmarked(!bookmarked);
  };

  const likePost = () => {
    setLiked(!liked);
  };

  // delete the post from firebase
  const deletePost = async ({ id, username }) => {
    const post_info = doc(db, "posts", id);
    console.log("delete post", post_info);
    if (session?.user?.username === username) {
      await deleteDoc(post_info);
    }
  };

  return (
    <div className="bg-white border my-7">
      {/* Header */}
      <div className="flex items-center p-5">
        {/* image */}
        <img
          src={userImg}
          alt=""
          className="h-12 w-12 rounded-full object-contain p-1 mr-2 border"
        />
        {/* username */}
        <h3 className="flex-1 font-bold">{userName}</h3>
        <DotsHorizontalIcon className="h-6 cursor-pointer " />

        {session && (
          <div>
            {/* Trash to remove the img */}

            <TrashIcon
              onClick={() =>
                deletePost({
                  id: reference.id,
                  username: reference.data().userName,
                })
              }
              className="h-6 cursor-pointer "
            />
          </div>
        )}
      </div>
      {/* Post image */}
      <div>
        <img src={img} alt="post-image" className="w-full" />
      </div>
      {/* buttons */}
      {session && (
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
      )}
      {/* caption */}
      <p className="truncate p-5">
        <span className="font-bold mr-1">{caption}</span>
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10">
          {comments.map((comment) => {
            console.log("commnet-->", comment.data());
            return (
              <div className="flex items-center space-x-2 mb-3" id={comment.id}>
                <img
                  className="h-7 rounded-full"
                  src={comment.data().userImg}
                  alt="user-image"
                />
                {/* comment and who commented */}
                <div className="flex text-sm space-x-2">
                  <span className="font-bold">{comment.data().username}</span>
                  <p className="flex-1">{comment.data().comment}</p>

                  <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {session && (
        <>
          {/* add comment */}
          <form className="flex items-center p-4 space-x-2">
            <EmojiHappyIcon className="h-7" />
            <input
              className="border-none flex-1 focus:ring-0 outline-none"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a Comment..."
            />
            <button
              className="font-semibold text-blue-400 disabled:cursor-not-allowed disabled:text-gray-300"
              onClick={sendComment}
              type="submit"
              disabled={!comment.trim()}
              onClick={sendComment}
            >
              Post
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Post;
