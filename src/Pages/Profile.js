import React, { useState, useEffect } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const Profile = ({ user }) => {
  const auth = getAuth();
  const [username, setUsername] = useState(user.displayName || "");
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUsername(docSnap.data().username);
        setImageUrl(docSnap.data().imageUrl);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    // 1. Upload the image to Firebase Storage
    const storageRef = ref(storage, `profile_photos/${user.uid}`);
    await uploadBytesResumable(storageRef, photo);

    // 2. Get the download URL
    const url = await getDownloadURL(storageRef);

    // 3. Save the new profile info to Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      imageUrl: url,
    });

    // 4. Update the profile in Firebase Auth
    await updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: url,
    });

    // 5. Toggle editing off
    setEditing(false);
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <main className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center ">
      {user && (
        <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow rounded-lg">
          {imageUrl && (
            <img
              className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
              src={imageUrl}
              alt="Profile"
            />
          )}
          <h1>Profile</h1>

          <p className="text-center mt-2 text-3xl font-medium">
            Username: {username.username}
          </p>
          <p className="text-center mt-2 font-light text-sm">
            Email: {user.email}
          </p>
          <p className="text-center font-normal text-lg">
            location: {user.location}
          </p>
          <p className="px-6 text-center mt-2 font-light text-sm">
            Bio: {user.bio}
          </p>
          <hr className="mt-8"></hr>

          <div className="flex p-4">
            <div className="w-1/2 text-center">
              <span className="font-bold">{user.followers}0</span> Followers
            </div>
            <div className="w-0 border border-gray-300"></div>
            <div className="w-1/2 text-center">
              <span className="font-bold">{user.following}0</span> Following
            </div>
          </div>
          <hr className="mt-8"></hr>

          <button
            className="flex w-full justify-center  bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
          <button
            className="flex w-full justify-center  bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            onClick={handleEdit}
          >
            {editing ? "Cancel" : "Edit"}
          </button>

          {editing && (
            <form onSubmit={handleSave}>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </label>
              <label>
                Profile picture:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>
              <button type="submit">Save</button>
            </form>
          )}
        </div>
      )}
    </main>
  );
};

export default Profile;
