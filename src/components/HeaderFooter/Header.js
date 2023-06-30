import Logo from "../../assets/logo.png";
import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import {
  FaUserPlus,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import Modal from "react-modal";
import { signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Tooltip from "../Tooltip";

Modal.setAppElement("#root");

const navigation = [
  { name: "Grocery List", href: "/", current: true },
  { name: "Recipes", href: "/recipes", current: false },
  // { name: "Projects", href: "#", current: false },
  // { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CombinedNavbar(props) {
  // state management for signup, sign and dark mode
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { user, setUser, auth } = props;
  const location = useLocation();

  const updatedNavigation = navigation.map((item) => {
    return {
      ...item,
      current: item.href === location.pathname,
    };
  });

  const history = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    history.push("/");
  };

  return (
    <Disclosure
      as="nav"
      className="w-full flex items-center justify-between p-6 lg:px-8"
    >
      {({ open }) => (
        <>
          <div className="flex items-center">
            <div className="flex-shrink-0 items-center">
              <Link to="/">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src={Logo}
                  alt="GroceryList App"
                />
                <img
                  className="hidden h-8 w-auto lg:block"
                  src={Logo}
                  alt="GroceryList App"
                />
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <FaTimes className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FaBars className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          <div className="hidden md:flex md:flex-grow items-center justify-center md:ml-6">
            {updatedNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  item.current
                    ? "border-b-2 border-black"
                    : " hover:text-black",
                  "rounded-md px-3 py-2 text-sm font-medium text-gray-500"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center ml-auto">
            {!user && (
              <>
                <Tooltip content="Sign-Up">
                  <button className="p-2" onClick={() => setShowSignUp(true)}>
                    <FaUserPlus />
                  </button>
                </Tooltip>
                <Tooltip content="Sign-In">
                  <button className="p-2" onClick={() => setShowSignIn(true)}>
                    <FaSignInAlt />
                  </button>
                </Tooltip>
                <Modal
                  isOpen={showSignUp}
                  onRequestClose={() => setShowSignUp(false)}
                  className="bg-white p-6 rounded-md shadow-md w-96 max-w-full mx-auto m-20"
                >
                  <SignUp setUser={setUser} />
                  <button
                    className="p-3 bg-pink-500 rounded font-bold font-mono w-full gap-2"
                    onClick={() => setShowSignUp(false)}
                  >
                    Close
                  </button>
                </Modal>
                <Modal
                  isOpen={showSignIn}
                  onRequestClose={() => setShowSignIn(false)}
                  className=" bg-white p-6 rounded-md shadow-md w-96 max-w-full mx-auto m-20 "
                >
                  <SignIn setUser={setUser} />
                  <button
                    className="p-3 bg-green-500 rounded font-bold font-mono w-full gap-2"
                    onClick={() => setShowSignIn(false)}
                  >
                    Close
                  </button>
                </Modal>
              </>
            )}
            {user && (
              <>
                <Link to="/profile">
                  <Tooltip content="Profile">
                    <button className="p-2">
                      <FaUser />
                    </button>
                  </Tooltip>
                </Link>
                <Tooltip content="Sign-Out">
                  <button className="p-2" onClick={handleSignOut}>
                    <FaSignOutAlt />
                  </button>
                </Tooltip>
              </>
            )}
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {updatedNavigation.map((item) => (
                <Disclosure.Button>
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "border-b-2 border-black"
                        : " hover:text-black",
                      "rounded-md px-3 py-2 text-sm font-medium text-gray-500"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
