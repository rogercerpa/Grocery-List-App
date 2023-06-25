import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child } from "firebase/database";
import RecipeDetails from "../components/RecipeDetails";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, arrayUnion } from "firebase/firestore";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";

const Recipes = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const { user } = props;
  const [feedback, setFeedback] = useState("");
  const [ingredientsInDB, setIngredientsInDB] = useState([]);
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth();
  const firestore = getFirestore();
  const [favoritedRecipeIds, setFavoritedRecipeIds] = useState([]);

  //save recipe to users favorites list
  const saveRecipeAsFavorite = async (recipe) => {
    try {
      const recipeData = { ...recipe, id: recipe.id.toString() };
      await setDoc(
        doc(
          firestore,
          "users",
          auth.currentUser.uid,
          "favoriteRecipes",
          recipe.id.toString()
        ),
        recipeData,
        { merge: true }
      );
      alert("Recipe saved as favorite!");
      setFavoritedRecipeIds((prevState) => [
        ...prevState,
        recipe.id.toString(),
      ]);
    } catch (error) {
      console.error("Error saving recipe as favorite: ", error);
    }
  };

  // Load search results from local storage
  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  // Save search results to local storage
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const fetchIngredients = useCallback(async () => {
    const response = await get(child(ref(db), "/products"));
    const data = response.val();
    const ingredients = data
      ? Object.values(data).map((item) => item.itemName)
      : [];
    setIngredientsInDB(ingredients);
  }, [db]);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  // useEffect(() => {
  //   // Fetch current ingredients from database on component mount
  //   const fetchIngredients = async () => {
  //     const response = await db.ref("/products").once("value");
  //     const data = response.val();
  //     const ingredients = data
  //       ? Object.values(data).map((item) => item.itemName)
  //       : [];
  //     setIngredientsInDB(ingredients);
  //   };

  //   fetchIngredients();
  // }, [db, user]);

  const addItemToDatabase = async (item) => {
    // Check if the ingredient is already in the database
    if (ingredientsInDB.includes(item)) {
      setFeedback(` ${item} is already in your grocery list.`);
      // Set a timer to clear the feedback message after 5 seconds
      setTimeout(() => {
        setFeedback("");
      }, 5000);
      return;
    }

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
      setFeedback(` ${item} added.`);

      // Set a timer to clear the feedback message after 5 seconds
      setTimeout(() => {
        setFeedback("");
      }, 5000);

      // Update local copy of ingredients
      setIngredientsInDB([...ingredientsInDB, item]);
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
      fetchIngredients();
    } catch (err) {
      setError(err.toString());
    }
  };

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
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

          {/* recipe search bar */}

          <form
            onSubmit={handleSearch}
            className="m-6 flex flex-wrap gap-x-4 justify-center mx-auto max-w-2/3"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Search for a recipe"
              className="w-full sm:w-2/3 rounded-md border-1 bg-white/5 px-3.5 py-2 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className="mt-6 sm:mt-0 w-full sm:w-auto flex-none sm:flex-grow-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white gap-5 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>

          {/* recipe results  */}

          <div className="flex flex-col gap-10 w-full p-10 ">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {recipes.map((recipe, index) => (
                <div key={index} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      onClick={() => openModal(recipe)}
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <h2 className="text-sm font-medium text-gray-900">
                      {recipe.title}
                    </h2>
                    <h3 className="text-sm  text-gray-700">
                      Cooking Time: {recipe.cookingMinutes} minutes
                    </h3>
                    <p className="text-md text-gray-500">{feedback}</p>

                    <button onClick={() => saveRecipeAsFavorite(recipe)}>
                      {favoritedRecipeIds.includes(recipe.id.toString()) ? (
                        <StarIconSolid className="h-6 w-6 text-yellow-500" />
                      ) : (
                        <StarIconOutline className="h-6 w-6 text-yellow-500" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* recipe details */}

          <RecipeDetails
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            recipe={selectedRecipe}
            ingredientsInDB={ingredientsInDB}
            addItemToDatabase={addItemToDatabase}
          />
        </div>
      )}
    </div>
  );
};

export default Recipes;
