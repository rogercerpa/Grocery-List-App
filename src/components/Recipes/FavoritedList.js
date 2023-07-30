import React from "react";
import { Link } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
// const auth = getAuth();
// const firestore = getFirestore();

const FavoriteList = ({ favoriteRecipes }) => {

  // const deleteFavorite = async (recipeId) => {
  //   try {
  //     const recipeRef = doc(firestore, "users", auth.currentUser.uid, "favoriteRecipes", recipeId);
  //     await deleteDoc(recipeRef);
  //     // After deletion, fetch the favorites again to update the list
  //     displayFavorites();
  //   } catch (error) {
  //     console.error("Error deleting favorite recipe: ", error);
  //   }
  // };
  

  return (
    <div className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Favorite Recipes</h2>

          <div className="grid grid-rows-4 grid-flow-col gap-4">
            {favoriteRecipes.map((recipe) => (
              <div key={recipe.id} className=" ">
                <h3 className="p-1 text-sm text-gray-500 content-center">
                  <Link to={`/recipe/${recipe.id}`}>
                    {" "}
                    <span className="" />
                    {recipe.title}
                  </Link>
                </h3>
                <div className="">
                  <img
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="h-60 w-60  rounded-lg sm:h-64 sm:w-64 lg:h-80 lg:w-80"
                  />
                </div>

                <p className="text-base font-semibold text-gray-900">
                  {recipe.description}
                </p>{" "}
                <button 
        // onClick={() => deleteFavorite(recipe.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
             
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;
