import React from "react";
import GroceryList from "./GroceryList";
import { ImCart } from "react-icons/im";

export default function AddItem(props) {
  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={props.onSubmit}>
        <label
          htmlFor="product"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Product
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            type="text"
            name="itemName"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="grocery item"
            onChange={props.onChange}
            value={props.itemName}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            {/* <label htmlFor="product" className="sr-only">
              Product
            </label> */}
            <select
              onChange={props.onSelectChange}
              required
              id="category"
              name="category"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="Food">Food</option>
              <option value="Home Items">Home Items</option>
              <option value="Business Items">Business Items</option>
            </select>
          </div>
        </div>

        {/* <input
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
        </select> */}

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
