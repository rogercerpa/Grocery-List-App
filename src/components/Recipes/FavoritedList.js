import React from "react";

const FavoriteList = ({ favoriteRecipes }) => {
  return (
    <div className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Favorite Recipes</h2>

          <div className="">
            {favoriteRecipes.map((recipe) => (
              <div key={recipe.id} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={recipe.image} // Assuming 'image' is the key for the recipe image URL
                    alt={recipe.title} // Assuming 'title' is the key for the recipe title
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={`/recipe/${recipe.id}`}>
                    {" "}
                    {/* Adjust this to match your route for individual recipes */}
                    <span className="absolute inset-0" />
                    {recipe.title}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {recipe.description}
                </p>{" "}
                {/* Assuming 'description' is the key for the recipe description */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;
