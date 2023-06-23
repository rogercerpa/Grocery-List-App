import React from "react";
import Modal from "react-modal";

const RecipeDetails = ({ isOpen, onRequestClose, recipe }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Recipe Details"
    >
      {recipe && (
        <>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          {/* Insert additional recipe details here */}
        </>
      )}
    </Modal>
  );
};

export default RecipeDetails;
