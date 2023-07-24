import React from "react";

const FavoriteList = ({ favoriteRecipes }) => {
  return (
    <div className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Favorite Recipes</h2>

          <div className="grid grid-rows-4 grid-flow-col gap-4">
            {favoriteRecipes.map((recipe) => (
              <div key={recipe.id} className=" ">
                <h3 className="p-1 text-sm text-gray-500 content-center">
                  <a href={`/recipe/${recipe.id}`}>
                    {" "}
                    {/* Adjust this to match your route for individual recipes */}
                    <span className="" />
                    {recipe.title}
                  </a>
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
             
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;
