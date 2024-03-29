import { HomeIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import { CalculatorIcon } from "@heroicons/react/24/outline";

function Footer({user}) {


console.log(user)

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 p-6 flex items-center justify-around text-white ">
      <Link to="/">
        <HomeIcon
          className="h-8 w-8 cursor-pointer"
          name="home"
          content="HomePage"
        />
      </Link>
      <Link to="recipes">
        <SearchIcon
          className="h-8 w-8 cursor-pointer"
          name="search"
          content="SearchRecipes"
        />
      </Link>
      <Link to="calculator">
        <CalculatorIcon
          className="h-8 w-8 cursor-pointer"
          name="calculator"
          content="calculator"
        />
      </Link>
      <Link to="favoritedrecipes">
        <OutdoorGrillIcon
          className="h-8 w-8 cursor-pointer"
          name="favoritedRecipes"
          content="FavoritedRecipes"
        />
      </Link>
  
      {user && (
        <Link to="/profile">
          <UserIcon
            className="h-8 w-8 cursor-pointer"
            name="profile"
            content="profile"
          />
        </Link>
      )}

    </footer>
  );
}

export default Footer;
