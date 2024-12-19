import React from "react";

const RecipeSearchForm = ({
  handleSearch,
  searchTerm,
  handleSearchTermChange,
}) => {
  return (
    <form
      onSubmit={handleSearch}
      className="m-6 flex flex-col sm:flex-row gap-4 justify-center mx-auto max-w-2/3 p-5"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search for a recipe"
        className="w-full sm:w-2/3 rounded-md border-1 bg-white/5 px-3.5 py-2 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
      />
      <div className="flex space-x-4 w-full sm:w-auto mt-4 sm:mt-0">
        <button
          type="submit"
          className="flex-grow sm:flex-grow-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white gap-5 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default RecipeSearchForm;
