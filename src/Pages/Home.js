import React from "react";
import AddItems from "../components/AddItem";
import Image from "../components/Image";

const Home = (props) => {
  const { user, setUser, auth } = props;
  return (
    <div className="w-full flex flex-col items-center ">
      <h1>Welcome to GroceryList App</h1>
      {!user && (
        <p>Sign up or sign in to access the main features of the app.</p>
      )}

      {user && (
        <div className="w-full flex flex-col items-center ">
          <h2>Start Creating your grocery list today!</h2>
          <Image />
          <AddItems />
        </div>
      )}
    </div>
  );
};

export default Home;
