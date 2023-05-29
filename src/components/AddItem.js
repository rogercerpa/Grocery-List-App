import React, { useState, useEffect } from "react";
import GroceryList from "./GroceryList";
import { ImCart } from "react-icons/im";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  off,
  set,
  push,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";

export default function AddItem(props) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const productsInDB = ref(database, "products");

  const [groceryItem, setGroceryItem] = useState([]);
  const [itemName, setItemName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // handle input changes
  function handleChange(event) {
    const { value } = event.target;
    setItemName(value);
  }

  // handle select change
  function handleSelectChange(event) {
    setSelectedOption(event.target.value);
  }

  // handle submit function
  function handleSubmit(event) {
    event.preventDefault();

    if (itemName.trim() !== "") {
      const newItem = {
        itemName: itemName,
        category: selectedOption,
      };
      const newItemRef = push(productsInDB);
      newItem.id = newItemRef.key;
      set(newItemRef, newItem);
      setGroceryItem((prevItems) => [...prevItems, newItem]);
      setItemName("");
      console.log("form submitted");
    }
  }

  // handle delete products from database
  function handleDelete(itemId) {
    const itemRef = ref(database, `products/${itemId}`);
    remove(itemRef).then(() => {
      setGroceryItem((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    });
  }

  // Load products from the database when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      onValue(productsInDB, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const itemsArray = [];
          for (const key in data) {
            itemsArray.push({
              id: key,
              ...data[key],
            });
          }
          setGroceryItem(itemsArray);
        }
      });
    };

    fetchData();

    return () => {
      // Unsubscribe from the firebase listener
      off(productsInDB);
    };
  }, [productsInDB]);

  return (
    <div className=" container mx-auto px-4 space-y-4 divide-y-4 divide-slate-400/25">
      <form
        className="flex flex-col gap-1 items-center"
        onSubmit={handleSubmit}
      >
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="itemName"
            id="price"
            className=" w-full  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="grocery item"
            onChange={handleChange}
            value={itemName}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <select
              onChange={handleSelectChange}
              required
              id="category"
              name="category"
              value={selectedOption}
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Food">Food</option>
              <option value="Home Items">Home Items</option>
              <option value="Business Items">Business Items</option>
              <option value="Personal Items">Personal Items</option>
            </select>
          </div>
        </div>

        <button className="mt-6 flex w-64 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white gap-5 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Add to Cart
          <ImCart />
        </button>
      </form>
      <GroceryList handleDelete={handleDelete} groceryItem={groceryItem} />
    </div>
  );
}
