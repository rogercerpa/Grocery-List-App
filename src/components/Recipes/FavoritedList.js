import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
const auth = getAuth();
const firestore = getFirestore();

const FavoriteList = ({ favoriteRecipes }) => {

  // const deleteFavorite = async (recipeId) => {
  //   try {
  //     const recipeRef = doc(firestore, "users", auth.currentUser.uid, "favoriteRecipes", recipeId);
  //     await deleteDoc(recipeRef);
  //     // After deletion, fetch the favorites again to update the list
  //     favoriteRecipes();
  //   } catch (error) {
  //     console.error("Error deleting favorite recipe: ", error);
  //   }
  // };
  

  return (
    <div className="w-fit max-w-md mx-auto">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none lg:py-10">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Favorite Recipes
      </h1>
      <h2 className=" text-lg leading-8 text-gray-600 p-4">
            Find all your favorite recipes here, start Cooking! 
      </h2>

          <div className="grid grid-rows-4 grid-flow-col gap-4">
            {favoriteRecipes.map((recipe) => (
              <div key={recipe.id} className=" flex-col ">
                <div className="flex flex-row">
                    <img
                        src={recipe.image} 
                        alt={recipe.title} 
                        className="h-20 w-20 rounded-lg sm:h-40 sm:w-40 md:h-60 md:w-60 lg:h-80 lg:w-80"
                    />
                    <div className="flex flex-col p-5">

                      <h1 className="p-1 text-xl font-bold text-gray-700 content-center">
                        <Link to={`/recipe/${recipe.id}`}>
                         <span className="" />
                            {recipe.title}
                       </Link>
                      </h1>

                      <p className="text-base font-semibold text-gray-500"> hello this is a test
                           {recipe.description}
                      </p>
                      
                      <button 
                        // onClick={() => deleteFavorite(recipe.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                          Delete
                    </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;
