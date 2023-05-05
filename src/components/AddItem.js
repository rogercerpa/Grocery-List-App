import React from "react";
import GroceryList from "./GroceryList";
import { ImCart } from "react-icons/im";

export default function AddItem(props) {
  return (
    <div className="addItemContainer">
      <form className="gap-2" onSubmit={props.onSubmit}>
        <input
          type="text"
          placeholder="type grocery item here"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={props.onChange}
          value={props.itemName}
          name="itemName"
          required
        ></input>

        <select
          className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:text-md"
          onChange={props.onSelectChange}
          required
        >
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="Food">Food</option>
          <option value="Home Items">Home Items</option>
          <option value="Business Items">Business Items</option>
        </select>

        <button className="flex flex-row justify-center items-center text-zinc-950 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 cursor-pointer py-4 px-8 gap-5 rounded-md text-lg">
          Add to Cart
          <ImCart />
        </button>
      </form>
      <GroceryList
        handleDelete={props.handleDelete}
        groceryItem={props.groceryItem}
      />
    </div>
  );
}
