import React from "react";
import AddItems from "../components/AddItem";
import Image from "../components/Image";

const Home = (props) => {
  const { user } = props;
  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
        Grocery App
      </h1>
      {!user && (
        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-6 sm:leading-8 text-gray-600 text-center">
          Sign up or sign in to access the main features of the app.
        </p>
      )}

      {user && (
        <div className="w-full flex flex-col items-center mt-4 sm:mt-6 space-y-4">
          <h2 className="text-base sm:text-lg lg:text-xl leading-6 sm:leading-8 text-gray-600 text-center">
            Start Creating your grocery list today!
          </h2>
          <Image />
          <AddItems />
        </div>
      )}
    </div>
  );
};

export default Home;
