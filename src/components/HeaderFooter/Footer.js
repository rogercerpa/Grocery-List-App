import { HomeIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/20/solid";
import { BellIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid";

function Footer() {
  const handleClick = (event) => {
    // Handle different icon click events here.
    console.log(`${event.target.name} icon clicked!`);
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 p-2 flex items-center justify-around text-white">
      <HomeIcon
        className="h-6 w-6 cursor-pointer"
        name="home"
        onClick={handleClick}
      />
      <SearchIcon
        className="h-6 w-6 cursor-pointer"
        name="search"
        onClick={handleClick}
      />
      <BellIcon
        className="h-6 w-6 cursor-pointer"
        name="notifications"
        onClick={handleClick}
      />
      <UserIcon
        className="h-6 w-6 cursor-pointer"
        name="profile"
        onClick={handleClick}
      />
    </footer>
  );
}

export default Footer;
