import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { FaUserPlus, FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import Modal from "react-modal";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export default function Header(props) {
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
    <nav className={darkMode ? "dark" : ""}>
      <div className="flex items-center">
        <p className="toggler--light">Light</p>
        <div
          className="w-6 h-3 bg-[#2B283A] rounded-full mx-1 cursor-pointer flex items-center justify-start border border-black box-content"
          onClick={toggleDarkMode}
        >
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark">Dark</p>
        {!user && (
          <>
            <button className="p-2" onClick={() => setShowSignUp(true)}>
              <FaUserPlus />
            </button>
            <button className="p-2" onClick={() => setShowSignIn(true)}>
              <FaSignInAlt />
            </button>
            <Modal
              isOpen={showSignUp}
              onRequestClose={() => setShowSignUp(false)}
              className="bg-white p-6 rounded-md shadow-md w-96 max-w-full mx-auto"
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
              className=" bg-white p-6 rounded-md shadow-md w-96 max-w-full mx-auto"
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
    </nav>
  );
}
