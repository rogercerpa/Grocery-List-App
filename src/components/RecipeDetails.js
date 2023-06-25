import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "2xl",
    width: "80%",
  },
};

const RecipeDetails = ({
  isOpen,
  onRequestClose,
  recipe,
  ingredientsInDB,
  addItemToDatabase,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Recipe Details"
    >
      {recipe && (
        <div className="bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {recipe.title}
          </h2>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="rounded-lg bg-gray-100 mt-4"
          />
          <p className="mt-4 text-gray-500">
            <ul className="flex flex-row flex-wrap gap-1 p-1 order-4">
              {recipe.extendedIngredients.map((ingredient, ingredientIndex) => (
                <li
                  className={`text-gray-500 content-center p-1 cursor-pointer rounded-md sm:text-base md:text-lg ${
                    ingredientsInDB.includes(ingredient.name)
                      ? "bg-red-300" // Change the background color here if the ingredient is already in the database
                      : "bg-green-300"
                  }`}
                  key={ingredientIndex}
                  onClick={() => addItemToDatabase(ingredient.name)}
                >
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </p>
          <button
            onClick={onRequestClose}
            className="mt-4 bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default RecipeDetails;
