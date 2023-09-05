import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import UserDefaultImage from "../assets/day22-owl.png";
import ProfileCard from "../components/Profile/ProfileCard";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Profile = ({ user }) => {

  const [username, setUsername] = useState(user.displayName || "");
  const [imageUrl, setImageUrl] = useState("");

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

  return (
    <main className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center flex-grow">
      {user && (
        <ProfileCard
          user={user}
          username={username}
          UserDefaultImage={imageUrl}
        />
      )}
    </main>
  );
};

export default Profile;
