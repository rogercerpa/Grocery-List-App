import React from "react";
import Header from "./components/Header";
import Image from "./components/Image";
import AddItem from "./components/AddItem";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

  const [selectedOption, setSelectedOption] = React.useState("");

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

  //authentication

  const auth = getAuth(app);

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <Router>
      <div
        className={
          darkMode
            ? "dbg-[#21222A] text-[#D5D4D8] text-center flex flex-col items-center h-[1000px] w-auto m-auto"
            : "text-[#21222A] bg-[#ffffff] text-center flex flex-col items-center h-auto w-auto m-auto"
        }
      >
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          user={user}
          setUser={setUser}
          auth={auth}
        />
        <Routes>
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/" element={<Home user={user} />} />
        </Routes>
        <Image />
        <AddItem
          itemName={itemName}
          handleDelete={handleDelete}
          onSubmit={handleSubmit}
          onChange={handleChange}
          groceryItem={groceryItem}
          onSelectChange={handleSelectChange}
        />
      </div>
    </Router>
  );
}

export default App;
