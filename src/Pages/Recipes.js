import React, { useState } from "react";
import axios from "axios";

const Recipes = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const { user, setUser, auth } = props;

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
    <div className="home">
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
        <div>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            then, add the ingredients you need to your grocery list!
          </p>

          <form onSubmit={handleSearch} className="mt-6 flex flex-wrap gap-x-4">
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
          <div>
            {recipes.map((recipe, index) => (
              <div key={index} className="flex gap-x-4 m-10">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-22 w-22 flex-none rounded-xl bg-gray-50"
                />
                <h2 className="text-lg font-semibold leading-6 text-gray-900">
                  {recipe.title}
                </h2>
                <h3 className="text-md font-semibold leading-6 text-gray-900">
                  Cooking Time: {recipe.cookingMinutes} minutes
                </h3>
                {/* <p className="text-md text-gray-600">{recipe.summary}</p> */}
                <ul className="list-disc pl-5">
                  {recipe.extendedIngredients.map(
                    (ingredient, ingredientIndex) => (
                      <li key={ingredientIndex}>{ingredient.name}</li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
