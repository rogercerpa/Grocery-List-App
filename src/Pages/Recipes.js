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

  const handleSearch = async () => {
    setError(null);
    try {
      const result = await axios({
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
        params: {
          query: searchTerm,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      });

      setRecipes(result.data.results);
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
    <div className="home">
      <h1>
        Search for your favorite recipes and add all the ingredients to your
        grocery list
      </h1>
      {!user && (
        <p>Sign up or sign in to access the main features of the app.</p>
      )}

      {error && <div>Error: {error}</div>}

      {user && (
        <div>
          <p>Start searching today, cook tomorrow!</p>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Search for a recipe"
          />
          <button
            onClick={handleSearch}
            className="mt-6 flex w-64 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white gap-5 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
          <div>
            {recipes.map((recipe, index) => (
              <div key={index}>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
