import React from "react";
import "./App.css";
import Header from "./components/Header";
import Image from "./components/Image";
import AddItem from "./components/AddItem";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { nanoid } from "nanoid";

function App() {
  //dark mode function

  const [darkMode, setDarkMode] = React.useState(false);

  function toggleDarkMode() {
    setDarkMode((prevState) => (prevState = !prevState));
    console.log("dark mode active!", darkMode);
  }

  //firebase settings

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const productsInDB = ref(database, "products");

  //input handler function

  const [groceryItem, setGroceryItem] = React.useState([]);
  const [itemName, setItemName] = React.useState("");

  function handleChange(event) {
    const { value } = event.target;
    setItemName(value);
  }

  // handle submit function

  function handleSubmit(event) {
    event.preventDefault();

    if (itemName.trim() !== "") {
      const newItem = {
        id: nanoid(),
        itemName: itemName,
      };
      setGroceryItem((prevItems) => [...prevItems, newItem]);
      push(productsInDB, newItem);
      setItemName("");
      console.log("form submitted");
    }
  }

  return (
    <div className={darkMode ? "darkApp" : "App"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Image />
      <AddItem
        onSubmit={handleSubmit}
        onChange={handleChange}
        groceryItem={groceryItem}
      />
    </div>
  );
}

export default App;
