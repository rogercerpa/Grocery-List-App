import React from "react";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";

const RecipeCard = ({
  recipe,
  openModal,
  saveRecipeAsFavorite,
  favoritedRecipeIds,
}) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          onClick={() => openModal(recipe)}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <h2 className="text-sm font-medium text-gray-900">{recipe.title}</h2>
        <h3 className="text-sm text-gray-700">
          Cooking Time: {recipe.cookingMinutes} minutes
        </h3>

        <button onClick={() => saveRecipeAsFavorite(recipe)}>
          {favoritedRecipeIds.includes(recipe.id.toString()) ? (
            <StarIconSolid className="h-6 w-6 text-yellow-500" />
          ) : (
            <StarIconOutline className="h-6 w-6 text-yellow-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
