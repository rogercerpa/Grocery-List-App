import Logo from "../assets/logo.png";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { FaUserPlus, FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import Modal from "react-modal";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const navigation = [
  { name: "Grocery List", href: "/", current: true },
  // { name: "Team", href: "#", current: false },
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
  const { darkMode, toggleDarkMode, user, setUser, auth } = props;

  const history = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    history.push("/");
  };

  return (
    <Disclosure as="nav" className={darkMode ? "dark bg-gray-800" : ""}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
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
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-center ml-auto">
                  <div
                    className="w-6 h-3 bg-[#2B283A] rounded-full mx-1 cursor-pointer flex items-center justify-start border border-black box-content"
                    onClick={toggleDarkMode}
                  >
                    <div className="toggler--slider--circle"></div>
                  </div>

                  {!user && (
                    <>
                      <button
                        className="p-2"
                        onClick={() => setShowSignUp(true)}
                      >
                        <FaUserPlus />
                      </button>
                      <button
                        className="p-2"
                        onClick={() => setShowSignIn(true)}
                      >
                        <FaSignInAlt />
                      </button>
                      <Modal
                        isOpen={showSignUp}
                        onRequestClose={() => setShowSignUp(false)}
                        className="bg-white p-6 rounded-md shadow-md w-96 max-w-full mx-auto m-20"
                      >
                        <SignUp setUser={setUser} />
                        <button
                          className="p-3 bg-red-500 rounded font-bold font-mono w-full gap-2"
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
                          className="p-3 bg-red-500 rounded font-bold font-mono w-full gap-2"
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
                        <button className="p-2">
                          <FaUser />
                        </button>
                      </Link>
                      <button className="p-2" onClick={handleSignOut}>
                        <FaSignOutAlt />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
