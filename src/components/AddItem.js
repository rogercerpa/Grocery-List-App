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
        <button className="addButton">Add to Cart</button>
      </form>
      <GroceryList
        handleDelete={props.handleDelete}
        groceryItem={props.groceryItem}
      />
    </div>
  );
}
