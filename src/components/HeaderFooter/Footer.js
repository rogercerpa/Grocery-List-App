import { HomeIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/20/solid";
import { BellIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function Footer() {
  const handleClick = (event) => {
    // Handle different icon click events here.
    console.log(`${event.target.name} icon clicked!`);
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 p-2 flex items-center justify-around text-white">
      <Link>
        <HomeIcon
          className="h-6 w-6 cursor-pointer"
          name="home"
          onClick={handleClick}
        />
      </Link>
      <Link>
        <SearchIcon
          className="h-6 w-6 cursor-pointer"
          name="search"
          onClick={handleClick}
        />
      </Link>
      <Link>
        <BellIcon
          className="h-6 w-6 cursor-pointer"
          name="notifications"
          onClick={handleClick}
        />
      </Link>
      <Link to="/profile">
        <UserIcon className="h-6 w-6 cursor-pointer" name="profile" />
      </Link>
    </footer>
  );
}

export default Footer;
