import React, { useState } from "react";
import axios from "axios";

const Recipes = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const { user, setUser, auth } = props;

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    // Use axios to send a GET request to the API
    // API_URL should be the URL of the API endpoint you are trying to reach
    // searchTerm should be added as a parameter to the request
    const result = await axios.get(`API_URL?search=${searchTerm}`);

    // Update the recipes state with the data from the API
    setRecipes(result.data);
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
                <h2>{recipe.name}</h2>
                <img src={recipe.image} alt={recipe.name} />
                <p>{recipe.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
