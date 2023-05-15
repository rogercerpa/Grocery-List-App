import React from "react";

const Home = (props) => {
  const { user, setUser, auth } = props;
  return (
    <div className="home">
      <h1>Welcome to GroceryList App</h1>
      {!user && (
        <p>Sign up or sign in to access the main features of the app.</p>
      )}

      {user && <p>Start Creating your grocery list today!</p>}
    </div>
  );
};

export default Home;
