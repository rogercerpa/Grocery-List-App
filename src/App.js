import React from "react";
import Header from "./components/HeaderFooter/Header";
import Profile from "./Pages/Profile";
import Recipes from "./Pages/Recipes";
import Home from "./Pages/Home";
import FavoritedRecipes from "./Pages/FavoritedRecipes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/HeaderFooter/Footer";
import Calculator from "./Pages/Calculator";
import app from './firebase.jsx';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [groceryItem, setGroceryItem] = React.useState([]);
  const [user, setUser] = React.useState(null);

  const database = getDatabase(app);
  const productsInDB = ref(database, "products");
  const auth = getAuth(app);

  function toggleDarkMode() {
    setDarkMode((prevState) => !prevState);
    console.log("dark mode active!", darkMode);
  }

  // Load products from the database when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      try {
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
        }, (error) => {
          console.error("Error fetching data:", error);
        });
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData();

    return () => {
      off(productsInDB);
    };
  }, [productsInDB]);

  // Authentication
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    }, (error) => {
      console.error("Error with auth state change:", error);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <Router>
      <div
        className={`${
          darkMode ? "bg-[#21222A] text-[#D5D4D8]" : "bg-white text-[#21222A]"
        } flex flex-col min-h-screen`}
      >
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          user={user}
          setUser={setUser}
          auth={auth}
        />
        <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 pb-20 overflow-auto">
          <Routes>
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/" element={<Home user={user} />} />
            <Route path="/calculator" element={<Calculator user={user} />} />
            <Route path="/recipes" element={<Recipes user={user} />} />
            <Route path="/favoritedrecipes" element={<FavoritedRecipes user={user} />} />
          </Routes>
        </main>
        <Footer user={user} />
      </div>
    </Router>
  );
}

export default App;
