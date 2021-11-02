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
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  deleteDoc,
} from "@firebase/firestore";

import { db } from "../firebase";
import { useSession } from "next-auth/react";
import Moment from "react-moment";

const Post = ({ username, img, caption, reference, userImg, id }) => {
  const { data: session } = useSession();
  console.log("name", username);
  //! post set post usesate
  const [hasLiked, setHasLiked] = useState(true);
  // ! for like count
  const [likes, setLikes] = React.useState([]);
  // !for comments

  const [comments, setComments] = useState([]);
  // ! for user comment
  const [comment, setComment] = useState("");

  // ! we are going to get the comment from fire base and insert into to the post object
  // for comment
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
  // ! for likes
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
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
  // !update like
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  console.log(hasLiked);
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
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
        <h3 className="flex-1 font-bold">{username}</h3>
        <DotsHorizontalIcon className="h-6 cursor-pointer " />

        {session && username === session?.user?.username && (
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
            <div className="flex flex-col center">
              {hasLiked ? (
                <HeartIconFilled
                  onClick={likePost}
                  className="btn text-red-500"
                />
              ) : (
                <HeartIcon onClick={likePost} className="btn" />
              )}
              <h2 className="font-semibold">likes {likes.length}</h2>
            </div>
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
      <p className="truncate flex space-x-4 p-5">
        <h2 className="font-bold">{username}</h2>
        <span className=" mr-1">{caption}</span>
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10  h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => {
            return (
              <div className="flex items-center space-x-2 mb-3" id={comment.id}>
                <img
                  className="h-7 rounded-full"
                  src={comment.data().userImg}
                  alt="user-image"
                />
                {/* comment and who commented */}
                <p className="text-sm flex-1">
                  <span className="font-bold">{comment.data().username}</span>{" "}
                  {comment.data().comment}
                </p>

                <Moment fromNow className="pr-5  text-xs">
                  {comment.data().timestamp?.toDate()}
                </Moment>
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
