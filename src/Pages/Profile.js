import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserDefaultImage from "../assets/day22-owl.png";
import ProfileCard from "../components/Profile/ProfileCard";
import app from '../firebase';
import { useNavigate } from "react-router-dom"; 

// Initialize Firebase
const db = getFirestore(app);

const Profile = ({ user }) => {

  const navigate = useNavigate();  // Initialize useHistory
  const [username, setUsername] = useState(user.displayName || "");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {

    if (!user) {  // Check if user is not logged in
      navigate.push("/");  // Redirect to homepage
      return;  // Exit useEffect to prevent further execution
    }

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
  }, [user, navigate]);

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
