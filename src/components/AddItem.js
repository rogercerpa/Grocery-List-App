import React from "react";
import GroceryList from "./GroceryList";

export default function AddItem(props) {
  return (
    <div className="addItemContainer">
      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          placeholder="type grocery item here"
          className="form--input"
          onChange={props.onChange}
          value={props.itemName}
          name="itemName"
        ></input>
        <button className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 cursor-pointer py-4 px-8 rounded-md text-lg">
          Add to Cart
        </button>
      </form>
      <GroceryList
        handleDelete={props.handleDelete}
        groceryItem={props.groceryItem}
      />
    </div>
  );
}
