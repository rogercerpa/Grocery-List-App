import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getDatabase, ref, set, push, get, child } from "firebase/database";
import RecipeDetails from "../components/Recipes/RecipeDetails";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import RecipeCard from "../components/Recipes/RecipeCard";
import RecipeSearchForm from "../components/Recipes/RecipeSearchForm";
import app from '../firebase';

const Recipes = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const { user } = props;
  const [feedback, setFeedback] = useState("");
  const [ingredientsInDB, setIngredientsInDB] = useState([]);
  const db = getDatabase(app);
  const auth = getAuth();
  const firestore = getFirestore();
  const [favoritedRecipeIds, setFavoritedRecipeIds] = useState([]);

  // Save recipe to user's favorites list
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

  const addItemToDatabase = async (item) => {
    if (ingredientsInDB.includes(item)) {
      setFeedback(` ${item} is already in your grocery list.`);
      setTimeout(() => {
        setFeedback("");
      }, 5000);
      return;
    }

    try {
      const productsInDB = ref(db, "products");
      const newProductRef = push(productsInDB);
      const newProduct = {
        id: newProductRef.key,
        itemName: item,
        category: "Food",
      };
      set(newProductRef, newProduct);
      setFeedback(` ${item} added.`);
      setTimeout(() => {
        setFeedback("");
      }, 5000);
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
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
        Find the Perfect Recipe!
      </h1>
      {!user && (
        <p className="mt-4 text-base sm:text-lg lg:text-xl leading-6 text-gray-600 text-center">
          Sign up or sign in to access the main features of the app.
        </p>
      )}

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {user && (
        <div className="w-full">
          <p className="mt-4 text-base sm:text-lg lg:text-xl leading-6 text-gray-600 text-center">
            Then, add the ingredients you need to your grocery list!
          </p>

          <RecipeSearchForm
            handleSearch={handleSearch}
            searchTerm={searchTerm}
            handleSearchTermChange={handleSearchTermChange}
          />

          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                openModal={openModal}
                saveRecipeAsFavorite={saveRecipeAsFavorite}
                favoritedRecipeIds={favoritedRecipeIds}
              />
            ))}
          </div>

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
