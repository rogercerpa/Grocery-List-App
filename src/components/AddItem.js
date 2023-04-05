import React from "react";
import GroceryList from "./GroceryList";

export default function AddItem(props) {
  console.log(props.groceryItem);

  return (
    <div className="addItemContainer">
      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          placeholder="type grocery item here"
          className="form--input"
          onChange={props.onChange}
          value={props.groceryItem.value}
          name="itemName"
        ></input>
        <button className="addButton">Add to Cart</button>
      </form>
      <GroceryList groceryItem={props.groceryItem} />
    </div>
  );
}
