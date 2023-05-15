import React from "react";

const Recipes = (props) => {
  const { user, setUser, auth } = props;
  return (
    <div className="home">
      <h1>
        Search for your favorite recipes and add all the ingredients to your
        grocery list
      </h1>
      {!user && (
        <p>Sign up or sign in to access the main features of the app.</p>
      )}

      {user && <p>Start searching today, cook tomorrow!</p>}
    </div>
  );
};

export default Recipes;
