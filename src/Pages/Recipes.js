import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child } from "firebase/database";
import RecipeDetails from "../components/RecipeDetails";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import RecipeCard from "../components/RecipeCard";
import RecipeSearchForm from "../components/RecipeSearchForm";
import { collection, getDocs } from "firebase/firestore";
import FavoritedList from "../components/Recipes/FavoritedList";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

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
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl p-1">
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

          <RecipeSearchForm
            handleSearch={handleSearch}
            searchTerm={searchTerm}
            handleSearchTermChange={handleSearchTermChange}
            fetchFavoriteRecipes={displayFavorites}
          />

          {/* recipe results  */}

          <div className="flex flex-col gap-10 w-full p-10 ">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  openModal={openModal}
                  saveRecipeAsFavorite={saveRecipeAsFavorite}
                  favoritedRecipeIds={favoritedRecipeIds}
                />
              ))}
              {loadingFavorites ? (
                <div>
                  <CircularProgress />
                </div>
              ) : showFavorites ? (
                <FavoritedList favoriteRecipes={favoriteRecipes} />
              ) : null}
            </div>
          </div>

          {/* recipe details */}

          <RecipeDetails
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            recipe={selectedRecipe}
            ingredientsInDB={ingredientsInDB}
            addItemToDatabase={addItemToDatabase}
            feedback={feedback}
          />
        </div>
      )}
    </div>
  );
};

export default Recipes;
