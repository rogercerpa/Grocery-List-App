import React from "react";
import Header from "./components/HeaderFooter/Header";
import Profile from "./Pages/Profile";
import Recipes from "./Pages/Recipes";
import Home from "./Pages/Home";
import FavoritedRecipes from "./Pages/FavoritedRecipes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/HeaderFooter/Footer";
import Calculator from "./Pages/Calculator"

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

  const [groceryItem, setGroceryItem] = React.useState([]);

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
      <section
        className={
          darkMode
            ? "dbg-[#21222A] text-[#D5D4D8] text-center flex flex-col items-center h-auto w-auto m-auto"
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
        <main className="container box-border p-4 pb-20 sm:m-20 md:m-10 lg:m-5">
        <Routes>
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/" element={<Home user={user} />} />
          <Route path="/calculator" element={<Calculator user={user} />} />
          <Route path="/recipes" element={<Recipes user={user} />} />
          <Route path="/favoritedrecipes" element={<FavoritedRecipes user={user} />} />
        </Routes>
        </main>
       <Footer /> 
      </section>
      
    </Router>
  );
}

export default App;
