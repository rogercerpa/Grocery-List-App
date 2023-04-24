import React from "react";
import "./App.css";
import Header from "./components/Header";
import Image from "./components/Image";
import AddItem from "./components/AddItem";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  off,
  set,
  push,
} from "firebase/database";

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

  // handle input changes

  function handleChange(event) {
    const { value } = event.target;
    setItemName(value);
  }

  // handle submit function

  function handleSubmit(event) {
    event.preventDefault();

    if (itemName.trim() !== "") {
      const newItem = {
        itemName: itemName,
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
  React.useEffect(() => {
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
    <div className={darkMode ? "darkApp" : "App"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Image />
      <AddItem
        itemName={itemName}
        handleDelete={handleDelete}
        onSubmit={handleSubmit}
        onChange={handleChange}
        groceryItem={groceryItem}
      />
    </div>
  );
}

export default App;
