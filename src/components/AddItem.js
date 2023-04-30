import React from "react";
import GroceryList from "./GroceryList";
import { ImCart } from "react-icons/im";

export default function AddItem(props) {
  return (
    <div className="addItemContainer">
      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          placeholder="type grocery item here"
          className="box-border border-none focus:border-3 focus:border-gray-500 rounded-md w-full text-2xl text-center my-2"
          onChange={props.onChange}
          value={props.itemName}
          name="itemName"
          required
        ></input>

        <select
          className="box-border border-none focus:border-3 focus:border-gray-500 rounded-md w-full text-2xl text-center my-2"
          required
        >
          <option value="" disabled selected>
            Select an option
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
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
