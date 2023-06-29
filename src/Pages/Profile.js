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
import UserDefaultImage from "../assets/day22-owl.png";
import ProfileCard from "../components/Profile/ProfileCard";

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
      } else {
        // If there's no user data in the database, use the default image
        setImageUrl(UserDefaultImage);
        console.log(UserDefaultImage);
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

    try {
      let url = imageUrl; // start with the current imageUrl
      if (photo) {
        // If a new photo was selected, upload it and get the new URL
        const storageRef = ref(storage, `profile_photos/${user.uid}`);
        await uploadBytesResumable(storageRef, photo);
        url = await getDownloadURL(storageRef);
      }

      // Save the new profile info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        imageUrl: url,
      });

      // Update the profile in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: url,
      });

      // Toggle editing off
      setEditing(false);
    } catch (error) {
      console.error("An error occurred during file upload:", error);
      // handle the error appropriately for your application here
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <main className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center ">
      {user && (
        <ProfileCard
          user={user}
          handleSignOut={handleSignOut}
          handleEdit={handleEdit}
          editing={editing}
          handleUsernameChange={handleUsernameChange}
          handlePhotoChange={handlePhotoChange}
          username={username}
          UserDefaultImage={imageUrl}
        />
      )}
    </main>
  );
};

export default Profile;
