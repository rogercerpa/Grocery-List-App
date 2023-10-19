import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";

export default function GroceryList(props) {
  const { groceryItem, handleDelete } = props;

  //based on the category, items are grouped
  const groupedItems = groceryItem.reduce((grouped, item) => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
    return grouped;
  }, {});

  const [visibleCategories, setVisibleCategories] = useState({});

  useEffect(() => {
    const initialVisible = {};
    Object.keys(groupedItems).forEach((category) => {
      initialVisible[category] = true;
    });
    setVisibleCategories(initialVisible);
  }, []); // Empty dependency array ensures this runs only once on mount

  const toggleCategory = (category) => {
    setVisibleCategories((prevVisible) => ({
      ...prevVisible,
      [category]: !prevVisible[category],
    }));
  };

  return (
    <div className="">
      {Object.keys(groupedItems).map((category) => (
        <div className="flex flex-col" key={category}>
          <div className=" justify-items-center p-2 ">
            <button
              className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline w-32 h-10 "
              onClick={() => toggleCategory(category)}
            >
              {visibleCategories[category] ? `${category}` : `${category}`}
            </button>
          </div>
          {visibleCategories[category] && (
            <ul className="flex flex-col gap-1 list-none  ">
              {groupedItems[category].map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between rounded-md bg-sky-500/100"
                >
                  <li className="m-1 shadow-md font-bold p-1.5 flex-grow whitespace-normal break-words">
                    {item.itemName}
                  </li>
                  <button
                    className="p-1.5 flex justify-center items-center sm:self-auto bg-red-400/100 hover:bg-red-700/100 rounded-md "
                    onClick={() => handleDelete(item.id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
