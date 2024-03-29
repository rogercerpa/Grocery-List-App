import Logo from "../../assets/logo.png";
import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import {
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
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
                <Tooltip content="Sign-Out">
                  <button className="p-2" onClick={handleSignOut}>
                    <FaSignOutAlt />
                  </button>
                </Tooltip>
              </>
            )}
          </div>
        </>
      )}
    </Disclosure>
  );
}
