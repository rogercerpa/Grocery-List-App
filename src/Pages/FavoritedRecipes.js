import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import FavoritedList from "../components/Recipes/FavoritedList";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import app from '../firebase.jsx';


function FavoritedRecipes() {
    const db = getDatabase(app);
    const auth = getAuth();
    const firestore = getFirestore();
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
  
  // get favorite recipes from database
  const displayFavorites = async () => {
    setLoadingFavorites(true); // Start loading process
    setShowFavorites(true);
    try {
      const favoritesRef = collection(
        firestore,
        "users",
        auth.currentUser.uid,
        "favoriteRecipes"
      );
      const querySnapshot = await getDocs(favoritesRef);
      const favorites = querySnapshot.docs.map((doc) => doc.data());
      setFavoriteRecipes(favorites);
    } catch (error) {
      console.error("Error fetching favorite recipes: ", error);
    }
    setLoadingFavorites(false); // Stop loading process after fetch is complete
  };

  useEffect(() => {
    displayFavorites();
  }, []);

  return (
    <div className="flex flex-col gap-10 w-full p-10 ">
                {loadingFavorites ? (
                <div>
                  <CircularProgress />
                </div>
              ) : showFavorites ? (
                <FavoritedList favoriteRecipes={favoriteRecipes} />
              ) : null}
    </div>
  )
}

export default FavoritedRecipes