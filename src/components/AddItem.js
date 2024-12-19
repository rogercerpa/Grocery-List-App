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
import app from '../firebase'; 
import { getAuth } from "firebase/auth";

export default function AddItem(props) {
  const database = getDatabase(app);
  const auth = getAuth();
  const userUID = auth.currentUser ? auth.currentUser.uid : null;
  const [groceryItem, setGroceryItem] = useState([]);
  const [itemName, setItemName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const productsInDB = ref(database, `users/${userUID}/products`);

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
      off(productsInDB);
    };
  }, []);

  function handleChange(event) {
    const { value } = event.target;
    setItemName(value);
  }

  function handleSelectChange(event) {
    setSelectedOption(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (itemName.trim() !== "") {
      const newItem = {
        itemName: itemName,
        category: selectedOption,
      };

      const existingItemIndex = groceryItem.findIndex(
        (item) =>
          item.itemName === newItem.itemName && item.category === newItem.category
      );

      if (existingItemIndex !== -1) {
        const updatedGroceryItem = [...groceryItem];
        updatedGroceryItem[existingItemIndex] = {
          ...newItem,
          id: groceryItem[existingItemIndex].id,
        };
        setGroceryItem(updatedGroceryItem);
      } else {
        const newItemRef = push(productsInDB);
        newItem.id = newItemRef.key;
        set(newItemRef, newItem);
      }

      setItemName("");
      console.log("form submitted");
    }
  }

  function handleDelete(itemId) {
    const itemRef = ref(database, `users/${userUID}/products/${itemId}`);
    remove(itemRef).then(() => {
      setGroceryItem((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    });
  }

  return (
    <div className="container mx-auto p-5 space-y-4 divide-y divide-gray-200">
      <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
        <div className="w-full">
          <input
            type="text"
            name="itemName"
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Grocery item"
            onChange={handleChange}
            value={itemName}
          />
        </div>
        <div className="w-full">
          <select
            onChange={handleSelectChange}
            required
            name="category"
            value={selectedOption}
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
        <button className="w-full sm:w-auto bg-blue-700 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2">
          Add to Cart
          <ImCart />
        </button>
      </form>
      <GroceryList handleDelete={handleDelete} groceryItem={groceryItem} />
    </div>
  );
}
