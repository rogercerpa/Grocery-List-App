import { HomeIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

function Footer({ displayFavorites }) {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 p-2 flex items-center justify-around text-white">
      <Link to="/">
        <HomeIcon
          className="h-6 w-6 cursor-pointer"
          name="home"
          content="HomePage"
        />
      </Link>
      <Link to="recipes">
        <SearchIcon
          className="h-6 w-6 cursor-pointer"
          name="search"
          content="SearchRecipes"
        />
      </Link>
      <Link>
        <OutdoorGrillIcon
          className="h-6 w-6 cursor-pointer"
          name="favoritedRecipes"
          content="FavoritedRecipes"
          onClick={displayFavorites}
        />
      </Link>
      <Link to="/profile">
        <UserIcon
          className="h-6 w-6 cursor-pointer"
          name="profile"
          content="profile"
        />
      </Link>
    </footer>
  );
}

export default Footer;
