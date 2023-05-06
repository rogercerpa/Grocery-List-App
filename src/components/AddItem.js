import React from "react";
import GroceryList from "./GroceryList";
import { ImCart } from "react-icons/im";

export default function AddItem(props) {
  return (
    <div className=" container mx-auto px-4 space-y-4 divide-y-4 divide-slate-400/25">
      <form
        className="flex flex-col gap-1 items-center"
        onSubmit={props.onSubmit}
      >
        <label
          htmlFor="product"
          className=" text-sm font-medium leading-6 text-gray-900"
        >
          Product
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="itemName"
            id="price"
            className=" w-full  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

        <button className="mt-6 flex w-64 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white gap-5 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
