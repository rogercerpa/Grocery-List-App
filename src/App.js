import React from "react";
import "./App.css";
import Header from "./components/Header";
import Image from "./components/Image";
import AddItem from "./components/AddItem";
import { firebaseData } from "./firebase";
import { nanoid } from "nanoid";

function App() {
  //dark mode function
  const [darkMode, setDarkMode] = React.useState(false);

  function toggleDarkMode() {
    setDarkMode((prevState) => (prevState = !prevState));
    console.log("dark mode active!", darkMode);
  }

  //firebase settings
  const appSettings = firebaseData.databaseURL;

  const app = firebaseData.initializeApp(appSettings);
  const database = firebaseData.getDatabase(app);
  const productsInDB = firebaseData.ref(database, "products");

  //input handler function
  const [groceryItem, setGroceryItem] = React.useState([]);
  const [itemName, setItemName] = React.useState("");

  function handlgeChange(event) {
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
      setGroceryItem([...groceryItem, newItem]);
    }
    firebaseData.push(productsInDB, groceryItem);
    setItemName("");
    // setGroceryItem({ itemName: "" });
    console.log("form submitted");
  }

  return (
    <div className="App">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Image />
      <AddItem
        onSubmit={handleSubmit}
        onChange={handlgeChange}
        groceryItem={groceryItem}
      />
    </div>
  );
}

export default App;
