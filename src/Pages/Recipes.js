import React, { useState } from "react";
import axios from "axios";
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  off,
  set,
  push,
} from "firebase/database";

const Recipes = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const { user, setUser, auth } = props;
  const [feedback, setFeedback] = useState("");

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const addItemToDatabase = (item) => {
    try {
      const productsInDB = ref(db, "products");

      // Create a new product reference
      const newProductRef = push(productsInDB);

      // Create a new product object
      const newProduct = {
        id: newProductRef.key, // The key of the new product ref
        itemName: item, // The name of the product
        category: "Food",
      };

      // Set the new product reference to the new product object
      set(newProductRef, newProduct);

      // Show a success message
      setFeedback(`Successfully added ${item} to the database.`);
    } catch (error) {
      console.error("Error adding document: ", error);
      setFeedback("Failed to add item. Please try again.");
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await axios({
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
        params: {
          query: searchTerm,
          fillIngredients: "true",
          addRecipeInformation: "true",
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      });
      console.log(result.data.results);
      setRecipes(result.data.results);
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
    <div className="w-full flex flex-col items-center ">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Find the perfect Recipe!
      </h1>
      {!user && (
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Sign up or sign in to access the main features of the app.
        </p>
      )}

      {error && <div>Error: {error}</div>}

      {user && (
        <div className="">
          <p className="mt-6 text-lg leading-8 text-gray-600">
            then, add the ingredients you need to your grocery list!
          </p>

          <form onSubmit={handleSearch} className="m-6 flex flex-wrap gap-x-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Search for a recipe"
              className="w-full sm:w-auto flex-grow rounded-md border-1 bg-white/5 px-3.5 py-2 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className="mt-6 sm:mt-0 w-full sm:w-auto flex-none sm:flex-grow-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white gap-5 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>
          <div className="flex flex-col gap-10 w-full ">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 gap-5"
              >
                <img src={recipe.image} alt={recipe.title} className=" " />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {recipe.title}
                  </h2>
                  <h3 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Cooking Time: {recipe.cookingMinutes} minutes
                  </h3>
                  <p className="text-md text-gray-600">{feedback}</p>
                  <ul className=" flex flex-row flex-wrap gap-2 p-1">
                    {recipe.extendedIngredients.map(
                      (ingredient, ingredientIndex) => (
                        <li
                          className="text-gray-500 bg-white content-center p-1 cursor-pointer rounded-md hover:bg-slate-300"
                          key={ingredientIndex}
                          onClick={() => addItemToDatabase(ingredient.name)}
                        >
                          {ingredient.name}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
