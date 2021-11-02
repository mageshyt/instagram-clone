import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
const Modal = () => {
  // ! get user refernce
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  //  ! useRef store wht are uploading to it
  const filePickerRef = React.useRef();
  // ! captionRef store
  const captionRef = React.useRef();

  const [selectedFile, setSelectedFile] = React.useState(null);
  //  ! to avoid multiple uploads
  const [loading, setLoading] = React.useState(null);
  // *------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // ! firebase potion 🔥
  // ! 1).create a post and add to fire-store
  // ! 2).Get the post Id for upload post
  // ! 3).upload the image to firebase storage
  // ! 4). get a download url fom firebase storage and upload to original

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      userName: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });
    console.log("new doc added with ID --->", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        // !fisrst upload to firebase storage and then upload to firebase
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };
  // *------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // ! when we click the add image button,it will trigger the function

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  return (
    // Root is parent
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 center overflow-y-auto"
        onClose={setOpen}
      >
        <div className="center mt-52">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaverTo="opacity-0"
          >
            {/* Dialog which displays the thing*/}
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            aria-hidden="true"
            className=" sm:inline-block hidden  sm:align-middle sm:h-screen"
          >
            &#8203;
          </span>
          {/* this going to render */}

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaverTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="bg-white inline-block rounded-lg
             overflow-hidden transform transition-all sm:my-8 sm:align-middle 
            sm:max-w-sm sm:w-full sm:p-6  px-4 pt-5 pb-4 text-left "
            >
              <div>
                {/*  if the file is selected then show its preview*/}
                {selectedFile ? (
                  <img
                    className="cursor-pointer object-contain w-full"
                    src={selectedFile}
                    onClick={() => selectedFile(null)}
                    alt=""
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                {/* Upload file */}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Upload your file
                  </Dialog.Title>
                  {/* post caption */}
                  <div>
                    <input
                      type="file"
                      hidden
                      ref={filePickerRef}
                      onChange={addImageToPost}
                    />
                  </div>
                  <div>
                    <input
                      ref={captionRef}
                      type="text"
                      placeholder="Please enter a caption...."
                      className="text-center border-none focus:ring-0 w-full"
                    />
                  </div>
                </div>
                <div className="mt-5 center  sm:mt-6">
                  <button
                    onClick={uploadPost}
                    disabled={!selectedFile}
                    type="button"
                    className="inline-flex justify-center rounded-md border 
                   border-transparent shadow-md px-4 py-2 bg-red-600 text-base
                   font-medium text-white hover:bg-red-700 focus:outline-none  
                   focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                   sm:text-sm disabled:bg-gray-300 disabled:text-not-allowed 
                    hover:disabled:bg-gray-300 disabled:cursor-not-allowed 
                   "
                  >
                    {/* If it was not upload then show uplpad post otherwise uploadind */}
                    {loading ? "Uploadind....." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

`
pb-60 sm:-pb-40 h-full w-full  flex items-end justify-center
         min-h-[800px]  pt-0 sm:pt-4  px-4 text-center sm:block sm:p-0


         inline-block  bg-white rounded-lg 
              px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle 
            sm:max-w-sm sm:w-full sm:p-6
`;
