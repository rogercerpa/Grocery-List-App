import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { darkMode, toggleDarkMode, user, setUser, auth } = props;
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
